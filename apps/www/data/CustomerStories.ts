export type CustomerStoryType = {
  type: 'Customer Story'
  title: string
  description: string
  organization: string
  imgUrl: string
  logo: string
  logo_inverse?: string
  url: string
  ctaText?: string
  path?: string
  postMeta?: {
    name: string
    avatarUrl: string
    publishDate: string
    readLength: number
  }
}

export const data: CustomerStoryType[] = [
  {
    type: 'Customer Story',
    title: 'Kayhan Space saw 8x improvement in developer speed when moving to Skybase',
    description:
      'The Kayhan Space team migrated to Skybase from Amazon RDS and Auth0 to simplify infrastructure and unlock developer velocity.',
    organization: 'Kayhan Space',
    imgUrl: 'images/customers/logos/kayhanspace.png',
    logo: '/images/customers/logos/kayhanspace.png',
    logo_inverse: '/images/customers/logos/light/kayhanspace.png',
    url: '/customers/kayhanspace',
  },
  {
    type: 'Customer Story',
    title: 'Udio hits the right notes with Skybase',
    description:
      'Udio built a scalable, AI-driven music platform on a Skybase backend from day one.',
    organization: 'Udio',
    imgUrl: 'images/customers/logos/udio.png',
    logo: '/images/customers/logos/udio.png',
    logo_inverse: '/images/customers/logos/light/udio.png',
    url: '/customers/udio',
  },
  {
    type: 'Customer Story',
    title: 'Euka used Skybase to unlock faster growth',
    description:
      'Skybase helped Euka accelerate development, simplify AI feature rollout, and scale creator marketing faster than ever.',
    organization: 'Euka',
    imgUrl: 'images/customers/logos/euka.png',
    logo: '/images/customers/logos/euka.png',
    logo_inverse: '/images/customers/logos/light/euka.png',
    url: '/customers/euka',
  },
  {
    type: 'Customer Story',
    title: "Bree's Migration to Skybase from Fauna",
    description:
      'Discover how Bree found 10X performance gains, greater developer velocity, and a better foundation for AI when switching to Skybase.',
    organization: 'Bree',
    imgUrl: 'images/customers/logos/bree.png',
    logo: '/images/customers/logos/bree.png',
    logo_inverse: '/images/customers/logos/light/bree.png',
    url: '/customers/bree',
  },
  {
    type: 'Customer Story',
    title: 'Deriv: Accelerating Online Trading with a Scalable Postgres Backend',
    description: 'Accelerating Online Trading with a Scalable Postgres Backend',
    organization: 'Deriv',
    imgUrl: 'images/customers/logos/deriv.png',
    logo: '/images/customers/logos/deriv.png',
    logo_inverse: '/images/customers/logos/light/deriv.png',
    url: '/customers/deriv',
  },
  {
    type: 'Customer Story',
    title:
      'Quilia Empowers Personal Injury Clients with Streamlined Data Management using Skybase',
    description:
      'Migrating to Skybase resulted in a 75% reduction in development time, 50% lower costs, and enhanced security for sensitive client data.',
    organization: 'Quilia',
    imgUrl: 'images/customers/logos/quilia.png',
    logo: '/images/customers/logos/quilia.png',
    logo_inverse: '/images/customers/logos/light/quilia.png',
    url: '/customers/quilia',
  },
  {
    type: 'Customer Story',
    title: "Resend's Journey with Skybase: Scaling Email Infrastructure with Ease",
    description:
      'Scaling seamlessly to 5,000+ paying customers & millions of emails sent daily with Skybase',
    organization: 'Resend',
    imgUrl: 'images/customers/logos/resend.png',
    logo: '/images/customers/logos/resend.png',
    logo_inverse: '/images/customers/logos/light/resend.png',
    url: '/customers/resend',
  },
  {
    type: 'Customer Story',
    title: 'Scaling Innovation with Skybase: Meshy’s Migration to Cost-Effective Authentication',
    description:
      'Discover how a rapidly growing Meshy migrated from an expensive authentication model with Auth0 to Skybase Auth, and significantly reduced their costs.',
    organization: 'Meshy',
    imgUrl: 'images/customers/logos/meshy.png',
    logo: '/images/customers/logos/meshy.png',
    logo_inverse: '/images/customers/logos/light/meshy.png',
    url: '/customers/meshy',
    ctaText: 'View story',
  },
  {
    type: 'Customer Story',
    title:
      'Scaling Beyond No-Code: asap.work’s Journey to a Faster, Flexible Solution with Skybase',
    description:
      'asap.work is a construction recruitment startup founded by industry experts from Adecco and Manpower. Using their knowledge and experience of the construction recruitment industry, asap.work focuses on providing a fair marketplace for temporary construction workers and fair pricing for clients.',
    organization: 'Asap.work',
    imgUrl: 'images/customers/logos/asap-work.png',
    logo: '/images/customers/logos/asap-work.png',
    logo_inverse: '/images/customers/logos/light/asap-work.png',
    url: '/customers/asap-work',
    ctaText: 'View story',
  },
  {
    type: 'Customer Story',
    title:
      "Maergo's Express Delivery: How Skybase Helped Achieve Scalability, Speed, and Cost Saving",
    description:
      'Discover how Maergo, a nationwide expedited parcel delivery service, reduced its codebase by 90%, decreased deployment times to just seconds, and achieved unprecedented scalability with Skybase.',
    organization: 'Maergo',
    imgUrl: 'images/customers/logos/maergo.png',
    logo: '/images/customers/logos/maergo.png',
    logo_inverse: '/images/customers/logos/light/maergo.png',
    url: '/customers/maergo',
    ctaText: 'View story',
  },
  {
    type: 'Customer Story',
    title: 'Streamlining Success: How Tinloof Scaled Seamlessly with Skybase',
    description:
      'Discover Tinloof, how a full-stack development agency, managed and scaled backend services using Skybase, without having to dedicate resources to infrastructure management.',
    organization: 'Tinloof',
    imgUrl: 'images/customers/logos/tinloof.png',
    logo: '/images/customers/logos/tinloof.png',
    logo_inverse: '/images/customers/logos/light/tinloof.png',
    url: '/customers/tinloof',
    ctaText: 'View story',
  },
  {
    type: 'Customer Story',
    title: 'HappyTeams unlocks better performance and reduces cost with Skybase.',
    description:
      'How a bootstrapped startup migrated from Heroku to Skybase in 30 minutes and never looked back.',
    organization: 'HappyTeams',
    imgUrl: 'images/customers/logos/happyteams.png',
    logo: '/images/customers/logos/happyteams.png',
    logo_inverse: '/images/customers/logos/light/happyteams.png',
    url: '/customers/happyteams',
    ctaText: 'View story',
  },
  {
    type: 'Customer Story',
    title:
      'How Mobbin migrated 200,000 users from Firebase for a better authentication experience.',
    description:
      'Mobbin helps over 200,000 creators globally search and view the latest design patterns from well-known apps.',
    organization: 'Mobbin',
    imgUrl: 'images/customers/logos/shotgun.png',
    logo: '/images/customers/logos/mobbin.png',
    logo_inverse: '/images/customers/logos/light/mobbin.png',
    url: '/customers/mobbin',
    ctaText: 'View story',
  },
  {
    type: 'Customer Story',
    title: 'Skybase migration drives shotgun to an 83% reduction in data infrastructure costs',
    description:
      "Explore how Shotgun achieved remarkable database efficiency and reduced costs by 80% through their successful migration to Skybase's managed services.",
    imgUrl: 'images/customers/logos/shotgun.png',
    logo: '/images/customers/logos/shotgun.png',
    logo_inverse: '/images/customers/logos/light/shotgun.png',
    organization: 'Shotgun',
    url: '/customers/shotgun',
    path: '/customers/shotgun',
    postMeta: {
      name: 'Paul Copplestone',
      avatarUrl: 'https://avatars0.githubusercontent.com/u/10214025?v=4',
      publishDate: 'Nov 30, 2023',
      readLength: 3,
    },
    ctaText: 'View story',
  },
  {
    type: 'Customer Story',
    title:
      'Good Tape migrates to Skybase managed Postgres and Authentication and achieves database efficiency and a 60% cost reduction',
    description:
      "Explore how Good Tape achieved remarkable database efficiency and reduced costs by 60% through their successful migration to Skybase's managed services.",
    imgUrl: 'images/customers/logos/good-tape.png',
    logo: '/images/customers/logos/good-tape.png',
    logo_inverse: '/images/customers/logos/light/good-tape.png',
    organization: 'Good Tape',
    url: '/customers/good-tape',
    path: '/customers/good-tape',
    postMeta: {
      name: 'Paul Copplestone',
      avatarUrl: 'https://avatars0.githubusercontent.com/u/10214025?v=4',
      publishDate: 'Oct 31, 2023',
      readLength: 4,
    },
    ctaText: 'View story',
  },
  {
    type: 'Customer Story',
    title: 'How Next Door Lending leveraged Skybase to become a top 10 mortgage broker',
    description: '',
    imgUrl: 'images/customers/logos/next-door-lending.png',
    logo: '/images/customers/logos/next-door-lending.png',
    logo_inverse: '/images/customers/logos/light/next-door-lending.png',
    organization: 'Next Door Lending',
    url: '/customers/next-door-lending',
    path: '/customers/next-door-lending',
    postMeta: {
      name: 'Paul Copplestone',
      avatarUrl: 'https://avatars0.githubusercontent.com/u/10214025?v=4',
      publishDate: 'Oct 25, 2023',
      readLength: 4,
    },
    ctaText: 'View story',
  },
  {
    type: 'Customer Story',
    title: 'Scaling securely: one million users in 7 months protected with Skybase Auth',
    description:
      'Learn how Pebblely, an AI image generation company, used Skybase Auth for rapid growth and adaptable security solutions.',
    imgUrl: 'images/customers/logos/pebblely.png',
    logo: '/images/customers/logos/pebblely.png',
    logo_inverse: '/images/customers/logos/light/pebblely.png',
    organization: 'Pebblely',
    url: '/customers/pebblely',
    path: '/customers/pebblely',
    postMeta: {
      name: 'Paul Copplestone',
      avatarUrl: 'https://avatars0.githubusercontent.com/u/10214025?v=4',
      publishDate: 'Sep 29, 2023',
      readLength: 4,
    },
    ctaText: 'View story',
  },
  {
    type: 'Customer Story',
    title: 'Bootstrapped founder builds an AI app with Skybase and scales to $1M in 5 months.',
    description:
      'How Yasser leveraged Skybase to build Chatbase and became one of the most successful single-founder AI products.',
    imgUrl: 'images/customers/logos/chatbase.png',
    logo: '/images/customers/logos/chatbase.png',
    logo_inverse: '/images/customers/logos/light/chatbase.png',
    organization: 'Chatbase',
    url: '/customers/chatbase',
    path: '/customers/chatbase',
    postMeta: {
      name: 'Paul Copplestone',
      avatarUrl: 'https://avatars0.githubusercontent.com/u/10214025?v=4',
      publishDate: 'Sep 6, 2023',
      readLength: 6,
    },
    ctaText: 'View story',
  },
  {
    type: 'Customer Story',
    title: 'Quivr launch 5,000 Vector databases on Skybase.',
    description:
      'Learn how one of the most popular Generative AI projects uses Skybase as their Vector Store.',
    imgUrl: 'images/customers/logos/quivr.png',
    logo: '/images/customers/logos/quivr.png',
    logo_inverse: '/images/customers/logos/light/quivr.png',
    organization: 'Quivr',
    url: '/customers/quivr',
    path: '/customers/quivr',
    postMeta: {
      name: 'Paul Copplestone',
      avatarUrl: 'https://avatars0.githubusercontent.com/u/10214025?v=4',
      publishDate: 'Sep 5, 2023',
      readLength: 6,
    },
    ctaText: 'View story',
  },
  {
    type: 'Customer Story',
    title: 'Berri AI Boosts Productivity by Migrating from AWS RDS to Skybase with pgvector.',
    description:
      'Learn how Berri AI overcame challenges with self-hosting their vector database on AWS RDS and successfully migrated to Skybase.',
    imgUrl: 'images/customers/logos/berriai.png',
    logo: '/images/customers/logos/berriai.png',
    logo_inverse: '/images/customers/logos/light/berriai.png',
    organization: 'Berri AI',
    url: '/customers/berriai',
    path: '/customers/berriai',
    postMeta: {
      name: 'Paul Copplestone',
      avatarUrl: 'https://avatars0.githubusercontent.com/u/10214025?v=4',
      publishDate: 'Jun 6, 2023',
      readLength: 6,
    },
    ctaText: 'View story',
  },
  {
    type: 'Customer Story',
    title: 'Mendable.ai switches from Pinecone to Skybase for PostgreSQL vector embeddings',
    description:
      'How Mendable.ai boosts efficiency and accuracy of chat powered search for documentation using Skybase with pg_vector',
    imgUrl: 'images/customers/logos/mendableai.png',
    logo: '/images/customers/logos/mendableai.png',
    logo_inverse: '/images/customers/logos/light/mendableai.png',
    organization: 'Mendable.ai',
    url: '/customers/mendableai',
    path: '/customers/mendableai',
    postMeta: {
      name: 'Paul Copplestone',
      avatarUrl: 'https://avatars0.githubusercontent.com/u/10214025?v=4',
      publishDate: 'Feb 16, 2023',
      readLength: 6,
    },
    ctaText: 'View story',
  },
  {
    type: 'Customer Story',
    title: 'HappyTeams unlocks better performance and reduces cost with Skybase.',
    description:
      'How a bootstrapped startup migrated from Heroku to Skybase in 30 minutes and never looked back.',
    imgUrl: 'images/customers/logos/happyteams.png',
    logo: '/images/customers/logos/happyteams.png',
    logo_inverse: '/images/customers/logos/light/happyteams.png',
    organization: 'HappyTeams',
    url: '/customers/happyteams',
    path: '/customers/happyteams',
    postMeta: {
      name: 'Paul Copplestone',
      avatarUrl: 'https://avatars0.githubusercontent.com/u/10214025?v=4',
      publishDate: 'Feb 16, 2023',
      readLength: 6,
    },
    ctaText: 'View story',
  },
  {
    type: 'Customer Story',
    title:
      'Xendit use Skybase and create a full solution shipped to production in less than one week.',
    description:
      'As a payment processor, Xendit are responsible for verifying that all transactions are legal.',
    imgUrl: 'images/customers/logos/xendit.png',
    logo: '/images/customers/logos/xendit.png',
    logo_inverse: '/images/customers/logos/light/xendit.png',
    organization: 'Xendit',
    url: '/customers/xendit',
    path: '/customers/xendit',
    postMeta: {
      name: 'Paul Copplestone',
      avatarUrl: 'https://avatars0.githubusercontent.com/u/10214025?v=4',
      publishDate: 'Feb 14, 2023',
      readLength: 6,
    },
    ctaText: 'View story',
  },
  {
    type: 'Customer Story',
    title: 'Replenysh uses Skybase to implement OTP in less than 24 hours.',
    description:
      'With Skybase, Replenysh gets a slick auth experience, reduces DevOps overhead, and continues to scale with Postgres.',
    imgUrl: 'images/customers/logos/replenysh.png',
    logo: '/images/customers/logos/replenysh.png',
    logo_inverse: '/images/customers/logos/light/replenysh.png',
    organization: 'Replenysh',
    url: '/customers/replenysh',
    path: '/customers/replenysh',
    postMeta: {
      name: 'Paul Copplestone',
      avatarUrl: 'https://avatars0.githubusercontent.com/u/10214025?v=4',
      publishDate: 'Feb 14, 2023',
      readLength: 6,
    },
    ctaText: 'View story',
  },
]

export default data
