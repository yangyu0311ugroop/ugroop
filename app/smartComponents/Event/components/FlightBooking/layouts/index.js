/**
 * Created by stephenkarpinskyj on 7/9/18.
 */

import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import JText from 'components/JText';
import SmartAmounts from 'containers/Portal/components/AddEvent/components/EventForm/parts/Amounts/components/SmartAmounts';
import { FLIGHT_BOOKING_PATHS } from 'datastore/eventStore/constants';
import { EVENT_STORE_HOC } from 'datastore/eventStore/hoc';
import PropTypes from 'prop-types';
import React from 'react';
// import { FlightBookingSupplierName } from 'smartComponents/Event/components/FlightBooking/parts';
import { ForEachEventVariant } from 'smartComponents/Event/logics';
import { EVENT_VARIANTS } from 'utils/constants/events';
import JButton from 'viewComponents/Button/variants/JButton';
import FlightBookingFlightCount from '../parts/FlightCount';
import FlightBookingName from '../parts/Name';
import FlightBookingNumber from '../parts/Number';
import FlightBookingPassengerCount from '../parts/PassengerCount';
import FlightBookingSupplierName from '../parts/SupplierName';
import FlightBookingDetails from './Details';
import FlightBookingFlights from './Flights';

// import FlightBookingPassengerCount from '../parts/PassengerCount';

export class FlightBooking extends React.PureComponent {
  renderPart = (Component, props = {}) => (
    <Component {...this.props} {...props} />
  );

  renderEditable = () => (
    <GridContainer direction="column">
      {this.renderPart(FlightBookingDetails)}
      {this.renderPart(FlightBookingFlights)}
    </GridContainer>
  );

  renderField = () => (
    <GridContainer direction="column">
      {this.renderPart(FlightBookingDetails)}
    </GridContainer>
  );

  renderLabel = () => {
    const variant = EVENT_VARIANTS.labelValue;
    return (
      <GridItem>
        <GridContainer alignItems="center">
          {this.renderPart(FlightBookingName, { variant })}
          {this.renderPart(FlightBookingNumber, { variant })}
        </GridContainer>
      </GridItem>
    );
  };

  renderAmount = () => {
    const { dataId, templateId, bookingAmounts, editing } = this.props;

    const data = {
      bookingAmounts,
    };

    return (
      <SmartAmounts
        flightBooking
        component={GridItem}
        dataId={dataId}
        templateId={templateId}
        data={data}
        showEmpty={editing}
      />
    );
  };

  renderOption = () => {
    const { active, onClick, buttonClassName } = this.props;

    const variant = EVENT_VARIANTS.valueOnly;

    return (
      <GridContainer alignItems="center" spacing={1}>
        <GridItem xs>
          <JButton
            disabled={active}
            block
            textAlignLeft
            className={buttonClassName}
            padding="lg"
            onClick={onClick}
          >
            <GridContainer direction="column" spacing={0}>
              <GridItem>
                <GridContainer alignItems="center" spacing={1} wrap="nowrap">
                  <GridItem>
                    <JText dark bold ellipsis>
                      {this.renderPart(FlightBookingName, { variant })}
                    </JText>
                  </GridItem>

                  {this.renderPart(FlightBookingFlightCount, { variant })}
                </GridContainer>
              </GridItem>
              <GridItem>
                <JText sm gray>
                  <GridContainer alignItems="center" spacing={2}>
                    {this.renderPart(FlightBookingNumber, {
                      variant,
                      component: GridItem,
                    })}
                    {this.renderPart(FlightBookingPassengerCount, { variant })}
                  </GridContainer>
                </JText>
              </GridItem>
            </GridContainer>
          </JButton>
        </GridItem>

        {this.renderAmount()}
      </GridContainer>
    );
  };

  renderEmptyField = () => (
    <GridItem>
      <JText gray italic>
        n/a
      </JText>
    </GridItem>
  );

  renderCard = () => {
    const variant = EVENT_VARIANTS.labelValue;

    return (
      <GridItem>
        <GridContainer card direction="column" spacing={2}>
          <GridItem>
            <JText bold black>
              Flight itinerary
            </JText>
          </GridItem>

          <GridItem>
            <GridContainer spacing={2} wrap="nowrap">
              <GridItem>
                <GridContainer direction="column">
                  <GridItem>
                    <JText gray>Name</JText>
                  </GridItem>
                  <GridItem>
                    <JText gray>Supplier name</JText>
                  </GridItem>
                  <GridItem>
                    <JText gray>Booking reference</JText>
                  </GridItem>
                  <GridItem>
                    <JText gray>Passenger count</JText>
                  </GridItem>
                </GridContainer>
              </GridItem>
              <GridItem>
                <JText black>
                  <GridContainer direction="column">
                    {this.renderPart(FlightBookingName, {
                      variant,
                      renderEmpty: this.renderEmptyField,
                    })}
                    {this.renderPart(FlightBookingSupplierName, {
                      variant,
                      renderEmpty: this.renderEmptyField,
                    })}
                    {this.renderPart(FlightBookingNumber, {
                      variant,
                      renderEmpty: this.renderEmptyField,
                    })}
                    {this.renderPart(FlightBookingPassengerCount, {
                      variant,
                      renderEmpty: this.renderEmptyField,
                    })}
                  </GridContainer>
                </JText>
              </GridItem>
            </GridContainer>
          </GridItem>

          {/* <GridItem>{this.renderPart(FlightBookingFlights)}</GridItem> */}
        </GridContainer>
      </GridItem>
    );
  };

  renderLabelHeading = () => (
    <GridContainer direction="column" spacing={0}>
      <GridItem>{this.renderPart(FlightBookingFlights)}</GridItem>
    </GridContainer>
  );

  renderValueOnly = () => {
    const { component: Component, className, variant, part } = this.props;

    return (
      <Component className={className}>
        {this.renderPart(part || FlightBookingName, {
          variant,
        })}
      </Component>
    );
  };

  render = () => {
    const { variant } = this.props;
    return (
      <ForEachEventVariant
        variant={variant}
        renderDefault={this.renderEditable}
        renderField={this.renderField}
        renderLabel={this.renderLabel}
        renderOption={this.renderOption}
        renderValueOnly={this.renderValueOnly}
        renderCard={this.renderCard}
        renderLabelHeading={this.renderLabelHeading}
      />
    );
  };
}

FlightBooking.propTypes = {
  // parent
  variant: PropTypes.string,
  component: PropTypes.string,
  className: PropTypes.string,
  buttonClassName: PropTypes.string,
  part: PropTypes.node,
  bookingAmounts: PropTypes.object,
  active: PropTypes.bool,
  showAmounts: PropTypes.bool,
  editing: PropTypes.bool,
  onClick: PropTypes.func,
  dataId: PropTypes.number,
  templateId: PropTypes.number,
};

FlightBooking.defaultProps = {
  component: 'span',
  variant: null,
  bookingAmounts: {},
};

export default EVENT_STORE_HOC.selectFlightBookingProp({
  outputProp: 'bookingAmounts',
  path: FLIGHT_BOOKING_PATHS.bookingAmounts,
})(FlightBooking);
