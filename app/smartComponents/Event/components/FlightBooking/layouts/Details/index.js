/**
 * Created by stephenkarpinskyj on 7/9/18.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage as M } from 'react-intl';
import { EVENT_CONSTANTS } from 'utils/constants/events';
import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import { Section } from 'ugcomponents/DialogForm/Complex';
import { ForEachEventVariant } from 'smartComponents/Event/logics';
import {
  FlightBookingName,
  FlightBookingNumber,
  FlightBookingSupplierName,
  FlightBookingPassengerCount,
} from 'smartComponents/Event/components/FlightBooking/parts';
import m from './messages';

export class FlightBookingDetails extends React.PureComponent {
  renderPart = (Component, props = {}) => (
    <Component {...this.props} {...props} />
  );

  renderDefault = () => (
    <GridItem>
      <GridContainer direction="column">
        {this.renderPart(FlightBookingName, {
          variant: EVENT_CONSTANTS.VARIANTS.editableHeadingForm,
        })}
        {this.renderPart(FlightBookingSupplierName)}
        {this.renderPart(FlightBookingPassengerCount)}
      </GridContainer>
    </GridItem>
  );

  renderTitle = () => <M {...m.sectionLabel} />;

  renderField = () => (
    <Section title={this.renderTitle()}>
      <GridContainer direction="column">
        <GridItem>
          <GridContainer>
            {this.renderPart(FlightBookingName)}
            {this.renderPart(FlightBookingNumber)}
          </GridContainer>
          <GridContainer>
            {this.renderPart(FlightBookingSupplierName)}
            {this.renderPart(FlightBookingPassengerCount)}
          </GridContainer>
        </GridItem>
      </GridContainer>
    </Section>
  );

  render = () => {
    const { variant } = this.props;
    return (
      <ForEachEventVariant
        variant={variant}
        renderDefault={this.renderDefault()}
        renderField={this.renderField()}
      />
    );
  };
}

FlightBookingDetails.propTypes = {
  // parent
  variant: PropTypes.string,
};

FlightBookingDetails.defaultProps = {
  variant: null,
};

export default FlightBookingDetails;
