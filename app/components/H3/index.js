import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import { convertStyleClass } from 'utils/style-utils';
import style from './style';

function H3(props) {
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
    <h3
      className={classNames(
        classes.h3FontSize,
        classes.headerCommon,
        className,
        convertStyleClass(classes, weight),
        ls,
        transform && { textTransform: transform },
        noMargin && classes.noMargin,
      )}
    >
      {props.children}
    </h3>
  );
}

H3.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  children: PropTypes.any,
  weight: PropTypes.string,
  transform: PropTypes.string,
  letterSpace: PropTypes.bool,
  noMargin: PropTypes.bool,
};

const StyleH3 = withStyles(style, { name: 'H3' })(H3);
export const H3Test = H3;
export default StyleH3;
