/**
 * Created by stephenkarpinskyj on 19/8/18.
 */

import React from 'react';
import PropTypes from 'prop-types';
import GridContainer from 'components/GridContainer';
import Attachments from 'smartComponents/Event/components/Event/layouts/Event/Attachments';
import { ForEachEventVariant } from 'smartComponents/Event/logics';
import { FlightBooking } from 'smartComponents/Event/components/Event/parts';

import Seats from './Seats';
import FlightStartEnd from './StartEnd';
import EventDetails from '../Event/Details';
import EventAttendance from '../Event/Attendance';
import FlightDetails from './Details';

export class Flight extends React.PureComponent {
  renderPart = (Component, props = {}) => (
    <Component {...this.props} {...props} />
  );

  renderEditable = () => (
    <GridContainer direction="column">
      {this.renderPart(EventDetails, {
        descriptionOnly: true,
      })}
      {this.renderPart(FlightBooking)}
      {this.renderPart(FlightStartEnd)}
      {this.renderPart(FlightDetails)}
      {this.renderPart(Seats)}
      {this.renderPart(EventAttendance)}
      {this.renderPart(Attachments)}
    </GridContainer>
  );

  renderField = () => (
    <GridContainer direction="column">
      {this.renderPart(FlightBooking)}
      {this.renderPart(FlightStartEnd)}
      {this.renderPart(EventDetails, {
        descriptionOnly: true,
        defaultExpanded: false,
      })}
      {this.renderPart(FlightDetails)}
      {this.renderPart(EventAttendance)}
    </GridContainer>
  );

  render = () => {
    const { variant } = this.props;
    return (
      <ForEachEventVariant
        variant={variant}
        renderDefault={this.renderEditable}
        renderField={this.renderField}
      />
    );
  };
}

Flight.propTypes = {
  // parent
  variant: PropTypes.string,
};

Flight.defaultProps = {
  variant: null,
};

export default Flight;
