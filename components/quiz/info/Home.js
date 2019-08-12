import React, { useEffect } from 'react';
import Router from 'next/router';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { leaveQuiz, resetLeaveQuiz } from '@actions';

const Home = ({
  pin,
  leaveQuiz,
  resetLeaveQuiz,
  isLeaving,
  data,
  style = { width: '100%', height: '100%' }
}) => {
  useEffect(() => {
    if (data) {
      resetLeaveQuiz();
      Router.push('/');
    }
  }, [data]);

  return (
    <Button
      style={style}
      variant="outline-primary"
      onClick={() => leaveQuiz(pin)}
      disabled={isLeaving}
    >
      {isLeaving ? 'loading...' : 'Home'}
    </Button>
  );
};

const ConnectedHome = connect(
  ({ leaveQuiz }) => ({ ...leaveQuiz }),
  { leaveQuiz, resetLeaveQuiz }
)(Home);

export { ConnectedHome as Home };
