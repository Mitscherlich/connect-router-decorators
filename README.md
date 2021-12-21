# connect-router-decorators

A bundle of decorators of [express.Router](https://expressjs.com/en/4x/api.html#router). TS/babel supported.

## Quick start

```ts
import express from 'express';
import path from 'path';
import { Router } from 'connect-router-decorators';

const app = express();
const router = new Router(path.resolve('./controllers'), {
  searchPattern: '**/*.{js,ts}', // default
});

const bootstrap = async () => {
  router.beforeAll((req, res, next) => {
    if (!req.startTime) {
      req.startTime = Date.now();
    }

    next();
  });

  router.afterAll((req, res, next) => {
    if (req.startTime) {
      const last = Date.now() - req.startTime;

      console.log(`Request ${req.method.toUpperCase()} - ${req.path} take ${last}ms.`);
    }

    next();
  });

  app.use(router.routes());

  app.listen(3000, () => {
    console.log(`app running on http://localhost:3000`);
  });
};

bootstrap();
```

## TODO(s)

- [ ] Multi-roots router support.

## License

See [LICENSE](LICENSE)
