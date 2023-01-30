/**
 * Created by stephenkarpinskyj on 20/11/18.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import resaga from 'resaga';
import GridItem from 'components/GridItem';
import { EventBookingConfirmed } from 'viewComponents/Event';
import { ForEachEventVariant } from 'smartComponents/Event/logics';
import { CONFIG_ID, CONFIG_DATA } from './config';

export class BookingConfirmed extends React.PureComponent {
  renderPart = Component => () => <Component {...this.props} />;

  renderIcon = () => {
    const { value, className } = this.props;
    return !!value && <EventBookingConfirmed iconOnly className={className} />;
  };

  renderTooltip = () => {
    const { value } = this.props;
    return (
      !!value && (
        <GridItem>
          <EventBookingConfirmed />
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

  // resaga value
  value: PropTypes.string,
};

BookingConfirmed.defaultProps = {
  variant: null,

  value: null,
};

export default compose(
  resaga(CONFIG_ID),
  resaga(CONFIG_DATA),
)(BookingConfirmed);
