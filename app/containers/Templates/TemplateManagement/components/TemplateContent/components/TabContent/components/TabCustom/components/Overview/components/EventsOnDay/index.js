import { Can } from 'apis/components/Ability/components/Can';
import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import { withStyles } from 'components/material-ui';
import Popper from 'components/Popper';
import { TooltipIconButton } from 'containers/Templates/TemplateManagement/components/Event/components/Buttons';
import MenuItemButton from 'containers/Templates/TemplateManagement/components/Event/components/Buttons/components/MenuItemButton';
import { EVENT_STORE_HELPERS } from 'datastore/eventStore/helpers';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import {
  ACCOMMODATIONS,
  ACTIVITY_KEYS,
  AIR_TRANSPORTATIONS,
  EVENT_CONSTANTS,
  RAIL_TRANSPORTATIONS,
  ROAD_TRANSPORTATIONS,
  SEA_TRANSPORTATIONS,
} from 'utils/constants/events';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { EVENT } from 'utils/modelConstants';
import Button from 'viewComponents/Button';
import VIcon from 'viewComponents/Icon';
import { CONFIG } from './config';
import styles from './styles';

const HEADER_ACCOMMODATIONS = 'ACCOMMODATIONS';
const HEADER_ACTIVITIES = 'ACTIVITIES';
const HEADER_FOOD = 'FOOD';
const HEADER_TRANSPORTATION = 'TRANSPORTATION';

