/**
 * Created by stephenkarpinskyj on 16/3/18.
 */
import isURL from 'validator/lib/isURL';
import { ability } from 'apis/components/Ability/ability';
import { PARTICIPANT } from 'utils/modelConstants';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import resaga from 'resaga';
import { withStyles } from '@material-ui/core/styles';
import { Card, CardContent } from '@material-ui/core';
import get from 'lodash/get';

import { EMPTY_RTE, ICON, POPPER, URL_HELPERS, LIST } from 'appConstants';
import { TRANSPORTATION_END_LOC_INPUTS } from 'smartComponents/Event/components/Event/parts/Transportation/End/inputs';
import { TRANSPORTATION_START_LOC_INPUTS } from 'smartComponents/Event/components/Event/parts/Transportation/Start/inputs';
import { NODE_CONSTANTS } from 'utils/constants/nodes';
import { EVENT_CONSTANTS } from 'utils/constants/events';
import { EVENT_PATHS } from 'datastore/eventStore/constants';
import { EVENT_HELPERS } from 'utils/helpers/events';
import { EVENT_STORE_HOC } from 'datastore/eventStore/hoc';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { isEmptyString } from 'utils/stringAdditions';
import { H4 } from 'viewComponents/Typography';
import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import Hr from 'components/Hr';
import RichTextEditor from 'ugcomponents/RichTextEditor';
import Attachment from 'viewComponents/Attachment';
import TransportationLocations from 'smartComponents/Event/components/Event/layouts/Transportation/Destination/components/Locations';
import Distance from 'smartComponents/Event/components/Event/parts/Event/Distance';
import Map from 'smartComponents/Event/components/Event/layouts/Event/Map';
import {
  EventType,
  EventSubtype,
  EventBookingConfirmed,
  EventName,
  EventStartTime,
  EventEndTime,
  EventDuration,
  FlightStartAirport,
  FlightEndAirport,
  FlightBooking,
  FlightTerminal,
  FlightAirline,
  FlightNumber,
  FlightGate,
  TransportationStart,
  TransportationEnd,
  ActivityDetailStartLocation,
  ActivityDetailEndLocation,
} from 'smartComponents/Event/components/Event/parts';
import GoogleMaps from 'utils/hoc/withGoogleMaps';
import RateSummary from 'smartComponents/Node/components/Ratings/components/RateSummary';

import { FIRST_CONFIG, SECOND_CONFIG, THIRD_CONFIG } from './config';
import style from '../../../style';

// TODO: Convert to an Event/layouts variant which renders Event/parts in a tooltip variant
export class EventIconTooltipContent extends PureComponent {
  isActivity = type => type === EVENT_CONSTANTS.EVENTS.ACTIVITY.type;

  isFlight = (type, subtype) =>
    type === EVENT_CONSTANTS.EVENTS.TRANSPORTATION.type &&
    subtype === EVENT_CONSTANTS.TRANSPORTATIONS.FLIGHT.type;

  isEnd = position => NODE_CONSTANTS.POSITIONS.end === position;

  isStart = position => NODE_CONSTANTS.POSITIONS.start === position;

  isVehicleHire = (type, subtype) =>
    type === EVENT_CONSTANTS.EVENTS.TRANSPORTATION.type &&
    subtype === EVENT_CONSTANTS.TRANSPORTATIONS.VEHICLE_HIRE.type;

  hasActivityDetail = icon => icon === 'Cycling';

  renderPart = (Component, props = {}) => {
    const { id, dataId, templateId } = this.props;
    return (
      <Component
        id={id}
        dataId={dataId}
        templateId={templateId}
        variant={EVENT_CONSTANTS.VARIANTS.label}
        {...props}
      />
    );
  };

  renderType = () => {
    const { isPublic } = this.props;
    const showBookingNumberValue = LOGIC_HELPERS.ifElse(
      ability.can('execute', PARTICIPANT),
      false,
      true,
    );
    return (
      <GridItem>
        <GridContainer alignItems="center">
          <GridItem>
            <GridContainer>
              {this.renderPart(EventType, {
                variant: EVENT_CONSTANTS.VARIANTS.labelValue,
              })}
              {this.renderPart(EventSubtype, {
                variant: EVENT_CONSTANTS.VARIANTS.labelValue,
              })}
            </GridContainer>
          </GridItem>
          <GridItem xs />
          {this.renderPart(EventBookingConfirmed, {
            iconAndValue: showBookingNumberValue,
          })}
          {!isPublic && this.renderAttachmentIcon()}
        </GridContainer>
      </GridItem>
    );
  };

  renderName = () =>
    this.renderPart(EventName, {
      variant: EVENT_CONSTANTS.VARIANTS.labelValue,
      Typography: H4,
    });

