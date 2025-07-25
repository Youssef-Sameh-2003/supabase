import matter from 'gray-matter'
import type { Code, Heading, Root } from 'mdast'
import { fromMarkdown } from 'mdast-util-from-markdown'
import { toMarkdown } from 'mdast-util-to-markdown'
import { readdir, readFile, stat } from 'node:fs/promises'
import { basename, extname, join } from 'node:path'
import { cache } from 'react'
import { visit, EXIT } from 'unist-util-visit'

import { EXAMPLES_DIRECTORY } from '~/lib/docs'

const PROMPTS_DIRECTORY = join(EXAMPLES_DIRECTORY, 'prompts')

function parseMarkdown(markdown: string) {
  const { content: withoutFrontmatter } = matter(markdown)
  const mdast = fromMarkdown(withoutFrontmatter)

  let heading = ''
  visit(mdast, 'heading', (node: Heading) => {
    if (node.depth === 1) {
      if ('value' in node.children[0]) {
        heading = node.children[0].value
      }
      return EXIT
    }
  })

  const codeBlock: Code = {
    type: 'code',
    lang: 'markdown',
    value: markdown,
  }
  const root: Root = {
    type: 'root',
    children: [codeBlock],
  }
  const content = toMarkdown(root)

  return { heading, content }
}

async function getAiPromptsImpl() {
  const directoryContents = await readdir(PROMPTS_DIRECTORY)

  const prompts = directoryContents
    .filter(async (file) => {
      if (extname(file) !== '.md') {
        return false
      }

      const fileStats = await stat(join(PROMPTS_DIRECTORY, file))
      const isFile = fileStats.isFile()
      return isFile
    })
    .map(async (filename) => {
      const rawContent = await readFile(join(PROMPTS_DIRECTORY, filename), 'utf-8')
      const { heading, content } = parseMarkdown(rawContent)

      return {
        filename: basename(filename, '.md'),
        heading,
        content,
      }
    })

  return (await Promise.all(prompts)).sort((a, b) => b.filename.localeCompare(a.filename))
}
export const getAiPrompts = cache(getAiPromptsImpl)

async function getAiPromptImpl(prompt: string) {
  const filePath = join(PROMPTS_DIRECTORY, `${prompt}.md`)
  try {
    const rawContent = await readFile(filePath, 'utf-8')
    const { heading, content } = parseMarkdown(rawContent)
    return { heading, content }
  } catch (err) {
    console.error('Failed to fetch prompt from repo: %o', err)
  }
}
export const getAiPrompt = cache(getAiPromptImpl)

export async function generateAiPromptMetadata(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params
  const prompt = await getAiPrompt(slug)

  if (!prompt) {
    return {
      title: 'AI Prompt | Skybase Docs',
    }
  }

  return {
    title: `AI Prompt: ${prompt.heading} | Skybase Docs`,
  }
}

export async function generateAiPromptsStaticParams() {
  const prompts = await getAiPrompts()

  return prompts.map((prompt) => {
    return {
      slug: prompt.filename,
    }
  })
}
