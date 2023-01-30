import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

export const stylesheet = {};

export const UGContactsPage = ({ classes }) => (
  <div className={classes.root}>
    <h1>Contact Us</h1>
  </div>
);

UGContactsPage.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(stylesheet, { name: 'UGContactsPage' })(
  UGContactsPage,
);
