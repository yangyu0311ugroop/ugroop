import React from 'react';
import PropTypes from 'prop-types';
import Nav from './nav';
import NavWrapper from './naviWrapper';

function NaviBar(props) {
  const { children, ...rest } = props;
  return (
    <Nav>
      <NavWrapper {...rest}>{children}</NavWrapper>
    </Nav>
  );
}

NaviBar.propTypes = {
  children: PropTypes.any,
};

export default NaviBar;
