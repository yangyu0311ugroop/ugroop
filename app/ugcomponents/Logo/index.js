/**
 * Created by quando on 22/2/17.
 */

import React from 'react';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import UGLink from 'components/Link';
// import LogoWhite from 'shareAssets/logo-full-cool.png';
import LogoBlack from 'shareAssets/NewLogoPNGOrange.png';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import style from './style';

export const Logo = ({ classes, className, tinting, history, ...props }) => {
  const logo = tinting ? LogoBlack : LogoBlack;
  return (
    <UGLink to="/">
      <img
        className={classNames(classes.root, className)}
        src={logo}
        alt="üGroop"
        {...props}
      />
    </UGLink>
  );
};

Logo.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  tinting: PropTypes.bool,
  history: PropTypes.object.isRequired,
};

export default compose(
  withRouter,
  withStyles(style, { name: 'Logo' }),
)(Logo);
