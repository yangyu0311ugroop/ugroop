/**
 * Created by paulcedrick on 7/11/17.
 */
import React from 'react';
import Messaging from 'ugcomponents/Messaging';
import PropTypes from 'prop-types';
import Snackbar from '@material-ui/core/Snackbar';
import { snackBarType } from 'utils/constant';
import { UGSNACKBAR_DEFAULT_TIME } from '../../constants';

export const UGSnackbar = ({
  isRevealed,
  text,
  time,
  type,
  onClose,
  rootClassName,
  textClassName,
  anchorOrigin,
  messagingProps,
  icon,
}) => (
  <Snackbar
    anchorOrigin={anchorOrigin}
    open={isRevealed}
    autoHideDuration={time}
    className={rootClassName}
    onClose={onClose}
  >
    <Messaging
      textClassName={textClassName}
      onClose={onClose}
      type={type}
      icon={icon}
      content={text}
      {...messagingProps}
    />
  </Snackbar>
);

UGSnackbar.propTypes = {
  isRevealed: PropTypes.bool,
  text: PropTypes.node,
  time: PropTypes.number,
  type: PropTypes.oneOf([
    snackBarType.OUTLINE,
    snackBarType.INFO,
    snackBarType.SUCCESS,
    snackBarType.CRITICAL,
  ]),
  onClose: PropTypes.func.isRequired,
  rootClassName: PropTypes.string,
  textClassName: PropTypes.string,
  anchorOrigin: PropTypes.object,
  messagingProps: PropTypes.object,
  icon: PropTypes.node,
};

UGSnackbar.defaultProps = {
  isRevealed: false,
  text: '',
  time: UGSNACKBAR_DEFAULT_TIME,
  type: snackBarType.INFO,
  rootClassName: '',
  textClassName: '',
  anchorOrigin: {
    vertical: 'bottom',
    horizontal: 'left',
  },
  messagingProps: {},
};

export default UGSnackbar;
