import { NODE_API_HELPERS } from 'apis/components/Node/helpers';
import { TEMPLATE_API_HELPERS } from 'apis/components/Template/helpers';
import classnames from 'classnames';
import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import JText from 'components/JText';
import { withStyles } from 'components/material-ui';
import { withSMDown } from 'components/material-ui/hocs/withMediaQuery';
import EventForm from 'containers/Portal/components/AddEvent/components/EventForm';
import withTimelineId from 'containers/Portal/components/AddEvent/components/EventForm/hocs/withTimelineId';
import { PORTAL_HELPERS } from 'containers/Portal/helpers';
import EventsWithoutDay from 'containers/Templates/TemplateManagement/components/TemplateContent/components/TabContent/components/TabTimeLine/components/TimeLineContent/components/EventsWithoutDay';
import dotProp from 'dot-prop-immutable';
import Formsy from 'formsy-react';
import debounce from 'lodash/debounce';
import get from 'lodash/get';
import set from 'lodash/set';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import DayDate from 'smartComponents/Node/types/Day/components/DayDate';
import Event from 'smartComponents/Node/types/Event';
import { StyledViewEvent } from 'smartComponents/Node/types/Event/components/ViewEvent';
import { EVENT_DATA_HELPERS } from 'smartComponents/Node/types/Event/dataHelpers';
import { EVENT_VIEW_HELPERS } from 'smartComponents/Node/types/Event/helpers';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import JButton from 'viewComponents/Button/variants/JButton';
import { CONFIG } from './config';
import styles from './styles';

const reduceAttachments = (accu, attachment) => {
  if (attachment.errorMessage) return accu;

  return accu.concat(attachment);
};

export const convertAttachments = (data = {}) => {
  if (!data.eventAttachments) return data;

  const parsedData = data;

  if (Array.isArray(parsedData.eventAttachments)) {
    parsedData.eventAttachments = parsedData.eventAttachments.reduce(
      reduceAttachments,
      [],
    );

    return parsedData;
  }

  // convert object to array
  parsedData.eventAttachments = Object.keys(data.eventAttachments).map(
    key => data.eventAttachments[key],
  );

  // reduce failed attachment

  parsedData.eventAttachments = parsedData.eventAttachments.reduce(
    reduceAttachments,
    [],
  );

  return parsedData;
};

export class AddEventCard extends PureComponent {
  state = {
    formValue: EVENT_DATA_HELPERS.defaultFormValue(this.props),
    creating: false,
    checkedEvents: [],
    data: [],
    addCount: 0,
  };

  handleAddNextEvent = () => {
    const { checkedEvents, data, addCount } = this.state;

    if (addCount === 0) {
      this.setState({ adding: true });
    }

    if (addCount >= checkedEvents.length) {
      return this.updateTimes(checkedEvents);
    }

    return this.addEventToDay(checkedEvents[addCount], data[addCount]);
  };

  updateTimesSuccess = () => {
    const { onClose } = this.props;

    LOGIC_HELPERS.ifFunction(onClose);
    return this.setState({
      checkedEvents: [],
      data: [],
      addCount: 0,
      adding: false,
    });
  };

  updateTimes = checkedEvents => {
    const { templateId } = this.props;

    NODE_API_HELPERS.getTimes(
      {
        id: templateId,
        ids: checkedEvents,
        onSuccess: this.updateTimesSuccess,
      },
      this.props,
    );
  };

  addEventToDay = (id, eventData = {}) => {
    const { dayId, templateId } = this.props;

    return TEMPLATE_API_HELPERS.moveToDay(
      {
        id,
        eventData,
        onSuccess: this.handlePatchEventSuccess,
        dayId,
        templateId,
      },
      this.props,
    );
  };

  handlePatchEventSuccess = () => {
    this.setState(
      ({ addCount }) => ({
        addCount: addCount + 1,
      }),
      this.handleAddNextEvent,
    );
  };

  createEvent = form => () => {
    const { templateId } = this.props;

    const { data, node } = form;

    TEMPLATE_API_HELPERS.createEvent(
      {
        templateId,
        model: { data: convertAttachments(data), node },
        onSuccess: this.handleCreateEventSuccess,
      },
      this.props,
    );
  };

  handleValidSubmit = form => {
    const { creating } = this.state;

    if (creating) return null;

    return this.setState(
      {
        creating: true,
      },
      this.createEvent(form),
    );
  };

