import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import { DialogActions } from '@material-ui/core';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import stylesheet from './styles';

export const UGDialogAction = ({
  classes,
  children,
  className,
  noPaddingTop,
  bgColor,
  ...props
}) => (
  <DialogActions
    classes={{
      root: classNames(
        classes.root,
        className,
        noPaddingTop && classes.noPaddingTop,
        LOGIC_HELPERS.ifElse(bgColor, classes.bgColor),
      ),
      // action: classes.action,
    }}
    {...props}
  >
    {children}
  </DialogActions>
);

UGDialogAction.propTypes = {
  // hoc
  classes: PropTypes.object.isRequired,

  // parent
  children: PropTypes.node,
  className: PropTypes.string,
  noPaddingTop: PropTypes.bool,
  bgColor: PropTypes.bool,
};

UGDialogAction.defaultProps = {
  children: null,
  className: null,
  noPaddingTop: false,
};

export default withStyles(stylesheet)(UGDialogAction);
