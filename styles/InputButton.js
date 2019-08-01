import React from 'react';
import { Button, InputGroup } from 'react-bootstrap';

export const InputButton = ({ children, onClick, style = {} }) => {
  return (
    <InputGroup.Append>
      <Button
        variant="outline-primary"
        onClick={onClick}
        style={{
          ...style,
          fontSize: '26px',
          fontWeight: 'bold',
          lineHeight: '26px',
          padding: '4px 8px 0px 8px'
        }}
      >
        {children}
        <style>
          {`button.btn:hover {
          background: var(--red)
        }`}
        </style>
      </Button>
    </InputGroup.Append>
  );
};
