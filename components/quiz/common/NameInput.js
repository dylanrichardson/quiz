import React, { useState, useEffect, useRef } from 'react';
import Router from 'next/router';
import { InputGroup, FormControl, Alert } from 'react-bootstrap';
import { client } from '@utils';
import { CenteredRow, PageContainer, InputButton } from '@styles';

const quiz = client.service('quiz');

export const NameInput = ({ pin, onJoin }) => {
  const nameRef = useRef(null);

  const [error, setError] = useState(null);

  useEffect(() => {
    nameRef.current.focus();

    quiz.patch(pin, { operation: 'startJoin' });
  });

  const handleJoin = async () => {
    const name = nameRef.current.value;

    if (name !== '') {
      try {
        const { leader } = await quiz.patch(pin, {
          operation: 'join',
          name
        });

        onJoin({ name, leader });
      } catch (err) {
        if (err.type === 'FeathersError') {
          if (err.code === 404) {
            return Router.push('/');
          }

          return setError(err.message);
        }

        console.error(err);
      }
    }
  };

  const handleName = event => {
    if (event.keyCode === 13) {
      return handleJoin();
    }
  };

  return (
    <PageContainer>
      <CenteredRow>
        <InputGroup style={{ width: '60%', maxWidth: '324px' }}>
          <FormControl
            placeholder="Your name"
            aria-label="Your Name"
            ref={nameRef}
            onKeyDown={handleName}
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
    </PageContainer>
  );
};
