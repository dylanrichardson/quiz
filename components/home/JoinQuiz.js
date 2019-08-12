import React, { useEffect, useState, useRef } from 'react';
import { Button, InputGroup, FormControl, Alert } from 'react-bootstrap';
import { connect } from 'react-redux';
import Router from 'next/router';
import { CenteredRow, InputButton } from '@styles';
import { getQuiz, resetGetQuiz } from '@actions';

const JoinQuiz = ({ getQuiz, isGetting, data, error }) => {
  const pinRef = useRef(null);

  const [showError, setShowError] = useState(!!error);
  const [showPinInput, setShowPinInput] = useState(false);

  useEffect(() => {
    if (showPinInput) {
      pinRef.current.focus();
    }
  });

  useEffect(() => {
    setShowError(!!error);
  }, [error]);

  useEffect(() => {
    if (data) {
      resetGetQuiz();
      Router.push('/[pin]', `/${data.id}`);
    }
  }, [data]);

  const handleJoin = () => {
    const pin = pinRef.current.value.toUpperCase();

    if (pin !== '') {
      getQuiz(pin);
    }
  };

  const handleKey = event => {
    if (event.keyCode === 13) {
      return handleJoin();
    }

    if (event.keyCode === 27) {
      setShowPinInput(false);
      return setShowError(false);
    }
  };

  return showPinInput ? (
    <>
      <CenteredRow>
        <InputGroup style={{ width: '40%', maxWidth: '188px' }}>
          <FormControl
            placeholder="Pin"
            aria-label="Quiz Pin"
            ref={pinRef}
            onKeyDown={handleKey}
            style={{
              paddingBottom: '2px'
            }}
          />
          <InputButton onClick={handleJoin} disabled={isGetting}>
            {isGetting ? 'loading...' : 'Join'}
          </InputButton>
        </InputGroup>
      </CenteredRow>
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
  ) : (
    <Button
      style={{ width: '35%', minWidth: '100px', maxWidth: '188px' }}
      onClick={() => setShowPinInput(true)}
    >
      Join Quiz
    </Button>
  );
};

const ConnectedJoinQuiz = connect(
  ({ getQuiz }) => ({ ...getQuiz }),
  { getQuiz, resetGetQuiz }
)(JoinQuiz);

export { ConnectedJoinQuiz as JoinQuiz };
