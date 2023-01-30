import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import stylesheet from './style';

export const TemplateWrapper = ({ children, classes }) => (
  <div className={classes.root}>{children}</div>
);

TemplateWrapper.propTypes = {
  classes: PropTypes.object,
  children: PropTypes.node,
};
TemplateWrapper.defaultProps = {};

export default withStyles(stylesheet, { name: 'TemplateWrapper' })(
  TemplateWrapper,
);
