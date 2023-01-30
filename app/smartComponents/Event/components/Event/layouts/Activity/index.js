/**
 * Created by stephenkarpinskyj on 11/9/18.
 */

import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { FormattedMessage as M } from 'react-intl';
import GridContainer from 'components/GridContainer';
import { ForEachEventVariant } from 'smartComponents/Event/logics';
import EventDetails from '../Event/Details';
import EventBooking from '../Event/Booking';
import Attachments from '../Event/Attachments';
import ActivityStartEnd from './StartEnd';
import Destination from './Destination';

import m from './messages';

export class Activity extends React.PureComponent {
  getRestProps = () =>
    _.omit(this.props, ['personCountLabel', 'personCountPlaceholder']);

  getBookingProps = () =>
    _.pick(this.props, ['personCountLabel', 'personCountPlaceholder']);

  renderPart = (Component, props = {}) => (
    <Component {...this.getRestProps()} {...props} />
  );

  isCycling = () => this.props.icon === 'Cycling';

  renderDestination = () => {
    if (this.isCycling()) {
      return this.renderPart(Destination);
    }

    return null;
  };

  renderEventDetails = () => {
    if (this.isCycling()) {
      return this.renderPart(EventDetails, {
        showEventLocation: false,
      });
    }

    return this.renderPart(EventDetails);
  };

  renderActivityStartEnd = () => {
    const { isCustomDateStart } = this.props;
    if (this.isCycling()) {
      return null;
    }
    if (isCustomDateStart) {
      return this.renderPart(ActivityStartEnd, {
        hideEndDate: true,
      });
    }

    return this.renderPart(ActivityStartEnd);
  };

  renderField = () => (
    <GridContainer direction="column">
      {this.renderEventDetails()}
      {this.renderDestination()}
      {this.renderActivityStartEnd()}
      {this.renderPart(EventBooking, this.getBookingProps())}
    </GridContainer>
  );

  renderEditable = () => (
    <GridContainer direction="column" wrap="nowrap">
      {this.renderEventDetails()}
      {this.renderDestination()}
      {this.renderActivityStartEnd()}
      {this.renderPart(EventBooking, this.getBookingProps())}
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

Activity.propTypes = {
  // parent
  variant: PropTypes.string,
  personCountLabel: PropTypes.node,
  personCountPlaceholder: PropTypes.string,
  icon: PropTypes.string,
  isCustomDateStart: PropTypes.bool,
};

Activity.defaultProps = {
  variant: null,
  personCountLabel: <M {...m.bookingPersonCountLabel} />,
  personCountPlaceholder: 'Click to specify total people',
  icon: '',
  isCustomDateStart: false,
};

export default Activity;
