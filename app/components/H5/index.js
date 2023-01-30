import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import { convertStyleClass } from 'utils/style-utils';
import style from './style';

function H5(props) {
  const {
    classes,
    className,
    error,
    success,
    weight,
    transform,
    letterSpace,
    textCenter,
    dense,
  } = props;
  const ls = letterSpace ? { letterSpacing: '1px' } : null;
  return (
    <h5
      className={classNames(
        classes.h5FontSize,
        classes.headerCommon,
        className,
        convertStyleClass(classes, weight),
        error && convertStyleClass(classes, 'error'),
        success && convertStyleClass(classes, 'success'),
        textCenter && convertStyleClass(classes, 'textCenter'),
        dense && convertStyleClass(classes, 'dense'),
        ls,
        { textTransform: transform },
      )}
    >
      {props.children}
    </h5>
  );
}

H5.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  children: PropTypes.any,
  weight: PropTypes.string,
  transform: PropTypes.string,
  letterSpace: PropTypes.bool,
  error: PropTypes.bool,
  success: PropTypes.bool,
  textCenter: PropTypes.bool,
  dense: PropTypes.bool,
};

const StyleH5 = withStyles(style, { name: 'H5' })(H5);
export const H5Test = H5;
export default StyleH5;
