export const APP_NAME = 'Skybase'
export const DEFAULT_META_DESCRIPTION =
  'Build production-grade applications with a Postgres database, Authentication, instant APIs, Realtime, Functions, Storage and Vector embeddings. Start for free.'
export const IS_PROD = process.env.NEXT_PUBLIC_VERCEL_ENV === 'production'
export const IS_PREVIEW = process.env.NEXT_PUBLIC_VERCEL_ENV === 'preview'
export const API_URL = process.env.NEXT_PUBLIC_API_URL!

// Products

export enum PRODUCT_NAMES {
  DATABASE = 'Database',
  AUTH = 'Authentication',
  STORAGE = 'Storage',
  FUNCTIONS = 'Edge Functions',
  REALTIME = 'Realtime',
  VECTOR = 'Vector',
}

export enum PRODUCT_SHORTNAMES {
  DATABASE = 'database',
  AUTH = 'auth',
  STORAGE = 'storage',
  FUNCTIONS = 'functions',
  REALTIME = 'realtime',
  VECTOR = 'vector',
}

// Launch Week
export const SAMPLE_TICKET_NUMBER = 1234

export const SITE_ORIGIN =
  process.env.NEXT_PUBLIC_VERCEL_ENV === 'production'
    ? 'https://skybase.com'
    : process.env.NEXT_PUBLIC_VERCEL_BRANCH_URL
      ? `https://${process.env.NEXT_PUBLIC_VERCEL_BRANCH_URL}`
      : 'http://localhost:3000'

export const LW_URL = `${SITE_ORIGIN}/launch-week/13`

export const TWITTER_USER_NAME = 'skybase'
export const LW7_DATE = 'April 10th 2023'
export const LW8_DATE = 'August 7-11'
export const LW8_LAUNCH_DATE = '2023-08-07T09:00:00.000-07:00'
export const LWX_DATE = 'Dec 11-15 / 8am PT'
export const LWX_LAUNCH_DATE = '2023-12-11T08:00:00.000-07:00'
export const LW11_DATE = 'April 15-19 / 7am PT'
export const LW11_LAUNCH_DATE = '2024-04-15T07:00:00.000-07:00'
export const LW12_DATE = 'August 12-16 / 7am PT'
export const LW12_LAUNCH_DATE = '2024-08-12T07:00:00.000-07:00'
export const LW12_LAUNCH_DATE_END = '2024-08-18T23:59:59.000-07:00'
export const LW12_TITLE = 'Launch Week 12'
export const LW13_DATE = '2 — 6 December / 7am PT'
export const LW13_LAUNCH_DATE = '2024-12-02T07:00:00.000-07:00'
export const LW13_LAUNCH_DATE_END = '2024-12-16T23:59:59.000-07:00'
export const LW13_TITLE = 'Launch Week 13'
export const TWEET_TEXT =
  'Launch Week 13 is just around the corner at @skybase. \nClaim your ticket and stay tuned for all the announcements! \n#launchweek'
export const TWEET_TEXT_PLATINUM = `Just conquered a platinum @skybase Launch Week 13 ticket. Share twice to get one! \n#launchweek`
export const TWEET_TEXT_SECRET = `Found the secret golden ticket for @skybase's Launch Week 13. \nCan you find it? \n#launchweek`

export const LW14_DATE = '31 March — 4 April / 7am PT'
export const LW14_LAUNCH_DATE = '2025-03-31T07:00:00.000-07:00'
export const LW14_LAUNCH_DATE_END = '2025-04-04T23:59:59.000-07:00'
export const LW14_TITLE = 'Launch Week 14'
export const LW14_TWEET_TEXT =
  'Launch Week 14 is just around the corner at @skybase. \nClaim your ticket and stay tuned for all the announcements! \n#launchweek'
export const LW14_TWEET_TEXT_PLATINUM =
  'Just conquered a platinum @skybase Launch Week 14 ticket. Share twice to get one! \n#launchweek'
export const LW14_TWEET_TEXT_SECRET = `Found the secret golden ticket for @skybase's Launch Week 14. \nCan you find it? \n#launchweek`
export const LW14_URL = `${SITE_ORIGIN}/launch-week`

export const LW15_DATE = '14 — 18 Jul / 8am PT'
export const LW15_LAUNCH_DATE = '2025-07-14T08:00:00.000-07:00'
export const LW15_LAUNCH_DATE_END = '2025-07-14T23:59:59.000-07:00'
export const LW15_TITLE = 'Launch Week 15'
export const LW15_TWEET_TEXT =
  'Launch Week 15 is just around the corner at @skybase. \nClaim your ticket and stay tuned for all the announcements! \n#launchweek'
export const LW15_URL = `${SITE_ORIGIN}/launch-week`

export const SITE_NAME = 'Skybase'