  renderTime = (activity, nonAerial, position, subtype = '') => {
    const { iconOverride } = this.props;
    const hideEndDate = EVENT_HELPERS.isEventCustomDate(subtype);

    if (this.hasActivityDetail(iconOverride)) return null;

    const start =
      (activity || position === NODE_CONSTANTS.POSITIONS.start) && !nonAerial;
    const end =
      (activity || position === NODE_CONSTANTS.POSITIONS.end) && !nonAerial;
    return (
      <React.Fragment>
        {start &&
          this.renderPart(EventStartTime, {
            customLabel: LOGIC_HELPERS.ifElse(hideEndDate, 'Time:', null),
          })}
        {end && !hideEndDate && this.renderPart(EventEndTime)}
        {(start || nonAerial) && this.renderPart(EventDuration)}
      </React.Fragment>
    );
  };

  renderDistance = () => {
    const { dataId } = this.props;
    return (
      <GridItem>
        <Distance
          variant={EVENT_CONSTANTS.VARIANTS.labelValue}
          dataId={dataId}
        />
      </GridItem>
    );
  };

  renderStartLocation = (nonAerial, vehicleHire) =>
    nonAerial &&
    this.renderPart(TransportationStart, {
      variant: EVENT_CONSTANTS.VARIANTS.label,
      label: LOGIC_HELPERS.ifElse(
        vehicleHire,
        TRANSPORTATION_START_LOC_INPUTS.vehicleHireLabel,
        undefined,
      ),
      linkClassName: this.props.classes.location,
      labelSibling: this.renderPart(EventStartTime, {
        hasLabelPrefix: false,
        templateId: this.props.templateId,
        id: this.props.id,
        variant: EVENT_CONSTANTS.VARIANTS.labelValueWithHomeTime,
      }),
    });

  renderEndLocation = (nonAerial, vehicleHire) =>
    nonAerial &&
    this.renderPart(TransportationEnd, {
      variant: EVENT_CONSTANTS.VARIANTS.label,
      label: LOGIC_HELPERS.ifElse(
        vehicleHire,
        TRANSPORTATION_END_LOC_INPUTS.vehicleHireLabel,
        undefined,
      ),
      linkClassName: this.props.classes.location,
      labelSibling: this.renderPart(EventEndTime, {
        hasLabelPrefix: false,
        templateId: this.props.templateId,
        variant: EVENT_CONSTANTS.VARIANTS.labelValueWithHomeTime,
        id: this.props.id,
      }),
    });

  renderAirline = flight =>
    flight &&
    this.renderPart(FlightAirline, { variant: EVENT_CONSTANTS.VARIANTS.label });

  renderTerminal = (flight, position) =>
    flight &&
    this.isStart(position) &&
    this.renderPart(FlightTerminal, {
      variant: EVENT_CONSTANTS.VARIANTS.label,
    });

  renderFlightNumber = flight =>
    flight &&
    this.renderPart(FlightNumber, { variant: EVENT_CONSTANTS.VARIANTS.label });

  renderGate = (flight, position) =>
    flight &&
    this.isStart(position) &&
    this.renderPart(FlightGate, { variant: EVENT_CONSTANTS.VARIANTS.label });

  renderAirport = (flight, position) => {
    const start = flight && this.isStart(position);
    const end = flight && this.isEnd(position);
    return (
      <React.Fragment>
        <GridItem>
          {start &&
            this.renderPart(FlightStartAirport, {
              variant: EVENT_CONSTANTS.VARIANTS.label,
            })}
          {end &&
            this.renderPart(FlightEndAirport, {
              variant: EVENT_CONSTANTS.VARIANTS.label,
            })}
        </GridItem>
      </React.Fragment>
    );
  };

  renderFlightBooking = flight => flight && this.renderPart(FlightBooking);

  // TODO: Use render description part
  renderDescription = (description, id) => {
    const { classes } = this.props;
    return !!description && description !== EMPTY_RTE ? (
      <GridItem>
        <RichTextEditor
          readOnly
          wrapperClassname={classes.description}
          initContent={description}
          toolBarId={`eventTooltipToolbar${id}`}
        />
      </GridItem>
    ) : null;
  };

  renderLocationLink = location => map => {
    const { classes } = this.props;
    const href = map.url || location.name;
    return (
      <a className={classes.location} target="_blank" href={href}>
        {location.name}
      </a>
    );
  };

  renderAttachmentIcon = () => {
    const { eventAttachments, links, names, attachmentOnly } = this.props;
    const filteredLinks = links
      ? links.filter(link => typeof link !== 'object')
      : [];
    const filteredNames = names
      ? names.filter(name => typeof name !== 'object')
      : [];

    if (eventAttachments.length === 0) {
      return null;
    }

    if (eventAttachments.length === 1 && !attachmentOnly) {
      return (
        <GridItem>
          <Attachment link={filteredLinks[0]} variant={ICON} />
        </GridItem>
      );
    }

    return (
      <GridItem>
        <Attachment
          links={filteredLinks}
          names={filteredNames}
          variant={LOGIC_HELPERS.ifElse(attachmentOnly, LIST, POPPER)}
        />
      </GridItem>
    );
  };

  renderActivityDetails = () => {
    const { dataId, iconOverride } = this.props;

    if (!this.hasActivityDetail(iconOverride)) return null;

    return (
      <>
        {this.renderPart(ActivityDetailStartLocation, {
          dataId,
          labelSibling: this.renderPart(EventStartTime, {
            hasLabelPrefix: false,
          }),
          linkClassName: this.props.classes.location,
        })}
        {this.renderPart(ActivityDetailEndLocation, {
          dataId,
          labelSibling: this.renderPart(EventEndTime, {
            hasLabelPrefix: false,
          }),
          linkClassName: this.props.classes.location,
        })}
      </>
    );
  };

