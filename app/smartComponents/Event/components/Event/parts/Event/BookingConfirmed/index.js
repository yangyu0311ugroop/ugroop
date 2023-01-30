/**
 * Created by stephenkarpinskyj on 20/11/18.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import resaga from 'resaga';
import GridItem from 'components/GridItem';
import { EventBookingConfirmed } from 'viewComponents/Event';
import {
  ForEachEventType,
  ForEachEventVariant,
} from 'smartComponents/Event/logics';
import FlightBookingConfirmed from '../../Flight/BookingConfirmed';
import TransportationBookingConfirmed from '../../Transportation/BookingConfirmed';
import { CONFIG } from './config';

export class BookingConfirmed extends React.PureComponent {
  renderPart = Component => () => <Component {...this.props} />;

  renderFlightBookingConfirmed = () => (
    <FlightBookingConfirmed {...this.props} />
  );

  renderTransportationBookingConfirmed = () => (
    <TransportationBookingConfirmed {...this.props} />
  );

  renderIcon = () => {
    const { value, className } = this.props;
    return !!value && <EventBookingConfirmed iconOnly className={className} />;
  };

  renderTooltip = () => {
    const { value, className, iconAndValue } = this.props;
    return (
      !!value && (
        <GridItem>
          <EventBookingConfirmed
            iconAndValue={iconAndValue}
            value={value}
            className={className}
          />
        </GridItem>
      )
    );
  };

  renderEvent = () => {
    const { variant } = this.props;
    return (
      <ForEachEventVariant
        variant={variant}
        renderDefault={this.renderTooltip}
        renderIcon={this.renderIcon}
      />
    );
  };

  render = () => {
    const { dataId, formType, formSubtype, value } = this.props;

    return (
      <ForEachEventType
        key={value}
        dataId={dataId}
        type={formType}
        subtype={formSubtype}
        renderEvent={this.renderEvent}
        renderFlight={this.renderFlightBookingConfirmed}
        renderTransportation={this.renderTransportationBookingConfirmed}
      />
    );
  };
}

BookingConfirmed.propTypes = {
  // parent
  variant: PropTypes.string,
  id: PropTypes.number, // eslint-disable-line react/no-unused-prop-types
  dataId: PropTypes.number,
  className: PropTypes.string,
  iconAndValue: PropTypes.bool,

  // resaga value
  value: PropTypes.string,
  formType: PropTypes.string,
  formSubtype: PropTypes.string,
};

BookingConfirmed.defaultProps = {
  variant: null,
  id: null,
  dataId: null,

  value: null,
  formType: null,
  formSubtype: null,
};

export default compose(resaga(CONFIG))(BookingConfirmed);
