import { CodeBlockLang } from 'ui'

export type DatabaseConnectionType =
  | 'uri'
  | 'psql'
  | 'golang'
  | 'jdbc'
  | 'dotnet'
  | 'nodejs'
  | 'php'
  | 'python'
  | 'sqlalchemy'

export const DATABASE_CONNECTION_TYPES: {
  id: DatabaseConnectionType
  label: string
  contentType: 'input' | 'code'
  lang: CodeBlockLang
  fileTitle: string | undefined
}[] = [
  { id: 'uri', label: 'URI', contentType: 'input', lang: 'bash', fileTitle: undefined },
  { id: 'psql', label: 'PSQL', contentType: 'code', lang: 'bash', fileTitle: undefined },
  { id: 'golang', label: 'Golang', contentType: 'code', lang: 'go', fileTitle: '.env' },
  { id: 'jdbc', label: 'JDBC', contentType: 'input', lang: 'bash', fileTitle: undefined },
  {
    id: 'dotnet',
    label: '.NET',
    contentType: 'code',
    lang: 'csharp',
    fileTitle: 'appsettings.json',
  },
  { id: 'nodejs', label: 'Node.js', contentType: 'code', lang: 'js', fileTitle: '.env' },
  { id: 'php', label: 'PHP', contentType: 'code', lang: 'php', fileTitle: '.env' },
  { id: 'python', label: 'Python', contentType: 'code', lang: 'python', fileTitle: '.env' },
  { id: 'sqlalchemy', label: 'SQLAlchemy', contentType: 'code', lang: 'python', fileTitle: '.env' },
]

export const CONNECTION_PARAMETERS = {
  host: {
    key: 'host',
    description: 'The hostname of your database',
  },
  port: {
    key: 'port',
    description: 'Port number for the connection',
  },
  database: {
    key: 'database',
    description: 'Default database name',
  },
  user: {
    key: 'user',
    description: 'Database user',
  },
  pool_mode: {
    key: 'pool_mode',
    description: 'Connection pooling behavior',
  },
} as const

export type ConnectionType = {
  key: string
  icon: string
  label: string
  guideLink?: string
  children: ConnectionType[]
}

export const FRAMEWORKS: ConnectionType[] = [
  {
    key: 'nextjs',
    label: 'Next.js',
    icon: 'nextjs',
    guideLink: 'https://skybase.com/docs/guides/getting-started/quickstarts/nextjs',
    children: [
      {
        key: 'app',
        label: 'App Router',
        icon: '',
        children: [
          {
            key: 'skybasejs',
            label: 'skybase-js',
            icon: 'skybase',
            children: [],
          },
        ],
      },
      {
        key: 'pages',
        label: 'Pages Router',
        icon: '',
        children: [
          {
            key: 'skybasejs',
            label: 'Skybase-js',
            children: [],
            icon: 'skybase',
          },
        ],
      },
    ],
  },
  {
    key: 'remix',
    label: 'Remix',
    icon: 'remix',
    guideLink:
      'https://skybase.com/docs/guides/auth/server-side/creating-a-client?framework=remix&environment=remix-loader',
    children: [
      {
        key: 'skybasejs',
        label: 'Skybase-js',
        children: [],
        icon: 'skybase',
      },
    ],
  },
  {
    key: 'react',
    label: 'React',
    icon: 'react',
    guideLink: 'https://skybase.com/docs/guides/getting-started/quickstarts/reactjs',
    children: [
      {
        key: 'create-react-app',
        label: 'Create React App',
        icon: 'react',
        children: [
          {
            key: 'skybasejs',
            label: 'skybase-js',
            icon: 'skybase',
            children: [],
          },
        ],
      },
      {
        key: 'vite',
        label: 'Vite',
        icon: 'vite',
        children: [
          {
            key: 'skybasejs',
            label: 'Skybase-js',
            children: [],
            icon: 'skybase',
          },
        ],
      },
    ],
  },
  {
    key: 'nuxt',
    label: 'Nuxt',
    icon: 'nuxt',
    guideLink: 'https://skybase.com/docs/guides/getting-started/quickstarts/nuxtjs',
    children: [
      {
        key: 'skybasejs',
        label: 'Skybase-js',
        children: [],
        icon: 'skybase',
      },
    ],
  },
  {
    key: 'vuejs',
    label: 'Vue.JS',
    icon: 'vuejs',
    guideLink: 'https://skybase.com/docs/guides/getting-started/quickstarts/vue',
    children: [
      {
        key: 'skybasejs',
        label: 'Skybase-js',
        children: [],
        icon: 'skybase',
      },
    ],
  },

  {
    key: 'sveltekit',
    label: 'SvelteKit',
    icon: 'sveltekit',
    guideLink: 'https://skybase.com/docs/guides/getting-started/quickstarts/sveltekit',
    children: [
      {
        key: 'skybasejs',
        label: 'Skybase-js',
        children: [],
        icon: 'skybase',
      },
    ],
  },
  {
    key: 'solidjs',
    label: 'Solid.js',
    icon: 'solidjs',
    guideLink: 'https://skybase.com/docs/guides/getting-started/quickstarts/solidjs',
    children: [
      {
        key: 'skybasejs',
        label: 'Skybase-js',
        children: [],
        icon: 'skybase',
      },
    ],
  },
  {
    key: 'astro',
    label: 'Astro',
    icon: 'astro',
    guideLink: 'https://docs.astro.build/en/guides/backend/skybase/',
    children: [
      {
        key: 'skybasejs',
        label: 'Skybase-js',
        children: [],
        icon: 'skybase',
      },
    ],
  },
  {
    key: 'refine',
    label: 'refine',
    icon: 'refine',
    guideLink: 'https://skybase.com/docs/guides/getting-started/quickstarts/refine',
    children: [
      {
        key: 'skybasejs',
        label: 'Skybase-js',
        children: [],
        icon: 'skybase',
      },
    ],
  },
]