  handleCreateEventSuccess = ({ node }) => {
    const { timelineId, onClose, portalId } = this.props;

    this.setState({ creating: false });

    LOGIC_HELPERS.ifFunction(onClose);

    const id = Number.parseInt(Object.keys(node)[0], 10);
    const dayId = get(node, `${id}.parentNodeId`);

    PORTAL_HELPERS.openViewEvent(
      {
        id,
        dayId: LOGIC_HELPERS.ifElse(dayId !== timelineId, dayId, 0),
      },
      this.props,
      portalId,
    );
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

  renderForm = () => {
    const { onClose, dayId, timelineId } = this.props;
    const { formValue, isValid, creating, isChanged } = this.state;

    const props = {
      formValue,
      onClose,
      disabled: !isValid || creating,
      selectedDayId: dayId || timelineId,
      isChanged,
    };

    return (
      <Formsy
        onValidSubmit={this.handleValidSubmit}
        onChange={this.formChangeDebounce}
        onValid={this.handleValid(true)}
        onInvalid={this.handleValid(false)}
      >
        <EventForm {...props} />
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

  renderEvent = () => {
    const { classes } = this.props;
    const { formValue } = this.state;

    return (
      <GridContainer direction="column" alignItems="center" spacing={0}>
        <GridItem className={classes.content}>
          <StyledViewEvent styled action="create" {...formValue} />
        </GridItem>
      </GridContainer>
    );
  };

  handleClickUnscheduledEvent = event => eventData => {
    const { id } = event;

    this.setState(({ checkedEvents, data }) => {
      if (checkedEvents.indexOf(id) === -1)
        return {
          checkedEvents: checkedEvents.concat(id),
          data: data.concat(eventData),
        };

      return {
        checkedEvents: dotProp.delete(checkedEvents, checkedEvents.indexOf(id)),
        data: dotProp.delete(data, checkedEvents.indexOf(id)),
      };
    });
  };

  renderUnscheduledEvent = event => {
    const { portalId, templateId } = this.props;

    const { id, position } = event;

    const checked = this.state.checkedEvents.indexOf(id) !== -1;

    return (
      <Event
        key={id}
        smDown
        simplify
        badge
        middle={!portalId}
        portalId={portalId}
        templateId={templateId}
        id={id}
        position={position}
        checked={checked}
        onClick={this.handleClickUnscheduledEvent(event)}
      />
    );
  };

  renderSelectUnscheduledEvents = dayId => ids => (
    <GridItem>
      <br />
      <br />
      <GridContainer direction="column" spacing={2}>
        <GridItem>
          <GridContainer direction="column" spacing={0}>
            <GridItem>
              <JText danger lg>
                <DayDate id={dayId} showDayIndex />
              </JText>
            </GridItem>
            <GridItem>
              <JText dark xl>
                Schedule your unplanned events
              </JText>
            </GridItem>
            <GridItem>
              <JText gray>Select any day on the left to change date</JText>
            </GridItem>
          </GridContainer>
        </GridItem>
        <GridItem>
          <GridContainer alignItems="center" spacing={2}>
            {ids.map(this.renderUnscheduledEvent)}

            {LOGIC_HELPERS.ifElse(
              !ids.length,
              <GridItem>
                <JText gray xl>
                  No unplanned events
                </JText>
              </GridItem>,
            )}
          </GridContainer>
        </GridItem>
      </GridContainer>
    </GridItem>
  );

  renderSelect = () => {
    const {
      classes,
      smDown,
      templateId,
      timelineId,
      portalId,
      dayId,
    } = this.props;
    const { checkedEvents, adding } = this.state;

    return (
      <GridContainer
        wrap="nowrap"
        spacing={0}
        className={classes.notScrollable}
      >
        <GridItem
          xs
          className={classnames(
            classes.contentClassName,
            LOGIC_HELPERS.ifElse(smDown, classes.contentSm),
          )}
        >
          <div className={classes.scrollableX}>
            <GridContainer direction="column" alignItems="center">
              <GridItem className={classes.content}>
                <GridContainer direction="column" spacing={2}>
                  <EventsWithoutDay
                    templateId={templateId}
                    tabId={timelineId}
                    portalId={portalId}
                    smDown
                    showEmpty
                    currentState={this.state}
                  >
                    {this.renderSelectUnscheduledEvents(dayId)}
                  </EventsWithoutDay>

                  {LOGIC_HELPERS.ifElse(
                    checkedEvents.length > 0,
                    <GridItem>
                      <GridContainer alignItems="center">
                        <GridItem>
                          <JButton
                            disabled={adding}
                            bg="blue"
                            padding="lg"
                            onClick={this.handleAddNextEvent}
                          >
                            Add to <DayDate id={dayId} showDayIndex />
                          </JButton>
                        </GridItem>
                      </GridContainer>
                    </GridItem>,
                  )}
                </GridContainer>
              </GridItem>
            </GridContainer>
          </div>
        </GridItem>
      </GridContainer>
    );
  };

  render = () => {
    const { classes, smDown, selectUnscheduled } = this.props;
    const { formValue, creating } = this.state;

    if (selectUnscheduled && !creating) return this.renderSelect();

    if (smDown) return this.renderLeft();

    const data = get(formValue, 'data');

    const isFlight = EVENT_VIEW_HELPERS.isFlight(data);

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
          <div className={classes.scrollableX}>
            {!isFlight && this.renderEvent()}
          </div>
        </GridItem>
      </GridContainer>
    );
  };
}

AddEventCard.propTypes = {
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
  onClose: PropTypes.func,
  selectUnscheduled: PropTypes.bool,

  // resaga props
};

AddEventCard.defaultProps = {
  eventType: 'Activity',
};

export default compose(
  withStyles(styles, { name: 'AddEventCard' }),
  withSMDown,
  withTimelineId,
  resaga(CONFIG),
)(AddEventCard);
