import classnames from 'classnames';
import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import Hr from 'components/Hr';
import { FilledTextField } from 'components/Inputs/TextField/components/FilledInputs';
import FText from 'components/Inputs/TextField/components/FilledInputs/components/FText';
import JText from 'components/JText';
import { withStyles } from 'components/material-ui';
import { withSMDown } from 'components/material-ui/hocs/withMediaQuery';
import { EDIT_HELPERS } from 'containers/Portal/components/AddEvent/components/EditEventCard/helpers';
import AccommodationForm from 'containers/Portal/components/AddEvent/components/EventForm/forms/AccommodationForm';
import ActivityForm from 'containers/Portal/components/AddEvent/components/EventForm/forms/ActivityForm';
import FlightBookingSubForm from 'containers/Portal/components/AddEvent/components/EventForm/forms/FlightBookingSubForm';
import FlightForm from 'containers/Portal/components/AddEvent/components/EventForm/forms/FlightForm';
import TransportationForm from 'containers/Portal/components/AddEvent/components/EventForm/forms/TransportationForm';
import withTimelineId from 'containers/Portal/components/AddEvent/components/EventForm/hocs/withTimelineId';
import Attachments from 'containers/Portal/components/AddEvent/components/EventForm/parts/Attachments';
import Reservation from 'containers/Portal/components/AddEvent/components/EventForm/parts/Reservation';
import SelectEventIcon from 'containers/Portal/components/AddEvent/components/EventForm/parts/SelectEventIcon';
import { EVENT_PATHS } from 'datastore/eventStore/constants';
import { EVENT_STORE_HELPERS } from 'datastore/eventStore/helpers';
import { NODE_PATHS } from 'datastore/nodeStore/constants';
import { NODE_STORE_HELPERS } from 'datastore/nodeStore/helpers';
import dotProp from 'dot-prop-immutable';
import get from 'lodash/get';
import { DatePicker } from 'material-ui-pickers';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import moment from 'moment';
import endInputs from 'smartComponents/Event/components/Event/parts/Event/EndTime/inputs';
import startInputs from 'smartComponents/Event/components/Event/parts/Event/StartTime/inputs';
import { EVENT_VIEW_HELPERS } from 'smartComponents/Node/types/Event/helpers';
import Icon from 'ugcomponents/Icon';
import { Data } from 'ugcomponents/Inputs';
import ValidationRadioGroup from 'ugcomponents/Inputs/ValidationRadioGroup';
import { EVENT_CONSTANTS } from 'utils/constants/events';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import Button from 'viewComponents/Button';
import JButton from 'viewComponents/Button/variants/JButton';
import EventIcon from 'viewComponents/Event/components/Icon';
import { CONFIG } from './config';
import styles from './styles';

const defaultType = props => {
  const { formValue } = props;

  return EVENT_VIEW_HELPERS.type(get(formValue, 'data'), '');
};

const defaultSubtype = props => {
  const { formValue, flightBookingId } = props;

  return EVENT_VIEW_HELPERS.subtype(
    get(formValue, 'data'),
    LOGIC_HELPERS.ifElse(flightBookingId, 'Flight'),
  );
};

export const defaultCancellationDate = props => {
  const { formValue } = props;

  const date = EVENT_VIEW_HELPERS.cancellationCancellationDate(
    get(formValue, 'data'),
  );

  if (!date) return undefined;

  return moment(date);
};

export class EditEventForm extends PureComponent {
  state = {
    type: defaultType(this.props),
    subtype: defaultSubtype(this.props),
    changingType: false,
    cancellationDate: defaultCancellationDate(this.props),
  };

  componentDidMount = () => {
    const { cancellationDate } = this.state;

    if (!cancellationDate) {
      this.setState({
        cancellationDate: moment(),
      });
    }
  };

  renderCloseButton = () => {
    const { onCloseDialog, isChanged } = this.props;

    if (!onCloseDialog || isChanged) return null;

    return (
      <GridItem>
        <JButton bg="gray" onClick={onCloseDialog}>
          <Icon icon="lnr-cross" size="small" />
        </JButton>
      </GridItem>
    );
  };

