/**
 * Created by stephenkarpinskyj on 23/7/18.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { withStyles, Popover } from 'components/material-ui';
import Form from 'ugcomponents/Form';
import classnames from 'classnames';
import style from './style';

export const ANONYMOUS_FUNC = () => {};
export class PopoverForm extends React.PureComponent {
  state = {
    formChanged: false,
  };

  getPopoverProps = () => {
    if (!this.popoverProps) {
      this.popoverProps = {
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'left',
        },
        transformOrigin: {
          vertical: 'top',
          horizontal: 'left',
        },
      };
    }
    return this.popoverProps;
  };

  blurFocusedElement = element => {
    if (element && element.blur) element.blur();
  };

  handlePopoverEnter = () => {
    const { onEnter } = this.props;
    this.setState({ formChanged: false }, () => {
      onEnter();
    });
  };

  handlePopoverClose = event => {
    // SK: Prevents popover being closed with invalid form before debounce
    this.blurFocusedElement(document.activeElement);
    if (event.persist) event.persist();
    setTimeout(() => {
      const { onClose, disabled } = this.props;
      const { formChanged } = this.state;
      const canClose = !formChanged && !disabled;
      if (canClose) onClose();
    }, 10);
  };

  handleFormChange = args => {
    const { isChanged } = args;
    this.setState({ formChanged: isChanged }, () => {
      this.props.onChange(args);
    });
  };

  render = () => {
    const {
      classes,
      children,
      formClassName,
      open,
      onEnter,
      onClose,
      popoverProps,
      onChange,
      ...rest
    } = this.props;
    return (
      <Popover
        open={open}
        onEnter={this.handlePopoverEnter}
        onClose={this.handlePopoverClose}
        disableRestoreFocus
        {...this.getPopoverProps()}
        {...popoverProps}
      >
        <Form
          className={classnames(classes.root, formClassName)}
          onFormChange={this.handleFormChange}
          {...rest}
        >
          {children}
        </Form>
      </Popover>
    );
  };
}

PopoverForm.propTypes = {
  // hoc
  classes: PropTypes.object.isRequired,

  // parent
  children: PropTypes.node.isRequired,
  open: PropTypes.bool,
  onEnter: PropTypes.func,
  onClose: PropTypes.func,
  popoverProps: PropTypes.object,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  formClassName: PropTypes.string,
};

PopoverForm.defaultProps = {
  // Popover
  open: false,
  onEnter: ANONYMOUS_FUNC,
  onClose: ANONYMOUS_FUNC,
  popoverProps: {},

  // Form
  onChange: ANONYMOUS_FUNC,
  disabled: false,
};

export default compose(
  withStyles(style, { name: 'viewComponents/PopoverForm' }),
)(PopoverForm);
