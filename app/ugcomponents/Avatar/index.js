import React from 'react';
import PropTypes from 'prop-types';
import Img from 'components/Img';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import stylesheet from './style';

export const Avatar = ({
  classes,
  avatarUrl,
  className,
  rootClassName,
  name,
  showName,
}) => {
  let nameElement;
  if (showName && name) {
    nameElement = <p className={classes.nameStyle}>{name}</p>;
  }

  return (
    <div className={classNames({ [classes.root]: name }, rootClassName)}>
      <Img
        src={avatarUrl}
        className={classNames(classes.avatarImg, classes[className])}
        alt="profile-avatar"
      />
      {nameElement}
    </div>
  );
};

Avatar.propTypes = {
  classes: PropTypes.object.isRequired,
  avatarUrl: PropTypes.string.isRequired,
  className: PropTypes.string,
  rootClassName: PropTypes.string,
  name: PropTypes.string,
  showName: PropTypes.bool,
};
Avatar.defaultProps = {};

export default withStyles(stylesheet, { name: 'Avatar' })(Avatar);
