import classnames from 'classnames';
import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import Hr from 'components/Hr';
import JText from 'components/JText';
import { withStyles } from 'components/material-ui';
import { withSMDown } from 'components/material-ui/hocs/withMediaQuery';
import AccommodationForm from 'containers/Portal/components/AddEvent/components/EventForm/forms/AccommodationForm';
import ActivityForm from 'containers/Portal/components/AddEvent/components/EventForm/forms/ActivityForm';
import FlightBookingForm from 'containers/Portal/components/AddEvent/components/EventForm/forms/FlightBookingForm';
import TransportationForm from 'containers/Portal/components/AddEvent/components/EventForm/forms/TransportationForm';
import withTimelineId from 'containers/Portal/components/AddEvent/components/EventForm/hocs/withTimelineId';
import SelectEventIcon from 'containers/Portal/components/AddEvent/components/EventForm/parts/SelectEventIcon';
import { EVENT_PATHS } from 'datastore/eventStore/constants';
import { EVENT_STORE_HELPERS } from 'datastore/eventStore/helpers';
import { NODE_PATHS } from 'datastore/nodeStore/constants';
import { NODE_STORE_HELPERS } from 'datastore/nodeStore/helpers';
import get from 'lodash/get';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import endInputs from 'smartComponents/Event/components/Event/parts/Event/EndTime/inputs';
import startInputs from 'smartComponents/Event/components/Event/parts/Event/StartTime/inputs';
import { EVENT_VIEW_HELPERS } from 'smartComponents/Node/types/Event/helpers';
import Icon from 'ugcomponents/Icon';
import { Data } from 'ugcomponents/Inputs';
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
  const { formValue } = props;

  return EVENT_VIEW_HELPERS.subtype(get(formValue, 'data'), '');
};

export class EventForm extends PureComponent {
  state = {
    type: defaultType(this.props),
    subtype: defaultSubtype(this.props),
  };

  renderCloseButton = () => {
    const { onClose, isChanged } = this.props;

    if (!onClose || isChanged) return null;

    return (
      <GridItem>
        <JButton bg="gray" onClick={onClose}>
          <Icon icon="lnr-cross" size="small" />
        </JButton>
      </GridItem>
    );
  };

  hasFileLoading = () => {
    const { formValue, fileUploading } = this.props;
    const { type, subtype } = this.state;
    if (!type || !subtype) return false;
    const { data } = formValue;
    const { eventAttachments } = data || {};
    return EVENT_VIEW_HELPERS.hasPendingEventAttachment(
      eventAttachments,
      fileUploading,
    );
  };

  renderFormHeader = () => {
    const { classes, action } = this.props;

    if (action === 'edit') {
      return (
        <div className={classes.formHeader}>
          <GridContainer direction="column" spacing={0}>
            <GridItem>
              <JText black xl>
                Edit an event
              </JText>
            </GridItem>
          </GridContainer>
        </div>
      );
    }

    return (
      <div className={classes.formHeader}>
        <GridContainer alignItems="center">
          <GridItem xs>
            <GridContainer direction="column" spacing={0}>
              <GridItem>
                <GridContainer alignItems="center">
                  <GridItem xs>
                    <JText black xl>
                      Create Event
                    </JText>
                  </GridItem>
                </GridContainer>
              </GridItem>
              <GridItem>
                <JText black>Plan and share important moments.</JText>
              </GridItem>
            </GridContainer>
          </GridItem>
          {this.renderCloseButton()}
        </GridContainer>
      </div>
    );
  };

