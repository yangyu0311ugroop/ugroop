/**
 * Created by quando on 5/3/17.
 * FadeInOut
 *
 */
import React from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';
import Done from '@material-ui/icons/Done';
import Block from '@material-ui/icons/Block';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
  }
`;

export const Fade = styled.div`
  animation: ${props => (props.isValid ? fadeOut : fadeIn)} 200ms ease-in-out;
  padding-right: 8px;
  display: inline;
  font-size: 12px;
`;

function FadeInOut({ isValid, colorValid, colorInvalid, children }) {
  const color = isValid ? { color: colorValid } : { color: colorInvalid };
  const Icon = isValid ? Done : Block;
  const size = isValid ? 16 : 14;
  return (
    <Fade isValid={isValid} style={{ ...color }}>
      <Icon style={{ width: size }} /> {children}
    </Fade>
  );
}

FadeInOut.propTypes = {
  isValid: PropTypes.any,
  colorValid: PropTypes.string,
  colorInvalid: PropTypes.string,
  children: PropTypes.any,
};

FadeInOut.defaultProps = {
  isValid: false,
  colorValid: '#7097EB',
  colorInvalid: '#8e94a2',
};

export default FadeInOut;
