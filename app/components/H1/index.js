import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import { convertStyleClass } from 'utils/style-utils';
import style from './style';

function H1(props) {
  const {
    classes,
    className,
    weight,
    transform,
    letterSpace,
    noMargin,
  } = props;
  return (
    <h1
      className={classNames(
        classes.h1FontSize,
        classes.headerCommon,
        className,
        weight && convertStyleClass(classes, weight),
        letterSpace && { letterSpacing: '1px' },
        transform && { textTransform: transform },
        noMargin && classes.noMargin,
      )}
    >
      {props.children}
    </h1>
  );
}

H1.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  children: PropTypes.any,
  weight: PropTypes.string,
  transform: PropTypes.string,
  letterSpace: PropTypes.bool,
  noMargin: PropTypes.bool,
};

H1.defaultProps = {
  noMargin: false,
};

const StyleH1 = withStyles(style, { name: 'H1' })(H1);
export const H1Test = H1;
export default StyleH1;
