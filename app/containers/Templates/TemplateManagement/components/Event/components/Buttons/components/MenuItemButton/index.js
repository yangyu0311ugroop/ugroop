import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
// import { withStyles } from 'components/material-ui';
import MenuItem from 'components/Popper/components/MenuItem';
import { EVENT_STORE_HELPERS } from 'datastore/eventStore/helpers';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import { EVENT_CONSTANTS } from 'utils/constants/events';
import dotProp from 'dot-prop-immutable';
import VIcon from 'viewComponents/Icon';
import { CONFIG } from './config';
// import styles from './styles';

export class MenuItemButton extends PureComponent {
  newEvent = (e, props) => {
    const { id } = this.props;
    const {
      onOpen,
      type,
      subtype,
      iconOverride = {},
      typeOpen,
      subtypeOpen,
    } = props;

    this.props.resaga.setValue({
      selectedId: id,
      eventCreate: EVENT_STORE_HELPERS.setEventCreate(
        true,
        id,
        onOpen([type, subtype, iconOverride.type], typeOpen, subtypeOpen),
      ),
    });
  };

  openCreateEventDialog = (
    [formType, formSubtype, iconOverride = ''],
    typeOpen = false,
    subtypeOpen = false,
  ) => () => {
    this.props.resaga.setValue({
      formType,
      formSubtype,
      iconOverride,
    });

    return { typeOpen, subtypeOpen };
  };

  name = (event, iconOverride) => {
    const { name } = this.props;

    return name || iconOverride.name || event.name;
  };

  icon = (event, iconOverride) => iconOverride.icon || event.icon;

  color = event => event.color;

  renderAddEventMenuButton = (event, iconOverride) => {
    const name = this.name(event, iconOverride);
    const icon = this.icon(event, iconOverride);
    const color = this.color(event);
    const style = { color };

    // TODO: Probably remove if ever we decided to create our own icon for bicycle that is same with other transportation icons
    if (icon === 'lnr-bicycle') style.lineHeight = 0.5;

    return (
      <GridContainer alignItems="center" wrap="nowrap">
        <GridItem>
          <VIcon icon={icon} size="extraSmall" style={style} />
        </GridItem>
        <GridItem>{name}</GridItem>
      </GridContainer>
    );
  };

  render = () => {
    const {
      type,
      subtype,
      iconOverride,
      closeMenu,
      typeOpen,
      subtypeOpen,
      onClick,
    } = this.props;

    if (typeof onClick === 'function') {
      return (
        <MenuItem onClick={onClick} closeMenu={closeMenu}>
          {this.renderAddEventMenuButton(
            EVENT_CONSTANTS[type][subtype],
            iconOverride,
          )}
        </MenuItem>
      );
    }

    const t = dotProp.get(EVENT_CONSTANTS, `TYPES.${type}.type`);
    const st = dotProp.get(EVENT_CONSTANTS, `${type}.${subtype}.type`);

    return (
      <MenuItem
        onClick={this.newEvent}
        onOpen={this.openCreateEventDialog}
        type={t}
        subtype={st}
        iconOverride={iconOverride}
        closeMenu={closeMenu}
        typeOpen={typeOpen}
        subtypeOpen={subtypeOpen}
      >
        {this.renderAddEventMenuButton(
          EVENT_CONSTANTS[type][subtype],
          iconOverride,
        )}
      </MenuItem>
    );
  };
}

MenuItemButton.propTypes = {
  // hoc props
  resaga: PropTypes.object.isRequired,

  // parent props
  id: PropTypes.number, // event node id
  type: PropTypes.string,
  subtype: PropTypes.string,
  name: PropTypes.string,
  iconOverride: PropTypes.object,
  closeMenu: PropTypes.func,
  onClick: PropTypes.func,
  typeOpen: PropTypes.bool,
  subtypeOpen: PropTypes.bool,

  // resaga props
};

MenuItemButton.defaultProps = {
  iconOverride: {},
};

export default compose(
  // withStyles(styles, { name: 'MenuItemButton' }),
  resaga(CONFIG),
)(MenuItemButton);
