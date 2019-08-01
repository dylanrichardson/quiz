import React, { useEffect, useRef, useState } from 'react';
import { InputGroup, FormControl } from 'react-bootstrap';
import client from '../utils/feathers';
import { CenteredRow, InputButton } from '../styles';

const quiz = client.service('quiz');

export const Ask = ({ pin, isLeader, isMobile }) => {
  const [caseSensitive, setCaseSensitive] = useState(false);

  const questionRef = useRef(null);

  useEffect(() => {
    if (isLeader && !isMobile) {
      questionRef.current.focus();
    }
  });

  const handleQuestion = async () => {
    const { value: question } = questionRef.current;

    if (question !== '') {
      await Promise.all([
        quiz.patch(pin, { operation: 'ask', question }),
        quiz.patch(pin, {
          operation: 'toggleCaseSensitive',
          caseSensitive
        })
      ]);
    }
  };

  const handleKey = event => {
    if (event.keyCode === 13) {
      return handleQuestion();
    }
  };

  const width = isMobile ? '80%' : '50%';

  return (
    isLeader && (
      <CenteredRow>
        <InputGroup style={{ width, maxWidth: '480px' }}>
          <FormControl
            placeholder="Question"
            aria-label="Quiz Question"
            ref={questionRef}
            onKeyDown={handleKey}
            style={{
              paddingBottom: '2px'
            }}
          />
          <div
            onClick={() => setCaseSensitive(!caseSensitive)}
            style={{
              position: 'absolute',
              right: '60px',
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 3,
              color: `var(--${caseSensitive ? 'red' : 'gray'})`,
              paddingTop: '4px',
              paddingLeft: '3px',
              paddingRight: '3px',
              lineHeight: '18px',
              cursor: 'pointer',
              border: `1px solid var(--${caseSensitive ? 'red' : 'white'})`
            }}
          >
            Aa
          </div>
          <InputButton onClick={handleQuestion}>Quiz</InputButton>
        </InputGroup>
      </CenteredRow>
    )
  );
};