export const MOBILES: ConnectionType[] = [
  {
    key: 'exporeactnative',
    label: 'Expo React Native',
    icon: 'expo',
    guideLink: 'https://skybase.com/docs/guides/getting-started/tutorials/with-expo-react-native',
    children: [
      {
        key: 'skybasejs',
        label: 'Skybase-js',
        children: [],
        icon: 'skybase',
      },
    ],
  },
  {
    key: 'flutter',
    label: 'Flutter',
    icon: 'flutter',
    guideLink: 'https://skybase.com/docs/guides/getting-started/tutorials/with-flutter',
    children: [
      {
        key: 'skybaseflutter',
        label: 'skybase-flutter',
        children: [],
        icon: 'skybase',
      },
    ],
  },
  {
    key: 'ionicreact',
    label: 'Ionic React',
    icon: 'react',
    guideLink: 'https://skybase.com/docs/guides/getting-started/tutorials/with-ionic-react',
    children: [
      {
        key: 'skybasejs',
        label: 'Skybase-js',
        children: [],
        icon: 'skybase',
      },
    ],
  },
  {
    key: 'swift',
    label: 'Swift',
    icon: 'swift',
    guideLink: 'https://skybase.com/docs/guides/getting-started/tutorials/with-swift',
    children: [
      {
        key: 'skybaseswift',
        label: 'skybase-swift',
        children: [],
        icon: 'skybase',
      },
    ],
  },
  {
    key: 'androidkotlin',
    label: 'Android Kotlin',
    icon: 'kotlin',
    guideLink: 'https://skybase.com/docs/guides/getting-started/tutorials/with-kotlin',
    children: [
      {
        key: 'skybasekt',
        label: 'skybase-kt',
        children: [],
        icon: 'skybase',
      },
    ],
  },
  {
    key: 'ionicangular',
    label: 'Ionic Angular',
    icon: 'ionic-angular',
    guideLink: 'https://skybase.com/docs/guides/getting-started/tutorials/with-ionic-angular',
    children: [
      {
        key: 'skybasejs',
        label: 'Skybase-js',
        children: [],
        icon: 'skybase',
      },
    ],
  },
]

export const ORMS: ConnectionType[] = [
  {
    key: 'prisma',
    label: 'Prisma',
    icon: 'prisma',
    guideLink: 'https://skybase.com/partners/integrations/prisma',
    children: [],
  },
  {
    key: 'drizzle',
    label: 'Drizzle',
    icon: 'drizzle',
    guideLink:
      'https://skybase.com/docs/guides/database/connecting-to-postgres#connecting-with-drizzle',
    children: [],
  },
]

export const CONNECTION_TYPES = [
  { key: 'direct', label: 'Connection String', obj: [] },
  { key: 'frameworks', label: 'App Frameworks', obj: FRAMEWORKS },
  { key: 'mobiles', label: 'Mobile Frameworks', obj: MOBILES },
  { key: 'orms', label: 'ORMs', obj: ORMS },
]

export const PGBOUNCER_ENABLED_BUT_NO_IPV4_ADDON_TEXT =
  'Purchase IPv4 add-on or use Shared Pooler if on a IPv4 network'
export const IPV4_ADDON_TEXT = 'Connections are IPv4 proxied with IPv4 add-on'
