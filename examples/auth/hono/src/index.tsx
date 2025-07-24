import { Hono } from 'hono';
import { getSkybase, skybaseMiddleware } from './middleware/auth.middleware';

const app = new Hono();
app.use('*', skybaseMiddleware());

const routes = app.get('/api/user', async (c) => {
  const skybase = getSkybase(c);
  const { data, error } = await skybase.auth.getUser();

  if (error) console.log('error', error);

  if (!data?.user) {
    return c.json({
      message: 'You are not logged in.',
    });
  }

  return c.json({
    message: 'You are logged in!',
    userId: data.user,
  });
});

app.get('/signout', async (c) => {
  const skybase = getSkybase(c);
  await skybase.auth.signOut();
  console.log('Signed out server-side!');
  return c.redirect('/');
});

app.get('/countries', async (c) => {
  const skybase = getSkybase(c);
  const { data, error } = await skybase.from('countries').select('*');
  if (error) console.log(error);
  return c.json(data);
});

export type AppType = typeof routes;

app.get('/', (c) => {
  return c.html(
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <link
          rel="stylesheet"
          href="https://cdn.simplecss.org/simple.min.css"
        />
        {import.meta.env.PROD ? (
          <script type="module" src="/static/client.js" />
        ) : (
          <script type="module" src="/src/client.tsx" />
        )}
      </head>
      <body>
        <div id="root" />
      </body>
    </html>
  );
});

export default app;
