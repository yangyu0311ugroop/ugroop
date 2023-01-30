/**
 * Created by edil on 8/31/17.
 */
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import utils from './utils';
import styles from './styles';

export const LetterAvatar = ({
  classes,
  className,
  rootClassName,
  letterClassName,
  name,
  color,
  borderColor,
  displayName,
  squareSm,
  size,
}) => {
  let borderCls;
  let colorCls;
  let nameElement;

  const bgColor = utils.generateColorFromString(name);

  switch (color) {
    case 'white': {
      colorCls = classes.whiteBGColor;
      break;
    }
    default: {
      colorCls = classes.standardBGColor;
      break;
    }
  }

  switch (borderColor) {
    case 'gray': {
      borderCls = classes.grayBorderColor;
      break;
    }
    default:
      break;
  }
  if (displayName) {
    nameElement = <p className={classes.nameStyle}>{name}</p>;
    return (
      <div className={classnames(classes.root, rootClassName)}>
        <p
          className={classnames(
            classes.avatar,
            classes.circular,
            borderCls,
            colorCls,
            classes.initials,
            letterClassName,
            className,
          )}
          style={{ backgroundColor: bgColor }}
        >
          {utils.getAbbr(name)}
        </p>
        {nameElement}
      </div>
    );
  }
  return (
    <div
      className={classnames(
        classes.avatar,
        classes.circular,
        classes[size],
        borderCls,
        colorCls,
        className,
        squareSm && classes.squareSm,
      )}
      style={{ backgroundColor: bgColor }}
    >
      <p className={classnames(classes.initials, letterClassName)}>
        {utils.getAbbr(name)}
      </p>
    </div>
  );
};

LetterAvatar.defaultProps = {
  className: '',
};

LetterAvatar.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.any,
  name: PropTypes.string,
  displayName: PropTypes.bool,
  color: PropTypes.string,
  borderColor: PropTypes.string,
  letterClassName: PropTypes.string,
  rootClassName: PropTypes.string,
  squareSm: PropTypes.bool,
  size: PropTypes.string,
};

LetterAvatar.defaultProps = {
  name: '?',
  className: '',
};

export default withStyles(styles)(LetterAvatar);
