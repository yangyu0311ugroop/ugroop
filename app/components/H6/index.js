import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import { convertStyleClass } from 'utils/style-utils';
import style from './style';

function H6(props) {
  const { classes, className, weight, transform, letterSpace } = props;
  const ls = letterSpace ? { letterSpacing: '1px' } : null;
  return (
    <h6
      className={classNames(
        classes.h6FontSize,
        classes.headerCommon,
        className,
        convertStyleClass(classes, weight),
        ls,
        { textTransform: transform },
      )}
    >
      {props.children}
    </h6>
  );
}

H6.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  children: PropTypes.any,
  weight: PropTypes.string,
  transform: PropTypes.string,
  letterSpace: PropTypes.bool,
};

const StyleH6 = withStyles(style, { name: 'H6' })(H6);
export const H6Test = H6;
export default StyleH6;
