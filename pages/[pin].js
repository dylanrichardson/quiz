import React, { useState, useEffect } from 'react';
import Router from 'next/router';
import client from '../utils/feathers';
import { NameInput, Quiz, LoadingPage } from '../components';

const quiz = client.service('quiz');

const QuizPage = props => {
  const { pin } = props;

  const [state, setState] = useState({
    name: null,
    leader: null,
    members: [],
    question: null,
    answers: {},
    showResults: false
  });
  const [loading, setLoading] = useState(true);

  const mergeState = newState => {
    return setState(oldState => ({ ...oldState, ...newState }));
  };

  const validatePin = async () => {
    try {
      await quiz.get(pin);
      setLoading(false);
    } catch (e) {
      Router.push('/');
    }
  };

  useEffect(() => {
    validatePin();

    quiz.on('patched', mergeState);

    return () => quiz.removeListener('patched');
  });

  const handleJoin = ({ name, leader }) => {
    mergeState({ name, leader });
  };

  return loading ? (
    <LoadingPage />
  ) : state.name ? (
    <Quiz {...state} {...props} />
  ) : (
    <NameInput onJoin={handleJoin} {...props} />
  );
};

QuizPage.getInitialProps = ({ query: { pin } }) => {
  return { pin };
};

export default QuizPage;
