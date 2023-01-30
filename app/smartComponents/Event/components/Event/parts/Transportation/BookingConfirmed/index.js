/**
 * Created by stephenkarpinskyj on 20/11/18.
 */

import { EVENT_PATHS } from 'datastore/eventStore/constants';
import { EVENT_STORE_HOC } from 'datastore/eventStore/hoc';
import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import GridItem from 'components/GridItem';
import { EventBookingConfirmed } from 'viewComponents/Event';
import { ForEachEventVariant } from 'smartComponents/Event/logics';

export class BookingConfirmed extends React.PureComponent {
  renderPart = Component => () => <Component {...this.props} />;

  renderIcon = () => {
    const { value, className } = this.props;
    return !!value && <EventBookingConfirmed iconOnly className={className} />;
  };

  renderTooltip = () => {
    const { value, iconAndValue } = this.props;
    return (
      !!value && (
        <GridItem>
          <EventBookingConfirmed iconAndValue={iconAndValue} value={value} />
        </GridItem>
      )
    );
  };

  render = () => {
    const { variant } = this.props;

    return (
      <ForEachEventVariant
        variant={variant}
        renderDefault={this.renderTooltip}
        renderIcon={this.renderIcon}
      />
    );
  };
}

BookingConfirmed.propTypes = {
  // parent
  variant: PropTypes.string,
  className: PropTypes.string,
  iconAndValue: PropTypes.bool,

  // resaga value
  value: PropTypes.string,
};

BookingConfirmed.defaultProps = {
  variant: null,

  value: null,
  iconAndValue: false,
};

export default compose(
  EVENT_STORE_HOC.selectEventProp({
    path: EVENT_PATHS.transportationDetailBookingNumber,
  }),
)(BookingConfirmed);
