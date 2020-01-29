import express from 'express';
import Youch from 'youch';
import cors from 'cors';
import http from 'http';
import { setUpWebSocket } from './websocket';

import routes from './routes';

import './database';

class App {
  constructor() {
    this.server = express();

    const app = http.Server(this.server);
    setUpWebSocket(app);

    this.middlewares();
    this.routes();
    this.exceptionHandler();
    app.listen(3333);
  }

  middlewares() {
    this.server.use(cors());
    this.server.use(express.json());
  }

  routes() {
    this.server.use(routes);
  }

  exceptionHandler() {
    this.server.use(async (err, req, res, next) => {
      if (process.env.NODE_ENV === 'development') {
        const errors = await new Youch(err, req).toJSON();

        return res.status(500).json(errors);
      }
      return res.status(500).json({ error: 'Internal server error' });
    });
  }
}

export default new App().server;
