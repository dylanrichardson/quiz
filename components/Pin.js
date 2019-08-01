import React, { useState, useEffect, useRef } from 'react';
import { Card, Badge, Tooltip, Overlay } from 'react-bootstrap';
import Clipboard from 'clipboard';

export const Pin = ({ pin, style = {} }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const clipboard = new Clipboard('#pin');

    clipboard.on('success', () => {
      setShow(true);
      setTimeout(() => setShow(false), 2000);
    });

    return () => clipboard && clipboard.destroy();
  });

  const pinRef = useRef(null);

  return (
    <Card style={style}>
      <Card.Header
        style={{ textAlign: 'center', paddingLeft: '0px', paddingRight: '0px' }}
      >
        Pin{' '}
        <Badge
          variant="primary"
          pill={true}
          style={{
            fontSize: '16px',
            cursor: 'pointer'
          }}
          id="pin"
          data-clipboard-text={pin}
          ref={pinRef}
        >
          {pin}
        </Badge>
        <Overlay target={pinRef.current} show={show} placement="right">
          {props => (
            <Tooltip id="tooltip-right" {...props} show={props.show.toString()}>
              Copied!
            </Tooltip>
          )}
        </Overlay>
      </Card.Header>
    </Card>
  );
};
