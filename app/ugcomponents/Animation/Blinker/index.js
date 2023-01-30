/**
 * Created by quando on 5/3/17.
 * Blinker
 *
 */
import React from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes, css } from 'styled-components';

const blinker = keyframes`
  50% {
    opacity: 0;
  }
`;
export const BlinkerWrapper = styled.span`
  animation: ${({ blink, speed, defaultSpeed }) =>
    blink
      ? css`
          ${blinker} ${speed *
            defaultSpeed}ms cubic-bezier(.36,.07,.19,.97) both;
        `
      : 'none'}
  animation-iteration-count: ${({ iteration }) => iteration};
`;
function Blinker({ blink, iteration, speed, children, defaultSpeed }) {
  return (
    <BlinkerWrapper
      blink={blink}
      iteration={iteration}
      speed={speed}
      defaultSpeed={defaultSpeed}
    >
      {children}
    </BlinkerWrapper>
  );
}

Blinker.propTypes = {
  children: PropTypes.any,
  blink: PropTypes.bool,
  iteration: PropTypes.any,
  speed: PropTypes.number,
  defaultSpeed: PropTypes.number,
};
Blinker.defaultProps = {
  blink: false,
  iteration: 3,
  speed: 1,
  defaultSpeed: 500,
};

export default Blinker;
