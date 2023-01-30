/**
 * Created by stephenkarpinskyj on 30/9/18.
 */

import JText from 'components/JText';
import React from 'react';
import PropTypes from 'prop-types';
import resaga from 'resaga';
import { EVENT_CONSTANTS, EVENT_VARIANTS } from 'utils/constants/events';
import { EVENT_STORE_HELPERS } from 'datastore/eventStore/helpers';
import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import Editable from 'viewComponents/Editable';
import { EventIcon } from 'viewComponents/Event';
import FlightNumber from 'smartComponents/Event/components/Event/parts/Flight/Number';
import EventDuration from 'smartComponents/Event/components/Event/parts/Event/Duration';
import FlightStartAirport from 'smartComponents/Event/components/Event/parts/Flight/StartAirport';
import FlightEndAirport from 'smartComponents/Event/components/Event/parts/Flight/EndAirport';
import { EventDataId } from 'smartComponents/Event/logics';
import { CONFIG } from './config';

export class FlightBookingFlight extends React.PureComponent {
  handleEditableClick = () => {
    const { id } = this.props;
    this.props.resaga.setValue({
      eventView: EVENT_STORE_HELPERS.setEventView(true, id),
    });
  };

  renderPart = (
    Component,
    dataId,
    variant = EVENT_VARIANTS.labelValue,
    props = {},
  ) => (
    <Component {...this.props} dataId={dataId} variant={variant} {...props} />
  );

  renderIcon = () => (
    <GridItem>
      <EventIcon
        type={EVENT_CONSTANTS.EVENTS.TRANSPORTATION.type}
        subtype={EVENT_CONSTANTS.TRANSPORTATIONS.FLIGHT.type}
        size="base"
        iconOverride="flying"
      />
    </GridItem>
  );

  renderAirports = startCode => endCode => (
    <GridItem>
      <GridContainer spacing={0} alignItems="center">
        {startCode}
        {!!startCode && !!endCode && <GridItem>&nbsp;to&nbsp;</GridItem>}
        {endCode}
      </GridContainer>
    </GridItem>
  );

  renderStartAirport = dataId => (startCode, start) =>
    this.renderPart(FlightEndAirport, dataId, EVENT_VARIANTS.renderProp, {
      children: this.renderAirports(startCode, start),
    });

  renderParts = dataId => (
    <GridItem>
      <GridContainer alignItems="baseline">
        {this.renderPart(FlightNumber, dataId)}
        {this.renderPart(
          FlightStartAirport,
          dataId,
          EVENT_VARIANTS.renderProp,
          {
            children: this.renderStartAirport(dataId),
          },
        )}
        {this.renderPart(EventDuration, dataId)}
      </GridContainer>
    </GridItem>
  );

  renderHeadingParts = dataId => (
    <JText dark>
      {this.renderPart(FlightStartAirport, dataId, EVENT_VARIANTS.renderProp, {
        children: this.renderStartAirport(dataId),
      })}
    </JText>
  );

  render = () => {
    const { id, variant } = this.props;

    if (variant === 'labelHeading') {
      return (
        <GridItem key={id}>
          <EventDataId id={id}>{this.renderHeadingParts}</EventDataId>
        </GridItem>
      );
    }

    return (
      <GridItem key={id}>
        <Editable onClick={this.handleEditableClick}>
          <GridContainer alignItems="center" wrap="nowrap">
            {this.renderIcon()}
            <EventDataId id={id}>{this.renderParts}</EventDataId>
          </GridContainer>
        </Editable>
      </GridItem>
    );
  };
}

FlightBookingFlight.propTypes = {
  // hoc
  resaga: PropTypes.object.isRequired,

  // parent
  variant: PropTypes.string,
  id: PropTypes.number,
};

FlightBookingFlight.defaultProps = {
  id: 0,
};

export default resaga(CONFIG)(FlightBookingFlight);
