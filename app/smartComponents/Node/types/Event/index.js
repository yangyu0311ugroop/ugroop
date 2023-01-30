import classnames from 'classnames';
import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import JText from 'components/JText';
import { withStyles } from 'components/material-ui';
import { withSMDown } from 'components/material-ui/hocs/withMediaQuery';
import SmartAmounts from 'containers/Portal/components/AddEvent/components/EventForm/parts/Amounts/components/SmartAmounts';

import { PORTAL_HELPERS } from 'containers/Portal/helpers';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import Attachments from 'smartComponents/Event/components/Event/layouts/Event/Attachments';
import Ratings from 'smartComponents/Event/components/Event/layouts/Event/Ratings';
import {
  EventBookingNumber,
  FlightBooking,
  TransportationBookingNumber,
} from 'smartComponents/Event/components/Event/parts';
import { FlightBookingNumber } from 'smartComponents/Event/components/FlightBooking/parts';
import BothTime from 'smartComponents/Node/types/Event/components/BothTime';
import ViewEventCard from 'smartComponents/Node/types/Event/components/ViewEvent';
import { EVENT_VIEW_HELPERS } from 'smartComponents/Node/types/Event/helpers';
import Icon from 'ugcomponents/Icon';
import { EVENT_CONSTANTS } from 'utils/constants/events';
import { EVENT_HELPERS } from 'utils/helpers/events';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { EventIcon } from 'viewComponents/Event';
import Tooltip from 'viewComponents/Tooltip';
import { CONFIG, CONFIG_EVENT_DATA } from './config';
import styles from './styles';

export class Event extends PureComponent {
  state = {};

  componentDidMount = () => {
    this.transitionProps = { timeout: { enter: 200, exit: 0 } };
  };

  event = () => {
    const { event, position } = this.props;

    return {
      ...event,
      position,
    };
  };

  openViewDialog = () => {
    this.openViewEvent();
  };

  openViewEvent = () => {
    const {
      id,
      dayId,
      portalId,
      readOnly,
      templateId,
      isPublic,
      badge,
    } = this.props;

    if (badge) return null;

    return PORTAL_HELPERS.openViewEvent(
      {
        id,
        flightBookingId: null,
        dayId,
        templateId,
        readOnly,
        isPublic,
      },
      this.props,
      portalId,
    );
  };

  renderPart = (Component, p = {}) => {
    const { id, dataId, templateId } = this.props;
    const { variant = EVENT_CONSTANTS.VARIANTS.valueOnly, ...rest } = p;

    return (
      <Component
        id={id}
        dataId={dataId}
        templateId={templateId}
        variant={variant}
        {...rest}
      />
    );
  };

  renderEventIconValue = () => {
    const { position } = this.props;

    const event = this.event();

    return (
      <EventIcon
        type={EVENT_VIEW_HELPERS.type(event)}
        subtype={EVENT_VIEW_HELPERS.subtype(event)}
        position={position}
        iconOverride={EVENT_VIEW_HELPERS.iconOverride(event)}
        size="small"
        // color="inherit"
      />
    );
  };

  renderLocation = () => {
    const event = this.event();

    const location = EVENT_VIEW_HELPERS.location(event);

    if (!location) return null;

    return (
      <GridItem xs>
        <JText gray ellipsis>
          {location}
        </JText>
      </GridItem>
    );
  };

  renderName = () => EVENT_VIEW_HELPERS.eventFullName(this.event());

  renderBothTime = (params = {}) => {
    const { classes, id, position, dayDate, smDown } = this.props;

    return (
      <BothTime
        id={id}
        smDown={smDown}
        position={position}
        dayDate={dayDate}
        className={LOGIC_HELPERS.ifElse(!smDown, classes.left)}
        {...params}
      />
    );
  };

