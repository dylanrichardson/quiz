const next = require('next');
const compress = require('compression');
const helmet = require('helmet');
const feathers = require('@feathersjs/feathers');
const configuration = require('@feathersjs/configuration');
const express = require('@feathersjs/express');
const socketio = require('@feathersjs/socketio');
const logger = require('./logger');
const middleware = require('./middleware');
const services = require('./services');
const appHooks = require('./app.hooks');
const channels = require('./channels');

const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });
const defaultHandler = nextApp.getRequestHandler();

const createApp = async () => {
  await nextApp.prepare();

  const app = express(feathers());

  // Load app configuration
  app.configure(configuration());

  // Enable security, compression and body parsing
  app.use(helmet());
  app.use(compress());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Set up plugins and providers
  app.configure(express.rest());
  app.configure(
    socketio(io => {
      io.on('connection', socket => {
        logger.info("before app.on('connection')");

        socket.on('disconnect', () => {
          logger.info("before app.on('disconnect')");

          const { name, quiz, leader } = socket.feathers;

          if (quiz && (name || leader)) {
            app
              .service('quiz')
              .patch(
                quiz,
                { operation: 'leave', name },
                { connection: socket.feathers, app }
              );
          }
        });
      });
    })
  );

  // Configure other middleware (see `middleware/index.js`)
  app.configure(middleware);

  // Set up our services (see `services/index.js`)
  app.configure(services);

  // Set up event channels (see channels.js)
  app.configure(channels);

  // serve Next.js pages
  app.get('*', (req, res) => defaultHandler(req, res));

  // Configure a middleware for 404s and the error handler
  app.use(express.notFound());
  app.use(express.errorHandler({ logger }));

  // Configure app wide service hooks
  app.hooks(appHooks);

  return app;
};

module.exports = createApp;
