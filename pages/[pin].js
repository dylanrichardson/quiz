import React, { useState, useEffect } from 'react';
import Router from 'next/router';
import { connect } from 'react-redux';
import { client } from '@utils';
import { NameInput, Quiz } from '@components/quiz';
import { LoadingPage } from '@components/common';
import { getQuiz } from '@actions';

const quiz = client.service('quiz');

const QuizPage = props => {
  const { pin, getQuiz, isGetting, data, error } = props;

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

  const validatePin = () => {
    getQuiz(pin);
  };

  useEffect(() => {
    validatePin();

    quiz.on('patched', mergeState);

    return () => quiz.removeListener('patched');
  }, []);

  useEffect(() => {
    setLoading(isGetting);
  }, [isGetting]);

  useEffect(() => {
    if (error) {
      Router.push('/');
    }
  }, [error]);

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

export default connect(
  ({ getQuiz }) => ({ ...getQuiz }),
  { getQuiz }
)(QuizPage);
