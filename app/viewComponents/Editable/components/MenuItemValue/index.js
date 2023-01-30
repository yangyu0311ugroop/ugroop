import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'components/material-ui';
import { PopperMenuItem } from 'components/Popper';
import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import { IMAGE_SIZES_CONSTANTS } from 'smartComponents/File/types/Photo/constants';
import P from 'viewComponents/Typography';
import Checkbox from 'components/Inputs/Checkbox';
import AvatarByBadge from 'ugcomponents/Person/AvatarByBadge';
import style from './style';

export class EditableMenuItemValue extends React.PureComponent {
  getIcon = () => {
    const { onSelect, hideIcon } = this.props;
    return onSelect || hideIcon ? undefined : 'lnr-check';
  };

  getMenuItemProps = selected => ({
    weight: selected ? 'bold' : undefined,
    IconProps: this.getMenuItemIconProps(selected),
  });

  getMenuItemIconProps = selected => {
    if (selected) {
      if (!this.SelectedMenuItemIconProps) {
        this.SelectedMenuItemIconProps = {
          bold: true,
          color: 'success',
        };
      }
      return this.SelectedMenuItemIconProps;
    }
    if (!this.MenuItemIconProps) {
      this.MenuItemIconProps = {
        color: 'clear',
      };
    }
    return this.MenuItemIconProps;
  };

  getMenuItemContentProps = selected => ({
    weight: selected ? 'bold' : undefined,
  });

  handleSelect = event => {
    const { onSelect } = this.props;
    return onSelect(event.target.checked);
  };

  renderAvatar = () => {
    const { userId } = this.props;
    return (
      !!userId && (
        <GridItem>
          <AvatarByBadge
            userId={userId}
            xs
            imageSize={IMAGE_SIZES_CONSTANTS.XXS}
          />
        </GridItem>
      )
    );
  };

  renderTail = () => {
    const { renderTail } = this.props;
    return renderTail();
  };

  renderCheckbox = () => {
    const { selected, disabled } = this.props;
    return (
      <Checkbox
        checked={selected}
        disabled={disabled}
        disableRipple={false}
        onClick={this.handleSelect}
      />
    );
  };

  render = () => {
    const {
      classes,
      children,
      disabled,
      selected,
      onSelect,
      userId,
      renderTail,
      ...rest
    } = this.props;
    return (
      <GridContainer alignItems="center">
        {onSelect && <GridItem>{this.renderCheckbox()}</GridItem>}
        <GridItem xs>
          <PopperMenuItem
            disabled={disabled}
            icon={this.getIcon()}
            {...this.getMenuItemProps(selected)}
            {...rest}
          >
            <GridContainer wrap="nowrap" alignItems="center">
              <GridItem xs>
                <P dense {...this.getMenuItemContentProps(selected)}>
                  {children}
                </P>
              </GridItem>
              {this.renderTail()}
              {this.renderAvatar()}
            </GridContainer>
          </PopperMenuItem>
        </GridItem>
      </GridContainer>
    );
  };
}

EditableMenuItemValue.propTypes = {
  // hoc
  classes: PropTypes.object.isRequired,

  // parent
  children: PropTypes.any,
  selected: PropTypes.bool,
  onSelect: PropTypes.func,
  disabled: PropTypes.bool,
  hideIcon: PropTypes.bool,
  userId: PropTypes.number,
  renderTail: PropTypes.func,
};

EditableMenuItemValue.defaultProps = {
  children: null,
  selected: false,
  onSelect: null,
  disabled: false,
  hideIcon: false,
  userId: null,
  renderTail: () => null,
};

export default withStyles(style, {
  name: 'viewComponents/Editable/MenuItemValue',
})(EditableMenuItemValue);
