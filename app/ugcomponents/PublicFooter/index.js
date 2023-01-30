import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage as M } from 'react-intl';
import { withStyles } from '@material-ui/core/styles';
import { H4, H5 } from 'viewComponents/Typography/index';
import Logo from 'shareAssets/logo-solo-cool.png';
import Img from 'components/Img/index';
import m from './messages';
import stylesheet from './style';

export const PublicFooter = ({ classes }) => (
  <div className={classes.root}>
    <Img src={Logo} className={classes.logo} alt="uGroop logo" />
    <H4 weight="bold" className={classes.ugroop}>
      <M {...m.poweredBy} />
    </H4>
    <H5 className={classes.ugroopText}>
      <M {...m.useOfuGroop} />
    </H5>
  </div>
);

PublicFooter.propTypes = {
  classes: PropTypes.object,
};
PublicFooter.defaultProps = {};

export default withStyles(stylesheet, { name: 'PublicFooter' })(PublicFooter);
