/**
 * Created by stephenkarpinskyj on 13/8/18.
 */
import { ability } from 'apis/components/Ability/ability';
import { withActivityDetailId } from 'smartComponents/Event/hoc/withActivityDetailId';
import { PARTICIPANT } from 'utils/modelConstants';
import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import resaga from 'resaga';
import { FormattedMessage as M } from 'react-intl';

import { TEMPLATE_API_HELPERS } from 'apis/components/Template/helpers';
import { EVENT_CONSTANTS, EVENTS } from 'utils/constants/events';
import { EVENT_STORE_HELPERS } from 'datastore/eventStore/helpers';
import {
  withStyles,
  Popper,
  ClickAwayListener,
  Paper,
} from 'components/material-ui';
import { EVENT_HELPERS } from 'utils/helpers/events';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import Button from 'viewComponents/Button';
import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import Dialog from 'components/Dialog';
import DialogContent from 'components/Dialog/UGDialogContent';
import DialogTitle from 'components/Dialog/UGDialogTitle';
import DialogActions from 'components/Dialog/UGDialogAction';
import DialNumberButton from 'smartComponents/Inputs/PhoneTextField/components/ActionButtons/components/DialNumberButton';
import VerticalLine from 'viewComponents/VerticalLine';
import {
  EventDeleteConfirmation,
  EventDuplicateConfirmation,
} from 'viewComponents/Event';
import { withKey } from 'smartComponents/Dialog/hoc';
import { withCanEditEvent } from 'smartComponents/Event/hoc';
import { ForEachEventType } from 'smartComponents/Event/logics';
import {
  Activity,
  Accommodation,
  Flight,
  Transportation,
} from 'smartComponents/Event/components/Event/layouts';
import Ratings from 'smartComponents/Event/components/Event/layouts/Event/Ratings';
import {
  EventSubtype,
  EventIcon,
  EventLocation,
  EventBookingNumber,
  TransportationBookingNumber,
} from 'smartComponents/Event/components/Event/parts';
import { Title, CloseButton } from 'ugcomponents/DialogForm/Complex';
import { EVENT_STORE_HOC } from 'datastore/eventStore/hoc';
import { EVENT_PATHS } from 'datastore/eventStore/constants';
import { VARIANTS } from 'variantsConstants';

import DatesSelect from 'smartComponents/Inputs/DatesSelect';
import JText from 'components/JText';
import classnames from 'classnames';
import { EditableFormActions } from 'viewComponents/Editable';
import Form from 'ugcomponents/Form';
import moment from 'moment';
import MOMENT_HELPERS from 'utils/helpers/moment';
import Icon from 'ugcomponents/Icon';
import { PORTAL_HELPERS } from 'containers/Portal/helpers';
import {
  CONFIG_IDS,
  CONFIG_DATA,
  CONFIG_EXISTING_EVENT_DATES,
  CONFIG_DATA_SET_VALUE,
  CONFIG_FLIGHT_DATA,
  CONFIG_TRANSPORTATION_DATA,
  CONFIG_ACTIVITY_DETAILS,
} from './config';
import { getEventDetails } from './utils';
import style from './style';
import m from './messages';

export class View extends React.PureComponent {
  state = {
    confirmingDelete: false,
    confirmingDuplicate: false,
    anchorEl: null,
    clickAway: false,
    dates: [],
    datesError: '',
  };

  getPaperProps = () => {
    if (!this.PaperProps) {
      const { classes } = this.props;
      this.PaperProps = {
        classes: { root: classes.paperRoot },
      };
    }
    return this.PaperProps;
  };

  handleDeleteEventSuccess = () => {
    this.setState({ confirmingDelete: false });
    this.props.onClose();
  };

  handleDeleteEventError = () => {
    this.setState({ confirmingDelete: false });
  };

  handleDeleteConfirm = () => {
    const { id, dataId, templateId } = this.props;
    TEMPLATE_API_HELPERS.deleteEvent(
      {
        id,
        dataId,
        templateId,
        onSuccess: this.handleDeleteEventSuccess,
        onError: this.handleDeleteEventError,
      },
      this.props,
    );
  };

