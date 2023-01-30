import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from 'components/material-ui';
import { PopperMenuItem } from 'components/Popper';
import P from 'viewComponents/Typography';
import style from './style';

export class EditableMenuItemSubmit extends React.PureComponent {
  getMenuItemIconProps = () => {
    const { disabled } = this.props;
    return {
      bold: true,
      color: disabled ? 'clear' : 'blue',
    };
  };

  render = () => {
    const { classes, children, disabled, ...rest } = this.props;
    return (
      <PopperMenuItem
        className={classNames(classes.root, disabled && classes.disabled)}
        disabled={disabled}
        icon="lnr-plus"
        IconProps={this.getMenuItemIconProps()}
        type="submit"
        button
        hover
        {...rest}
      >
        <P dense>{children}</P>
      </PopperMenuItem>
    );
  };
}

EditableMenuItemSubmit.propTypes = {
  // hoc
  classes: PropTypes.object.isRequired,

  // parent
  children: PropTypes.any,
  disabled: PropTypes.bool,
};

EditableMenuItemSubmit.defaultProps = {
  children: null,
  disabled: false,
};

export default withStyles(style, {
  name: 'viewComponents/Editable/MenuItemSubmit',
})(EditableMenuItemSubmit);