  renderFooter = (location, url) => {
    const { classes } = this.props;

    const locationName = get(location, 'name', '');

    const urlSection = isEmptyString(url) ? null : (
      <GridItem>
        <GridContainer direction="column" spacing={0}>
          <GridItem>
            <p className={classes.locationTitle}>URL</p>
          </GridItem>
          <GridItem>
            {isURL(url) ? (
              <a
                className={classes.location}
                target="_blank"
                href={`//${URL_HELPERS.makeUrl(url)}`}
              >
                {url}
              </a>
            ) : (
              url
            )}
          </GridItem>
        </GridContainer>
      </GridItem>
    );

    const locationSection = !isEmptyString(locationName) ? (
      <GridItem>
        <GridContainer direction="column" spacing={0}>
          <GridItem>
            <Hr className={classes.hr} />
          </GridItem>
          <GridItem>
            <p className={classes.locationTitle}>Location</p>
          </GridItem>
          <GridItem>
            <GoogleMaps placeId={location.placeId}>
              {this.renderLocationLink(location)}
            </GoogleMaps>
          </GridItem>
        </GridContainer>
      </GridItem>
    ) : null;

    return isEmptyString(locationName) && isEmptyString(url) ? null : (
      <>
        {locationSection}
        {urlSection}
      </>
    );
  };

  renderRating = () => {
    const { id } = this.props;

    return (
      <GridItem>
        <RateSummary id={id} />
      </GridItem>
    );
  };

  render = () => {
    const {
      classes,
      event,
      onMouseEnter,
      onMouseLeave,
      position,
      dataId,
      attachmentOnly,
    } = this.props;
    const { type, detail, description, location, url } = event || {};
    const { type: subtype } = detail || {};

    const activity = this.isActivity(type);
    const flight = this.isFlight(type, subtype);
    const isVehicleHire = this.isVehicleHire(type, subtype);
    const nonAerial =
      !flight && type === EVENT_CONSTANTS.EVENTS.TRANSPORTATION.type;

    const content = event ? (
      <GridContainer direction="column" wrap="nowrap">
        {this.renderType()}
        {this.renderRating()}
        {this.renderName()}
        {this.renderDescription(description)}
        {this.renderStartLocation(nonAerial, isVehicleHire)}
        {this.renderEndLocation(nonAerial, isVehicleHire)}
        {this.renderFlightBooking(flight)}
        {this.renderTime(activity, nonAerial, position, subtype)}
        {this.renderAirport(flight, position)}
        {this.renderTerminal(flight, position)}
        {this.renderAirline(flight)}
        {this.renderFlightNumber(flight)}
        {this.renderGate(flight, position)}
        {this.renderActivityDetails()}
        {this.renderDistance()}
        {this.renderFooter(location, url)}
      </GridContainer>
    ) : null;

    return (
      <GridContainer onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
        {!attachmentOnly && (
          <GridItem>
            <div className={classes.hidden}>
              <TransportationLocations setter dataId={dataId} />
              <Map setter dataId={dataId} />
            </div>
            <Card className={classes.tooltipCard}>
              <CardContent className={classes.tooltipCardContent}>
                {content}
              </CardContent>
            </Card>
          </GridItem>
        )}
        {attachmentOnly && (
          <GridItem>
            <Card className={classes.attachmentContent}>
              <CardContent className={classes.tooltipCardContent}>
                {this.renderAttachmentIcon()}
              </CardContent>
            </Card>
          </GridItem>
        )}
      </GridContainer>
    );
  };
}

EventIconTooltipContent.propTypes = {
  // hoc
  classes: PropTypes.object.isRequired,

  // parent
  id: PropTypes.number.isRequired,
  dataId: PropTypes.number,
  position: PropTypes.string,
  onView: PropTypes.func.isRequired,
  onMouseEnter: PropTypes.func.isRequired,
  onMouseLeave: PropTypes.func.isRequired,
  attachmentOnly: PropTypes.bool,

  // resaga value
  templateId: PropTypes.number,
  links: PropTypes.array,
  names: PropTypes.array,
  event: PropTypes.object,
  eventAttachments: PropTypes.array,
  iconOverride: PropTypes.string,
  isPublic: PropTypes.bool,
};

EventIconTooltipContent.defaultProps = {
  position: null,
  dataId: null,

  templateId: null,
  event: {},
  eventAttachments: [],
  iconOverride: '',
  links: [],
  names: [],
  attachmentOnly: false,
  isPublic: false,
};

export default compose(
  withStyles(style, { name: 'EventIconTooltipContent' }),
  resaga(FIRST_CONFIG),
  resaga(SECOND_CONFIG),
  EVENT_STORE_HOC.selectEventProp({
    path: EVENT_PATHS.eventAttachments,
    outputProp: 'eventAttachments',
  }),
  resaga(THIRD_CONFIG),
)(EventIconTooltipContent);
