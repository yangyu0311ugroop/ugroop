import { ability } from 'apis/components/Ability/ability';
import { NODE_API_HELPERS } from 'apis/components/Node/helpers';
import { TEMPLATE_API_HELPERS } from 'apis/components/Template/helpers';
import { EVENT_NO_TIME, THE_LONG_DASH } from 'appConstants';
import classnames from 'classnames';
import Empty from 'components/Empty';
import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import Hr from 'components/Hr';
import JText from 'components/JText';
import { withStyles } from 'components/material-ui';
import { withSMDown } from 'components/material-ui/hocs/withMediaQuery';
import Popper from 'components/Popper';
import MenuItem from 'components/Popper/components/MenuItem';
import AttachmentsCard from 'containers/Portal/components/ViewEvent/components/AttachmentsCard';
import FlightDetailsCard from 'containers/Portal/components/ViewEvent/components/FlightDetailsCard';
import MapCard from 'containers/Portal/components/ViewEvent/components/MapCard';
import ReservationCard from 'containers/Portal/components/ViewEvent/components/ReservationCard';
import { PORTAL_HELPERS } from 'containers/Portal/helpers';
import { EVENT_STORE_HELPERS } from 'datastore/eventStore/helpers';
import first from 'lodash/first';
import moment from 'moment';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import Scroll from 'react-scroll';
import { compose } from 'redux';
import resaga from 'resaga';
import Ratings from 'smartComponents/Event/components/Event/layouts/Event/Ratings';
import { withCanEditEvent } from 'smartComponents/Event/hoc';
import DayDate from 'smartComponents/Node/types/Day/components/DayDate';
import AmountsBar from 'smartComponents/Node/types/Event/components/AmountsCard/components/AmountsBar';
import FlightBookingHeader from 'smartComponents/Node/types/Event/components/ViewEvent/parts/FlightBookingHeader';
import { EVENT_DATA_HELPERS } from 'smartComponents/Node/types/Event/dataHelpers';
import { EVENT_VIEW_HELPERS } from 'smartComponents/Node/types/Event/helpers';
import Icon from 'ugcomponents/Icon';
import { StyledSimpleRTE } from 'ugcomponents/Inputs/SimpleRTE';
import { BUS_TYPES_MAPPING, COACH_TYPES_MAPPING } from 'utils/constants/events';
import { EVENT_HELPERS } from 'utils/helpers/events';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import MOMENT_HELPERS from 'utils/helpers/moment';
import { NODE_HELPERS } from 'utils/helpers/nodes';
import { isEmptyRTE } from 'utils/helpers/RTE';
import { EVENT } from 'utils/modelConstants';
import { STRING_HELPERS } from 'utils/stringAdditions';
import Button from 'viewComponents/Button';
import JButton from 'viewComponents/Button/variants/JButton';
import EventIcon from 'viewComponents/Event/components/Icon';
import { CONFIG, DATA_ID_CONFIG } from './config';
import styles from './styles';

export class ViewEvent extends PureComponent {
  state = {};

  renderTypeSubTypeIcon = () => {
    const { data } = this.props;

    return (
      <GridContainer alignItems="center" wrap="nowrap">
        <GridItem>
          <EventIcon
            type={EVENT_VIEW_HELPERS.type(data)}
            subtype={EVENT_VIEW_HELPERS.subtype(data)}
            iconOverride={EVENT_VIEW_HELPERS.iconOverride(data)}
            size="extraSmall"
          />
        </GridItem>
        <GridItem>
          <JText gray>
            {EVENT_VIEW_HELPERS.typeName(data)}
            {' > '}
            {EVENT_VIEW_HELPERS.subTypeName(data)}
          </JText>
        </GridItem>
      </GridContainer>
    );
  };

  startDayId = () => {
    const { data } = this.props;
    const { selectedStartDay } = this.state;

    const batchCreate = EVENT_VIEW_HELPERS.batchCreate(data);

    if (batchCreate) {
      const tempDayRange = EVENT_VIEW_HELPERS.tempDayRange(data);

      if (selectedStartDay && tempDayRange.indexOf(selectedStartDay) !== -1) {
        return selectedStartDay;
      }

      return first(tempDayRange);
    }

    const tempStartDay = this.tempStartDay();

    return Number.parseInt(tempStartDay, 10);
  };

  handleSelectDate = (index, active) => () => {
    const { data } = this.props;

    if (active) return null;

    const tempDayRange = EVENT_VIEW_HELPERS.tempDayRange(data);

    return this.setState({
      selectedStartDay: tempDayRange[index],
    });
  };

  renderDayDate = (tempDayRange, startDayId) => (dayDate, index) => {
    const active = startDayId === tempDayRange[index];

    return (
      <GridItem key={dayDate}>
        <JButton
          disabled={active}
          onClick={this.handleSelectDate(index, active)}
        >
          <JText dark={active} blue={!active} bold={!active}>
            {dayDate}
          </JText>
        </JButton>
      </GridItem>
    );
  };

  renderDayDates = dayDates => {
    const { data } = this.props;

    const tempDayRange = EVENT_VIEW_HELPERS.tempDayRange(data);
    const startDayId = this.startDayId();

    return (
      <GridContainer alignItems="center" spacing={0}>
        {dayDates.map(this.renderDayDate(tempDayRange, startDayId))}
      </GridContainer>
    );
  };

  renderBatchCreateSelect = () => {
    const { data, templateId } = this.props;
    const { selectedStartDay } = this.state;

    const tempDayRange = EVENT_VIEW_HELPERS.tempDayRange(data);

    if (!tempDayRange || tempDayRange.length < 2) return null;

    return (
      <>
        <GridItem>
          <GridContainer direction="column" spacing={0}>
            <GridItem>
              <JText gray nowrap={false}>
                {tempDayRange.length} events will be created on the days below.
                <br />
                Select a day to preview how it will appear.
              </JText>
            </GridItem>
            <GridItem>
              <DayDate
                id={tempDayRange}
                templateId={templateId}
                selectedStartDay={selectedStartDay}
              >
                {this.renderDayDates}
              </DayDate>
            </GridItem>
          </GridContainer>
        </GridItem>

        <Hr half />
      </>
    );
  };

  tempStartDay = () => {
    const { node } = this.props;

    return (
      EVENT_VIEW_HELPERS.tempStartDay(node) ||
      EVENT_VIEW_HELPERS.parentNodeId(node)
    );
  };

  tempEndDay = () => {
    const { data, node } = this.props;

    const notSetValue = LOGIC_HELPERS.ifElse(
      EVENT_VIEW_HELPERS.isAccommodation(data),
      'P1D',
      'P0D',
    );

    const temp = EVENT_VIEW_HELPERS.tempEndDay(node);

    if (temp) return temp;

    const endTimeValue = EVENT_VIEW_HELPERS.endTimeValue(node);

    if (!endTimeValue) return notSetValue;

    const days = EVENT_DATA_HELPERS.durationToDays(endTimeValue);

    return `P${days}D`;
  };

  tempStartTime = () => {
    const { node } = this.props;

    return EVENT_VIEW_HELPERS.startTime(node);
  };