  renderFormHeader = () => {
    const { classes, subform } = this.props;

    let title = 'Edit an event';

    if (subform === 'FlightBookingForm') {
      title = 'Edit Flight Itinerary';
    } else if (subform === 'CancellationForm') {
      title = 'Cancel an event';
    }

    return (
      <div className={classes.formHeader}>
        <GridContainer alignItems="center">
          <GridItem xs>
            <JText black xl>
              {title}
            </JText>
          </GridItem>
          {this.renderCloseButton()}
        </GridContainer>
      </div>
    );
  };

  formComponent = (type, subtype) => {
    if (subtype === 'Flight') {
      return FlightForm;
    }

    if (type === 'Transportation') {
      return TransportationForm;
    }

    if (type === 'Activity') {
      return ActivityForm;
    }

    if (type === 'Accommodation') {
      return AccommodationForm;
    }

    return null;
  };

  handlePickDate = cancellationDate => {
    this.setState({ cancellationDate });
  };

  renderForm = () => {
    const { id, templateId, subform, flightBookingId: bookingId } = this.props;
    const { cancellationDate } = this.state;

    const { formValue, type, subtype } = this.typeSubtype();

    if (subform === 'FlightBookingForm') {
      const { data } = formValue;

      const flightBookingId =
        bookingId || EVENT_VIEW_HELPERS.flightBookingId(data);

      return (
        <GridItem>
          <FlightBookingSubForm id={flightBookingId} templateId={templateId} />
        </GridItem>
      );
    }

    if (subform === 'AttachmentForm') {
      return (
        <GridItem>
          <Attachments data={formValue.data} adding editing />
        </GridItem>
      );
    }

    if (subform === 'ReservationForm') {
      return (
        <GridItem>
          <Reservation data={formValue.data} adding editing />
        </GridItem>
      );
    }

    if (subform === 'CancellationForm') {
      const { data } = formValue;

      const supplierConfirmed = EVENT_VIEW_HELPERS.cancellationSupplierConfirmed(
        data,
      );
      const cancellationReference = EVENT_VIEW_HELPERS.cancellationCancellationReference(
        data,
      );
      const refundSituation = EVENT_VIEW_HELPERS.cancellationRefundSituation(
        data,
      );
      const cancellationNotes = EVENT_VIEW_HELPERS.cancellationCancellationNotes(
        data,
      );

      return (
        <GridItem>
          <GridContainer direction="column" spacing={2}>
            <GridItem>
              <Data
                currentValue={
                  cancellationDate &&
                  cancellationDate.format('YYYY-MM-DD HH:mm:ss.SSS')
                }
                name="data.cancellation.cancellationDate"
              />
              <DatePicker
                label="Cancellation date"
                placeholder="Enter cancellation date"
                onChange={this.handlePickDate}
                value={cancellationDate}
                defaultValue={moment()}
                TextFieldComponent={FilledTextField}
                leftArrowIcon={<Icon icon="arrow-left" />}
                rightArrowIcon={<Icon icon="arrow-right" />}
                format="DD/MM/YYYY"
                autoOk
              />
            </GridItem>
            <GridItem>
              <ValidationRadioGroup
                name="data.cancellation.supplierConfirmed"
                row
                noMargin
                value={supplierConfirmed}
                options={{ true: 'Yes', false: 'No' }}
                label={<JText dark>Has supplier confirmed?</JText>}
              />
            </GridItem>
            <GridItem>
              <FText
                name="data.cancellation.cancellationReference"
                label="Cancellation reference"
                placeholder="Enter cancellation reference"
                value={cancellationReference}
              />
            </GridItem>
            <GridItem>
              <FText
                name="data.cancellation.refundSituation"
                label="Refund situation"
                placeholder="What is the refund situation, if applicable"
                value={refundSituation}
              />
            </GridItem>
            <GridItem>
              <FText
                name="data.cancellation.cancellationNotes"
                label="Cancellation Notes"
                placeholder="Record any notes that you may need for future reference"
                value={cancellationNotes}
              />
            </GridItem>
          </GridContainer>
        </GridItem>
      );
    }

    const FormComponent = this.formComponent(type, subtype);
    const key = `${type}_${subtype}`;

    if (!FormComponent)
      return (
        <GridItem>
          <JText dark>Type not supported!</JText>
        </GridItem>
      );

    return (
      <GridItem key={key}>
        <FormComponent
          id={id}
          templateId={templateId}
          formValue={formValue}
          editing
        />
      </GridItem>
    );
  };

