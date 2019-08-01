const logger = require('./logger');
const createApp = require('./app');

process.on('unhandledRejection', (reason, p) =>
  logger.error('Unhandled Rejection at: Promise ', p, reason)
);

const main = async () => {
  const app = await createApp();

  const port = app.get('port');

  const server = app.listen(port);

  server.on('listening', () =>
    logger.info(
      'Feathers application started on http://%s:%d',
      app.get('host'),
      port
    )
  );
};

main();
