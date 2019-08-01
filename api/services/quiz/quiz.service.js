// Initializes the `quiz` service on path `/quiz`
const createService = require('feathers-memory');
const hooks = require('./quiz.hooks');

module.exports = app => {
  const paginate = app.get('paginate');

  const options = {
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/quiz', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('quiz');

  service.hooks(hooks);

  service.publish(({ id }) => {
    return app.channel(id);
  });
};
