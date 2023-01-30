import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GridItem from 'components/GridItem';
import Logo from 'shareAssets/logo-ugroop.png';
import Img from 'components/Img/index';
import UGLink from 'components/Link';
import stylesheet from './style';

export const FooterTop = ({ classes }) => (
  <GridItem className={classes.root}>
    <Img src={Logo} className={classes.logo} alt="uGroop logo" />
    <div className={classes.rowItems}>
      <UGLink to="/features">About</UGLink>
      <UGLink to="/features">Features</UGLink>
      <UGLink to="/features">Plans</UGLink>
    </div>
    <div className={classes.rowItems}>
      <UGLink to="/support">Support</UGLink>
      <UGLink to="/support">Frequently Asked Questions</UGLink>
      <UGLink to="/support">Contact Us</UGLink>
    </div>
  </GridItem>
);

FooterTop.propTypes = {
  classes: PropTypes.object,
};
FooterTop.defaultProps = {};

export default withStyles(stylesheet, { name: 'FooterTop' })(FooterTop);