  tempEndTime = () => {
    const { node } = this.props;

    return EVENT_VIEW_HELPERS.endTime(node);
  };

  renderDirectionsPopperButton = ({ openMenu }) => (
    <JButton bg="gray" onClick={openMenu}>
      <GridContainer alignItems="center" wrap="nowrap">
        <GridItem>
          <Icon icon="lnr-map2" size="small" />
        </GridItem>
        <GridItem>
          <JText black>Directions...</JText>
        </GridItem>
      </GridContainer>
    </JButton>
  );

  renderDirectionsMenu = ({ closeMenu }) => {
    const { data } = this.props;

    const locationStart = EVENT_VIEW_HELPERS.locationStart(data);
    const locationEnd = EVENT_VIEW_HELPERS.locationEnd(data);

    return (
      <GridContainer direction="column" spacing={0}>
        {LOGIC_HELPERS.ifElse(
          locationStart,
          <GridItem>
            <MenuItem
              icon="lnr-reply"
              IconProps={{ flipX: true }}
              closeMenu={closeMenu}
            >
              <JText
                noUnderlined
                component="a"
                href={EVENT_VIEW_HELPERS.locationHrefStart(data)}
                target="_blank"
                nowrap={false}
              >
                Directions to{' '}
                <JText bold nowrap={false}>
                  {locationStart}
                </JText>
              </JText>
            </MenuItem>
          </GridItem>,
        )}
        {LOGIC_HELPERS.ifElse(
          locationEnd,
          <GridItem>
            <MenuItem
              icon="lnr-reply"
              IconProps={{ flipX: true }}
              closeMenu={closeMenu}
            >
              <JText
                noUnderlined
                component="a"
                href={EVENT_VIEW_HELPERS.locationHrefEnd(data)}
                target="_blank"
                nowrap={false}
              >
                Directions to{' '}
                <JText bold nowrap={false}>
                  {locationEnd}
                </JText>
              </JText>
            </MenuItem>
          </GridItem>,
        )}
        {LOGIC_HELPERS.ifElse(
          [!EVENT_VIEW_HELPERS.isFlight(data), locationStart, locationEnd],
          <GridItem>
            <MenuItem
              icon="lnr-reply"
              IconProps={{ flipX: true }}
              closeMenu={closeMenu}
            >
              <JText
                noUnderlined
                component="a"
                href={EVENT_VIEW_HELPERS.locationHrefFromTo(data)}
                target="_blank"
                nowrap={false}
              >
                Directions from{' '}
                <JText bold nowrap={false}>
                  {locationStart}
                </JText>{' '}
                to{' '}
                <JText bold nowrap={false}>
                  {locationEnd}
                </JText>
              </JText>
            </MenuItem>
          </GridItem>,
        )}
      </GridContainer>
    );
  };

  renderLocationAction = () => {
    const { data, tooltip } = this.props;

    const locationStart = EVENT_VIEW_HELPERS.locationStart(data);

    if (!EVENT_VIEW_HELPERS.isTransportation(data)) {
      const locationHref = EVENT_VIEW_HELPERS.locationHref(data);

      if (!locationHref) return null;

      if (tooltip) {
        return (
          <GridItem xs={12}>
            <JText
              noUnderlined
              component="a"
              href={EVENT_VIEW_HELPERS.locationHrefStart(data)}
              target="_blank"
              nowrap={false}
            >
              <GridContainer alignItems="center" wrap="nowrap">
                <GridItem>
                  <Icon icon="lnr-reply" flipX />
                </GridItem>
                <GridItem>
                  Directions to{' '}
                  <JText bold nowrap={false}>
                    {locationStart}
                  </JText>
                </GridItem>
              </GridContainer>
            </JText>
          </GridItem>
        );
      }

      return (
        <GridItem>
          <JText noUnderlined component="a" href={locationHref} target="_blank">
            <JButton bg="gray">
              <GridContainer alignItems="center" wrap="nowrap">
                <GridItem>
                  <Icon icon="lnr-map2" size="small" />
                </GridItem>
                <GridItem xs>
                  <JText black>Directions</JText>
                </GridItem>
              </GridContainer>
            </JButton>
          </JText>
        </GridItem>
      );
    }

    const locationEnd = EVENT_VIEW_HELPERS.locationEnd(data);

    if (!locationStart && !locationEnd) return null;

    if (tooltip) {
      return (
        <>
          {locationStart && (
            <GridItem xs={12}>
              <JText
                noUnderlined
                component="a"
                href={EVENT_VIEW_HELPERS.locationHrefStart(data)}
                target="_blank"
                nowrap={false}
              >
                <GridContainer alignItems="center" wrap="nowrap">
                  <GridItem>
                    <Icon icon="lnr-reply" flipX />
                  </GridItem>
                  <GridItem>
                    Directions to{' '}
                    <JText bold nowrap={false}>
                      {locationStart}
                    </JText>
                  </GridItem>
                </GridContainer>
              </JText>
            </GridItem>
          )}

          {locationEnd && (
            <GridItem xs={12}>
              <JText
                noUnderlined
                component="a"
                href={EVENT_VIEW_HELPERS.locationHrefEnd(data)}
                target="_blank"
                nowrap={false}
              >
                <GridContainer alignItems="center" wrap="nowrap">
                  <GridItem>
                    <Icon icon="lnr-reply" flipX />
                  </GridItem>
                  <GridItem>
                    Directions to{' '}
                    <JText bold nowrap={false}>
                      {locationEnd}
                    </JText>
                  </GridItem>
                </GridContainer>
              </JText>
            </GridItem>
          )}

          {!EVENT_VIEW_HELPERS.isFlight(data) && locationStart && locationEnd && (
            <GridItem xs={12}>
              <JText
                noUnderlined
                component="a"
                href={EVENT_VIEW_HELPERS.locationHrefFromTo(data)}
                target="_blank"
                nowrap={false}
              >
                <GridContainer alignItems="center" wrap="nowrap">
                  <GridItem>
                    <Icon icon="lnr-reply" flipX />
                  </GridItem>
                  <GridItem>
                    Directions from{' '}
                    <JText bold nowrap={false}>
                      {locationStart}
                    </JText>{' '}
                    to{' '}
                    <JText bold nowrap={false}>
                      {locationEnd}
                    </JText>
                  </GridItem>
                </GridContainer>
              </JText>
            </GridItem>
          )}
        </>
      );
    }

    return (
      <GridItem>
        <Popper
          renderButton={this.renderDirectionsPopperButton}
          stopPropagation
        >
          {this.renderDirectionsMenu}
        </Popper>
      </GridItem>
    );
  };

  handleCall = number => e => {
    e.stopPropagation();

    window.open(`tel:${number}`);
  };