  renderFormData = () => {
    const { formValue } = this.props;

    // reserve form data when switching type/subtype

    const { node } = formValue;

    const tempStartDay = EVENT_VIEW_HELPERS.tempStartDay(node);
    const tempStartTime = EVENT_VIEW_HELPERS.tempStartTime(node);
    const startTimeMode = EVENT_VIEW_HELPERS.startTimeMode(node);

    const tempEndDay = EVENT_VIEW_HELPERS.tempEndDay(node);
    const tempEndTime = EVENT_VIEW_HELPERS.tempEndTime(node);

    return (
      <>
        <Data currentValue={tempStartDay} {...startInputs.tempDay} />
        <Data currentValue={tempStartTime} {...startInputs.tempTime} />
        <Data currentValue={startTimeMode} {...startInputs.mode} />

        <Data currentValue={tempEndDay} {...endInputs.tempDay} />
        <Data currentValue={tempEndTime} {...endInputs.tempTime} />
      </>
    );
  };

  openEditDialog = () => {
    const {
      id,
      onCloseDialog,
      flightBookingId: bookingId,
      subform,
    } = this.props;

    LOGIC_HELPERS.ifFunction(onCloseDialog);

    if (subform === 'FlightBookingForm') {
      const { formValue } = this.typeSubtype();
      const { data } = formValue;

      const flightBookingId =
        bookingId || EVENT_VIEW_HELPERS.flightBookingId(data);

      return this.props.resaga.setValue({
        flightBookingView: EVENT_STORE_HELPERS.setFlightBookingView(
          true,
          flightBookingId,
        ),
      });
    }

    return this.props.resaga.setValue({
      eventView: EVENT_STORE_HELPERS.setEventView(true, id),
    });
  };

  hasFileLoading = () => {
    const { formValue, fileUploading } = this.props;
    const { data } = formValue;
    const { eventAttachments } = data || {};
    return EVENT_VIEW_HELPERS.hasPendingEventAttachment(
      eventAttachments,
      fileUploading,
    );
  };

  renderFormButtons = () => {
    const { classes, onClose, subform, isChanged, disabled } = this.props;

    return (
      <div className={classes.formButtons}>
        <GridContainer alignItems="center">
          <GridItem>
            <JButton padding="lg" bold onClick={this.openEditDialog}>
              Advanced
            </JButton>
          </GridItem>
          <GridItem>
            <JButton bg="gray" padding="lg" bold onClick={onClose}>
              {LOGIC_HELPERS.ifElse(isChanged, 'Discard', 'Go back')}
            </JButton>
          </GridItem>
          <GridItem xs>
            <JButton
              block
              bg="blue"
              padding="lg"
              bold
              type="submit"
              disabled={disabled || this.hasFileLoading()}
            >
              {LOGIC_HELPERS.ifElse(
                subform === 'CancellationForm',
                'Cancel Event',
                'Update',
              )}
            </JButton>
          </GridItem>
        </GridContainer>
      </div>
    );
  };

  renderData = () => {
    const { type, subtype, formValue, changingType } = this.typeSubtype();

    const { node } = formValue;
    const nodeType = EVENT_VIEW_HELPERS.nodeType(node);

    return (
      <>
        <Data currentValue={changingType} name="temp.changingType" />
        <Data
          currentValue={type}
          name={EVENT_STORE_HELPERS.pathToEventInputName(EVENT_PATHS.type)}
        />
        <Data
          currentValue={subtype}
          name={EVENT_STORE_HELPERS.pathToEventInputName(EVENT_PATHS.subtype)}
        />
        {LOGIC_HELPERS.ifElse(
          nodeType,
          <Data
            currentValue={nodeType}
            name={NODE_STORE_HELPERS.pathToNodeInputName(NODE_PATHS.type)}
          />,
        )}
      </>
    );
  };

  typeSubtype = () => {
    const { formValue } = this.props;
    const { type, subtype, newType, newSubtype } = this.state;

    let formData = formValue;

    if (newType && newSubtype) {
      formData = dotProp.set(formData, `data.type`, type);
      formData = dotProp.set(formData, `data.detail.type`, subtype);

      return {
        type: newType,
        subtype: newSubtype,
        formValue: formData,
        changingType: true,
      };
    }

    return { type, subtype, formValue };
  };