  formComponent = () => {
    const { type, subtype } = this.state;

    if (subtype === 'Flight') {
      return FlightBookingForm;
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

  renderForm = () => {
    const { formValue, templateId } = this.props;

    const FormComponent = this.formComponent();

    if (!FormComponent) return <JText dark>Type not supported!</JText>;

    return (
      <GridItem>
        <FormComponent templateId={templateId} formValue={formValue} />
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

  renderFormButtons = () => {
    const { classes, action, disabled, onClose } = this.props;
    const { type, subtype, selectSubtype } = this.state;

    if (action === 'edit') {
      return (
        <div className={classes.formButtons}>
          <GridContainer alignItems="center">
            <GridItem>
              <JButton
                block
                bg="gray"
                padding="lg"
                bold
                onClick={this.handleSelectSubtype}
              >
                Back
              </JButton>
            </GridItem>
            <GridItem xs>
              <JButton block bg="green" padding="lg" bold type="submit">
                Update
              </JButton>
            </GridItem>
          </GridContainer>
        </div>
      );
    }

    return (
      <div className={classes.formButtons}>
        <GridContainer alignItems="center">
          {LOGIC_HELPERS.ifElse(
            selectSubtype,
            <GridItem>
              <JButton block bg="gray" padding="lg" bold onClick={onClose}>
                Close
              </JButton>
            </GridItem>,
            <GridItem>
              <JButton
                block
                bg="gray"
                padding="lg"
                bold
                onClick={this.handleSelectSubtype}
              >
                Back
              </JButton>
            </GridItem>,
          )}
          <GridItem xs>
            <JButton
              disabled={!type || !subtype || disabled || this.hasFileLoading()}
              block
              bg="green"
              padding="lg"
              bold
              type="submit"
            >
              Create
            </JButton>
          </GridItem>
        </GridContainer>
      </div>
    );
  };

  handleClickSubtype = event => () => {
    this.setState({
      subtype: event.subtype,
      selectSubtype: false,
    });
  };

  renderSubtype = event => {
    const { classes, smDown } = this.props;
    const { type, subtype } = this.state;

    return (
      <GridItem key={event.subtype} xs={LOGIC_HELPERS.ifElse(smDown, 4)}>
        <Button
          size="xs"
          color="gray"
          block={smDown}
          className={classnames(
            classes.subtypeButton,
            LOGIC_HELPERS.ifElse(smDown, classes.subtypeButtonSm),
            LOGIC_HELPERS.ifElse(subtype === event.subtype, classes.activeCard),
          )}
          onClick={this.handleClickSubtype(event)}
        >
          <GridContainer direction="column" spacing={0}>
            <GridItem>
              <EventIcon
                type={type}
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
          </GridContainer>
        </Button>
      </GridItem>
    );
  };

  renderSelectSubTypes = () => {
    const { type } = this.state;

    const options = EVENT_CONSTANTS.subtypeNamesByType(type);

    return (
      <GridItem>
        <GridContainer alignItems="center">
          {options.map(this.renderSubtype)}
        </GridContainer>
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

  handleSelectType = event => () => {
    const { type } = this.state;

    const active = type === event.type;

    this.setState({
      type: event.type,
    });
    if (active) {
      this.setState({
        selectSubtype: true,
      });
    } else {
      // clear subtype if change type
      this.setState({
        subtype: '',
      });
    }
  };

  renderType = event => {
    const { classes } = this.props;
    const { type } = this.state;

    const active = type === event.type;

    return (
      <GridItem key={event.type}>
        <Button
          size="xs"
          color="gray"
          className={classnames(
            classes.typeButton,
            LOGIC_HELPERS.ifElse(type === event.type, classes.typeActive),
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

  renderData = () => {
    const { timelineId } = this.props;
    const { type, subtype } = this.state;

    return (
      <>
        <Data
          currentValue={type}
          name={EVENT_STORE_HELPERS.pathToEventInputName(EVENT_PATHS.type)}
        />
        <Data
          currentValue={subtype}
          name={EVENT_STORE_HELPERS.pathToEventInputName(EVENT_PATHS.subtype)}
        />
        <Data
          currentValue={timelineId}
          name={NODE_STORE_HELPERS.pathToNodeInputName(NODE_PATHS.parentNodeId)}
        />
      </>
    );
  };

  handleSelectSubtype = () =>
    this.setState({
      selectSubtype: true,
    });

  renderShowSelectSubtype = () => {
    const { type, subtype, selectSubtype } = this.state;

    const showSelectSubtype = !subtype || selectSubtype;

    if (showSelectSubtype) {
      return (
        <>
          {this.renderSelectSubTypes()}
          <Hr half />
        </>
      );
    }

    return (
      <GridItem>
        <SelectEventIcon type={type} subtype={subtype} />
      </GridItem>
    );
  };

  clearSubtype = () => this.setState({ subtype: '' });

  renderFlightForm = () => {
    const { formValue, onClose, selectedDayId, timelineId } = this.props;

    return (
      <FlightBookingForm
        onClose={onClose}
        formValue={formValue}
        selectedDayId={selectedDayId}
        timelineId={timelineId}
        renderFormHeader={this.renderFormHeader}
        onSelectSubtype={this.clearSubtype}
      />
    );
  };

  render = () => {
    const { classes, smDown, action } = this.props;
    const { type, subtype, selectSubtype } = this.state;

    const showSelectSubtype = !subtype || selectSubtype;

    if (
      !showSelectSubtype &&
      type === 'Transportation' &&
      subtype === 'Flight'
    ) {
      return (
        <>
          {this.renderData()}
          {this.renderFlightForm()}
        </>
      );
    }

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
                LOGIC_HELPERS.ifElse(action === 'edit', classes.formGridEdit),
              )}
            >
              <GridContainer direction="column">
                <GridItem>
                  <GridContainer direction="column" spacing={0}>
                    <GridItem>{this.renderSelectTypes()}</GridItem>

                    <GridItem>
                      <GridContainer direction="column">
                        <GridItem>
                          <div className={classes.eventContent}>
                            <GridContainer direction="column" spacing={2}>
                              {this.renderShowSelectSubtype()}

                              {!subtype && this.renderFormData()}
                              {subtype && this.renderForm()}
                            </GridContainer>
                          </div>
                        </GridItem>

                        {(!type || !subtype) && (
                          <GridItem>
                            <JText gray italic nowrap={false}>
                              You can always change event type later.
                            </JText>
                          </GridItem>
                        )}
                      </GridContainer>
                    </GridItem>
                  </GridContainer>
                </GridItem>
              </GridContainer>
            </div>
          </GridItem>

          <GridItem>{this.renderFormButtons()}</GridItem>
        </GridContainer>
      </>
    );
  };
}

EventForm.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,
  templateId: PropTypes.number,
  timelineId: PropTypes.number,
  smDown: PropTypes.bool,

  // parent props
  action: PropTypes.string,
  onClose: PropTypes.func,
  formValue: PropTypes.object,
  disabled: PropTypes.bool,
  isChanged: PropTypes.bool,
  selectedDayId: PropTypes.number,

  // resaga props
  fileUploading: PropTypes.bool,
};

EventForm.defaultProps = {
  formValue: {},
};

export default compose(
  withStyles(styles, { name: 'EventForm' }),
  withSMDown,
  withTimelineId,
  resaga(CONFIG),
)(EventForm);