  renderPhoneAction = () => {
    const { data, tooltip } = this.props;

    const phone = EVENT_VIEW_HELPERS.supplierPhoneNumber(data);

    if (!phone) return null;

    if (tooltip) {
      return (
        <GridItem xs={12}>
          <JText
            noUnderlined
            component="a"
            href={`tel:${phone}`}
            target="_blank"
            nowrap={false}
          >
            <GridContainer alignItems="center" wrap="nowrap">
              <GridItem>
                <Icon icon="lnr-telephone" size="small" />
              </GridItem>
              <GridItem>
                <JText bold nowrap={false}>
                  {phone}
                </JText>
              </GridItem>
            </GridContainer>
          </JText>
        </GridItem>
      );
    }

    return (
      <GridItem>
        <JButton bg="gray" onClick={this.handleCall(phone)}>
          <GridContainer alignItems="center" wrap="nowrap">
            <GridItem>
              <Icon icon="lnr-telephone" size="small" />
            </GridItem>
            <GridItem>
              <JText black>Call</JText>
            </GridItem>
          </GridContainer>
        </JButton>
      </GridItem>
    );
  };

  handleEdit = () => {
    const { id, onEdit, onClose } = this.props;

    if (onEdit) {
      return LOGIC_HELPERS.ifFunction(onEdit, [{ subform: '' }]);
    }

    // const { action } = this.state;

    // if (action !== 'create') {
    //   return this.setState({ action: 'edit' });
    // }

    LOGIC_HELPERS.ifFunction(onClose);

    return this.props.resaga.setValue({
      eventView: EVENT_STORE_HELPERS.setEventView(true, id),
    });
  };

  renderEditAction = () => {
    const { canEditEvent, readOnly } = this.props;

    if (readOnly) return null;

    if (!canEditEvent) return null;

    return (
      <GridItem>
        <JButton
          bg="gray"
          onClick={this.handleEdit}
          title="Make some changes or add more content to this event"
        >
          <GridContainer alignItems="center" wrap="nowrap">
            <GridItem>
              <Icon icon="lnr-pencil2" size="small" />
            </GridItem>
            <GridItem>
              <JText black>Edit</JText>
            </GridItem>
          </GridContainer>
        </JButton>
      </GridItem>
    );
  };

  confirmDelete = () => {
    const { data } = this.props;

    const name = EVENT_VIEW_HELPERS.eventFullName(data);

    const confirmDeleteDialogId = PORTAL_HELPERS.confirmDelete(
      {
        onConfirm: this.handleDelete,
        title: `Delete Event?`,
        message: (
          <GridContainer
            direction="column"
            alignItems="center"
            justify="flex-start"
            spacing={0}
          >
            <GridItem>
              Are you sure you want to delete this <b>{name}</b> event?
            </GridItem>
          </GridContainer>
        ),
      },
      this.props,
    );

    this.setState({ confirmDeleteDialogId });
  };

  handleDelete = () => {
    const { id, dataId, templateId, onClose } = this.props;
    const { confirmDeleteDialogId } = this.state;

    LOGIC_HELPERS.ifFunction(onClose);

    PORTAL_HELPERS.closePortal(confirmDeleteDialogId, this.props);

    TEMPLATE_API_HELPERS.deleteEvent(
      {
        id,
        dataId,
        templateId,
      },
      this.props,
    );
  };

  renderDeleteEvent = closeMenu => {
    const { canEditEvent } = this.props;

    if (!canEditEvent) return null;

    return (
      <GridItem>
        <MenuItem onClick={this.confirmDelete} closeMenu={closeMenu}>
          <GridContainer alignItems="center" wrap="nowrap">
            <GridItem>
              <Icon icon="lnr-trash2" size="small" color="danger" />
            </GridItem>
            <GridItem>
              <JText danger>Delete event</JText>
            </GridItem>
          </GridContainer>
        </MenuItem>
      </GridItem>
    );
  };

  renderCancelEvent = closeMenu => {
    const { canEditEvent } = this.props;

    if (!canEditEvent) return null;

    if (this.isCancelled()) {
      return (
        <GridItem>
          <MenuItem onClick={this.reactivateEvent} closeMenu={closeMenu}>
            <GridContainer alignItems="center" wrap="nowrap">
              <GridItem>
                <Icon icon="lnr-undo2" size="small" />
              </GridItem>
              <GridItem>
                <JText gray>Re-activate event</JText>
              </GridItem>
            </GridContainer>
          </MenuItem>
        </GridItem>
      );
    }

    return (
      <GridItem>
        <MenuItem onClick={this.openCancellationForm} closeMenu={closeMenu}>
          <GridContainer alignItems="center" wrap="nowrap">
            <GridItem>
              <Icon icon="lnr-cross2" size="small" />
            </GridItem>
            <GridItem>
              <JText gray>Cancel event</JText>
            </GridItem>
          </GridContainer>
        </MenuItem>
      </GridItem>
    );
  };

  renderMoreButton = ({ openMenu }) => (
    <JButton bg="gray" onClick={openMenu} title="More options, less often used">
      <Icon icon="lnr-ellipsis" size="small" />
    </JButton>
  );

  canCreateEvent = () => ability.can('create', EVENT);

  renderMoreAction = () => {
    const { canEditEvent, readOnly } = this.props;

    const canCreateEvent = this.canCreateEvent();

    if (readOnly) return null;

    if (!canCreateEvent && !canEditEvent) return null;

    return (
      <GridItem>
        <Popper
          placement="bottom-end"
          renderButton={this.renderMoreButton}
          quarterPadding
        >
          {this.renderMoreMenu}
        </Popper>
      </GridItem>
    );
  };

  renderMoreMenu = ({ closeMenu }) => (
    <GridContainer direction="column" spacing={0}>
      {/* {this.renderDuplicateEvent(closeMenu)} */}

      {this.renderCancelEvent(closeMenu)}

      {this.renderDeleteEvent(closeMenu)}
    </GridContainer>
  );

  renderActions = () => {
    const { action, canEditEvent, data, tooltip, classes } = this.props;

    const viewing = action === 'view' && !tooltip;

    return (
      <GridContainer alignItems="center" spacing={1}>
        {this.renderLocationAction()}

        {this.renderPhoneAction()}

        {LOGIC_HELPERS.ifElse(
          [viewing, canEditEvent, !EVENT_VIEW_HELPERS.isFlight(data)],
          <GridItem>
            <JButton bg="gray" onClick={this.openReservationForm}>
              <GridContainer
                alignItems="center"
                nowrap
                wrap="nowrap"
                className={classes.noWrap}
              >
                <GridItem>
                  <Icon size="small" icon="lnr-plus" />
                </GridItem>
                <GridItem>Booking</GridItem>
              </GridContainer>
            </JButton>
          </GridItem>,
        )}

        {LOGIC_HELPERS.ifElse(
          [viewing, canEditEvent],
          <GridItem>
            <JButton
              bg="gray"
              onClick={this.openAttachForm}
              title="Upload PDFs, documents, booking confirmations, tickets, vouchers, boarding passes, rental agreements and anything else that you might need when travelling."
            >
              <GridContainer
                alignItems="center"
                nowrap
                wrap="nowrap"
                className={classes.noWrap}
              >
                <GridItem>
                  <Icon size="small" icon="lnr-paperclip" />
                </GridItem>
                <GridItem>Attach</GridItem>
              </GridContainer>
            </JButton>
          </GridItem>,
        )}

        {viewing && this.renderEditAction()}

        {viewing && this.renderMoreAction()}
      </GridContainer>
    );
  };

