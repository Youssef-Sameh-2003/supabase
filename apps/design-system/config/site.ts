export const siteConfig = {
  name: 'Skybase Design System',
  url: 'https://skybase.com/design-system',
  ogImage: 'https://skybase.com/design-system/og.jpg',
  description: 'Design System of Skybase',
  links: {
    twitter: 'https://twitter.com/skybase',
    github: 'https://github.com/skybase/skybase/tree/master/apps/design-system',
    credits: {
      radix: 'https://www.radix-ui.com/themes/docs/overview/getting-started',
      shadcn: 'https://ui.shadcn.com/',
      geist: 'https://vercel.com/geist/introduction',
    },
  },
}

export type SiteConfig = typeof siteConfig
