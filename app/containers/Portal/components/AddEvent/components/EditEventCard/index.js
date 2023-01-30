import { NODE_API_HELPERS } from 'apis/components/Node/helpers';
import { TEMPLATE_API_HELPERS } from 'apis/components/Template/helpers';
import classnames from 'classnames';
import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import { withStyles } from 'components/material-ui';
import { withSMDown } from 'components/material-ui/hocs/withMediaQuery';
import { convertAttachments } from 'containers/Portal/components/AddEvent/components/AddEventCard';
import EditEventForm from 'containers/Portal/components/AddEvent/components/EditEventCard/components/EditEventForm';
import { EDIT_HELPERS } from 'containers/Portal/components/AddEvent/components/EditEventCard/helpers';
import withTimelineId from 'containers/Portal/components/AddEvent/components/EventForm/hocs/withTimelineId';
import dotProp from 'dot-prop-immutable';
import Formsy from 'formsy-react';
import debounce from 'lodash/debounce';
import set from 'lodash/set';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import { StyledViewEvent } from 'smartComponents/Node/types/Event/components/ViewEvent';
import { EVENT_DATA_HELPERS } from 'smartComponents/Node/types/Event/dataHelpers';
import { EVENT_VIEW_HELPERS } from 'smartComponents/Node/types/Event/helpers';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { CONFIG, DATA_ID_CONFIG } from './config';
import styles from './styles';

export class EditEventCard extends PureComponent {
  state = {
    formValue: EVENT_DATA_HELPERS.defaultFormValue(this.props),
    creating: false,
  };

  patchEvent = form => () => {
    const { subform, onClose } = this.props;
    const { data, node } = form;

    if (subform === 'FlightBookingForm') {
      const {
        bookingNumber,
        name,
        passengerCount,
        supplier,
        flightBookingDataId,
        bookingAmounts,
      } = form;
      const model = {
        bookingNumber,
        name,
        passengerCount,
        supplier,
        bookingAmounts,
      };

      return TEMPLATE_API_HELPERS.patchFlightBooking(
        {
          model,
          onSuccess: onClose,
          onError: onClose,
        },
        { ...this.props, dataId: flightBookingDataId },
      );
    }

    // update
    return TEMPLATE_API_HELPERS.patchEvent(
      {
        model: { data: convertAttachments(data), node },
        onSuccess: this.handlePatchEventSuccess,
        // onError: this.handlePatchEventError,
      },
      this.props,
    );
  };

  handleValidSubmit = form => {
    const { onClose } = this.props;
    const { creating, isChanged } = this.state;

    if (!isChanged) {
      return LOGIC_HELPERS.ifFunction(onClose, []);
    }

    if (creating) return null;

    return this.setState(
      {
        creating: true,
      },
      this.patchEvent(form),
    );
  };

  handlePatchEventSuccess = () => {
    const { onClose } = this.props;

    this.updateTimes();

    LOGIC_HELPERS.ifFunction(onClose, []);
  };

  updateTimes = () => {
    const { templateId, id } = this.props;

    NODE_API_HELPERS.getTimes({ id: templateId, ids: [id] }, this.props);
  };

  formChangeDebounce = (...params) => {
    if (!this.debouncedFormChange) {
      this.debouncedFormChange = debounce(this.formChange, 100);
    }

    // will debounce
    this.debouncedFormChange(...params);
  };

  formChange = (form, isChanged) => {
    const newFormValue = {};

    Object.keys(form).forEach(key => {
      set(newFormValue, key, form[key]);
    });

    this.setState({ formValue: newFormValue, isChanged });
  };

  handleValid = isValid => () => this.setState({ isValid });

  changeFormValue = formValue => {
    this.setState({ formValue });
  };

  renderForm = () => {
    const {
      id,
      dataId,
      onClose,
      onCloseDialog,
      data,
      node,
      subform,
      flightBookingId,
    } = this.props;
    const { formValue, isValid, creating, isChanged } = this.state;

    const props = {
      id,
      dataId,
      formValue,
      disabled: !isValid || creating,
      isChanged,
      onClose,
      onCloseDialog,
      onChangeFormValue: this.changeFormValue,
      currentData: { data, node },
      subform,
      flightBookingId,
    };

    return (
      <Formsy
        onValidSubmit={this.handleValidSubmit}
        onChange={this.formChangeDebounce}
        onValid={this.handleValid(true)}
        onInvalid={this.handleValid(false)}
      >
        <EditEventForm {...props} />
      </Formsy>
    );
  };

  renderLeft = () => {
    const { classes, smDown } = this.props;

    const rendered = this.renderForm();

    if (smDown) return rendered;

    return (
      <GridItem>
        <div className={classes.left}>{rendered}</div>
      </GridItem>
    );
  };

  makeFormValue = () => {
    const { node, data } = this.props;
    const { formValue } = this.state;

    if (formValue.temp && formValue.temp.changingType) {
      let newFormValue = { data, node };

      newFormValue = dotProp.set(
        newFormValue,
        `data.type`,
        formValue.data.type,
      );
      newFormValue = dotProp.set(
        newFormValue,
        `data.detail.type`,
        formValue.data.detail.type,
      );
      newFormValue = dotProp.set(
        newFormValue,
        `data`,
        EDIT_HELPERS.convertReservation,
      );

      return newFormValue;
    }

    return formValue;
  };