  renderTimeHeader = () => {
    const { templateId, data, node } = this.props;

    const tempEndDay = this.tempEndDay();
    const tempStartTime = this.tempStartTime();
    const tempEndTime = this.tempEndTime();
    const startDayId = this.startDayId();
    const startTimeMode = EVENT_VIEW_HELPERS.startTimeMode(node);

    const endDiffDay = tempEndDay && tempEndDay !== 'P0D';

    const textProps = {
      uppercase: true,
      danger: true,
      sm: true,
      nowrap: false,
    };

    if (!NODE_HELPERS.isAnchored(startTimeMode)) {
      const days = EVENT_DATA_HELPERS.durationToDays(tempEndDay);

      if (!tempStartTime) {
        if (!days) return null;

        const type = EVENT_VIEW_HELPERS.type(data, '');
        const dayString = LOGIC_HELPERS.ifElse(
          type === 'Accommodation',
          'night',
          'day',
        );
        const daysCount = LOGIC_HELPERS.ifElse(
          type === 'Accommodation',
          days,
          days + 1,
        );

        return (
          <JText {...textProps}>
            {daysCount} {dayString}
            {LOGIC_HELPERS.ifElse(daysCount > 1, 's', '')}
          </JText>
        );
      }

      return (
        <JText {...textProps}>
          {LOGIC_HELPERS.ifElse(tempStartTime, tempStartTime, EVENT_NO_TIME)}
          {LOGIC_HELPERS.ifElse(
            tempEndTime,
            <>
              {` ${THE_LONG_DASH} `}
              {tempEndTime}
              {LOGIC_HELPERS.ifElse(
                days > 0,
                ` +${days} day${LOGIC_HELPERS.ifElse(days > 1, 's', '')}`,
                '',
              )}
            </>,
          )}
        </JText>
      );
    }

    return (
      <JText {...textProps}>
        {<DayDate id={startDayId} templateId={templateId} />}
        {LOGIC_HELPERS.ifElse(
          tempStartTime,
          `${LOGIC_HELPERS.ifElse(
            [tempEndDay, tempEndDay !== `${startDayId}`],
            ', ',
            ' at ',
          )}${tempStartTime}`,
        )}
        {LOGIC_HELPERS.ifElse(
          [tempEndDay, endDiffDay || tempEndTime],
          ` ${THE_LONG_DASH} `,
          '',
        )}
        {tempEndDay && endDiffDay && (
          <DayDate
            templateId={templateId}
            id={startDayId}
            offset={tempEndDay}
          />
        )}
        {LOGIC_HELPERS.ifElse([tempEndDay, endDiffDay, tempEndTime], ',')}
        {LOGIC_HELPERS.ifElse(tempEndTime, ` ${tempEndTime}`)}
      </JText>
    );
  };

  renderCloseButton = () => {
    const { onClose } = this.props;

    if (!onClose) return null;

    return (
      <GridItem>
        <JButton bg="gray" onClick={onClose}>
          <Icon icon="lnr-cross" size="small" />
        </JButton>
      </GridItem>
    );
  };

  isCancelled = () => {
    const { data } = this.props;

    return EVENT_VIEW_HELPERS.isCancelled(data);
  };

  renderCancelBadge = () => {
    const { classes } = this.props;

    if (!this.isCancelled()) return null;

    return (
      <GridItem>
        <span className={classes.smallBadge}>CANCELLED</span>
      </GridItem>
    );
  };

  renderTypeSubtype = () => {
    const { classes, data, smDown, tooltip } = this.props;

    const type = EVENT_VIEW_HELPERS.type(data, '');
    const subtype = EVENT_VIEW_HELPERS.subtype(data, '');

    if (!type || !subtype) return null;

    if (this.isCancelled()) {
      const cancellationDate = EVENT_VIEW_HELPERS.cancellationCancellationDate(
        data,
      );
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
        <>
          <Hr />

          <GridItem>
            <div className={classnames(classes.eventHeaderCancelled)}>
              <GridContainer alignItems="baseline" wrap="nowrap" spacing={2}>
                {!tooltip && (
                  <GridItem>
                    <Icon icon="lnr-warning" color="warning" />
                  </GridItem>
                )}
                <GridItem xs>
                  <GridContainer direction="column">
                    <GridItem>
                      <JText dark bold lg nowrap={false}>
                        This event has been cancelled.
                      </JText>
                    </GridItem>
                    {cancellationDate && (
                      <GridItem>
                        <JText gray>Cancellation Date:</JText>{' '}
                        <JText dark>
                          {moment(cancellationDate).format('DD/MM/YYYY')}
                        </JText>
                      </GridItem>
                    )}
                    {!tooltip && supplierConfirmed !== undefined && (
                      <GridItem>
                        <JText gray>Supplier Confirmed:</JText>{' '}
                        <JText dark capitalize>
                          {LOGIC_HELPERS.ifElse(
                            `${supplierConfirmed}` === 'true',
                            'Yes',
                            'No',
                          )}
                        </JText>
                      </GridItem>
                    )}
                    {!tooltip && cancellationReference && (
                      <GridItem>
                        <JText gray>Cancellation Reference:</JText>{' '}
                        <JText dark nowrap={false}>
                          {cancellationReference}
                        </JText>
                      </GridItem>
                    )}
                    {!tooltip && refundSituation && (
                      <GridItem>
                        <JText gray>Refund Situation:</JText>{' '}
                        <JText dark nowrap={false}>
                          {refundSituation}
                        </JText>
                      </GridItem>
                    )}
                    {cancellationNotes && (
                      <GridItem>
                        <JText gray>Cancellation Notes:</JText>{' '}
                        <JText dark nowrap={false}>
                          {cancellationNotes}
                        </JText>
                      </GridItem>
                    )}
                  </GridContainer>
                </GridItem>

                {!tooltip && this.renderMoreAction()}
              </GridContainer>
            </div>
          </GridItem>
        </>
      );
    }

