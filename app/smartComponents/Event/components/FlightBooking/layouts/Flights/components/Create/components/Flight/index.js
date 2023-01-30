import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import dotProp from 'dot-prop-immutable';
import resaga from 'resaga';
import { EVENT_CONSTANTS, EVENT_VARIANTS } from 'utils/constants/events';
import { EVENT_PATHS } from 'datastore/eventStore/constants';
import { EVENT_STORE_HELPERS } from 'datastore/eventStore/helpers';
import { TEMPLATE_API_HELPERS } from 'apis/components/Template/helpers';
import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import { PopperMenuItem } from 'components/Popper';
import { EventIcon } from 'viewComponents/Event';
import FlightNumber from 'smartComponents/Event/components/Event/parts/Flight/Number';
import FlightStartAirport from 'smartComponents/Event/components/Event/parts/Flight/StartAirport';
import FlightEndAirport from 'smartComponents/Event/components/Event/parts/Flight/EndAirport';
import { CONFIG_1, CONFIG_2 } from './config';

export class FlightBookingCreateFlight extends React.PureComponent {
  getAdded = () => {
    const { newBookingId, bookingId } = this.props;
    return newBookingId === bookingId;
  };

  getColor = () => (this.getAdded() ? 'default' : 'clear');

  handleMenuItemClick = () => {
    const { newBookingId, type, subtype } = this.props;
    let model = {};
    model = dotProp.set(
      model,
      EVENT_STORE_HELPERS.pathToEventInputName(EVENT_PATHS.flightBooking),
      this.getAdded() ? 0 : newBookingId,
    );
    model = dotProp.set(
      model,
      EVENT_STORE_HELPERS.pathToEventInputName(EVENT_PATHS.type),
      type,
    );
    model = dotProp.set(
      model,
      EVENT_STORE_HELPERS.pathToEventInputName(EVENT_PATHS.subtype),
      subtype,
    );
    TEMPLATE_API_HELPERS.patchEvent({ model }, this.props);
  };

  renderPart = (Component, props = {}) => (
    <Component {...this.props} variant={EVENT_VARIANTS.labelValue} {...props} />
  );

  renderAirports = (startCode, start) => (endCode, end) => (
    <GridItem>
      <GridContainer spacing={0}>
        {start}
        {!!startCode && !!endCode && <GridItem>&nbsp;to&nbsp;</GridItem>}
        {end}
      </GridContainer>
    </GridItem>
  );

  renderStartAirport = (startCode, start) =>
    this.renderPart(FlightEndAirport, {
      variant: EVENT_VARIANTS.renderProp,
      children: this.renderAirports(startCode, start),
    });

  renderRow = () => (
    <GridContainer alignItems="baseline">
      <GridItem>
        <EventIcon
          type={EVENT_CONSTANTS.EVENTS.TRANSPORTATION.type}
          subtype={EVENT_CONSTANTS.TRANSPORTATIONS.FLIGHT.type}
          iconOverride="flying"
        />
      </GridItem>
      {this.renderPart(FlightNumber)}
      {this.renderPart(FlightStartAirport, {
        variant: EVENT_VARIANTS.renderProp,
        children: this.renderStartAirport,
      })}
    </GridContainer>
  );

  render = () => (
    <GridItem>
      <PopperMenuItem
        icon="lnr-check"
        color={this.getColor()}
        onClick={this.handleMenuItemClick}
      >
        {this.renderRow()}
      </PopperMenuItem>
    </GridItem>
  );
}

FlightBookingCreateFlight.propTypes = {
  // hoc
  resaga: PropTypes.object.isRequired,

  // parent
  id: PropTypes.number,
  newBookingId: PropTypes.number,

  // resaga value
  dataId: PropTypes.number,
  type: PropTypes.string,
  subtype: PropTypes.string,
  bookingId: PropTypes.number,
};

FlightBookingCreateFlight.defaultProps = {
  id: null,
  newBookingId: null,

  dataId: null,
  type: null,
  subtype: null,
  bookingId: null,
};

export default compose(
  resaga(CONFIG_1),
  resaga(CONFIG_2),
)(FlightBookingCreateFlight);
