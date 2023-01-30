import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';

const stylesheet = {
  pageContentWrapper: {
    marginTop: 0,
    padding: 0,
  },
};

const AdminContentWrapper = props => (
  <div className={props.classes.pageContentWrapper}>{props.children}</div>
);

AdminContentWrapper.propTypes = {
  children: PropTypes.any,
  classes: PropTypes.object,
};

export default withStyles(stylesheet, { name: 'AdminContentWrapper' })(
  AdminContentWrapper,
);
