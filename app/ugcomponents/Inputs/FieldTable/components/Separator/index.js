/**
 * Created by stephenkarpinskyj on 20/4/18.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const style = {
  root: {
    marginTop: 8,
  },
};

export const FieldTableSeparator = ({ classes }) => (
  <div className={classes.root} />
);

FieldTableSeparator.propTypes = {
  // hoc
  classes: PropTypes.object.isRequired,
};

export default withStyles(style, { name: 'FieldTableSeparator' })(
  FieldTableSeparator,
);