  handleDuplicateConfirm = () => {
    const {
      templateId,
      tabId,
      calculatedStartTimeValue,
      calculatedEndTimeValue,
      timeZoneId,
      dayIds,
      startDate,
    } = this.props;
    const { dates } = this.state;

    if (!dates.length) {
      return null;
    }

    const selectedDayIds = dates.map(date => {
      const dayIndex = moment(date).diff(
        MOMENT_HELPERS.normaliseDate(startDate),
        'day',
      );
      return dayIds[dayIndex] || dayIds[0];
    });
    const eventSpecificDetail = getEventDetails(this.props);

    const model = {
      data: {
        batchCreate: true,
        tempDayRange: selectedDayIds,
        ...eventSpecificDetail,
      },
      node: {
        customData: {
          parentNodeId: tabId,
          start: {
            tempTime: MOMENT_HELPERS.renderTimeUtc(calculatedStartTimeValue),
            timeZoneId,
            mode: 'relative',
          },
          end: {
            mode: 'relative',
            tempDay: 'P0D', // default to 1 day
            tempTime: MOMENT_HELPERS.renderTimeUtc(calculatedEndTimeValue),
          },
        },
      },
    };

    return TEMPLATE_API_HELPERS.createEvent(
      {
        templateId,
        model,
        onSuccess: this.handleDuplicateEventSuccess,
        onError: this.handleDuplicateEventError,
      },
      this.props,
    );
  };

  handleDuplicateEventSuccess = () => {
    const { name, type } = this.props;

    this.setState({ confirmingDuplicate: false });
    this.props.onClose();

    return PORTAL_HELPERS.promptEventAdded(
      {
        name,
        type,
      },
      this.props,
    );
  };

  handleDuplicateEventError = () => {
    this.setState({ confirmingDuplicate: false });
    this.props.onClose();
  };

  handleDeleteCancel = () => {
    this.setState({ confirmingDelete: false });
  };

  handleDuplicateCancel = () => {
    this.setState({ confirmingDuplicate: false });
  };

  handleDeleteClick = e => {
    e.preventDefault();
    this.setState({ confirmingDelete: true });
  };

  handleEditClick = () => {
    const { id } = this.props;

    this.props.resaga.setValue({
      eventEdit: EVENT_STORE_HELPERS.setEventEdit(true, id),
    });
  };

  handleCloseClick = () => {
    this.props.onClose();
  };

  filterOptions = type =>
    !EVENT_HELPERS.isFlightTransportationEvent(type.value);

  renderPart = (
    Component,
    variant = EVENT_CONSTANTS.VARIANTS.editableForm,
    otherProps = {},
  ) => () => {
    const { id, dataId, templateId, canEditEvent } = this.props;

    const readOnly = otherProps.readOnly || !canEditEvent;

    return (
      <Component
        id={id}
        dataId={dataId}
        templateId={templateId}
        variant={variant}
        readOnly={readOnly}
        {...otherProps}
      />
    );
  };

  renderHeadingBackground = () => <M {...m.headingBackground} />;

  renderHeading = () => {
    const { classes, subtype, canEditEvent, type, iconOverride } = this.props;
    const otherProps = { rootClass: classes.grow, displayFlex: true };

    const subtypeProps = {
      readOnly: !canEditEvent,
      filterOptions: this.filterOptions,
    };

    if (EVENT_HELPERS.isFlightTransportationEvent(subtype)) {
      subtypeProps.readOnly = true;
      subtypeProps.filterOptions = null;
    }

    const isCycling =
      iconOverride === EVENT_CONSTANTS.ACTIVITIES.MATCH.iconOverrides[2].type;

    return (
      <GridContainer alignItems="baseline">
        {this.renderPart(
          EventSubtype,
          EVENT_CONSTANTS.VARIANTS.editableHeadingForm,
          subtypeProps,
        )()}
        {this.renderPart(
          EventIcon,
          EVENT_CONSTANTS.VARIANTS.editableHeadingForm,
          otherProps,
        )()}
        {!EVENT_HELPERS.isFlightTransportationEvent(subtype) &&
          this.renderPart(
            EventLocation,
            type === EVENT_CONSTANTS.EVENTS.TRANSPORTATION.type || isCycling
              ? EVENT_CONSTANTS.LOCATION_TYPES.Popper
              : EVENT_CONSTANTS.LOCATION_TYPES.SingleLocation,
            { dataId: this.props.dataId, isCycling },
          )()}
      </GridContainer>
    );
  };

