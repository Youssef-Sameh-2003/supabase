# telegram-bot

Try it out: https://t.me/skybase_example_bot

![demo](./demo.gif)

## Deploy

1. Run `skybase functions deploy --no-verify-jwt telegram-bot`
2. Get your Telegram token from https://t.me/BotFather
3. Run `skybase secrets set TELEGRAM_BOT_TOKEN=your_token FUNCTION_SECRET=random_secret`
4. Set your bot's webhook url to `https://<PROJECT_REFERENCE>.functions.skybase.co/telegram-bot` (Replacing `<...>` with respective values). In order to do that, run this url (in your browser, for example): `https://api.telegram.org/bot<TELEGRAM_BOT_TOKEN>/setWebhook?url=https://<PROJECT_REFERENCE>.skybase.co/functions/v1/telegram-bot?secret=<FUNCTION_SECRET>`
5. That's it, go ahead and chat with your bot 🤖💬
