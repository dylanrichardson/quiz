const quiz = require('./quiz/quiz.service.js');

module.exports = app => {
  app.configure(quiz);
};
