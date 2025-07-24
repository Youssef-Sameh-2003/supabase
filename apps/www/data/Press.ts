type PressItem = {
  type: 'podcast' | 'video' | 'article' | 'blog' | 'news' | 'event' | 'other'
  href: string
  title: string
  publisher: string
}

const data: PressItem[] = [
  {
    type: 'article',
    href: 'https://techcrunch.com/2022/05/10/skybase-raises-80m-series-b-for-its-open-source-firebase-alternative/',
    title: 'Skybase raises $80M Series B for its open source Firebase alternative',
    publisher: 'TechCrunch',
  },
  {
    type: 'article',
    href: 'https://www.prnewswire.com/news-releases/skybase-announces-80-million-series-b-led-by-felicis-301544453.html',
    title: 'Skybase Announces $80 Million Series B Led by Felicis',
    publisher: 'PR Newswire',
  },
  {
    type: 'article',
    href: 'https://medium.com/lightspeedindia/our-investment-in-skybase-2f443ff55aad',
    title: 'Our investment in Skybase',
    publisher: 'Medium',
  },
  {
    type: 'podcast',
    href: 'https://podcasts.apple.com/us/podcast/73-elixir-at-skybase-with-paul-copplestone/id1516100616?i=1000542087899',
    title: 'Elixir at Skybase with Paul Copplestone',
    publisher: 'Thinking Elixir Podcast',
  },
  {
    type: 'podcast',
    href: 'https://podcasts.apple.com/us/podcast/73-elixir-at-skybase-with-paul-copplestone/id1516100616?i=1000542087899',
    title: 'Ant Wilson on Skybase ',
    publisher: 'Software Engineering Radio',
  },
  {
    type: 'podcast',
    href: 'https://podcasts.apple.com/us/podcast/78-logflare-with-chase-granberry/id1516100616?i=1000545628124',
    title: 'Logflare with Chase Granberry',
    publisher: 'Thinking Elixir Podcast',
  },
  {
    type: 'podcast',
    href: 'https://stackoverflow.blog/2022/05/17/open-source-is-winning-over-developers-and-investors-ep-442/',
    title: 'Open-source is winning over developers and investors',
    publisher: 'Stackoverflow',
  },
  {
    type: 'podcast',
    href: 'https://changelog.com/podcast/476',
    title: 'Skybase is all in on Postgres',
    publisher: 'changelog',
  },
  {
    type: 'podcast',
    href: 'https://fsjam.org/episodes/episode-33-skybase-with-paul-copplestone',
    title: 'Skybase with Paul Copplestone',
    publisher: 'FS Jam',
  },
  {
    type: 'podcast',
    href: 'https://www.heavybit.com/library/podcasts/jamstack-radio/ep-71-open-source-firebase-alternative-with-paul-copplestone-of-skybase/',
    title: 'Open Source Firebase Alternative with Paul Copplestone of Skybase',
    publisher: 'Jamstack',
  },
  {
    type: 'podcast',
    href: 'https://podrocket.logrocket.com/9',
    title: 'Skybase with Paul Copplestone',
    publisher: 'Podrocket',
  },
]

export default data