  makeSubFormValue = () => {
    const { subform, data, node } = this.props;
    const { formValue } = this.state;

    if (subform === 'FlightBookingForm') {
      return formValue;
    }

    if (subform === 'AttachmentForm') {
      const newFormValue = {
        data,
        node,
      };

      const eventAttachments = dotProp.get(formValue, 'data.eventAttachments');

      return dotProp.set(
        newFormValue,
        'data.eventAttachments',
        eventAttachments,
      );
    }

    if (subform === 'ReservationForm') {
      let newData = { ...data };

      newData = EVENT_VIEW_HELPERS.setBookingNumber(
        newData,
        EVENT_VIEW_HELPERS.bookingNumber(formValue.data),
      );
      newData = EVENT_VIEW_HELPERS.setBookedBy(
        newData,
        EVENT_VIEW_HELPERS.bookedBy(formValue.data),
      );
      newData = EVENT_VIEW_HELPERS.setSupplierName(
        newData,
        EVENT_VIEW_HELPERS.supplierName(formValue.data),
      );
      newData = EVENT_VIEW_HELPERS.setPersonCount(
        newData,
        EVENT_VIEW_HELPERS.personCount(formValue.data),
      );
      newData = EVENT_VIEW_HELPERS.setBookingDate(
        newData,
        EVENT_VIEW_HELPERS.bookingDate(formValue.data),
      );
      newData = EVENT_VIEW_HELPERS.setPaidBy(
        newData,
        EVENT_VIEW_HELPERS.paidBy(formValue.data),
      );
      newData = EVENT_VIEW_HELPERS.setCurrency(
        newData,
        EVENT_VIEW_HELPERS.currency(formValue.data),
      );
      newData = EVENT_VIEW_HELPERS.setBudgetAmount(
        newData,
        EVENT_VIEW_HELPERS.budgetAmount(formValue.data),
      );
      newData = EVENT_VIEW_HELPERS.setActualAmount(
        newData,
        EVENT_VIEW_HELPERS.actualAmount(formValue.data),
      );

      return { data: newData, node };
    }

    if (subform === 'CancellationForm') {
      let newData = { ...data };

      newData = EVENT_VIEW_HELPERS.setCancellationDate(
        newData,
        EVENT_VIEW_HELPERS.cancellationCancellationDate(formValue.data),
      );
      newData = EVENT_VIEW_HELPERS.setSupplierConfirmed(
        newData,
        EVENT_VIEW_HELPERS.cancellationSupplierConfirmed(formValue.data),
      );
      newData = EVENT_VIEW_HELPERS.setCancellationReference(
        newData,
        EVENT_VIEW_HELPERS.cancellationCancellationReference(formValue.data),
      );
      newData = EVENT_VIEW_HELPERS.setRefundSituation(
        newData,
        EVENT_VIEW_HELPERS.cancellationRefundSituation(formValue.data),
      );
      newData = EVENT_VIEW_HELPERS.setCancellationNotes(
        newData,
        EVENT_VIEW_HELPERS.cancellationCancellationNotes(formValue.data),
      );

      return { data: newData, node };
    }

    return this.makeFormValue();
  };

  renderEvent = () => {
    const { classes, subform, action, flightBookingId } = this.props;
    const formValue = this.makeSubFormValue();

    const editing = action === 'edit';

    return (
      <GridContainer direction="column" alignItems="center" spacing={0}>
        <GridItem className={classnames(!editing && classes.content)}>
          <StyledViewEvent
            styled
            action={action}
            subform={subform}
            flightBookingId={flightBookingId}
            {...formValue}
          />
        </GridItem>
      </GridContainer>
    );
  };

  render = () => {
    const { classes, smDown } = this.props;

    if (smDown) return this.renderLeft();

    return (
      <GridContainer
        wrap="nowrap"
        spacing={0}
        className={classes.notScrollable}
      >
        {this.renderLeft()}

        <GridItem
          xs={LOGIC_HELPERS.ifElse(smDown, 12, true)}
          className={classnames(
            classes.contentClassName,
            LOGIC_HELPERS.ifElse(smDown, classes.contentSm),
          )}
        >
          <div className={classes.scrollableX}>{this.renderEvent()}</div>
        </GridItem>
      </GridContainer>
    );
  };
}

EditEventCard.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,
  smDown: PropTypes.bool,

  // parent props
  eventType: PropTypes.string,
  subtype: PropTypes.string,
  templateId: PropTypes.number,
  timelineId: PropTypes.number,
  dayId: PropTypes.number,
  portalId: PropTypes.number,
  id: PropTypes.number,
  flightBookingId: PropTypes.number,
  dataId: PropTypes.number,
  onClose: PropTypes.func,
  onCloseDialog: PropTypes.func,
  subform: PropTypes.any,
  action: PropTypes.any,

  // resaga props
  data: PropTypes.object,
  node: PropTypes.object,
};

EditEventCard.defaultProps = {
  eventType: 'Activity',
  data: {},
  node: {},
};

export default compose(
  withStyles(styles, { name: 'EditEventCard' }),
  withSMDown,
  withTimelineId,
  resaga(DATA_ID_CONFIG),
  resaga(CONFIG),
)(EditEventCard);
