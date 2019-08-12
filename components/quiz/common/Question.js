import React from 'react';
import { CenteredRow } from '@styles';

export const Question = ({ question }) => {
  return (
    question && (
      <CenteredRow
        style={{
          paddingLeft: '15%',
          paddingRight: '15%'
        }}
      >
        <h1
          className="display-4"
          style={{
            textAlign: 'center',
            wordBreak: 'break-word'
          }}
        >
          {question}
        </h1>
      </CenteredRow>
    )
  );
};