  renderDeleteButton = () => (
    <GridItem key="delete">
      <Button
        size="small"
        variant="outline"
        color="alert"
        iconButton
        icon="lnr-trash2"
        dense
        title={<M {...m.deleteButtonLabel} />}
        onClick={this.handleDeleteClick}
      />
    </GridItem>
  );

  renderEditButton = () => (
    <GridItem key="edit">
      <Button
        size="small"
        variant="outline"
        color="primary"
        iconButton
        icon="lnr-pencil3"
        dense
        title={<M {...m.editButtonLabel} />}
        onClick={this.handleEditClick}
      />
    </GridItem>
  );

  renderDialButton = () => {
    const {
      supplierPhone: eventSupplierPhone,
      transportationSupplierPhone,
    } = this.props;

    const supplierPhone = LOGIC_HELPERS.ifElse(
      eventSupplierPhone,
      eventSupplierPhone,
      transportationSupplierPhone,
    );

    return (
      <GridItem key="dial">
        <DialNumberButton
          variant={VARIANTS.STANDARD}
          value={supplierPhone}
          size="small"
          color="primary"
          title="Call"
        />
      </GridItem>
    );
  };

  renderVerticalLine = () => (
    <GridItem key="verticalLine">
      <VerticalLine />
    </GridItem>
  );

  renderOtherActionButtons = () => (
    <React.Fragment>{this.renderDialButton()}</React.Fragment>
  );

  renderDuplicateButton = () => {
    const { displayDate } = this.props;
    // I added this logic for now since the date picker used only works when tour have start date
    if (displayDate !== 'startDate') return null;

    return (
      <GridItem>
        <Button
          size="small"
          variant="outline"
          color="primary"
          iconButton
          icon="lnr-copy"
          dense
          title={<M {...m.duplicateButtonLabel} />}
          onClick={this.renderDuplicate}
        />
      </GridItem>
    );
  };

  renderActions = () => {
    const {
      canEditEvent,
      supplierPhone,
      transportationSupplierPhone,
    } = this.props;

    const standardActions = canEditEvent && (
      <GridItem>
        <GridContainer>
          {this.renderDeleteButton()}
          {this.renderEditButton()}
          {/* {this.renderDuplicateButton()} */}
        </GridContainer>
      </GridItem>
    );

    // hasOtherActions should be props but adding this for now since Dial is the only action button
    const hasOtherActions = !!supplierPhone || !!transportationSupplierPhone;

    return (
      <React.Fragment>
        {hasOtherActions && this.renderOtherActionButtons()}
        {hasOtherActions && this.renderVerticalLine()}
        {standardActions}
      </React.Fragment>
    );
  };

  renderBookingNumber = () => {
    const { type } = this.props;
    if (type === EVENTS.TRANSPORTATION.type) {
      return (
        <GridItem>
          {this.renderPart(
            TransportationBookingNumber,
            EVENT_CONSTANTS.VARIANTS.labelValue,
          )()}
        </GridItem>
      );
    }

    return (
      <GridItem>
        {this.renderPart(
          EventBookingNumber,
          EVENT_CONSTANTS.VARIANTS.labelValue,
        )()}
      </GridItem>
    );
  };

  renderTitle = () => {
    const showBookingNumberValue = LOGIC_HELPERS.ifElse(
      ability.can('execute', PARTICIPANT),
      false,
      true,
    );
    return (
      <React.Fragment>
        <Title
          heading={this.renderHeading()}
          headingBackground={this.renderHeadingBackground()}
          fullWidth
        />
        <CloseButton onClick={this.handleCloseClick} />
        <GridContainer justify="space-between">
          <GridItem>{this.renderPart(Ratings)()}</GridItem>
          {showBookingNumberValue && this.renderBookingNumber()}
        </GridContainer>
      </React.Fragment>
    );
  };

