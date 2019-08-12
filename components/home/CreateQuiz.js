import React, { useState, useEffect } from 'react';
import { Button, Alert } from 'react-bootstrap';
import { connect } from 'react-redux';
import Router from 'next/router';
import { CenteredRow } from '@styles';
import { createQuiz, resetCreateQuiz } from '@actions';

const CreateQuiz = ({
  createQuiz,
  resetCreateQuiz,
  isCreating,
  data,
  error
}) => {
  const [showError, setShowError] = useState(!!error);

  useEffect(() => {
    setShowError(!!error);
  }, [error]);

  useEffect(() => {
    if (data) {
      resetCreateQuiz();
      Router.push('/[pin]', `/${data.id}`);
    }
  }, [data]);

  return (
    <>
      <Button
        style={{ width: '35%', minWidth: '100px', maxWidth: '188px' }}
        onClick={createQuiz}
        disabled={isCreating}
      >
        {isCreating ? 'Loading...' : 'Create Quiz'}
      </Button>
      {showError && (
        <CenteredRow className="mt-3">
          <Alert
            variant="danger"
            onClose={() => setShowError(false)}
            dismissible
          >
            {error}
          </Alert>
        </CenteredRow>
      )}
    </>
  );
};

const ConnectedCreateQuiz = connect(
  ({ createQuiz }) => ({ ...createQuiz }),
  { createQuiz, resetCreateQuiz }
)(CreateQuiz);

export { ConnectedCreateQuiz as CreateQuiz };
