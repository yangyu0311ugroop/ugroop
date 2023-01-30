import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import classNames from 'classnames';
import { NODE_CONSTANTS } from 'utils/constants/nodes';
import { EVENT_CONSTANTS, EVENT_DETAILS_VARIANT } from 'utils/constants/events';
import { EventIcon } from 'viewComponents/Event';
import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import Button from 'ugcomponents/Buttons/Button/index';
import Map from 'smartComponents/Event/components/Event/layouts/Event/Map';
import TransportationLocations from 'smartComponents/Event/components/Event/layouts/Transportation/Destination/components/Locations';
import Distance from 'smartComponents/Event/components/Event/parts/Event/Distance';
import {
  EventType,
  EventSubtype,
  EventName,
  EventStartTime,
  EventMiddleTime,
  EventEndTime,
  EventDuration,
  EventLocation,
  FlightStartAirport,
  FlightEndAirport,
  TransportationStart,
  TransportationEnd,
  EventUrl,
} from 'smartComponents/Event/components/Event/parts';
import Card from 'ugcomponents/Card';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { NODE_HELPERS } from 'utils/helpers/nodes';
import P from 'viewComponents/Typography';
import { MOMENT_HELPERS } from 'utils/helpers/moment';
import { EVENT_STORE_HELPERS } from 'datastore/eventStore/helpers';
import { EVENT_HELPERS } from 'utils/helpers/events';
import RateSummary from 'smartComponents/Node/components/Ratings/components/RateSummary';
import { get } from 'lodash';
import { Hidden } from '@material-ui/core';

import { CONFIG_ID, CONFIG } from './config';
import styles from './styles';

// TODO: Convert to a smartComponents/Event/layout variant which renders parts in a card variant
export class EventDetails extends PureComponent {
  isActive = () => this.props.active;

  hasStartTime = () => {
    const { singleDayEvent, position } = this.props;
    return singleDayEvent || position === NODE_CONSTANTS.POSITIONS.start;
  };

  hasMiddleTime = () => {
    const { position } = this.props;
    return position === NODE_CONSTANTS.POSITIONS.middle;
  };

  hasEndTime = () => {
    const { singleDayEvent, position, event } = this.props;
    const subType = get(event, 'detail.type', '');
    if (EVENT_HELPERS.isEventCustomDate(subType)) return false;
    return singleDayEvent || position === NODE_CONSTANTS.POSITIONS.end;
  };

  handleButtonEnter = () => {
    this.props.resaga.setValue({ active: true });
  };

  handleButtonLeave = () => {
    this.props.resaga.setValue({ active: false });
  };

  handleButtonFocus = () => {};

  hasActualEndTime = () => {
    const { calculatedEndTime, calculatedTimeMode, event } = this.props;
    const subType = get(event, 'detail.type', '');
    if (EVENT_HELPERS.isEventCustomDate(subType)) return false;
    return !!NODE_HELPERS.renderTime(calculatedEndTime, calculatedTimeMode, {
      omitDate: true,
    });
  };

  openViewDialog = () => {
    const { id } = this.props;
    this.props.resaga.setValue({
      eventView: EVENT_STORE_HELPERS.setEventView(true, id),
    });
  };

  eventClicked = event => {
    event.preventDefault();
    this.openViewDialog();
  };

  isTransportation = () => {
    const { type } = this.props.event;
    return type === EVENT_CONSTANTS.EVENTS.TRANSPORTATION.type;
  };

  isFlight = () => {
    const subType = get(this.props.event, 'detail.type', '');
    return subType === EVENT_CONSTANTS.TRANSPORTATIONS.FLIGHT.type;
  };

