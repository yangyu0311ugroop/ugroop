/**
 * Created by stephenkarpinskyj on 23/8/18.
 */

import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { FormattedMessage as M } from 'react-intl';
import GridContainer from 'components/GridContainer';
import Attachments from 'smartComponents/Event/components/Event/layouts/Event/Attachments';
import { ForEachEventVariant } from 'smartComponents/Event/logics';
import EventDetails from '../Event/Details';
import EventAttendance from '../Event/Attendance';
import EventBooking from '../Event/Booking';
import AccommodationStartEnd from './StartEnd';
import m from './messages';

export class Accommodation extends React.PureComponent {
  getRestProps = () =>
    _.omit(this.props, ['personCountLabel', 'personCountPlaceholder']);

  getBookingProps = () =>
    _.pick(this.props, ['personCountLabel', 'personCountPlaceholder']);

  renderPart = (Component, props = {}) => (
    <Component {...this.getRestProps()} {...props} />
  );

  renderField = () => (
    <GridContainer direction="column">
      {this.renderPart(EventDetails)}
      {this.renderPart(AccommodationStartEnd)}
      {this.renderPart(EventBooking, this.getBookingProps())}
      {this.renderPart(EventAttendance, { dailyAttendance: true })}
    </GridContainer>
  );

  renderEditable = () => (
    <GridContainer direction="column" wrap="nowrap">
      {this.renderPart(EventDetails)}
      {this.renderPart(AccommodationStartEnd)}
      {this.renderPart(EventBooking, this.getBookingProps())}
      {this.renderPart(EventAttendance, { dailyAttendance: true })}
      {this.renderPart(Attachments)}
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

Accommodation.propTypes = {
  // parent
  variant: PropTypes.string,
  personCountLabel: PropTypes.node,
  personCountPlaceholder: PropTypes.string,
};

Accommodation.defaultProps = {
  variant: null,
  personCountLabel: <M {...m.bookingPersonCountLabel} />,
  personCountPlaceholder: 'Click to specify guest count',
};

export default Accommodation;