  renderTime = () => {
    const { dayId } = this.props;

    const event = this.event();

    if (!dayId) {
      return this.renderBothTime({
        withoutDay: true,
        accommodation: EVENT_VIEW_HELPERS.isAccommodation(event),
      });
    }

    if (EVENT_VIEW_HELPERS.isAccommodation(event)) {
      return this.renderBothTime({
        labelStart: 'ARRIVING',
        labelEnd: 'DEPARTING',
      });
    }

    if (EVENT_VIEW_HELPERS.isCarHire(event)) {
      return this.renderBothTime({
        labelStart: 'PICK-UP',
        labelEnd: 'DROP-OFF',
      });
    }

    if (EVENT_VIEW_HELPERS.isTransportation(event)) {
      return this.renderBothTime({
        labelStart: 'DEPARTING',
        labelEnd: 'ARRIVING',
      });
    }

    if (EVENT_HELPERS.isEventCustomDate(EVENT_VIEW_HELPERS.subtype(event))) {
      return this.renderBothTime({
        hideEndTime: true,
      });
    }

    return this.renderBothTime();
  };

  renderSubDetailType = () => {
    const { classes } = this.props;
    const data = this.event();

    if (!EVENT_VIEW_HELPERS.isBus(data) && !EVENT_VIEW_HELPERS.isCoach(data)) {
      const iconOverride = EVENT_VIEW_HELPERS.iconOverride(data);

      return (
        <GridItem>
          <div className={classes.offsetTop}>
            <JText xs uppercase dark>
              {iconOverride || EVENT_VIEW_HELPERS.subTypeName(data)}
            </JText>
          </div>
        </GridItem>
      );
    }

    const subDetailType = EVENT_VIEW_HELPERS.subDetailType(data);

    return (
      <GridItem>
        <div className={classes.offsetTop}>
          <JText xs uppercase dark>
            {subDetailType}
          </JText>
        </div>
      </GridItem>
    );
  };

  renderEventIcon = () => {
    const { classes, smDown, middle } = this.props;

    const event = this.event();
    const smallEvent = middle || EVENT_VIEW_HELPERS.isPositionMiddle(event);

    return (
      <GridItem>
        <div
          className={classnames(
            LOGIC_HELPERS.ifElse(
              smallEvent,
              classes.eventIconMiddle,
              classes.eventIcon,
            ),
            LOGIC_HELPERS.ifElse([!smallEvent, smDown], classes.eventIconSm),
          )}
        >
          <GridContainer alignItems="center" spacing={0} wrap="nowrap">
            <GridItem>
              <div
                className={LOGIC_HELPERS.ifElse(
                  smallEvent,
                  classes.eventHeightMiddle,
                  classes.eventHeight,
                )}
              >
                &nbsp;
              </div>
            </GridItem>
            <GridItem xs>
              <GridContainer direction="column" spacing={0}>
                <GridItem>{this.renderEventIconValue()}</GridItem>
                {this.renderSubDetailType()}
              </GridContainer>
            </GridItem>
          </GridContainer>
        </div>
      </GridItem>
    );
  };

  renderFlightContent = () => {
    const { id, dataId, templateId, simplify, position } = this.props;

    const renderName = this.renderContentName(this.renderName());
    const airline = EVENT_VIEW_HELPERS.airline(this.event());
    const number = EVENT_VIEW_HELPERS.flightNumber(this.event());

    const flightNumber = LOGIC_HELPERS.ifElse(
      [airline, number],
      [airline, number].join(' '),
      '',
      true,
    );

    return (
      <GridItem xs>
        <GridContainer direction="column" spacing={0}>
          {renderName}

          {!simplify &&
            this.renderPart(FlightBooking, {
              component: GridItem,
            })}

          <GridItem>
            <GridContainer alignItems="center" wrap="nowrap">
              <Ratings
                badge
                id={id}
                dataId={dataId}
                templateId={templateId}
                component={GridItem}
              />

              {this.renderPart(FlightBooking, {
                component: GridItem,
                part: FlightBookingNumber,
              })}

              {LOGIC_HELPERS.ifElse(
                flightNumber,
                <GridItem>
                  <GridContainer alignItems="center" spacing={0} wrap="nowrap">
                    <GridItem>
                      <Icon
                        icon={LOGIC_HELPERS.ifElse(
                          position === 'start',
                          'ug-departure3',
                          'ug-arrival3',
                        )}
                        size="xsmall"
                        color="blue"
                        paddingRight
                      />
                    </GridItem>
                    <GridItem>
                      <JText blue uppercase ellipsis sm paddingRight>
                        {flightNumber}
                      </JText>
                    </GridItem>
                  </GridContainer>
                </GridItem>,
              )}

              {this.renderPart(Attachments, {
                component: GridItem,
              })}
            </GridContainer>
          </GridItem>
        </GridContainer>
      </GridItem>
    );
  };

