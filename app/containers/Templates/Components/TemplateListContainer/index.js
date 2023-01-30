import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';

export const styleContent = {
  root: {
    height: '100%',
  },
};

export const UGTemplateListContainer = ({ children, classes, className }) => (
  <div className={classNames(classes.root, className)}>{children}</div>
);

UGTemplateListContainer.propTypes = {
  children: PropTypes.node,
  classes: PropTypes.object,
  className: PropTypes.string,
};

export default withStyles(styleContent, { name: 'UGTemplateListContainer' })(
  UGTemplateListContainer,
);
