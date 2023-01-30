import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import { DialogTitle } from '@material-ui/core';
import stylesheet from './styles';

export const UGDialogTitle = ({
  classes,
  children,
  noPaddingBottom,
  ...props
}) => (
  <DialogTitle
    classes={{
      root: classNames(
        classes.root,
        noPaddingBottom && classes.noPaddingBottom,
      ),
    }}
    {...props}
  >
    {children}
  </DialogTitle>
);

UGDialogTitle.propTypes = {
  // hoc
  classes: PropTypes.object.isRequired,

  // parent
  children: PropTypes.node,
  noPaddingBottom: PropTypes.bool,
};

UGDialogTitle.defaultProps = {
  children: null,
  noPaddingBottom: false,
};

export default withStyles(stylesheet)(UGDialogTitle);