export class EventsOnDay extends PureComponent {
  newEvent = (e, props) => {
    const { id } = this.props;
    const { onOpen, type, subtype, iconOverride = {} } = props;

    this.props.resaga.setValue({
      selectedId: id,
      eventCreate: EVENT_STORE_HELPERS.setEventCreate(
        true,
        id,
        onOpen([type, subtype, iconOverride.type]),
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

  newAccommodation = event => {
    this.newEvent(event, {
      type: EVENT_CONSTANTS.TYPES.ACCOMMODATIONS.type,
      subtype: EVENT_CONSTANTS.ACCOMMODATIONS.HOTEL.type,
      onOpen: this.openCreateEventDialog,
    });
  };

  renderAddAccommodation = () =>
    this.renderAddEventButton({
      ...ACCOMMODATIONS.HOTEL,
      buttonTitle: 'Add accommodation',
      onClick: this.newAccommodation,
    });

  renderAddEventButton = ({ icon, buttonTitle, onClick }) => {
    const { classes } = this.props;

    return (
      <Button
        color="inline"
        size="xs"
        onClick={onClick}
        className={classes.addButton}
        buttonTitle={buttonTitle}
      >
        <GridContainer alignItems="center" spacing={0}>
          <GridItem>
            <VIcon icon={icon} size="extraSmall" />
          </GridItem>

          <div className={classes.plusIcon}>
            <VIcon icon="lnr-plus" bold />
          </div>
        </GridContainer>
      </Button>
    );
  };

  renderAddEventPopperButton = ({ type, subtype, buttonTitle, openMenu }) =>
    this.renderAddEventButton({
      ...EVENT_CONSTANTS[type][subtype],
      buttonTitle,
      onClick: openMenu,
    });

  renderEventMenuItem = ({ type, subtype, iconOverride = {}, closeMenu }) => {
    const { id } = this.props;

    return (
      <MenuItemButton
        key={`${subtype}${iconOverride.type}`}
        id={id}
        type={type}
        subtype={subtype}
        iconOverride={iconOverride}
        closeMenu={closeMenu}
      />
    );
  };

  renderAddActivityMenu = ({ type, closeMenu }) => (
    <GridContainer direction="column" spacing={0}>
      <GridItem>
        {ACTIVITY_KEYS.map(subtype =>
          this.renderEventMenuItem({ type, subtype, closeMenu }),
        )}
      </GridItem>
    </GridContainer>
  );

  renderAddActivity = () => (
    <Popper
      renderButton={this.renderAddEventPopperButton}
      stopPropagation
      type="ACTIVITIES"
      subtype="OTHER"
      buttonTitle="Add an activity"
    >
      {this.renderAddActivityMenu}
    </Popper>
  );

  renderAddTransportationMenu = ({ closeMenu }) => {
    const { classes } = this.props;

    return (
      <GridContainer>
        <GridItem>
          <GridContainer direction="column">
            <GridItem>
              <GridContainer direction="column" spacing={0}>
                <GridItem>
                  <div className={classes.menuItemHeader}>Air</div>
                </GridItem>
                <GridItem>
                  {AIR_TRANSPORTATIONS.map(subtype =>
                    this.renderEventMenuItem({
                      type: 'TRANSPORTATIONS',
                      subtype,
                      closeMenu,
                    }),
                  )}
                </GridItem>
              </GridContainer>
            </GridItem>
            <GridItem>
              <GridContainer direction="column" spacing={0}>
                <GridItem>
                  <div className={classes.menuItemHeader}>Sea</div>
                </GridItem>
                <GridItem>
                  {SEA_TRANSPORTATIONS.map(subtype =>
                    this.renderEventMenuItem({
                      type: 'TRANSPORTATIONS',
                      subtype,
                      closeMenu,
                    }),
                  )}
                </GridItem>
              </GridContainer>
            </GridItem>
          </GridContainer>
        </GridItem>
        <GridItem>
          <GridContainer direction="column" spacing={0}>
            <GridItem>
              <div className={classes.menuItemHeader}>Road</div>
            </GridItem>
            <GridItem>
              <GridContainer wrap="nowrap">
                <GridItem>
                  {ROAD_TRANSPORTATIONS.slice(0, 5).map(subtype =>
                    this.renderEventMenuItem({
                      type: 'TRANSPORTATIONS',
                      subtype,
                      closeMenu,
                    }),
                  )}
                </GridItem>
                <GridItem>
                  {ROAD_TRANSPORTATIONS.slice(5).map(subtype =>
                    this.renderEventMenuItem({
                      type: 'TRANSPORTATIONS',
                      subtype,
                      closeMenu,
                    }),
                  )}
                  <div className={classes.menuItemHeader}>Rail</div>
                  {RAIL_TRANSPORTATIONS.map(subtype =>
                    this.renderEventMenuItem({
                      type: 'TRANSPORTATIONS',
                      subtype,
                      closeMenu,
                    }),
                  )}
                </GridItem>
              </GridContainer>
            </GridItem>
          </GridContainer>
        </GridItem>
      </GridContainer>
    );
  };

  renderAddTransportation = () => (
    <Popper
      renderButton={this.renderAddEventPopperButton}
      stopPropagation
      type="TRANSPORTATIONS"
      subtype="CAR"
      buttonTitle="Add a transportation event"
    >
      {this.renderAddTransportationMenu}
    </Popper>
  );

  renderAddFoodMenu = ({ closeMenu }) => {
    const FOOD_ICONS = EVENT_CONSTANTS.ACTIVITIES.FOOD.iconOverrides;

    return (
      <GridContainer direction="column" spacing={0}>
        <GridItem>
          <GridContainer wrap="nowrap">
            <GridItem>
              {FOOD_ICONS.slice(0, 3).map(iconOverride =>
                this.renderEventMenuItem({
                  type: 'ACTIVITIES',
                  subtype: 'FOOD',
                  iconOverride,
                  closeMenu,
                }),
              )}
            </GridItem>
            <GridItem>
              {FOOD_ICONS.slice(3).map(iconOverride =>
                this.renderEventMenuItem({
                  type: 'ACTIVITIES',
                  subtype: 'FOOD',
                  iconOverride,
                  closeMenu,
                }),
              )}
            </GridItem>
          </GridContainer>
        </GridItem>
      </GridContainer>
    );
  };

  renderAddFood = () => (
    <Popper
      renderButton={this.renderAddEventPopperButton}
      stopPropagation
      type="ACTIVITIES"
      subtype="FOOD"
      buttonTitle="Add a food event"
    >
      {this.renderAddFoodMenu}
    </Popper>
  );

  renderAddEvent = () => {
    const { variant } = this.props;

    return LOGIC_HELPERS.switchCase(variant, {
      [HEADER_ACCOMMODATIONS]: this.renderAddAccommodation,
      [HEADER_ACTIVITIES]: this.renderAddActivity,
      [HEADER_TRANSPORTATION]: this.renderAddTransportation,
      [HEADER_FOOD]: this.renderAddFood,
    });
  };

  renderEventIcon = ({ id, position }) => {
    const { id: dayId, classes } = this.props;

    return (
      <GridItem key={`${id}.${position}`} className={classes.eventIcon}>
        <TooltipIconButton
          id={id}
          dayId={dayId}
          position={position}
          showSublabel={false}
          size="xs"
          showSubIcon={false}
        />
      </GridItem>
    );
  };

  render = () => {
    const { classes, events } = this.props;

    return (
      <GridItem className={classes.buttonOffsetLeft}>
        <GridContainer alignItems="center" spacing={0}>
          {events.map(this.renderEventIcon)}
          <Can do="create" on={EVENT}>
            <GridItem>{this.renderAddEvent()}</GridItem>
          </Can>
        </GridContainer>
      </GridItem>
    );
  };
}

EventsOnDay.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,
  resaga: PropTypes.object.isRequired,

  // parent props
  id: PropTypes.number, // day id
  variant: PropTypes.string,
  events: PropTypes.array,

  // resaga props
};

EventsOnDay.defaultProps = {
  events: [],
};

export default compose(
  withStyles(styles, { name: 'EventsOnDay' }),
  resaga(CONFIG),
)(EventsOnDay);
