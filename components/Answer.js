import React, { useEffect, createRef } from 'react';
import { InputGroup, FormControl, Spinner } from 'react-bootstrap';
import client from '../utils/feathers';
import { CenteredRow, InputButton } from '../styles';

const quiz = client.service('quiz');

const answerRef = createRef();

export const Answer = ({
  question,
  isLeader,
  ownAnswer,
  pin,
  name,
  isMobile
}) => {
  useEffect(() => {
    if (!isLeader && question && !isMobile) {
      answerRef.current.focus();
    }
  });

  const handleAnswer = async () => {
    const { value: answer } = answerRef.current;

    if (answer !== '') {
      await quiz.patch(pin, { operation: 'answer', name, answer });
    }
  };

  const handleKey = event => {
    if (event.keyCode === 13) {
      return handleAnswer();
    }
  };

  const width = isMobile ? '80%' : '50%';

  return (
    !isLeader &&
    (question ? (
      <>
        <CenteredRow>
          <InputGroup style={{ width, maxWidth: '480px' }}>
            <FormControl
              placeholder="Your answer"
              aria-label="Your Answer"
              ref={answerRef}
              onKeyDown={handleKey}
              style={{
                paddingBottom: '2px'
              }}
            />
            <InputButton onClick={handleAnswer}>Answer</InputButton>
          </InputGroup>
        </CenteredRow>
        {ownAnswer && (
          <CenteredRow
            style={{
              wordBreak: 'break-word',
              paddingLeft: '20%',
              paddingRight: '20%'
            }}
          >
            Your answer: {ownAnswer}
          </CenteredRow>
        )}
      </>
    ) : (
      !isLeader && (
        <CenteredRow>
          <span
            style={{
              marginTop: 'auto',
              marginBottom: 'auto',
              textAlgin: 'center'
            }}
          >
            Waiting for question
          </span>
          <Spinner animation="grow" variant="primary" />
        </CenteredRow>
      )
    ))
  );
};
