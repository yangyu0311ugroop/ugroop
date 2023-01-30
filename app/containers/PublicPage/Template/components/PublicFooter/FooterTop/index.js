import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { H4, H5 } from 'viewComponents/Typography';
import { FormattedMessage as M } from 'react-intl';
import Logo from 'shareAssets/logo-solo-cool.png';
import Img from 'components/Img/index';
import stylesheet from './style';
import m from './messages';

export const FooterTop = ({ classes }) => (
  <div className={classes.root}>
    <Img src={Logo} className={classes.logo} alt="uGroop logo" />
    <H4 weight="bold" className={classes.ugroop}>
      <M {...m.uGroop} />
    </H4>
    <H5 dense className={classes.ugroopText}>
      <M {...m.uGroopText} />
    </H5>
  </div>
);

FooterTop.propTypes = {
  classes: PropTypes.object,
};
FooterTop.defaultProps = {};

export default withStyles(stylesheet, { name: 'FooterTop' })(FooterTop);