  renderTransportationContent = () => {
    const { id, dataId, templateId, simplify } = this.props;

    const renderName = this.renderContentName(this.renderName());

    const address = EVENT_VIEW_HELPERS.location(this.event());

    return (
      <GridItem xs>
        <GridContainer direction="column" spacing={0}>
          {renderName}

          {address && (
            <GridItem xs>
              <JText gray ellipsis>
                {address}
              </JText>
            </GridItem>
          )}

          <GridItem>
            <GridContainer alignItems="center" spacing={0} wrap="nowrap">
              {!simplify &&
                this.renderPart(TransportationBookingNumber, {
                  component: GridItem,
                })}

              {this.renderPart(Attachments, {
                component: GridItem,
              })}

              <Ratings
                badge
                id={id}
                dataId={dataId}
                templateId={templateId}
                component={GridItem}
              />
            </GridContainer>
          </GridItem>
        </GridContainer>
      </GridItem>
    );
  };

  renderContentName = rendered => {
    const { classes, smDown } = this.props;

    return (
      <GridItem>
        <GridContainer alignItems="center" wrap="nowrap">
          {this.renderCancel()}

          <GridItem xs>
            <JText black lg={!smDown} ellipsis bold className={classes.hover}>
              {rendered}
            </JText>
          </GridItem>
        </GridContainer>
      </GridItem>
    );
  };

  renderAmount = () => {
    const { id, dataId, templateId, editing } = this.props;
    const event = this.event();

    if (EVENT_VIEW_HELPERS.isFlight(event)) return null;

    return (
      <SmartAmounts
        component={GridItem}
        id={id}
        dataId={dataId}
        templateId={templateId}
        data={event}
        showEmpty={editing}
      />
    );
  };

  renderContent = () => {
    const { id, dataId, templateId, simplify, isPublic } = this.props;

    const event = this.event();
    const name = this.renderName();

    if (EVENT_VIEW_HELPERS.isPositionMiddle(event)) {
      return (
        <GridItem xs>
          <GridContainer direction="column" spacing={0}>
            {this.renderContentName(name)}
          </GridContainer>
        </GridItem>
      );
    }

    if (EVENT_VIEW_HELPERS.isFlight(event)) {
      return this.renderFlightContent();
    }

    if (EVENT_VIEW_HELPERS.isTransportation(event)) {
      return this.renderTransportationContent();
    }

    return (
      <GridItem xs>
        <GridContainer direction="column" spacing={0}>
          {this.renderContentName(name)}

          {this.renderLocation()}

          <GridItem>
            <GridContainer alignItems="center" spacing={0} wrap="nowrap">
              {!simplify &&
                this.renderPart(EventBookingNumber, {
                  component: GridItem,
                })}

              {!isPublic &&
                this.renderPart(Attachments, {
                  component: GridItem,
                })}

              <Ratings
                badge
                id={id}
                dataId={dataId}
                templateId={templateId}
                component={GridItem}
              />
            </GridContainer>
          </GridItem>
        </GridContainer>
      </GridItem>
    );
  };

  renderCancel = () => {
    const { classes, event } = this.props;

    if (!EVENT_VIEW_HELPERS.isCancelled(event)) return null;

    return (
      <GridItem>
        <span className={classes.smallBadge}>
          <JText>CANCELLED</JText>
        </span>
      </GridItem>
    );
  };

