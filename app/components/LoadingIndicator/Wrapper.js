import styled, { css } from 'styled-components';

const Wrapper = styled.div`
  margin: 2em auto;
  width: 40px;
  height: 40px;
  position: relative;
  ${props =>
    !props.margin &&
    css`
      margin: 0;
    `};
  ${props =>
    props.size > 0 &&
    css`
      width: ${props.size}px;
      height: ${props.size}px;
    `};
`;

export default Wrapper;
