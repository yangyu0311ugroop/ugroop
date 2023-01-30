import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import { convertStyleClass } from 'utils/style-utils';
import style from './style';

function H4(props) {
  const { classes, className, weight, transform, letterSpace, dense } = props;
  const ls = letterSpace ? { letterSpacing: '1px' } : null;
  return (
    <h4
      className={classNames(
        classes.h4FontSize,
        classes.headerCommon,
        className,
        convertStyleClass(classes, weight),
        ls,
        dense && classes.dense,
        { textTransform: transform },
      )}
    >
      {props.children}
    </h4>
  );
}

H4.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  children: PropTypes.any,
  weight: PropTypes.string,
  transform: PropTypes.string,
  letterSpace: PropTypes.bool,
  dense: PropTypes.bool,
};

const StyleH4 = withStyles(style, { name: 'H4' })(H4);
export const H4Test = H4;
export default StyleH4;