  renderTypeSubtypeText = () => {
    const { type, subtype } = this.typeSubtype();

    return (
      <GridContainer alignItems="baseline">
        <GridItem>
          <JText gray>{type}</JText>
        </GridItem>
        <GridItem>
          <JText sm gray>
            {' > '}
          </JText>
        </GridItem>
        <GridItem>
          <JText gray>{subtype}</JText>
        </GridItem>
      </GridContainer>
    );
  };

  openChangeType = () => {
    const { type, subtype } = this.state;

    this.setState({
      changingType: true,
      newType: type,
      newSubtype: subtype,
    });
  };

  renderTypeSubTypeIcon = () => (
    <GridContainer alignItems="center" spacing={0}>
      <GridItem xs>{this.renderTypeSubtypeText()}</GridItem>
      <GridItem>
        <JText link onClick={this.openChangeType}>
          Change type
        </JText>
      </GridItem>
    </GridContainer>
  );

  renderShowSelectSubtype = () => {
    const { subform } = this.props;
    const { type, subtype, formValue } = this.typeSubtype();

    if (subform) return null;

    const { data } = formValue;

    const iconOverride = EVENT_VIEW_HELPERS.iconOverride(data);

    return (
      <GridItem>
        <GridContainer direction="column" spacing={2}>
          <GridItem>{this.renderTypeSubTypeIcon()}</GridItem>
          <GridItem>
            <SelectEventIcon
              type={type}
              subtype={subtype}
              iconOverride={iconOverride}
            />
          </GridItem>
        </GridContainer>
      </GridItem>
    );
  };

  handleSelectType = event => () => {
    this.setState({
      newType: event.type,
      newSubtype: '',
    });
  };

  renderType = event => {
    const { classes } = this.props;
    const { newType } = this.state;

    const active = newType === event.type;

    return (
      <GridItem key={event.type}>
        <Button
          size="xs"
          color="gray"
          className={classnames(
            classes.typeButton,
            LOGIC_HELPERS.ifElse(active, classes.typeActive),
          )}
          onClick={this.handleSelectType(event)}
        >
          <JText gray={!active} dark={active} bold={active}>
            {event.type}
          </JText>
        </Button>
      </GridItem>
    );
  };

  renderSelectTypes = () => {
    const { classes, smDown } = this.props;

    return (
      <div
        className={classnames(
          LOGIC_HELPERS.ifElse(!smDown, classes.selectTypes),
        )}
      >
        <GridContainer alignItems="center" spacing={0}>
          <GridItem>{this.renderType({ type: 'Activity' })}</GridItem>
          <GridItem>{this.renderType({ type: 'Transportation' })}</GridItem>
          <GridItem>{this.renderType({ type: 'Accommodation' })}</GridItem>
        </GridContainer>
      </div>
    );
  };

  handleClickSubtype = event => () => {
    // change subtype immediately on click
    this.setState(
      {
        newSubtype: event.subtype,
      },
      this.changeNewTypeSubType,
    );
  };

  renderSubtype = event => {
    const { classes, smDown } = this.props;
    const { subtype, newType, newSubtype } = this.state;

    const current = subtype === event.subtype;

    return (
      <GridItem key={event.subtype} xs={LOGIC_HELPERS.ifElse(smDown, 4)}>
        <Button
          size="xs"
          color="gray"
          block={smDown}
          className={classnames(
            classes.subtypeButton,
            LOGIC_HELPERS.ifElse(smDown, classes.subtypeButtonSm),
            LOGIC_HELPERS.ifElse(
              newSubtype === event.subtype,
              classes.activeCard,
            ),
          )}
          onClick={this.handleClickSubtype(event)}
        >
          <GridContainer direction="column" spacing={0}>
            <GridItem>
              <EventIcon
                type={newType}
                subtype={event.subtype}
                iconOverride={event.icon}
                size="medium"
              />
            </GridItem>
            <GridItem>
              <JText dark ellipsis>
                {event.name}
              </JText>
            </GridItem>
            {LOGIC_HELPERS.ifElse(
              current,
              <GridItem>
                <div className={classes.offsetTop}>
                  <JText danger xs>
                    Current
                  </JText>
                </div>
              </GridItem>,
            )}
          </GridContainer>
        </Button>
      </GridItem>
    );
  };

