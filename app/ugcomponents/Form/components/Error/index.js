import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import style from './style';

export const Error = ({ classes, className, children, ...props }) =>
  children ? (
    <div className={classNames(classes.root, className)} error {...props}>
      {children}
    </div>
  ) : (
    <span />
  );

Error.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  children: PropTypes.node,
};

export default withStyles(style, { name: 'Error' })(Error);
