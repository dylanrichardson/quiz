import React from 'react';
import Router from 'next/router';
import { Button } from 'react-bootstrap';
import client from '../utils/feathers';
import { CenteredRow, PageContainer } from '../styles';
import { JoinQuiz } from '../components';

const quiz = client.service('quiz');

const createQuiz = async () => {
  const { id } = await quiz.create({});
  Router.push(`/${id}`);
};

export default () => {
  return (
    <PageContainer>
      <CenteredRow>
        <Button
          style={{ width: '35%', minWidth: '100px', maxWidth: '188px' }}
          onClick={createQuiz}
        >
          Create Quiz
        </Button>
      </CenteredRow>
      <CenteredRow>
        <JoinQuiz />
      </CenteredRow>
    </PageContainer>
  );
};
