import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

export const styleContent = {
  root: {
    margin: '16px 0',
    borderTop: '1px solid #EDF2F4',
  },
};

export const UGTemplateListHR = ({ classes, className }) => (
  <hr className={`${classes.root} ${className}`} />
);

UGTemplateListHR.propTypes = {
  classes: PropTypes.object,
  className: PropTypes.string,
};

export default withStyles(styleContent, { name: 'UGTemplateListHR' })(
  UGTemplateListHR,
);
