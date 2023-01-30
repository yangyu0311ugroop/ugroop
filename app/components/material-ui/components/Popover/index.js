import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { Popover as MuiPopover } from '@material-ui/core';

export class Popover extends PureComponent {
  render = () => {
    const { children, ...props } = this.props;

    return <MuiPopover {...props}>{children}</MuiPopover>;
  };
}

Popover.propTypes = {
  // parent props
  children: PropTypes.node,
};

Popover.defaultProps = {};

export default Popover;
