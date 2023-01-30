import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

export const stylesheet = {};

export const UGPricingPage = ({ classes }) => (
  <div className={classes.root}>
    <h1>Pricing Page</h1>
  </div>
);

UGPricingPage.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(stylesheet, { name: 'UGPricingPage' })(UGPricingPage);
