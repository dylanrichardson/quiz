const { disallow } = require('feathers-hooks-common');
const { Conflict, BadRequest } = require('@feathersjs/errors');
const generate = require('nanoid/generate');
const _ = require('lodash');
const logger = require('../../logger');

const addId = async context => {
  context.data = { id: generate('ABCDEFGHIJKLMNOPQRSTUVWXYZ', 4) };

  return context;
};

const addEmptyMembers = async context => {
  Object.assign(context.data, { members: [] });

  return context;
};

const addEmptyQuestion = async context => {
  Object.assign(context.data, { question: null });

  return context;
};

const addEmptyAnswer = async context => {
  Object.assign(context.data, { answer: null });

  return context;
};

const addEmptyAnswers = async context => {
  Object.assign(context.data, { answers: {} });

  return context;
};

const addCaseSensitive = async context => {
  Object.assign(context.data, { caseSensitive: false });

  return context;
};

const applyOperation = async context => {
  const {
    data: { operation },
    params
  } = context;

  logger.info(`before app.service('quiz').${operation}()`);

  Object.assign(params, { operation });

  switch (operation) {
    case 'join':
      return joinQuiz(context);
    case 'leave':
      return leaveQuiz(context);
    case 'ask':
      return addQuestion(context);
    case 'answer':
      return addAnswer(context);
    case 'toggleResults':
      return toggleResults(context);
    case 'startJoin':
      return startJoin(context);
    case 'toggleCaseSensitive':
      return toggleCaseSensitive(context);
    default:
      throw new BadRequest('Patching a quiz requires a valid operation.');
  }
};

const startJoin = async context => {
  const {
    params: { connection },
    service,
    id: quiz
  } = context;

  const { leader } = await service.get(quiz);

  if (!leader) {
    Object.assign(connection, { leader: true, quiz });

    context.data = { leader: true };
  }

  return context;
};

const joinQuiz = async context => {
  const {
    id: quiz,
    data: { name },
    service,
    app,
    params: { connection }
  } = context;

  const { members, answers } = await service.get(quiz);
  const leader = {};

  if (members.includes(name)) {
    throw new Conflict('A user with the same name is already in the quiz.');
  }

  if (_.keys(answers).includes(name)) {
    throw new Conflict(
      'A user with the same name has already voted in the quiz.'
    );
  }

  if (!name || name === '') {
    throw new BadRequest('Join operation requires a name.');
  }

  if (connection.leader) {
    leader.leader = name;
  }

  members.push(name);

  context.data = { members, ...leader };

  Object.assign(connection, { name, quiz });

  app.channel(quiz).join(connection);

  return context;
};

const leaveQuiz = async context => {
  const {
    service,
    params: {
      connection,
      connection: { quiz, name }
    },
    app
  } = context;

  if (connection.name) {
    const { members } = await service.get(quiz);
    const leader = {};

    const index = members.indexOf(name);
    if (index >= 0) {
      members.splice(index, 1);
    }

    if (members.length) {
      leader.leader = members[0];
    }

    context.data = { members, ...leader };

    app.channel(quiz).leave(connection);
  } else {
    context.data = {};
  }

  return context;
};

const addQuestion = async context => {
  const {
    data: { question, answer },
    params: {
      connection: { name }
    },
    id: quiz,
    service
  } = context;

  const { leader } = await service.get(quiz);

  if (name !== leader) {
    throw new Forbidden('Ask operation requires the leader.');
  }

  if (!question || question === '') {
    throw new BadRequest('Ask operation requires a question.');
  }

  if (!answer || answer === '') {
    throw new BadRequest('Ask operation requires a answer.');
  }

  context.data = { question, answer, answers: {} };

  return context;
};

const addAnswer = async context => {
  const {
    id: quiz,
    data: { answer },
    service,
    params: {
      connection: { name }
    }
  } = context;

  if (!name) {
    throw new BadRequest('Answer operation requires a name.');
  }

  if (!answer) {
    throw new BadRequest('Answer operation requires an answer.');
  }

  const { answers, caseSensitive } = await service.get(quiz);

  const trimmedAnswer = answer.trim();

  const formattedAnswer = caseSensitive
    ? trimmedAnswer
    : trimmedAnswer.toLowerCase();

  context.data = { answers: { ...answers, [name]: formattedAnswer } };

  return context;
};

const toggleResults = async context => {
  const {
    id: quiz,
    data: { showResults },
    service,
    params: {
      connection: { name }
    }
  } = context;

  const { leader } = await service.get(quiz);

  if (name !== leader) {
    throw new Forbidden('Toggle results operation requires the leader.');
  }

  if (showResults === null || showResults === undefined) {
    throw new BadRequest(
      'Toggle results operation requires a showResults parameter.'
    );
  }

  context.data = { showResults };

  return context;
};

const toggleCaseSensitive = async context => {
  const {
    id: quiz,
    data: { caseSensitive },
    service,
    params: {
      connection: { name }
    }
  } = context;

  const { leader } = await service.get(quiz);

  if (name !== leader) {
    throw new Forbidden('Toggle case sensitive operation requires the leader.');
  }

  if (caseSensitive === null || caseSensitive === undefined) {
    throw new BadRequest(
      'Toggle case sensitive operation requires a caseSensitive parameter.'
    );
  }

  context.data = { caseSensitive };

  return context;
};

const removeQuiz = async context => {
  const {
    id: quiz,
    result: { members },
    params: { operation },
    service
  } = context;

  if (operation === 'leave' && !members.length) {
    await service.remove(quiz);
  }

  return context;
};

module.exports = {
  before: {
    all: [disallow('rest')],
    find: [disallow('external')],
    get: [],
    create: [
      addId,
      addEmptyMembers,
      addEmptyQuestion,
      addEmptyAnswer,
      addEmptyAnswers,
      addCaseSensitive
    ],
    update: [disallow('external')],
    patch: [applyOperation],
    remove: [disallow('external')]
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [removeQuiz],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