    return (
      <>
        <Hr half />

        <GridItem>
          <div className={classnames(classes.eventHeader)}>
            <GridContainer alignItems="center">
              {
                <GridItem
                  xs={LOGIC_HELPERS.ifElse(tooltip || smDown, 12, true)}
                >
                  {this.renderTypeSubTypeIcon()}
                </GridItem>
              }
              <GridItem xs={LOGIC_HELPERS.ifElse(tooltip || smDown, 12)}>
                {this.renderActions()}
              </GridItem>
            </GridContainer>
          </div>
        </GridItem>
      </>
    );
  };

  renderFlightBookings = renderEvent => {
    const {
      id,
      dataId,
      data,
      portalId,
      opened,
      onClose,
      onEdit,
      name,
      bookingNumber,
      bookingAmounts,
      passengerCount,
      supplier,
      templateId,
      action,
      flightBookingId: bookingId,
    } = this.props;

    if (!bookingId && !EVENT_VIEW_HELPERS.isFlight(data)) return null;

    const flightBookingId =
      bookingId || EVENT_VIEW_HELPERS.flightBookingId(data);

    if (!flightBookingId) return null;

    return (
      <GridItem key={id}>
        <FlightBookingHeader
          eventId={id}
          templateId={templateId}
          dataId={dataId}
          formData={{
            name,
            bookingNumber,
            passengerCount,
            supplier,
            bookingAmounts,
          }}
          id={flightBookingId}
          portalId={portalId}
          renderEvent={renderEvent}
          opened={opened}
          onClose={onClose}
          onEdit={onEdit}
          action={action}
        />
      </GridItem>
    );
  };

  renderEventHeader = () => {
    const { templateId, data, action, tooltip } = this.props;

    const eventName = EVENT_VIEW_HELPERS.eventFullName(
      data,
      LOGIC_HELPERS.ifElse(action !== 'view', ''),
    );
    const location = EVENT_VIEW_HELPERS.location(data);
    const startDayId = this.startDayId();

    return (
      <GridItem>
        <GridContainer direction="column" spacing={0}>
          <GridItem>
            <GridContainer direction="column" spacing={1}>
              {this.renderBatchCreateSelect()}

              <GridItem>
                <GridContainer wrap="nowrap">
                  <GridItem xs>
                    <GridContainer
                      alignItems="center"
                      spacing={2}
                      wrap="nowrap"
                    >
                      {LOGIC_HELPERS.ifElse(
                        !tooltip,
                        <DayDate
                          id={startDayId}
                          templateId={templateId}
                          eventHeader
                        />,
                      )}

                      <GridItem xs>
                        <GridContainer direction="column" spacing={0}>
                          <GridItem>{this.renderTimeHeader()}</GridItem>
                          <GridItem>
                            <Scroll.Element name="eventTop">
                              <GridContainer alignItems="center">
                                {this.renderCancelBadge()}
                                <GridItem>
                                  <JText
                                    lg
                                    dark={eventName}
                                    gray={!eventName}
                                    bold={eventName}
                                    nowrap={false}
                                  >
                                    {LOGIC_HELPERS.ifElse(
                                      eventName,
                                      eventName,
                                      'Event Name',
                                    )}
                                  </JText>
                                </GridItem>
                              </GridContainer>
                            </Scroll.Element>
                          </GridItem>
                          <GridItem>
                            <JText gray nowrap={false}>
                              {LOGIC_HELPERS.ifElse(
                                location,
                                location,
                                LOGIC_HELPERS.ifElse(
                                  action !== 'view',
                                  'Location',
                                ),
                              )}
                            </JText>
                          </GridItem>
                        </GridContainer>
                      </GridItem>
                    </GridContainer>
                  </GridItem>

                  {this.renderCloseButton()}
                </GridContainer>
              </GridItem>
            </GridContainer>
          </GridItem>

          {this.renderTypeSubtype()}
        </GridContainer>
      </GridItem>
    );
  };

  startHomeTime = () => {
    const { node } = this.props;

    const time = this.tempStartTime();
    const timeZoneId = EVENT_VIEW_HELPERS.startTimeZoneId(node);

    return EVENT_DATA_HELPERS.renderHomeTime(time, timeZoneId);
  };

  endHomeTime = () => {
    const { node } = this.props;

    const time = this.tempEndTime(node);
    const timeZoneId = EVENT_VIEW_HELPERS.endTimeZoneId(node);

    return EVENT_DATA_HELPERS.renderHomeTime(time, timeZoneId);
  };

  startTimeZone = () => {
    const { node } = this.props;

    const startTimeZoneId = EVENT_VIEW_HELPERS.startTimeZoneId(node);

    if (!startTimeZoneId) return null;

    return MOMENT_HELPERS.renderZoneFromId(startTimeZoneId);
  };

  endTimeZone = () => {
    const { node } = this.props;

    const endTimeZoneId = EVENT_VIEW_HELPERS.endTimeZoneId(node);

    if (!endTimeZoneId) return null;

    return MOMENT_HELPERS.renderZoneFromId(endTimeZoneId);
  };

  renderDurationRow = content => {
    if (!content) return null;

    return (
      <>
        <Hr half />

        <GridItem>
          <JText dark>Duration:{content}</JText>
        </GridItem>
      </>
    );
  };

  renderUnit = (count, unit) => {
    if (!count) return null;

    return ` ${count} ${STRING_HELPERS.pluralise(unit, count, true)}`;
  };

  renderDuration = () => {
    const { data, node } = this.props;

    const tempEndDay = this.tempEndDay();
    const daysCount = moment.duration(tempEndDay).days();

    const isAccommodation = EVENT_VIEW_HELPERS.isAccommodation(data);

    if (isAccommodation) {
      return this.renderDurationRow(this.renderUnit(daysCount, 'night'));
    }

    const tempStartTime = this.tempStartTime();
    const startTimeZoneId = EVENT_VIEW_HELPERS.startTimeZoneId(node);
    if (!tempStartTime) return null;

    const tempEndTime = this.tempEndTime();
    // default to endTimeZoneId if not set
    const endTimeZoneId = EVENT_VIEW_HELPERS.endTimeZoneId(
      node,
      startTimeZoneId,
    );

    if (!tempEndTime) {
      // no duration if both end date and end time not set
      if (!daysCount) return null;

      // end day is set but not end time
      return this.renderDurationRow(this.renderUnit(daysCount, 'day'));
    }

    const startMoment = EVENT_DATA_HELPERS.toLocalTime(
      tempStartTime,
      startTimeZoneId,
    );
    const endMoment = EVENT_DATA_HELPERS.toLocalTime(
      tempEndTime,
      endTimeZoneId,
    ).add(daysCount, 'day');

    const duration = moment.duration(endMoment.diff(startMoment));

    const days = duration.days();
    const hours = duration.hours();
    const minutes = duration.minutes();

    return this.renderDurationRow(
      <>
        {this.renderUnit(days, 'day')}
        {this.renderUnit(hours, 'hour')}
        {this.renderUnit(minutes, 'minute')}
      </>,
    );
  };

  moveToUnplanned = () => {
    const { templateId, id, dataId, node, timelineId } = this.props;

    const tempStartTime = this.tempStartTime();

    return TEMPLATE_API_HELPERS.moveToUnplanned(
      {
        id,
        eventData: {
          startTimeValue: tempStartTime,
          type: EVENT_VIEW_HELPERS.nodeType(node),
          dataId,
        },
        onSuccess: this.handlePatchEventSuccess(id),
        timelineId,
        templateId,
      },
      this.props,
    );
  };

  reactivateEvent = () => {
    const { templateId, id, dataId, data } = this.props;

    return TEMPLATE_API_HELPERS.reactivateEvent(
      {
        id,
        onSuccess: this.handlePatchEventSuccess(id),
        type: EVENT_VIEW_HELPERS.type(data),
        subtype: EVENT_VIEW_HELPERS.subtype(data),
        dataId,
        templateId,
      },
      this.props,
    );
  };

  handlePatchEventSuccess = id => () => {
    const { templateId } = this.props;

    return NODE_API_HELPERS.getTimes(
      {
        id: templateId,
        ids: [id],
      },
      this.props,
    );
  };

  renderScheduleButton = ({ openMenu }) => {
    const { classes } = this.props;

    return (
      <Button
        dense
        noPadding
        size="extraSmall"
        color="black"
        className={classes.actionButton}
        onClick={openMenu}
      >
        <Icon icon="lnr-ellipsis" size="small" />
      </Button>
    );
  };

  renderScheduleMenu = ({ closeMenu }) => (
    <GridContainer direction="column" spacing={0}>
      <GridItem>
        <MenuItem onClick={this.moveToUnplanned} closeMenu={closeMenu}>
          <JText gray>Move to unplanned events</JText>
        </MenuItem>
      </GridItem>
    </GridContainer>
  );

  renderSchedulePopper = () => (
    <Popper
      placement="bottom-end"
      renderButton={this.renderScheduleButton}
      quarterPadding
    >
      {this.renderScheduleMenu}
    </Popper>
  );

  renderEventSchedule = () => {
    const { classes, templateId, id, data, node, action } = this.props;

    const tempStartTime = this.tempStartTime();
    const tempEndDay = this.tempEndDay();
    const tempEndTime = this.tempEndTime();
    const startDayId = this.startDayId();

    const multiDay = tempEndDay && tempEndDay !== 'P0D';

    const isTransportation = EVENT_VIEW_HELPERS.isTransportation(data);
    const locationStart = EVENT_VIEW_HELPERS.locationStart(data);
    const cityNameStart = EVENT_VIEW_HELPERS.cityNameStart(data);
    const locationEnd = EVENT_VIEW_HELPERS.locationEnd(data);
    const cityNameEnd = EVENT_VIEW_HELPERS.cityNameEnd(data);
    const startTimeMode = EVENT_VIEW_HELPERS.startTimeMode(node);
    const scheduled =
      startTimeMode === 'relative' || startTimeMode === 'relativeAtTime';

    const noEndTime = EVENT_HELPERS.isEventCustomDate(
      EVENT_VIEW_HELPERS.subtype(data),
    );
    const viewing = action === 'viewing';

    return (
      <GridItem>
        <GridContainer card direction="column">
          <GridItem>
            <GridContainer alignItems="center">
              <GridItem xs>
                <JText bold black>
                  Schedule
                </JText>
              </GridItem>
              {LOGIC_HELPERS.ifElse(
                [viewing, scheduled],
                <GridItem>{this.renderSchedulePopper()}</GridItem>,
              )}
            </GridContainer>
          </GridItem>

          <GridItem>
            <GridContainer direction="column" spacing={0}>
              <GridItem>
                <GridContainer direction="column" spacing={0}>
                  <GridItem>
                    <GridContainer
                      alignItems="center"
                      wrap="nowrap"
                      spacing={0}
                      className={classes.tickOffsetBottom}
                    >
                      <GridItem className={classes.tickGrid}>
                        <div className={classes.tick} />
                      </GridItem>
                      <GridItem>
                        <DayDate
                          id={startDayId}
                          templateId={templateId}
                          eventSchedule
                          showSetDate
                          selectedEventId={id}
                        />
                      </GridItem>
                    </GridContainer>
                  </GridItem>

                  {tempStartTime || locationStart || cityNameStart ? (
                    <GridItem>
                      <GridContainer
                        direction="column"
                        spacing={0}
                        className={classnames(
                          classes.borderLeft,
                          LOGIC_HELPERS.ifElse(multiDay, classes.paddingBottom),
                        )}
                      >
                        {LOGIC_HELPERS.ifElse(
                          [tempStartTime, isTransportation],
                          <GridItem>
                            <JText sm gray>
                              {EVENT_VIEW_HELPERS.startingLabel(data)}
                            </JText>
                          </GridItem>,
                          null,
                          true,
                        )}

                        {LOGIC_HELPERS.ifElse(
                          locationStart || cityNameStart,
                          <GridItem>
                            <GridContainer
                              alignItems="center"
                              wrap="nowrap"
                              spacing={0}
                            >
                              <GridItem>
                                <GridContainer direction="column" spacing={0}>
                                  {LOGIC_HELPERS.ifElse(
                                    locationStart,
                                    <GridItem>
                                      <JText
                                        lg
                                        bold={cityNameStart}
                                        dark
                                        ellipsis
                                      >
                                        {locationStart}
                                      </JText>
                                    </GridItem>,
                                  )}
                                  {LOGIC_HELPERS.ifElse(
                                    cityNameStart,
                                    <GridItem>
                                      <JText gray ellipsis>
                                        {cityNameStart}
                                      </JText>
                                    </GridItem>,
                                  )}
                                </GridContainer>
                              </GridItem>
                            </GridContainer>
                          </GridItem>,
                        )}

                        {tempStartTime && (
                          <>
                            <GridItem>
                              <JText danger>{tempStartTime}</JText>{' '}
                              <JText sm gray>
                                {this.startTimeZone()}
                              </JText>{' '}
                              {this.startHomeTime()}
                            </GridItem>
                          </>
                        )}
                      </GridContainer>
                    </GridItem>
                  ) : (
                    multiDay && (
                      <GridItem>
                        <GridContainer
                          direction="column"
                          spacing={0}
                          className={classnames(classes.borderLeft)}
                        >
                          <GridItem>
                            <br />
                          </GridItem>
                        </GridContainer>
                      </GridItem>
                    )
                  )}
                </GridContainer>
              </GridItem>

              {!noEndTime && (
                <GridItem>
                  <GridContainer
                    direction="column"
                    spacing={0}
                    className={classes.tickOffsetTop}
                  >
                    {LOGIC_HELPERS.ifElse(
                      multiDay,
                      <GridItem>
                        <GridContainer
                          alignItems="center"
                          wrap="nowrap"
                          spacing={0}
                        >
                          <GridItem className={classes.tickGrid}>
                            <div className={classes.tick} />
                          </GridItem>
                          <GridItem>
                            <DayDate
                              id={startDayId}
                              templateId={templateId}
                              offset={tempEndDay}
                              eventSchedule
                            />
                          </GridItem>
                        </GridContainer>
                      </GridItem>,
                    )}

                    {(tempEndTime || locationEnd || cityNameEnd) && (
                      <GridItem>
                        <GridContainer
                          direction="column"
                          spacing={0}
                          className={classnames(
                            classes.borderLeft,
                            LOGIC_HELPERS.ifElse(
                              multiDay,
                              classes.noBorderLeft,
                            ),
                          )}
                        >
                          {LOGIC_HELPERS.ifElse(
                            [tempEndTime, isTransportation],
                            <GridItem>
                              <JText sm gray>
                                {EVENT_VIEW_HELPERS.endingLabel(data)}
                              </JText>
                            </GridItem>,
                            null,
                            true,
                          )}

                          {LOGIC_HELPERS.ifElse(
                            [locationEnd, cityNameEnd],
                            <GridItem>
                              <GridContainer
                                alignItems="center"
                                wrap="nowrap"
                                spacing={0}
                              >
                                <GridItem>
                                  <GridContainer direction="column" spacing={0}>
                                    {LOGIC_HELPERS.ifElse(
                                      locationEnd,
                                      <GridItem>
                                        <JText
                                          lg
                                          bold={cityNameEnd}
                                          dark
                                          ellipsis
                                        >
                                          {locationEnd}
                                        </JText>
                                      </GridItem>,
                                    )}
                                    {LOGIC_HELPERS.ifElse(
                                      cityNameEnd,
                                      <GridItem>
                                        <JText gray ellipsis>
                                          {cityNameEnd}
                                        </JText>
                                      </GridItem>,
                                    )}
                                  </GridContainer>
                                </GridItem>
                              </GridContainer>
                            </GridItem>,
                            null,
                            true,
                          )}

                          {tempEndTime && (
                            <>
                              <GridItem>
                                <JText danger>{tempEndTime}</JText>{' '}
                                <JText sm gray>
                                  {this.endTimeZone()}
                                </JText>{' '}
                                {this.endHomeTime()}
                              </GridItem>
                            </>
                          )}
                        </GridContainer>
                      </GridItem>
                    )}
                  </GridContainer>
                </GridItem>
              )}
            </GridContainer>
          </GridItem>

          {this.renderDuration()}
        </GridContainer>
      </GridItem>
    );
  };

  renderNumber = value => {
    const { classes } = this.props;

    if (!value) return null;

    return (
      <GridItem>
        <GridContainer alignItems="center" spacing={2} wrap="nowrap">
          <GridItem className={classes.iconLeft}>
            <Icon icon="lnr-telephone" size="small" color="gray" />
          </GridItem>
          <GridItem>
            <JText black ellipsis>
              {value}
            </JText>
          </GridItem>
        </GridContainer>
      </GridItem>
    );
  };

  renderURL = value => {
    const { classes } = this.props;

    if (!value) return null;

    return (
      <GridItem>
        <GridContainer alignItems="center" spacing={2} wrap="nowrap">
          <GridItem className={classes.iconLeft}>
            <Icon icon="lnr-link2" size="small" color="gray" />
          </GridItem>
          <GridItem>
            <JText link ellipsis component="a" href={value} target="_black">
              {value}
            </JText>
          </GridItem>
        </GridContainer>
      </GridItem>
    );
  };

  renderSubDetailType = value => {
    const { classes, data } = this.props;

    let mapping = {};

    if (EVENT_VIEW_HELPERS.isBus(data)) {
      mapping = BUS_TYPES_MAPPING;
    } else if (EVENT_VIEW_HELPERS.isCoach(data)) {
      mapping = COACH_TYPES_MAPPING;
    }

    if (!value) return null;

    return (
      <GridItem>
        <GridContainer alignItems="center" spacing={2} wrap="nowrap">
          <GridItem className={classes.iconLeft}>
            <JText gray>Type</JText>
          </GridItem>
          <GridItem>
            <JText dark nowrap={false}>
              {mapping[value] || 'Unknown'}
            </JText>
          </GridItem>
        </GridContainer>
      </GridItem>
    );
  };

  renderNumberAndURL = (number, url, subDetailType) => {
    if (!number && !url && !subDetailType) return null;

    return (
      <GridItem>
        <GridContainer direction="column">
          {this.renderNumber(number)}

          {this.renderURL(url)}

          {this.renderSubDetailType(subDetailType)}
        </GridContainer>
      </GridItem>
    );
  };

  renderDescription = value => {
    if (isEmptyRTE(value)) return null;

    return (
      <GridItem>
        <JText dark>
          <div>
            <StyledSimpleRTE value={value} readOnly isMinHeightCollapse />
          </div>
        </JText>
      </GridItem>
    );
  };

  renderValue = value =>
    value && (
      <GridItem>
        <JText black={!!value} gray={!value} italic={!value} ellipsis>
          {LOGIC_HELPERS.ifElse(value, value, 'n/a')}
        </JText>
      </GridItem>
    );

  renderDetails = () => {
    const { data } = this.props;

    const isAccommodation = EVENT_VIEW_HELPERS.isAccommodation(data);
    const number = EVENT_VIEW_HELPERS.supplierPhoneNumber(data);
    const url = EVENT_VIEW_HELPERS.url(data);
    const description = EVENT_VIEW_HELPERS.description(data);
    const roomType = EVENT_VIEW_HELPERS.roomType(data);
    const numberOfRooms = EVENT_VIEW_HELPERS.numberOfRooms(data);
    const subDetailType = EVENT_VIEW_HELPERS.subDetailType(data);

    if (
      !number &&
      !url &&
      !subDetailType &&
      ((isAccommodation && !numberOfRooms && !roomType) || !isAccommodation) &&
      isEmptyRTE(description)
    )
      return null;

    return (
      <GridItem>
        <GridContainer card direction="column" spacing={2}>
          <GridItem>
            <JText bold black>
              Details
            </JText>
          </GridItem>

          {this.renderNumberAndURL(number, url, subDetailType)}

          {LOGIC_HELPERS.ifElse(
            [
              numberOfRooms || roomType,
              EVENT_VIEW_HELPERS.isAccommodation(data),
            ],
            <GridItem>
              <GridContainer alignItems="center" spacing={2}>
                <GridItem>
                  <GridContainer direction="column">
                    {LOGIC_HELPERS.ifElse(
                      numberOfRooms,
                      <GridItem>
                        <JText gray>Number of rooms</JText>
                      </GridItem>,
                    )}
                    {LOGIC_HELPERS.ifElse(
                      roomType,
                      <GridItem>
                        <JText gray>Room type</JText>
                      </GridItem>,
                    )}
                  </GridContainer>
                </GridItem>

                <GridItem xs>
                  <GridContainer direction="column">
                    {this.renderValue(numberOfRooms)}

                    {this.renderValue(roomType)}
                  </GridContainer>
                </GridItem>
              </GridContainer>
            </GridItem>,
          )}

          {this.renderDescription(description)}
        </GridContainer>
      </GridItem>
    );
  };

  renderMapEmpty = () => {
    const { action, tooltip } = this.props;

    if (tooltip) return null;

    const editing = action !== 'view';

    if (!editing) return <Empty title="Location" />;

    return (
      <GridItem>
        <GridContainer card direction="column" spacing={0}>
          <GridItem>
            <JText gray>Location</JText>
          </GridItem>
        </GridContainer>
      </GridItem>
    );
  };

  renderMap = () => {
    const { data, tooltip } = this.props;

    return (
      <MapCard
        mapOnly={tooltip}
        event={data}
        renderEmpty={this.renderMapEmpty}
      />
    );
  };

  openAttachForm = () => {
    const { onEdit } = this.props;

    LOGIC_HELPERS.ifFunction(onEdit, [{ subform: 'AttachmentForm' }]);
  };

  openReservationForm = () => {
    const { onEdit } = this.props;

    LOGIC_HELPERS.ifFunction(onEdit, [{ subform: 'ReservationForm' }]);
  };

  openCancellationForm = () => {
    const { onEdit } = this.props;

    LOGIC_HELPERS.ifFunction(onEdit, [{ subform: 'CancellationForm' }]);
  };

  renderAmounts = () => {
    const { data, canEditEvent } = this.props;

    if (!canEditEvent) return null;

    const currency = EVENT_VIEW_HELPERS.currency(data);
    if (!currency) return null;

    const budgetAmount = EVENT_VIEW_HELPERS.budgetAmount(data);
    const actualAmount = EVENT_VIEW_HELPERS.actualAmount(data);

    if (!budgetAmount && !actualAmount) return null;

    return (
      <GridItem>
        <GridContainer direction="column" card>
          <GridItem>
            <AmountsBar
              full
              actualAmount={actualAmount}
              budgetAmount={budgetAmount}
              currency={currency}
            />
          </GridItem>
        </GridContainer>
      </GridItem>
    );
  };

  renderEventContent = () => {
    const {
      classes,
      templateId,
      data,
      id,
      dataId,
      isPublic,
      onEdit,
      subform,
      action,
    } = this.props;

    const type = EVENT_VIEW_HELPERS.type(data, '');
    const subtype = EVENT_VIEW_HELPERS.subtype(data, '');

    if (!type || !subtype) {
      return (
        <div className={classes.center}>
          <GridContainer direction="column" alignItems="center" spacing={0}>
            <GridItem>
              <JText xl bold gray>
                Your Event Preview
              </JText>
            </GridItem>
            <GridItem>
              <JText lg gray>
                As you create your event, you can preview how it will appear.
              </JText>
            </GridItem>
          </GridContainer>
        </div>
      );
    }

    return (
      <GridContainer spacing={2}>
        <GridItem xs={12} sm={7}>
          <GridContainer direction="column" spacing={2}>
            {this.renderEventSchedule()}

            {this.renderDetails()}

            <ReservationCard
              event={data}
              preview={subform === 'ReservationForm'}
            />

            <FlightDetailsCard event={data} />

            {!isPublic && (
              <AttachmentsCard
                eventNodeId={id}
                templateId={templateId}
                id={dataId}
                data={data}
                canCreate={this.canCreateEvent()}
                onEdit={onEdit}
                preview={subform === 'AttachmentForm'}
                viewing={action === 'view'}
              />
            )}
          </GridContainer>
        </GridItem>

        <GridItem xs={12} sm={5}>
          <GridContainer direction="column" spacing={2}>
            {this.renderAmounts()}

            {this.renderMap()}

            {id && (
              <GridItem>
                <Ratings
                  simplify
                  id={id}
                  dataId={dataId}
                  templateId={templateId}
                  component={GridItem}
                />
              </GridItem>
            )}
          </GridContainer>
        </GridItem>
      </GridContainer>
    );
  };

  renderEvent = () => {
    const { classes, smDown, action, tooltip } = this.props;

    const creating = action === 'create';
    const editing = action === 'edit';

    if (tooltip) {
      return (
        <GridContainer direction="column" spacing={0}>
          {this.renderMap()}

          <GridItem>
            <div className={classes.padding}>
              <GridContainer direction="column" spacing={0}>
                {this.renderEventHeader()}
              </GridContainer>
            </div>
          </GridItem>
        </GridContainer>
      );
    }

    return (
      <GridContainer direction="column" spacing={2}>
        {(creating || editing) && (
          <GridItem>
            <JText black bold>
              Event Preview
            </JText>
          </GridItem>
        )}

        <GridItem>
          <GridContainer direction="column">
            {this.renderEventHeader()}

            <GridItem>
              <div
                className={classnames(
                  classes.eventContent,
                  LOGIC_HELPERS.ifElse(!smDown, classes.eventContentLg),
                )}
              >
                {this.renderEventContent()}
              </div>
            </GridItem>
          </GridContainer>
        </GridItem>
      </GridContainer>
    );
  };

  render = () => {
    const {
      id,
      flightBookingId: bookingId,
      classes,
      smDown,
      data,
      action,
      styled,
      subform,
      tooltip,
    } = this.props;

    if (!id && !styled && !bookingId) return null;

    const viewing = action === 'view';

    const renderEvent = this.renderEvent();
    const flightBookingId =
      bookingId || EVENT_VIEW_HELPERS.flightBookingId(data);

    const showFlightBookingView =
      LOGIC_HELPERS.ifElse(
        [
          viewing,
          flightBookingId,
          bookingId || EVENT_VIEW_HELPERS.isFlight(data),
        ],
        true,
      ) || subform === 'FlightBookingForm';

    const renderFlightBookings = LOGIC_HELPERS.ifElse(
      [viewing, subform === 'FlightBookingForm'],
      this.renderFlightBookings(renderEvent),
      null,
      true,
    );

    if (smDown) {
      return (
        <GridContainer direction="column" spacing={0}>
          {renderFlightBookings}

          {LOGIC_HELPERS.ifElse(
            !showFlightBookingView,
            <GridItem>
              <div className={classes.eventGridSm}>{renderEvent}</div>
            </GridItem>,
          )}
        </GridContainer>
      );
    }

    if (tooltip) {
      return renderEvent;
    }

    return (
      <GridContainer direction="column" alignItems="center" spacing={0}>
        {renderFlightBookings}

        {LOGIC_HELPERS.ifElse(
          !showFlightBookingView,
          <GridItem className={classes.content}>
            <GridContainer direction="column" alignItems="center" spacing={0}>
              <GridItem>
                <div className={classes.eventGrid}>{renderEvent}</div>
              </GridItem>
            </GridContainer>
          </GridItem>,
        )}
      </GridContainer>
    );
  };
}

