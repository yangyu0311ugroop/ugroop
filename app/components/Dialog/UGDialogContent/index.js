import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import { DialogContent } from '@material-ui/core';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import stylesheet from './styles';

export const UGDialogContent = ({
  classes,
  children,
  className,
  noPaddingTop,
  noPaddingBottom,
  halfPaddingTop,
  dense,
  ...props
}) => (
  <DialogContent
    classes={{
      root: classNames(
        classes.root,
        className,
        noPaddingTop && classes.noPaddingTop,
        noPaddingBottom && classes.noPaddingBottom,
        LOGIC_HELPERS.ifElse(halfPaddingTop, classes.halfPaddingTop),
        LOGIC_HELPERS.ifElse(dense, classes.dense),
      ),
    }}
    {...props}
  >
    {children}
  </DialogContent>
);

UGDialogContent.propTypes = {
  // hoc
  classes: PropTypes.object.isRequired,

  // parent
  children: PropTypes.node,
  className: PropTypes.string,
  dense: PropTypes.bool,
  noPaddingTop: PropTypes.bool,
  noPaddingBottom: PropTypes.bool,
  halfPaddingTop: PropTypes.bool,
};

UGDialogContent.defaultProps = {
  children: null,
  className: null,
  noPaddingTop: false,
  noPaddingBottom: false,
  halfPaddingTop: false,
};

export default withStyles(stylesheet)(UGDialogContent);
