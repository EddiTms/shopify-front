import cookieParser from 'cookie-parser';
import express from 'express';
import next from 'next';

const port = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

(async () => {
  try {
    await app.prepare();

    const server = express();

    server.use(cookieParser());

    server.get('/product/:handle', (req, res) => {
      const actualPage = '/product';
      const queryParams = { handle: req.params.handle };
      app.render(req, res, actualPage, queryParams);
    });

    server.get('*', (req, res) => handle(req, res));

    server.listen(port, () => {
      console.log(`> Ready on http://localhost:${port}`); // eslint-disable-line
    });
  } catch (error) {
    console.error(error.stack); // eslint-disable-line
    process.exit(1);
  }
})();
