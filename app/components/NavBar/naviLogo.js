/**
 * Created by Yang on 16/2/17.
 */
import Img from 'components/Img/index';
import React from 'react';
import PropTypes from 'prop-types';
import Logo from 'shareAssets/logo-ugroop.png';
import UGLink from 'components/Link';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';

export const styleSheet = {
  naviLogo: {
    width: 265,
    height: 75,
    paddingLeft: 20,
    paddingRight: 20,
  },
  logo: {
    margin: '10px 0 0 50px',
    height: 55,
  },
};

function NavLogo(props) {
  const { classes, className, link } = props;
  return (
    <div className={classNames(classes.naviLogo, className)}>
      <UGLink to={link}>
        <Img
          src={Logo}
          className={classNames(classes.logo, className)}
          alt="uGroop"
        />
      </UGLink>
    </div>
  );
}

NavLogo.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  link: PropTypes.string,
};

const StyleNavLogo = withStyles(styleSheet, { name: 'NavLogo' })(NavLogo);
export const NavLogoTest = NavLogo;
export default StyleNavLogo;
