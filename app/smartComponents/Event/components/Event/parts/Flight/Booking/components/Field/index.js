/**
 * Created by stephenkarpinskyj on 20/8/18.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage as M } from 'react-intl';
import { EVENT_STORE_HELPERS } from 'datastore/eventStore/helpers';
import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import Button from 'viewComponents/Button';
import { Select } from 'smartComponents/Inputs';
import { Section } from 'ugcomponents/DialogForm/Complex';
import bookingUtils, { EMPTY, CREATE_NEW } from '../../utils';
import inputs from '../../inputs';
import m from '../../messages';

export class FieldBooking extends React.PureComponent {
  state = {
    booking: null,
    value: undefined,
  };

  getValue = () => {
    const { value, formValue } = this.props;
    const v = formValue || value;
    return v ? v.toString() : v;
  };

  getCurrentValue = () => {
    const { value } = this.state;
    return value === undefined ? this.getValue() : value;
  };

  hasCurrentValue = () => {
    const { flightBookingIds } = this.props;
    const value = this.getCurrentValue();
    return !!bookingUtils.findBookingId(flightBookingIds, value);
  };

  openFlightBookingCreate = () => {
    this.props.resaga.setValue({
      flightBookingCreate: EVENT_STORE_HELPERS.setFlightBookingCreate(
        true,
        this.handleFlightBookingCreate,
      ),
    });
  };

  openFlightBookingEdit = () => {
    const dataId = Number.parseInt(this.getCurrentValue(), 10);
    this.props.resaga.setValue({
      flightBookingEdit: EVENT_STORE_HELPERS.setFlightBookingEdit(true, dataId),
    });
  };

  handleFlightBookingCreate = dataId => {
    const { booking } = this.state;
    if (booking) {
      const newId = dataId || this.getCurrentValue();
      booking.setValue(newId);
      this.setState({ value: newId });
    }
  };

  handleFieldChange = value => {
    switch (value) {
      case CREATE_NEW:
        this.openFlightBookingCreate();
        break;

      default:
        this.setState({ value });
        break;
    }
  };

  handleEditFlightBookingButton = () => {
    this.openFlightBookingEdit();
  };

  handleRef = key => ref => {
    this.setState({ [key]: ref });
  };

  renderFieldOptions = () => {
    const { flightBookingIds } = this.props;
    return bookingUtils.renderBookingOptions(flightBookingIds);
  };

  renderEditBookingButton = () =>
    this.hasCurrentValue() && (
      <Button
        dense
        size="extraSmall"
        color="primary"
        variant="outline"
        onClick={this.handleEditFlightBookingButton}
      >
        <M {...m.fieldEditBookingButtonLabel} />
      </Button>
    );

  render = () => (
    <Section title={<M {...m.bookingLabel} />}>
      <GridItem xs>
        <GridContainer alignItems="flex-end">
          <GridItem xs={12} sm>
            <Select
              ref={this.handleRef('booking')}
              value={this.getValue()}
              options={this.renderFieldOptions()}
              onChange={this.handleFieldChange}
              {...inputs.booking}
              {...inputs.bookingField}
            />
          </GridItem>
          <GridItem>{this.renderEditBookingButton()}</GridItem>
        </GridContainer>
      </GridItem>
    </Section>
  );
}

FieldBooking.propTypes = {
  // parent
  variant: PropTypes.string,
  dataId: PropTypes.number,
  templateId: PropTypes.number,
  value: PropTypes.any,
  flightBookingIds: PropTypes.array,
  formValue: PropTypes.number,
  resaga: PropTypes.object.isRequired,
};

FieldBooking.defaultProps = {
  variant: null,
  dataId: 0,
  templateId: 0,
  value: EMPTY,
  flightBookingIds: [],
};

export default FieldBooking;