  renderPart = (Component, p = {}) => {
    const { id, dataId, templateId } = this.props;
    const { variant = EVENT_CONSTANTS.VARIANTS.label, ...rest } = p;
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

  renderType = () => {
    const { classes, variant } = this.props;
    return (
      <GridItem>
        <GridContainer
          className={LOGIC_HELPERS.ifElse(
            variant === EVENT_DETAILS_VARIANT.LIST,
            classes.listType,
            classes.type,
          )}
        >
          {this.renderPart(EventType, {
            variant: EVENT_CONSTANTS.VARIANTS.labelValue,
          })}
          {this.renderPart(EventSubtype, {
            variant: EVENT_CONSTANTS.VARIANTS.labelValue,
          })}
        </GridContainer>
      </GridItem>
    );
  };

  renderSubType = () => {
    const { classes, variant } = this.props;
    return (
      <GridItem>
        <GridContainer
          className={LOGIC_HELPERS.ifElse(
            variant === EVENT_DETAILS_VARIANT.LIST,
            classes.listType,
            classes.type,
          )}
        >
          {this.renderPart(EventSubtype, {
            variant: EVENT_CONSTANTS.VARIANTS.label,
          })}
        </GridContainer>
      </GridItem>
    );
  };

  renderDuration = () => {
    const { classes } = this.props;
    return (
      <GridItem className={classes.duration}>
        {this.renderPart(EventDuration, { omitPrefix: true })}
      </GridItem>
    );
  };

  renderTime = () => {
    const start = this.hasStartTime()
      ? this.renderPart(EventStartTime, { omitDate: true, showEmpty: true })
      : null;
    const middle = this.hasMiddleTime()
      ? this.renderPart(EventMiddleTime)
      : null;
    const end = this.hasEndTime()
      ? this.renderPart(EventEndTime, { omitDate: true, showEmpty: true })
      : null;

    const renderWithDuration = node => (
      <GridItem>
        <GridContainer spacing={0}>
          {node}
          <GridItem xs />
          {this.renderDuration()}
        </GridContainer>
      </GridItem>
    );

    return (
      <React.Fragment>
        {this.isFlight() && start && this.renderAirportLocationStart()}
        {start && !end ? renderWithDuration(start) : start}
        {this.isTransportation() &&
          this.renderPart(TransportationStart, {
            variant: EVENT_CONSTANTS.VARIANTS.icon,
            noViewLinkIcon: true,
            showLabel: false,
            linkClassName: this.props.classes.location,
          })}
        {middle}
        {this.isFlight() && end && this.renderAirportLocationEnd()}
        {(start && end) || (this.isFlight() && !start)
          ? renderWithDuration(end)
          : end}
        {this.isTransportation() &&
          this.renderPart(TransportationEnd, {
            variant: EVENT_CONSTANTS.VARIANTS.icon,
            noViewLinkIcon: true,
            showLabel: false,
            linkClassName: this.props.classes.location,
          })}
      </React.Fragment>
    );
  };

  renderTimeAsRange = () => {
    const startTime = MOMENT_HELPERS.renderTime(this.props.calculatedStartTime);
    let start = this.renderPart(EventStartTime, {
      omitDate: true,
      showEmpty: true,
      renderPrefix: this.renderPrefix(''),
    });
    if (this.hasActualEndTime()) {
      start = (
        <GridItem>
          <P dense>{startTime}</P>
        </GridItem>
      );
    }
    const end = this.hasEndTime()
      ? this.renderPart(EventEndTime, {
          omitDate: true,
          showEmpty: false,
          renderPrefix: this.renderPrefix('-'),
        })
      : null;
    return (
      <GridItem>
        <GridContainer direction="row">
          {start}
          {end}
        </GridContainer>
      </GridItem>
    );
  };

  renderName = () =>
    this.renderPart(EventName, {
      variant: EVENT_CONSTANTS.VARIANTS.labelValue,
    });

  renderLocation = (noViewLinkIcon = true) =>
    this.renderPart(EventLocation, {
      variant: EVENT_CONSTANTS.VARIANTS.labelValue,
      noViewLinkIcon,
    });

  renderLocationList = (noViewLinkIcon = true) => {
    if (this.isTransportation()) {
      return (
        <React.Fragment>
          <GridContainer>
            <GridItem className={this.props.classes.locationsContainer}>
              {this.renderPart(TransportationStart, {
                variant: EVENT_CONSTANTS.VARIANTS.icon,
                noViewLinkIcon,
                showLabel: true,
                linkClassName: this.props.classes.location,
                labelDirection: 'row',
                label: 'Departing:',
              })}
              {this.renderPart(TransportationEnd, {
                variant: EVENT_CONSTANTS.VARIANTS.icon,
                noViewLinkIcon,
                showLabel: true,
                linkClassName: this.props.classes.location,
                labelDirection: 'row',
                label: 'Arriving:',
              })}
            </GridItem>
            <GridItem>
              <Distance
                variant={EVENT_CONSTANTS.VARIANTS.labelValue}
                dataId={this.props.dataId}
              />
            </GridItem>
          </GridContainer>
        </React.Fragment>
      );
    }
    return this.renderPart(EventLocation, {
      variant: EVENT_CONSTANTS.VARIANTS.labelValue,
      noViewLinkIcon,
    });
  };

  renderAirport = () => {
    const { position } = this.props;
    const start = position === NODE_CONSTANTS.POSITIONS.start;
    const end = position === NODE_CONSTANTS.POSITIONS.end;
    return (
      (start || end) && (
        <React.Fragment>
          {start &&
            this.renderPart(FlightStartAirport, {
              variant: EVENT_CONSTANTS.VARIANTS.card,
            })}
          {end &&
            this.renderPart(FlightEndAirport, {
              variant: EVENT_CONSTANTS.VARIANTS.card,
            })}
        </React.Fragment>
      )
    );
  };

  renderAirportLocationStart = () => {
    const { position } = this.props;
    const start = position === NODE_CONSTANTS.POSITIONS.start;
    const end = position === NODE_CONSTANTS.POSITIONS.end;
    return (
      (start || end) && (
        <React.Fragment>
          {this.renderPart(FlightStartAirport, {
            variant: EVENT_CONSTANTS.VARIANTS.card,
          })}
        </React.Fragment>
      )
    );
  };

  renderAirportLocationEnd = () => {
    const { position } = this.props;
    const start = position === NODE_CONSTANTS.POSITIONS.start;
    const end = position === NODE_CONSTANTS.POSITIONS.end;
    return (
      (start || end) && (
        <React.Fragment>
          {this.renderPart(FlightEndAirport, {
            variant: EVENT_CONSTANTS.VARIANTS.card,
          })}
        </React.Fragment>
      )
    );
  };

  renderDetails = event =>
    event && (
      <GridContainer
        className={this.props.classes.details}
        direction="column"
        spacing={0}
        wrap="nowrap"
      >
        {this.renderType()}
        <GridItem className={this.props.classes.eventName}>
          {this.renderName()}
        </GridItem>
        <GridItem />
        {this.renderTime()}
        <GridItem className={this.props.classes.locationCard}>
          {this.renderLocation()}
        </GridItem>
      </GridContainer>
    );

  renderPrefix = value => () => value;

  renderList = () => {
    const { classes, position, event, dataId, id } = this.props;
    const { type, detail } = event;
    const { type: subtype, iconOverride } = detail || {};
    const icon = (
      <GridItem className={classes.iconContainer}>
        <EventIcon
          type={type}
          subtype={subtype}
          position={position}
          size="small"
          iconOverride={iconOverride}
        />
      </GridItem>
    );

    const listContent = (
      <GridContainer spacing={0}>
        <GridItem xs={12}>
          <RateSummary id={id} />
        </GridItem>
        <GridItem xs={12}>
          <GridContainer spacing={0}>
            <GridItem className={classes.firstLine}>
              <GridContainer direction="row" alignItems="center">
                {this.renderTimeAsRange()}
                {icon}
                {this.renderSubType()}
                <Hidden xsDown>
                  <GridItem className={classes.eventNameList}>
                    {this.renderName()}
                  </GridItem>
                </Hidden>
                <Hidden smUp>
                  <GridItem className={classes.eventNameListSM}>
                    {this.renderName()}
                  </GridItem>
                </Hidden>
              </GridContainer>
            </GridItem>
            <GridItem>{this.renderDuration()}</GridItem>
          </GridContainer>
        </GridItem>
        <GridItem xs={12}>{this.renderLocationList(false)}</GridItem>
        <GridItem xs={12}>
          <EventUrl
            dataId={dataId}
            readOnly
            variant={EVENT_CONSTANTS.VARIANTS.labelValueStacked}
          />
        </GridItem>
      </GridContainer>
    );
    return (
      <GridItem
        className={classNames(classes.list, this.isActive() && classes.active)}
      >
        <div className={classes.hidden}>
          <TransportationLocations setter dataId={dataId} />
          <Map setter dataId={dataId} />
        </div>
        <Button
          onClick={this.eventClicked}
          className={classes.buttonList}
          onFocus={this.handleButtonFocus}
          disableRipple
          onMouseEnter={this.handleButtonEnter}
          onMouseLeave={this.handleButtonLeave}
        >
          {listContent}
        </Button>
      </GridItem>
    );
  };

  renderCard = () => {
    const {
      classes,
      position,
      dense,
      event,
      singleDayEvent,
      dataId,
    } = this.props;
    const { type, detail } = event;
    const { type: subtype, iconOverride } = detail || {};

    return (
      <GridItem
        className={classNames(classes.item, { [classes.dense]: dense })}
        sm={6}
        md={4}
        lg={3}
      >
        <div className={classes.hidden}>
          <TransportationLocations setter dataId={dataId} />
          <Map setter dataId={dataId} />
        </div>
        <Card
          className={classNames(
            classes.root,
            this.isActive() && classes.active,
          )}
        >
          <div className={classes.card}>
            <div>
              <div
                className={classNames(
                  classes.icon,
                  this.isFlight() && classes.iconStart,
                )}
              >
                <EventIcon
                  type={type}
                  subtype={subtype}
                  position={position}
                  size="small"
                  iconOverride={iconOverride}
                  showSubIcon={!singleDayEvent}
                />
              </div>
              {this.isFlight() && singleDayEvent && (
                <div className={classNames(classes.icon, classes.iconEnd)}>
                  <EventIcon
                    type={type}
                    subtype={subtype}
                    position={NODE_CONSTANTS.POSITIONS.end}
                    size="small"
                    iconOverride={iconOverride}
                    showSubIcon={!singleDayEvent}
                  />
                </div>
              )}
            </div>
            {this.renderDetails(event)}
          </div>
        </Card>
      </GridItem>
    );
  };

  render = () => {
    const { event, variant } = this.props;
    return (
      !!event &&
      LOGIC_HELPERS.switchCase(variant, {
        [EVENT_DETAILS_VARIANT.DEFAULT]: this.renderCard,
        [EVENT_DETAILS_VARIANT.LIST]: this.renderList,
      })
    );
  };
}

EventDetails.propTypes = {
  // hoc
  classes: PropTypes.object.isRequired,
  resaga: PropTypes.object.isRequired,
  // parent
  id: PropTypes.number,
  position: PropTypes.string,
  dense: PropTypes.bool,
  singleDayEvent: PropTypes.bool,
  variant: PropTypes.string,

  // resaga value
  dataId: PropTypes.number,
  templateId: PropTypes.number,
  event: PropTypes.object,
  active: PropTypes.bool,
  calculatedStartTime: PropTypes.object,
  calculatedEndTime: PropTypes.object,
  calculatedTimeMode: PropTypes.string,
};

EventDetails.defaultProps = {
  id: 0,
  position: null,
  dense: false,
  singleDayEvent: false,

  dataId: 0,
  templateId: 0,
  event: null,
  active: false,
  variant: EVENT_DETAILS_VARIANT.DEFAULT,
};

export default compose(
  withStyles(styles, { name: 'EventDetails' }),
  resaga(CONFIG_ID),
  resaga(CONFIG),
)(EventDetails);
