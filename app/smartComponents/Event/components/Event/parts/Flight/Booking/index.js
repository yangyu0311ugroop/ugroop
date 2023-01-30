/**
 * Created by stephenkarpinskyj on 20/8/18.
 */

import GridContainer from 'components/GridContainer';
import JText from 'components/JText';
import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage as M } from 'react-intl';
import { compose } from 'redux';
import resaga from 'resaga';
import GridItem from 'components/GridItem';
import { ForEachEventVariant } from 'smartComponents/Event/logics';
import FlightBooking from 'smartComponents/Event/components/FlightBooking/layouts';
import { EVENT_VARIANTS } from 'utils/constants/events';
import { EventHeading } from 'viewComponents/Event/components/Heading';
import { H5 } from 'viewComponents/Typography';
import EditableBooking from './components/Editable';
import FieldBooking from './components/Field';
import { EMPTY } from './utils';
import { CONFIG_1, CONFIG_2 } from './config';
import m from './messages';

export class Booking extends React.PureComponent {
  getValue = () => this.props.value || EMPTY;

  renderPart = Component => () => (
    <Component {...this.props} value={this.getValue()} />
  );

  renderLabel = () => {
    const value = this.getValue();
    return (
      value !== EMPTY && (
        <GridItem>
          <GridContainer alignItems="baseline">
            <GridItem>
              <EventHeading Typography={H5}>
                <M {...m.bookinglabelPrefix} />
              </EventHeading>
            </GridItem>
            <FlightBooking dataId={value} variant={EVENT_VARIANTS.label} />
          </GridContainer>
        </GridItem>
      )
    );
  };

  renderValueOnly = () => {
    const {
      component: Component,
      value,
      className,
      variant,
      part,
    } = this.props;

    return (
      value && (
        <Component className={className}>
          <JText gray ellipsis>
            <FlightBooking dataId={value} variant={variant} part={part} />
          </JText>
        </Component>
      )
    );
  };

  renderCard = () => {
    const { value, variant } = this.props;

    return value && <FlightBooking dataId={value} variant={variant} />;
  };

  renderLabelHeading = () => {
    const { value, variant, renderFlights } = this.props;

    return (
      value && (
        <FlightBooking
          dataId={value}
          variant={variant}
          renderFlights={renderFlights}
        />
      )
    );
  };

  render = () => {
    const { variant } = this.props;
    return (
      <ForEachEventVariant
        variant={variant}
        renderDefault={this.renderPart(EditableBooking)}
        renderField={this.renderPart(FieldBooking)}
        renderLabel={this.renderLabel}
        renderValueOnly={this.renderValueOnly}
        renderCard={this.renderCard}
        renderLabelHeading={this.renderLabelHeading}
      />
    );
  };
}

Booking.propTypes = {
  // parent
  variant: PropTypes.string,
  component: PropTypes.string,
  className: PropTypes.string,
  part: PropTypes.node,
  renderFlights: PropTypes.func,

  // resaga value
  value: PropTypes.any,
};

Booking.defaultProps = {
  variant: null,

  value: EMPTY,
  component: 'span',
};

export default compose(
  resaga(CONFIG_1()),
  resaga(CONFIG_2()),
)(Booking);
