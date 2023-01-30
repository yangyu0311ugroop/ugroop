import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import stylesheet from './style';

export const Jumbotron = ({ children, classes }) => (
  <div className={classes.root}>{children}</div>
);

Jumbotron.propTypes = {
  children: PropTypes.node,
  classes: PropTypes.object,
};
Jumbotron.defaultProps = {};

export default withStyles(stylesheet, { name: 'Jumbotron' })(Jumbotron);
