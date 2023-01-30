import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import { convertStyleClass } from 'utils/style-utils';
import style from './style';

function H2(props) {
  const {
    classes,
    className,
    weight,
    transform,
    letterSpace,
    noMargin,
  } = props;
  const ls = letterSpace ? { letterSpacing: '1px' } : null;
  return (
    <h2
      className={classNames(
        classes.h2FontSize,
        classes.headerCommon,
        className,
        convertStyleClass(classes, weight),
        ls,
        transform && { textTransform: transform },
        noMargin && classes.noMargin,
      )}
    >
      {props.children}
    </h2>
  );
}

H2.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  children: PropTypes.any,
  weight: PropTypes.string,
  transform: PropTypes.string,
  letterSpace: PropTypes.bool,
  noMargin: PropTypes.bool,
};

const StyleH2 = withStyles(style, { name: 'H2' })(H2);
export const H2Test = H2;
export default StyleH2;
