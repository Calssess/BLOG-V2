import next from 'next';
import { createProxyMiddleware } from 'http-proxy-middleware';
import express from 'express';
const port = 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const HOST = 'affiliate.batonex.net';

app.prepare().then(() => {
  const server = express();
  server.use(
    '/s_api',
    createProxyMiddleware({
      target: `https://${HOST}`,
      changeOrigin: true,
      https: true,
      headers: {
        Referer: `https://${HOST}`,
      },
      cookieDomainRewrite: 'localhost',
    }),
  );
  server.use(
    '/api',
    createProxyMiddleware({
      target: `https://${HOST}`,
      changeOrigin: true,
      https: true,
      headers: {
        Referer: `https://${HOST}`,
      },
      cookieDomainRewrite: 'localhost',
    }),
  );

  server.all('*', (req, res) => handle(req, res));

  server.listen(port, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
