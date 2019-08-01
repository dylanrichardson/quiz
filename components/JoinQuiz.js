import React, { useEffect, useState, useRef } from 'react';
import Router from 'next/router';
import { Button, InputGroup, FormControl, Alert } from 'react-bootstrap';
import client from '../utils/feathers';
import { CenteredRow, InputButton } from '../styles';

const quiz = client.service('quiz');

export const JoinQuiz = () => {
  const pinRef = useRef(null);

  const [error, setError] = useState(null);
  const [showPinInput, setShowPinInput] = useState(false);

  useEffect(() => {
    if (showPinInput) {
      pinRef.current.focus();
    }
  });

  const handleJoin = async () => {
    const id = pinRef.current.value.toUpperCase();

    if (id !== '') {
      try {
        await quiz.get(id);
        Router.push(`/${id}`);
      } catch (err) {
        if (err.type === 'FeathersError') {
          setError(err.message);
          return;
        }

        console.error(err);
      }
    }
  };

  const handlePin = event => {
    if (event.keyCode === 13) {
      return handleJoin();
    }

    if (event.keyCode === 27) {
      setShowPinInput(false);
      return setError(null);
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
            onKeyDown={handlePin}
            style={{
              paddingBottom: '2px'
            }}
          />
          <InputButton onClick={handleJoin}>Join</InputButton>
        </InputGroup>
      </CenteredRow>
      {error && (
        <CenteredRow className="mt-3">
          <Alert variant="danger" onClose={() => setError(null)} dismissible>
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
