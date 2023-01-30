import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'components/material-ui';
import styles from './styles';

export const AttachmentBorder = ({ classes, children }) => (
  <div className={classes.root}>{children}</div>
);

AttachmentBorder.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node,
};

AttachmentBorder.defaultProps = {
  children: '',
};

export default withStyles(styles, { name: 'viewComponents/Attachment/Border' })(
  AttachmentBorder,
);
