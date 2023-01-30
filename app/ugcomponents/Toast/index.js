import React from 'react';
import PropTypes from 'prop-types';
import {
  ToastContainer as RTToastContainer,
  toast as rtToast,
} from 'react-toastify';
import Messaging from 'ugcomponents/Messaging';
import Icon from 'ugcomponents/Icon';
import { messageType } from 'utils/constant';
import './styles.css';

const loadIcon = (icon, type = messageType.INFO) => {
  let img = null;

  if (icon) {
    img = icon;
  } else if (typeof icon === 'undefined') {
    // If icon is undefined, load default icon
    if (type === messageType.INFO) {
      img = <Icon icon="lnr-notification-circle" />;
    } else if (type === messageType.SUCCESS) {
      img = <Icon icon="lnr-checkmark-circle" />;
    } else if (type === messageType.CRITICAL) {
      img = <Icon icon="lnr-cross-circle" />;
    }
  }

  return img;
};

const ToastContent = ({
  closeToast,
  content,
  type,
  icon,
  textClassName,
  iconClassName,
  onClick,
}) => (
  <Messaging
    content={content}
    type={type}
    onClose={closeToast}
    icon={loadIcon(icon, type)}
    textClassName={textClassName}
    iconClassName={iconClassName}
    onClick={onClick}
  />
);

ToastContent.propTypes = {
  closeToast: PropTypes.func,
  content: PropTypes.node.isRequired,
  type: PropTypes.oneOf([
    messageType.INFO,
    messageType.SUCCESS,
    messageType.CRITICAL,
  ]),
  icon: PropTypes.node,
  textClassName: PropTypes.string,
  iconClassName: PropTypes.string,
  onClick: PropTypes.func,
};

ToastContent.defaultProps = {
  textClassName: '',
  iconClassName: '',
};

const toastNotify = (content, { toastOptions = {}, ...options } = {}) =>
  rtToast(<ToastContent content={content} {...options} />, toastOptions);

/*
 * Options:
 *
 * icon: Optional. Valid React or HTML node for the icon or image. Set to `undefined` for the default icons, and `null` for no icons.
 * type: Optional. Either: `messageType.INFO`, `messageType.SUCCESS` or `messageType.CRITICAL`. Default is `messageType.INFO`.
 * onClick: Optional. Handler for icon/content click event.
 */
export const toast = {
  info: (content, options) =>
    toastNotify(content, { ...options, type: messageType.INFO }),
  success: (content, options) =>
    toastNotify(content, { ...options, type: messageType.SUCCESS }),
  critical: (content, options) =>
    toastNotify(content, { ...options, type: messageType.CRITICAL }),
  notify: (content, options) => toastNotify(content, options),
};

toast.error = toast.critical; // Alias for toast.critical()

export const ToastContainer = ({ autoClose }) => (
  <RTToastContainer
    newestOnTop
    hideProgressBar
    position={rtToast.POSITION.BOTTOM_RIGHT}
    autoClose={autoClose}
    bodyClassName="toast-body"
    className="toast-root"
    progressClassName="toast-progress"
    toastClassName="toast"
    closeButton={false}
    closeOnClick={false}
  />
);

ToastContainer.propTypes = {
  autoClose: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]), // Either milliseconds before auto-closing, or false for disabling auto-close
};

ToastContainer.defaultProps = {
  autoClose: 5000, // 5 seconds
};

export const fn = { loadIcon, ToastContent, toastNotify };
