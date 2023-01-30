/**
 * Created by stephenkarpinskyj on 20/8/18.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage as M } from 'react-intl';
import dotProp from 'dot-prop-immutable';
import { THE_DOT } from 'appConstants';
import { TEMPLATE_API_HELPERS } from 'apis/components/Template/helpers';
import { EVENT_STORE_HELPERS } from 'datastore/eventStore/helpers';
import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import { EditableLabel, EditablePlaceholder } from 'viewComponents/Editable';
import Button from 'viewComponents/Button';
import { EditableSelectForm } from 'smartComponents/Editables';
import EventPatchData from 'smartComponents/Event/components/EventPatchData';
import bookingUtils, { EMPTY, CREATE_NEW } from '../../utils';
import inputs from '../../inputs';
import m from '../../messages';

export class EditableBooking extends React.PureComponent {
  state = {
    value: undefined,
  };

  getValue = () => {
    const { value } = this.props;
    return value ? value.toString() : value;
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

  openFlightBookingView = () => {
    const id = Number.parseInt(this.getCurrentValue(), 10);
    this.props.resaga.setValue({
      flightBookingView: EVENT_STORE_HELPERS.setFlightBookingView(true, id),
    });
  };

  handleSubmit = obj => {
    const { model } = obj;
    const value = dotProp.get(model, inputs.booking.name, EMPTY);

    this.model = model;

    if (value === CREATE_NEW) {
      this.openFlightBookingCreate();
    } else {
      TEMPLATE_API_HELPERS.patchEvent(obj, this.props);
    }
  };

  handleFlightBookingCreate = dataId => {
    if (dataId) {
      const obj = {
        model: dotProp.set(this.model, inputs.booking.name, dataId),
      };
      TEMPLATE_API_HELPERS.patchEvent(obj, this.props);
    }
  };

  handleViewFlightBookingButton = () => {
    this.openFlightBookingView();
  };

  renderPlaceholder = () => (
    <EditablePlaceholder>
      <M {...m.bookingPlaceholder} />
    </EditablePlaceholder>
  );

  renderValue = value => {
    const { flightBookingIds } = this.props;
    const id = bookingUtils.findBookingId(flightBookingIds, value);
    if (!id) return this.renderPlaceholder();
    return bookingUtils.renderBooking(id);
  };

  renderOptions = () => {
    const { flightBookingIds } = this.props;
    return bookingUtils.renderBookingOptions(flightBookingIds);
  };

  renderLabel = () => (
    <EditableLabel>
      <M {...m.bookingLabel} />
    </EditableLabel>
  );

  renderEditBookingButton = () =>
    this.hasCurrentValue() && (
      <GridItem>
        <GridContainer>
          <GridItem>{THE_DOT}</GridItem>
          <GridItem>
            <GridContainer spacing={0}>
              <GridItem>
                <Button
                  noMargin
                  noPadding
                  size="small"
                  color="primary"
                  variant="inline"
                  onClick={this.handleViewFlightBookingButton}
                >
                  <M {...m.editableViewBookingButtonLabel} />
                </Button>
              </GridItem>
            </GridContainer>
          </GridItem>
        </GridContainer>
      </GridItem>
    );

  render = () => {
    const { dataId, readOnly } = this.props;
    return readOnly && !this.hasCurrentValue() ? null : (
      <GridItem xs>
        <GridContainer alignItems="flex-end">
          <GridItem>
            {this.renderLabel()}
            <EditableSelectForm
              value={this.getValue()}
              options={this.renderOptions()}
              renderValue={this.renderValue}
              onSubmit={this.handleSubmit}
              readOnly={readOnly}
              {...inputs.booking}
              {...inputs.bookingEditable}
            >
              <EventPatchData dataId={dataId} subtype />
            </EditableSelectForm>
          </GridItem>
          {this.renderEditBookingButton()}
        </GridContainer>
      </GridItem>
    );
  };
}

EditableBooking.propTypes = {
  // parent
  variant: PropTypes.string,
  dataId: PropTypes.number,
  templateId: PropTypes.number,
  value: PropTypes.any,
  flightBookingIds: PropTypes.array,
  readOnly: PropTypes.bool,
  resaga: PropTypes.object.isRequired,
};

EditableBooking.defaultProps = {
  variant: null,
  dataId: 0,
  templateId: 0,
  value: EMPTY,
  flightBookingIds: [],
  readOnly: false,
};

export default EditableBooking;
