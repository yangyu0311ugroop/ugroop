import React from 'react';
import PropTypes from 'prop-types';
import { messageType } from 'utils/constant';
import classnames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Icon from 'ugcomponents/Icon';
import Button from 'ugcomponents/Buttons/Button';
import styles from './styles';

/* eslint-disable jsx-a11y/interactive-supports-focus, jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */

const renderIcon = (icon, classes, iconClassName) => {
  let elem = null;

  if (icon) {
    elem = (
      <div className={classnames(classes.iconCell, iconClassName)}>{icon}</div>
    );
  }

  return elem;
};

const renderContent = (content, classes, textClassName) => (
  <div className={classnames(classes.textCell, textClassName)}>{content}</div>
);

const renderExitButton = (classes, onClose) => (
  <div className={classes.exitCell}>
    <Button
      className={classes.exitButton}
      variant="flat"
      dense
      disableRipple
      disableFocusRipple
      classes={{ root: classes.exitButton }}
      onClick={onClose}
    >
      <Icon icon="lnr-cross" />
    </Button>
  </div>
);

export const Messaging = ({
  content,
  type,
  classes,
  onClose,
  icon,
  textClassName,
  iconClassName,
  rootClassName,
  onClick,
}) => (
  <div className={classnames(classes.common, classes[type], rootClassName)}>
    {renderIcon(icon, classes, iconClassName, onClick)}
    {renderContent(content, classes, textClassName, onClick)}
    {renderExitButton(classes, onClose)}
  </div>
);

/* eslint-enable jsx-a11y/interactive-supports-focus, jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */

Messaging.propTypes = {
  content: PropTypes.node,
  type: PropTypes.oneOf([
    messageType.OUTLINE,
    messageType.INFO,
    messageType.SUCCESS,
    messageType.CRITICAL,
  ]),
  classes: PropTypes.object,
  onClose: PropTypes.func.isRequired,
  icon: PropTypes.node,
  textClassName: PropTypes.string,
  iconClassName: PropTypes.string,
  rootClassName: PropTypes.string,
  onClick: PropTypes.func,
};

Messaging.defaultProps = {
  content: '',
  type: messageType.INFO,
  classes: {},
  icon: null,
  textClassName: '',
  iconClassName: '',
  rootClassName: '',
};

export default withStyles(styles)(Messaging);