  renderContent = (type, subtype) => {
    const { id, iconOverride: icon } = this.props;
    return (
      !!id && (
        <ForEachEventType
          type={type}
          subtype={subtype}
          renderActivity={this.renderPart(Activity, undefined, {
            icon,
            isCustomDateStart: EVENT_HELPERS.isEventCustomDate(subtype),
          })}
          renderFlight={this.renderPart(Flight)}
          renderAccommodation={this.renderPart(Accommodation)}
          renderTransportation={this.renderPart(Transportation, undefined, {
            subtype,
          })}
        />
      )
    );
  };

  renderDuplicate = event => {
    // TODO: Incorporate the popper selection of dates for batch create purposes before opening up the dialog for food or accommodation
    // const { templateId, tabId, dataId, id, type, subtype } = this.props;
    // if (
    //   type === EVENT_CONSTANTS.TYPES.ACTIVITIES.type &&
    //   subtype === EVENT_CONSTANTS.ACTIVITIES.FOOD.type
    // ) {
    //   this.props.onClose();
    //   PORTAL_HELPERS.openAddFood(
    //     {
    //       id: templateId,
    //       tabId,
    //       mode: 'copy',
    //       eventDataId: dataId,
    //       nodeId: id,
    //     },
    //     this.props,
    //   );
    // } else if (type === EVENT_CONSTANTS.TYPES.ACCOMMODATIONS.type) {
    //   this.props.onClose();
    //   PORTAL_HELPERS.openAddAccommodation(
    //     {
    //       id: templateId,
    //       tabId,
    //       mode: 'copy',
    //       eventDataId: dataId,
    //       nodeId: id,
    //     },
    //     this.props,
    //   );
    // } else {
    this.setState({ anchorEl: event.currentTarget });
    // }
  };

  renderDuplicateEvent = () => {
    const { classes } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <Popper
        open={open}
        className={classes.popper}
        anchorEl={anchorEl}
        placement="bottom-start"
      >
        {this.renderPopperContent()}
      </Popper>
    );
  };

  closePopper = () => {
    // HACK: Delay so handleChipClick will act as a toggle
    this.popperClose = setTimeout(() => this.setState({ anchorEl: null }), 0);
  };

  handlePopperClickAway = () => {
    const { clickAway } = this.state;
    if (clickAway) {
      this.closePopper();
    }
  };

  handleCancelDuplication = () => {
    this.closePopper();
  };

  handleDatesChange = ({ dates = [] }) => {
    this.setState({ dates, datesError: '' });
  };

  handleSaveDuplication = () => {
    const { dates } = this.state;
    if (dates.length > 0) {
      this.setState({ confirmingDuplicate: true });
    }

    if (dates.length === 0) {
      this.setState({ datesError: 'Select a date' });
    }
  };

  renderPopperContent = () => {
    const { classes, templateId, tabId, existingEventDates } = this.props;
    const { dates, datesError } = this.state;
    return (
      <ClickAwayListener
        onClickAway={this.handlePopperClickAway}
        mouseEvent="onMouseDown"
      >
        <Paper className={classes.popperContainer}>
          <GridContainer direction="column">
            <GridItem>
              <GridContainer alignItems="center" className={classes.heading}>
                <GridItem>
                  <JText uppercase gray>
                    EVENT COPY
                  </JText>
                </GridItem>
              </GridContainer>
            </GridItem>
            <GridItem>
              <DatesSelect
                templateId={templateId}
                tabId={tabId}
                dates={dates}
                existingEventDates={existingEventDates}
                onDatesChange={this.handleDatesChange}
                helperText={
                  datesError && (
                    <GridItem>
                      <GridContainer alignItems="center">
                        <GridItem>
                          <Icon icon="lnr-warning" color="danger" />
                        </GridItem>
                        <GridItem>
                          <JText danger>{datesError}</JText>
                        </GridItem>
                      </GridContainer>
                    </GridItem>
                  )
                }
                multiple
              />
            </GridItem>
            <GridItem>
              <Form onValidSubmit={this.handleSaveDuplication}>
                <GridContainer className={classes.relative}>
                  <GridItem className={classnames(classes.actionItem)}>
                    <EditableFormActions
                      noGrid
                      onCancel={this.handleCancelDuplication}
                    />
                  </GridItem>
                </GridContainer>
              </Form>
            </GridItem>
          </GridContainer>
        </Paper>
      </ClickAwayListener>
    );
  };

  render = () => {
    const { open, onClose, dialogProps, type, subtype, name } = this.props;
    const { confirmingDelete, confirmingDuplicate } = this.state;

    return (
      <React.Fragment>
        <Dialog
          open={open}
          onClose={onClose}
          PaperProps={this.getPaperProps()}
          {...dialogProps}
        >
          <DialogTitle noPaddingBottom>{this.renderTitle()}</DialogTitle>
          <DialogContent>
            <>
              {this.renderContent(type, subtype)}
              {this.renderDuplicateEvent()}
            </>
          </DialogContent>
          <DialogActions>
            <GridContainer direction="row" alignItems="center" spacing={0}>
              <GridItem md={12}>
                <GridContainer
                  direction="row"
                  alignItems="center"
                  justify="flex-end"
                >
                  {this.renderActions()}
                </GridContainer>
              </GridItem>
            </GridContainer>
          </DialogActions>
        </Dialog>
        <EventDuplicateConfirmation
          type={type}
          subtype={subtype}
          name={name}
          open={confirmingDuplicate}
          onConfirm={this.handleDuplicateConfirm}
          onCancel={this.handleDuplicateCancel}
        />
        <EventDeleteConfirmation
          type={type}
          subtype={subtype}
          name={name}
          open={confirmingDelete}
          onConfirm={this.handleDeleteConfirm}
          onCancel={this.handleDeleteCancel}
        />
      </React.Fragment>
    );
  };
}

