import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import _ from 'lodash';
import Dialog from '@material-ui/core/Dialog';
import { withStyles } from '@material-ui/core/styles';
import { SIZE_CONSTANTS } from 'sizeConstants';
import { compose } from 'redux';
import { withSMDown } from 'components/material-ui/hocs/withMediaQuery';
import stylesheet from './styles';
import { useGlobalContext } from '../../containers/App/globalStateContext';
import styles from '../../ugcomponents/JDialog/styles';

export const UGDialog = ({
  classes,
  children,
  className,
  maxHeight,
  ...props
}) => {
  const [state, globalDispatch] = useGlobalContext();
  useEffect(() => {
    if (props.open && props.smDown) {
      globalDispatch.setIntercomButtonHide(true);
    }
  }, [props.open, props.smDown]);

  useEffect(
    () =>
      function cleanup() {
        if (state && state.IntercomContext.hideIntercomButton) {
          globalDispatch.setIntercomButtonHide(false);
        }
      },
    [],
  );

  return (
    <Dialog
      classes={{
        root: classNames(className, classes.root),
        paper: classNames({
          [classes.paper]: true,
          [classes[`${maxHeight}PaperHeight`]]: !!maxHeight,
        }),
        ..._.omitBy(stylesheet),
      }}
      {...props}
    >
      {children}
    </Dialog>
  );
};

UGDialog.propTypes = {
  // hoc
  classes: PropTypes.object.isRequired,
  smDown: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string,
  maxHeight: PropTypes.oneOf([
    SIZE_CONSTANTS.XS,
    SIZE_CONSTANTS.SM,
    SIZE_CONSTANTS.MD,
    false,
  ]),
  open: PropTypes.bool,
};

UGDialog.defaultProps = {
  children: null,
  className: null,
  maxHeight: false,
  open: false,
};

export default compose(
  withStyles(styles, { name: 'UGDialog' }),
  withSMDown,
)(UGDialog);