  renderEventDefault = hideTooltip => {
    const {
      classes,
      component: Component,
      smDown,
      active,
      badge,
      checked,
      onClick,
      startTimeMode,
      startTimeValue,
      type,
      dataId,
    } = this.props;

    let eventRendered = (
      <GridContainer
        alignItems="center"
        wrap="nowrap"
        spacing={2}
        className={classnames(
          LOGIC_HELPERS.ifElse(badge, classes.itemBadge, classes.item),
          LOGIC_HELPERS.ifElse(active, classes.itemActive),
        )}
        onClick={this.openViewDialog}
      >
        {!smDown && this.renderTime()}

        {this.renderEventIcon()}

        <GridItem xs>
          <GridContainer direction="column" spacing={0}>
            {smDown && this.renderTime()}

            {this.renderContent()}
          </GridContainer>
        </GridItem>
      </GridContainer>
    );

    if (!hideTooltip) {
      eventRendered = this.renderWithTooltip(eventRendered);
    }

    const rendered = (
      <Component>
        <GridContainer alignItems="center" wrap="nowrap" spacing={2}>
          <GridItem xs>{eventRendered}</GridItem>

          {this.renderAmount()}
        </GridContainer>
      </Component>
    );

    if (!badge) {
      return rendered;
    }

    return (
      <GridItem
        xs={12}
        sm={6}
        onClick={() => onClick({ startTimeMode, startTimeValue, type, dataId })}
      >
        <div className={classnames(classes.event, checked && classes.selected)}>
          <GridContainer alignItems="center" wrap="nowrap">
            <GridItem>
              <Icon
                color={LOGIC_HELPERS.ifElse(checked, 'transportation')}
                size="small"
                icon={LOGIC_HELPERS.ifElse(
                  checked,
                  'lnr-check-square',
                  'lnr-square',
                )}
              />
            </GridItem>
            <GridItem xs>{rendered}</GridItem>
          </GridContainer>
        </div>
      </GridItem>
    );
  };

  renderWithTooltip = rendered => (
    <Tooltip
      isLight
      interactive
      placement="left"
      title={this.renderTooltipContent()}
      enterDelay={700}
    >
      {rendered}
    </Tooltip>
  );

  renderTooltipContent = () => {
    const { id, isPublic } = this.props;

    return <ViewEventCard id={id} isPublic={isPublic} tooltip action="view" />;
    // return (
    //   <TooltipContent
    //     id={id}
    //     dataId={dataId}
    //     position={position}
    //     onView={this.openViewDialog}
    //     isPublic={isPublic}
    //   />
    // );
  };

  render = () => {
    const { dataId, smDown } = this.props;

    if (!dataId) return null;

    return this.renderEventDefault(smDown);
  };
}

Event.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,
  resaga: PropTypes.object.isRequired,
  smDown: PropTypes.bool,

  // parent props
  variant: PropTypes.string,
  component: PropTypes.node,
  id: PropTypes.number,
  dayId: PropTypes.number,
  tabId: PropTypes.number,
  portalId: PropTypes.number,
  active: PropTypes.bool,
  badge: PropTypes.bool,
  position: PropTypes.string,
  mode: PropTypes.string,
  dayCount: PropTypes.number,
  simplify: PropTypes.bool,
  withoutTime: PropTypes.bool,
  readOnly: PropTypes.bool,
  middle: PropTypes.bool,
  checked: PropTypes.bool,
  showAmounts: PropTypes.bool,
  editing: PropTypes.bool,
  value: PropTypes.any,
  dayDate: PropTypes.any,
  startTimeMode: PropTypes.any,
  startTimeValue: PropTypes.any,
  type: PropTypes.any,
  onClick: PropTypes.func,
  onEdit: PropTypes.func,

  // resaga props
  event: PropTypes.object,
  templateId: PropTypes.number,
  dataId: PropTypes.number,
  vicinity: PropTypes.string,
  isPublic: PropTypes.bool,
};

Event.defaultProps = {
  component: 'span',
  event: {},
  isPublic: false,
};

export default compose(
  withStyles(styles, { name: 'Event' }),
  resaga(CONFIG),
  resaga(CONFIG_EVENT_DATA),
  withSMDown,
)(Event);
