import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
// TODO: Remove this once SharedTemplate is refactored as well. This might not be needed anymore
export const styleContent = {
  root: {
    position: 'relative',
    height: '100px',
  },
};

export const UGTemplateListHeader = ({ children, classes, className }) => (
  <div className={`${classes.root} ${className}`}>{children}</div>
);

UGTemplateListHeader.propTypes = {
  children: PropTypes.node,
  classes: PropTypes.object,
  className: PropTypes.string,
};

export default withStyles(styleContent, { name: 'UGTemplateListHeader' })(
  UGTemplateListHeader,
);
