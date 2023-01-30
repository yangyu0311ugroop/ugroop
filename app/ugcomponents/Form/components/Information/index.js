import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import style from './style';

export const Information = ({ classes, className, children, ...props }) =>
  children ? (
    <div className={classNames(classes.root, className)} {...props}>
      {children}
    </div>
  ) : (
    <span />
  );

Information.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  children: PropTypes.node,
};

export default withStyles(style, { name: 'Information' })(Information);
