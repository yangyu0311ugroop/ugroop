/**
 * Created by edil on 9/26/17.
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { convertStyleClass } from 'utils/style-utils';
import style from './style';

export const shallAppendLinearPrefix = icon => {
  if (icon.indexOf('ug-') !== -1) return icon;

  let finalIcon;
  const temp = icon.split('-');

  // Which means the user includes `lnr-`
  if (temp.length > 0 && temp[0] === 'lnr') {
    finalIcon = icon;
  } else {
    finalIcon = `lnr-${icon}`;
  }
  return finalIcon;
};

export const Icon = props => {
  const {
    icon,
    classes,
    className,
    bold,
    size,
    color,
    paddingLeft,
    paddingRight,
    darkMode,
    flipX,
    flipY,
    rotate90,
  } = props;
  const finalIconName = shallAppendLinearPrefix(icon);
  return (
    <i
      className={classNames(
        finalIconName,
        className,
        convertStyleClass(classes, size),
        convertStyleClass(
          classes,
          `${LOGIC_HELPERS.ifElse(darkMode, 'dark', '')}${color}`,
        ),
        icon.indexOf('ug-') === -1 && classes.root,
        bold && classes.bold,
        paddingLeft && classes.paddingLeft,
        paddingRight && classes.paddingRight,
        LOGIC_HELPERS.ifElse(flipX, classes.flipX),
        LOGIC_HELPERS.ifElse(flipY, classes.flipY),
        LOGIC_HELPERS.ifElse(rotate90, classes.rotate90),
      )}
    >
      {props.children}
    </i>
  );
};

Icon.propTypes = {
  classes: PropTypes.object.isRequired,
  darkMode: PropTypes.bool,
  bold: PropTypes.bool,
  paddingLeft: PropTypes.bool,
  paddingRight: PropTypes.bool,
  flipX: PropTypes.bool,
  flipY: PropTypes.bool,
  rotate90: PropTypes.bool,
  icon: PropTypes.string,
  size: PropTypes.string,
  color: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.any,
};

Icon.defaultProps = {
  size: 'normal',
  paddingLeft: false,
  paddingRight: false,
  icon: '',
};

const StyleIcon = withStyles(style, { name: 'Icon' })(Icon);
export default StyleIcon;
