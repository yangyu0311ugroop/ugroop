import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';

export const styleSheet = () => ({
  navi: {
    padding: '8px 0 12px',
    background: '#1F273D',
  },
});

function Nav(props) {
  const { classes, children } = props;
  return <div className={classNames(classes.navi)}>{children}</div>;
}

Nav.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.any,
};

const StyleNav = withStyles(styleSheet, { name: 'Nav' })(Nav);
export const NavTest = Nav;
export default StyleNav;
