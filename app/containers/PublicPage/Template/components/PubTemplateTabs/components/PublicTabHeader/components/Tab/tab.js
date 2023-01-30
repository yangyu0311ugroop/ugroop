import React from 'react';
import PropTypes from 'prop-types';
import { Tab } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

export const stylesheet = {
  selected: {
    fontWeight: 800,
    zIndex: '99',
    color: '#0a2644 !important',
    backgroundColor: '#fff !important',
    transition: '1s all',
  },
  label: {
    fontSize: '17px',
  },
};

export const PublicTab = ({ classes, label, ...props }) => (
  <div>
    <Tab
      classes={{ selected: classes.selected, label: classes.label }}
      label={label}
      {...props}
    />
  </div>
);

PublicTab.propTypes = {
  classes: PropTypes.object.isRequired,
  label: PropTypes.string,
};
PublicTab.defaultProps = {
  label: '',
};

export default withStyles(stylesheet, { name: 'PublicTab' })(PublicTab);
