import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import stylesheet from './style';

export const UnderlineWrapper = ({ children, classes, className }) => (
  <div className={classNames(classes.root, className)}>{children}</div>
);

UnderlineWrapper.propTypes = {
  children: PropTypes.node,
  classes: PropTypes.object,
  className: PropTypes.string,
};
UnderlineWrapper.defaultProps = {};

export default withStyles(stylesheet, { name: 'UnderlineWrapper' })(
  UnderlineWrapper,
);