ViewEvent.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,
  resaga: PropTypes.object,
  smDown: PropTypes.bool,
  canEditEvent: PropTypes.bool,

  // parent props
  data: PropTypes.object,
  node: PropTypes.object,
  bookingAmounts: PropTypes.object,
  onClose: PropTypes.func,
  onEdit: PropTypes.func,
  onCloseEdit: PropTypes.func,
  readOnly: PropTypes.bool,
  action: PropTypes.string,
  name: PropTypes.string,
  bookingNumber: PropTypes.string,
  supplier: PropTypes.string,
  flightBookingId: PropTypes.number,
  portalId: PropTypes.number,
  passengerCount: PropTypes.number,
  templateId: PropTypes.number,
  timelineId: PropTypes.number,
  dataId: PropTypes.number,
  id: PropTypes.number,
  isPublic: PropTypes.bool,
  opened: PropTypes.bool,
  styled: PropTypes.bool,
  subform: PropTypes.bool,
  tooltip: PropTypes.bool,

  // resaga props
};

ViewEvent.defaultProps = {
  isPublic: false,
  action: 'view',
};

// style only, no resaga
export const StyledViewEvent = compose(
  withStyles(styles, { name: 'StyledViewEvent' }),
)(ViewEvent);

export default compose(
  withCanEditEvent,
  withSMDown,
  resaga(DATA_ID_CONFIG),
  resaga(CONFIG),
)(StyledViewEvent);
