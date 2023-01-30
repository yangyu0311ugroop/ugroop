import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
const styleSheet = {
  root: {
    margin: 0,
    padding: 0,
  },
};

function Li(props) {
  const { classes, className, ...rest } = props;
  return (
    <li className={classNames(classes.root, className)} {...rest}>
      {props.children}
    </li>
  );
}

Li.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  children: PropTypes.any,
};

const StyleUl = withStyles(styleSheet, { name: 'Li' })(Li);
export const LiTest = Li;
export default StyleUl;