View.propTypes = {
  // hoc
  classes: PropTypes.object.isRequired,
  resaga: PropTypes.object.isRequired,
  canEditEvent: PropTypes.bool.isRequired,

  // parent
  open: PropTypes.bool.isRequired,
  id: PropTypes.number,
  onClose: PropTypes.func.isRequired,
  dialogProps: PropTypes.object,

  // resaga value
  dataId: PropTypes.number,
  templateId: PropTypes.number,
  type: PropTypes.string,
  subtype: PropTypes.string,
  name: PropTypes.string,
  supplierPhone: PropTypes.string,
  transportationSupplierPhone: PropTypes.string,
  iconOverride: PropTypes.string,

  bookingNumber: PropTypes.string,
  bookingPersonCount: PropTypes.string,
  description: PropTypes.string,

  locationIcon: PropTypes.string,
  locationName: PropTypes.string,
  placeId: PropTypes.string,
  url: PropTypes.string,
  tabId: PropTypes.number,
  dayIds: PropTypes.array,
  startDate: PropTypes.any,
  timeZoneId: PropTypes.string,
  calculatedStartTimeValue: PropTypes.string,
  calculatedEndTimeValue: PropTypes.string,
  dayDates: PropTypes.array,
  eventIds: PropTypes.array,
  existingEventDates: PropTypes.array,
  displayDate: PropTypes.string,
};

View.defaultProps = {
  id: 0,
  dialogProps: {},

  dataId: 0,
  templateId: 0,
  type: null,
  subtype: null,
  name: null,
  supplierPhone: '',
  transportationSupplierPhone: '',
  iconOverride: '',
  timeZoneId: null,
  calculatedStartTimeValue: null,
  calculatedEndTimeValue: null,
  url: '',
  eventIds: [],
};

export default compose(
  withStyles(style, { name: 'EventContainer/Event/View' }),
  withKey(),
  withCanEditEvent,
  resaga(CONFIG_IDS),
  withActivityDetailId({
    outputProp: 'activityDetailStart',
    targetKey: 'start',
  }),
  withActivityDetailId({
    outputProp: 'activityDetailEnd',
    targetKey: 'end',
  }),
  resaga(CONFIG_DATA),
  resaga(CONFIG_FLIGHT_DATA),
  resaga(CONFIG_TRANSPORTATION_DATA),
  resaga(CONFIG_EXISTING_EVENT_DATES),
  resaga(CONFIG_ACTIVITY_DETAILS),
  EVENT_STORE_HOC.selectEventProp({
    path: EVENT_PATHS.supplierPhone,
    outputProp: 'supplierPhone',
  }),
  EVENT_STORE_HOC.selectEventProp({
    path: EVENT_PATHS.transportationDetailSupplierPhone,
    outputProp: 'transportationSupplierPhone',
  }),
  resaga(CONFIG_DATA_SET_VALUE),
)(View);
