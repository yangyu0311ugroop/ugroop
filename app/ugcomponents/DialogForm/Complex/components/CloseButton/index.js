/**
 * Created by stephenkarpinskyj on 16/3/18.
 */

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from 'components/material-ui';
import InlineButton from 'ugcomponents/Buttons/InlineButton';
import Icon from 'ugcomponents/Icon';
import stylesheet from './styles';

export const CloseButton = ({ classes, className, ...rest }) => (
  <InlineButton className={classNames(classes.button, className)} {...rest} />
);

CloseButton.propTypes = {
  // hoc
  classes: PropTypes.object.isRequired,

  // parent
  className: PropTypes.string,
  children: PropTypes.any,
  onClick: PropTypes.func,
  color: PropTypes.string,
};
CloseButton.defaultProps = {
  children: <Icon icon="lnr-cross2" />,
  onClick: () => {},
  color: 'default',
};

export default withStyles(stylesheet, {
  name: 'ugcomponents/DialogForm/Complex/CloseButton',
})(CloseButton);
