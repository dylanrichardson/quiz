import React, { useState, useEffect } from 'react';
import { Overlay, Tooltip } from 'react-bootstrap';
import _ from 'lodash';

export const Voters = ({ answers, values }) => {
  const [show, setShow] = useState(false);
  const [target, setTarget] = useState(null);
  const [voters, setVoters] = useState([]);

  useEffect(() => {
    const bars = document.querySelectorAll('g g .bar');

    const enterListener = ({ target }) => {
      setShow(true);
      setTarget(target);

      const index = Array.from(target.parentNode.children).indexOf(target);
      const selectedVoters = _.keys(
        _.pickBy(answers, answer => answer === values[index])
      );
      setVoters(selectedVoters);
    };
    const leaveListener = () => {
      setShow(false);
    };

    bars.forEach(bar => {
      bar.addEventListener('mouseenter', enterListener);
      bar.addEventListener('mouseout', leaveListener);
    });

    return () => {
      bars.forEach(bar => {
        bar.removeEventListener('mouseenter', enterListener);
        bar.removeEventListener('mouseout', leaveListener);
      });
    };
  });

  return (
    <Overlay target={target} show={show} placement="right">
      {props => (
        <Tooltip
          {...props}
          show={props.show.toString()}
          style={{ ...props.style, maxWidth: '160px' }}
        >
          {voters.join(', ')}
        </Tooltip>
      )}
    </Overlay>
  );
};