  renderSelectSubTypes = () => {
    const { newType } = this.state;

    const options = EVENT_CONSTANTS.subtypeNamesByType(newType);

    return (
      <GridItem>
        <GridContainer alignItems="center">
          {options.map(this.renderSubtype)}
        </GridContainer>
      </GridItem>
    );
  };

  cancelChangeType = () =>
    this.setState({
      changingType: false,
      newType: '',
      newSubtype: '',
    });

  changeNewTypeSubType = () => {
    const { currentData, onChangeFormValue } = this.props;
    const { newType, newSubtype } = this.state;

    let formData = currentData;
    formData = dotProp.set(formData, `data.type`, newType);
    formData = dotProp.set(formData, `data.detail.type`, newSubtype);
    formData = dotProp.set(formData, `data`, EDIT_HELPERS.convertReservation);

    LOGIC_HELPERS.ifFunction(onChangeFormValue, [formData]);

    this.setState({
      type: newType,
      subtype: newSubtype,
      newType: '',
      newSubtype: '',
      changingType: false,
    });
  };

  renderSelectTypeSubtype = () => {
    const { classes } = this.props;

    return (
      <GridItem>
        <GridContainer direction="column">
          <GridItem>
            <GridContainer direction="column" spacing={0}>
              <GridItem>
                <JText gray uppercase sm>
                  Current type
                </JText>
              </GridItem>
              <GridItem>{this.renderTypeSubtypeText()}</GridItem>
            </GridContainer>
          </GridItem>

          <Hr half />

          <GridItem>
            <JText gray uppercase sm>
              Click to Select new type & subtype
            </JText>
          </GridItem>
          <GridItem>{this.renderSelectTypes()}</GridItem>
          <GridItem>{this.renderSelectSubTypes()}</GridItem>
          <GridItem>
            <div className={classes.formButtons}>
              <JButton
                block
                bg="gray"
                padding="lg"
                bold
                onClick={this.cancelChangeType}
              >
                Cancel
              </JButton>
            </div>
          </GridItem>
        </GridContainer>
      </GridItem>
    );
  };

  render = () => {
    const { classes, smDown } = this.props;
    const { subtype, changingType } = this.state;

    return (
      <>
        {this.renderData()}

        <GridContainer direction="column" spacing={0}>
          <GridItem>{this.renderFormHeader()}</GridItem>

          <GridItem>
            <div
              className={classnames(
                LOGIC_HELPERS.ifElse(
                  smDown,
                  classes.formGridSm,
                  classes.formGrid,
                ),
              )}
            >
              <GridContainer direction="column">
                {LOGIC_HELPERS.ifElse(
                  changingType,
                  this.renderSelectTypeSubtype(),
                  <>
                    <GridItem>
                      <GridContainer direction="column">
                        <GridItem>
                          <div className={classes.eventContent}>
                            <GridContainer direction="column" spacing={2}>
                              {this.renderShowSelectSubtype()}

                              {LOGIC_HELPERS.ifElse(subtype, this.renderForm())}
                            </GridContainer>
                          </div>
                        </GridItem>
                      </GridContainer>
                    </GridItem>
                  </>,
                )}
              </GridContainer>
            </div>
          </GridItem>

          <GridItem>{this.renderFormButtons()}</GridItem>
        </GridContainer>
      </>
    );
  };
}

EditEventForm.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,
  resaga: PropTypes.object.isRequired,
  templateId: PropTypes.number,
  timelineId: PropTypes.number,
  smDown: PropTypes.bool,

  // parent props
  id: PropTypes.number,
  dataId: PropTypes.number,
  flightBookingId: PropTypes.number,
  action: PropTypes.string,
  onClose: PropTypes.func,
  onCloseDialog: PropTypes.func,
  onChangeFormValue: PropTypes.func,
  formValue: PropTypes.object,
  currentData: PropTypes.object,
  disabled: PropTypes.bool,
  isChanged: PropTypes.bool,
  subform: PropTypes.any,

  // resaga props
  fileUploading: PropTypes.bool,
};

EditEventForm.defaultProps = {
  currentData: {},
  formValue: {},
};

export default compose(
  withStyles(styles, { name: 'EditEventForm' }),
  withSMDown,
  withTimelineId,
  resaga(CONFIG),
)(EditEventForm);
