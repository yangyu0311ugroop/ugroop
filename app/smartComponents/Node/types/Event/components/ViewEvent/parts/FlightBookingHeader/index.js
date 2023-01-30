import { TEMPLATE_API_HELPERS } from 'apis/components/Template/helpers';
import { CURRENCY_LIST } from 'appConstants';
import classnames from 'classnames';
import Empty from 'components/Empty';
import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import JText from 'components/JText';
import { withStyles } from 'components/material-ui';
import { withSMDown } from 'components/material-ui/hocs/withMediaQuery';
import Popper from 'components/Popper';
import { PORTAL_HELPERS } from 'containers/Portal/helpers';
import { EVENT_STORE_HELPERS } from 'datastore/eventStore/helpers';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import { withCanEditFlightBooking } from 'smartComponents/Event/hoc';
import { FlightIds } from 'smartComponents/Node/logics';
import FlightButton from 'smartComponents/Node/types/Event/components/ViewEvent/parts/FlightBookingHeader/components/FlightButton';
import { EVENT_VIEW_HELPERS } from 'smartComponents/Node/types/Event/helpers';
import Icon from 'ugcomponents/Icon';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import JButton from 'viewComponents/Button/variants/JButton';
import { CONFIG } from './config';
import styles from './styles';

export class FlightBookingHeader extends PureComponent {
  state = {};

  openEventView = (flightId, dayId) => {
    const { portalId } = this.props;

    PORTAL_HELPERS.openViewEvent(
      {
        id: flightId,
        dayId,
        opened: true,
      },
      this.props,
      portalId,
    );
  };

  renderEmpty = () => (
    <GridItem>
      <JText white italic>
        n/a
      </JText>
    </GridItem>
  );

  renderFlight = (flightId, index) => {
    const { eventId } = this.props;

    const active = eventId === flightId;

    return (
      <FlightButton
        key={flightId}
        id={flightId}
        index={index}
        active={active}
        onClick={this.openEventView}
      />
    );
  };

  renderFlights = (flightIds = []) => {
    const { classes, smDown } = this.props;

    if (!flightIds.length)
      return (
        <GridItem>
          <GridContainer direction="column" spacing={0} alignItems="center">
            <GridItem>
              <div
                className={classnames(
                  LOGIC_HELPERS.ifElse(
                    smDown,
                    classes.eventGridSm,
                    classes.eventGrid,
                  ),
                )}
              >
                <Empty description="No flights" />
              </div>
            </GridItem>
          </GridContainer>
        </GridItem>
      );

    return (
      <GridItem>
        <GridContainer direction="column" spacing={0} alignItems="center">
          <GridItem>
            <div
              className={classnames(
                LOGIC_HELPERS.ifElse(
                  smDown,
                  classes.eventGridSm,
                  classes.eventGrid,
                ),
              )}
            >
              <GridContainer direction="column" spacing={3}>
                {flightIds.map(this.renderFlight)}
              </GridContainer>
            </div>
          </GridItem>
        </GridContainer>
      </GridItem>
    );
  };

  handleBackButton = () => {
    const { portalId, data } = this.props;

    PORTAL_HELPERS.openViewEvent(
      {
        flightBookingId: data.id,
        showAllDays: true,
        opened: false,
      },
      this.props,
      portalId,
    );
  };

  renderFlightsDetail = () => {
    const { classes, smDown, eventId, id, renderEvent, opened } = this.props;

    if (!opened) {
      return (
        <FlightIds eventId={eventId} flightBookingDataId={id}>
          {this.renderFlights}
        </FlightIds>
      );
    }

    return (
      <GridItem>
        <GridContainer direction="column" spacing={0} alignItems="center">
          <GridItem>
            <GridContainer direction="column" spacing={2}>
              <GridItem>
                <JButton onClick={this.handleBackButton}>
                  <Icon size="small" icon="lnr-chevron-left" paddingRight />{' '}
                  Back
                </JButton>
              </GridItem>

              <GridItem>
                <div
                  className={classnames(
                    LOGIC_HELPERS.ifElse(
                      smDown,
                      classes.eventDetailGridSm,
                      classes.eventDetailGrid,
                    ),
                  )}
                >
                  {renderEvent}
                </div>
              </GridItem>
            </GridContainer>
          </GridItem>
        </GridContainer>
      </GridItem>
    );
  };

  handleEditFlightBooking = () => {
    const { data } = this.props;

    return this.props.resaga.setValue({
      flightBookingView: EVENT_STORE_HELPERS.setFlightBookingView(
        true,
        data.id,
      ),
    });
  };

  renderDetail = () => {
    const {
      classes,
      data,
      smDown,
      onClose,
      canEditFlightBooking,
      formData,
      action,
    } = this.props;

    const currentData = LOGIC_HELPERS.ifElse(formData.name, formData, data);

    const renderEmpty = this.renderEmpty();
    const editingClasses = LOGIC_HELPERS.ifElse(
      action === 'edit',
      classes.bgEdit,
      classes.bg,
    );

    const currency = EVENT_VIEW_HELPERS.bookingCurrency(currentData);
    const budget = EVENT_VIEW_HELPERS.bookingBudgetAmount(currentData);
    const actual = EVENT_VIEW_HELPERS.bookingActualAmount(currentData);

    return (
      <GridItem>
        <div
          className={classnames(
            LOGIC_HELPERS.ifElse(smDown, classes.bgSm, editingClasses),
          )}
        >
          <GridContainer direction="column" spacing={2} alignItems="center">
            {LOGIC_HELPERS.ifElse(
              onClose,
              <div className={classes.closeSm}>
                <JButton bg="dark" onClick={onClose}>
                  <Icon icon="lnr-cross" size="small" />
                </JButton>
              </div>,
            )}
            <GridItem>
              <div
                className={classnames(
                  LOGIC_HELPERS.ifElse(
                    smDown,
                    classes.eventGridSm,
                    classes.eventGrid,
                  ),
                )}
              >
                <GridContainer
                  direction="column"
                  spacing={2}
                  alignItems="center"
                >
                  <GridItem>
                    <GridContainer
                      direction="column"
                      alignItems="center"
                      spacing={0}
                    >
                      <GridItem>
                        <JText lightGray uppercase sm>
                          Flight Itinerary
                        </JText>
                      </GridItem>
                      <GridItem>
                        <JText xl bold white nowrap={false} textCenter>
                          {currentData.name || renderEmpty}
                        </JText>
                      </GridItem>
                    </GridContainer>
                  </GridItem>

                  {LOGIC_HELPERS.ifElse(
                    [
                      currentData.bookingNumber,
                      currentData.passengerCount > 0,
                      currentData.supplier,
                      currency,
                      budget,
                      actual,
                    ],
                    <GridItem>
                      <GridContainer spacing={2} wrap="nowrap">
                        <GridItem>
                          <GridContainer direction="column">
                            {LOGIC_HELPERS.ifElse(
                              currentData.bookingNumber,
                              <GridItem>
                                <JText lightGray>Booking number</JText>
                              </GridItem>,
                            )}
                            {LOGIC_HELPERS.ifElse(
                              currentData.passengerCount > 0,
                              <GridItem>
                                <JText lightGray>Passenger count</JText>
                              </GridItem>,
                            )}
                            {LOGIC_HELPERS.ifElse(
                              currentData.supplier,
                              <GridItem>
                                <JText lightGray>Booking with</JText>
                              </GridItem>,
                            )}
                            {LOGIC_HELPERS.ifElse(
                              currency,
                              <GridItem>
                                <JText lightGray>Currency</JText>
                              </GridItem>,
                            )}
                            {LOGIC_HELPERS.ifElse(
                              budget,
                              <GridItem>
                                <JText lightGray>Budget</JText>
                              </GridItem>,
                            )}
                            {LOGIC_HELPERS.ifElse(
                              actual,
                              <GridItem>
                                <JText lightGray>Actual</JText>
                              </GridItem>,
                            )}
                          </GridContainer>
                        </GridItem>
                        <GridItem>
                          <JText white nowrap={false}>
                            <GridContainer direction="column">
                              {LOGIC_HELPERS.ifElse(
                                currentData.bookingNumber,
                                <GridItem>
                                  {currentData.bookingNumber}
                                </GridItem>,
                              )}
                              {LOGIC_HELPERS.ifElse(
                                currentData.passengerCount > 0,
                                <GridItem>
                                  {currentData.passengerCount}
                                </GridItem>,
                              )}
                              {LOGIC_HELPERS.ifElse(
                                currentData.supplier,
                                <GridItem>{currentData.supplier}</GridItem>,
                              )}
                              {LOGIC_HELPERS.ifElse(
                                currency,
                                <GridItem>
                                  {CURRENCY_LIST[currency]} ({currency})
                                </GridItem>,
                              )}
                              {LOGIC_HELPERS.ifElse(
                                budget,
                                <GridItem>
                                  {EVENT_VIEW_HELPERS.prettifyAmount(
                                    budget,
                                    currency,
                                  )}
                                </GridItem>,
                              )}
                              {LOGIC_HELPERS.ifElse(
                                actual,
                                <GridItem>
                                  {EVENT_VIEW_HELPERS.prettifyAmount(
                                    actual,
                                    currency,
                                  )}
                                </GridItem>,
                              )}
                            </GridContainer>
                          </JText>
                        </GridItem>
                      </GridContainer>
                    </GridItem>,
                    null,
                    true,
                  )}
                </GridContainer>
              </div>
            </GridItem>
            <GridItem>
              {LOGIC_HELPERS.ifElse(canEditFlightBooking, this.renderActions())}
            </GridItem>
          </GridContainer>
        </div>
      </GridItem>
    );
  };

  openEditFlightBooking = () => {
    const { onEdit } = this.props;

    LOGIC_HELPERS.ifFunction(onEdit, [{ subform: 'FlightBookingForm' }]);
  };

  renderAddFlightsButton = ({ openMenu }) => (
    <JButton bg="dark" onClick={openMenu}>
      <GridContainer alignItems="center" wrap="nowrap">
        <GridItem>
          <Icon icon="lnr-plus" size="small" />
        </GridItem>
        <GridItem>Flight</GridItem>
      </GridContainer>
    </JButton>
  );

  renderMoreButton = ({ openMenu }) => (
    <JButton bg="dark" onClick={openMenu}>
      <Icon icon="lnr-ellipsis" size="small" />
    </JButton>
  );

  handleDeleteBookingDone = () => {
    const { onClose } = this.props;
    const { confirmDeleteDialogId } = this.state;

    PORTAL_HELPERS.closePortal(confirmDeleteDialogId, this.props);
    LOGIC_HELPERS.ifFunction(onClose);
  };

  handleDeleteBooking = () => {
    const { data, templateId } = this.props;

    return TEMPLATE_API_HELPERS.deleteFlightBooking(
      {
        dataId: data.id,
        templateId,
        onSuccess: this.handleDeleteBookingDone,
        onError: this.handleDeleteBookingDone,
      },
      this.props,
    );
  };

  confirmDeleteBooking = closeMenu => () => {
    LOGIC_HELPERS.ifFunction(closeMenu, []);
    const confirmDeleteDialogId = PORTAL_HELPERS.confirmDeleteBooking(
      {
        onConfirm: this.handleDeleteBooking,
      },
      this.props,
    );

    this.setState({ confirmDeleteDialogId });
  };

  renderMoreMenu = ({ closeMenu }) => (
    <GridContainer direction="column" spacing={0}>
      <GridItem>
        <JButton onClick={this.confirmDeleteBooking(closeMenu)}>
          <JText danger>
            <GridContainer alignItems="center" wrap="nowrap">
              <GridItem>
                <Icon size="xsmall" icon="lnr-trash2" />
              </GridItem>
              <GridItem>Delete</GridItem>
            </GridContainer>
          </JText>
        </JButton>
      </GridItem>
    </GridContainer>
  );

  renderMorePopper = () => (
    <Popper dark noPadding renderButton={this.renderMoreButton}>
      {this.renderMoreMenu}
    </Popper>
  );

  renderActions = () => {
    const { classes, smDown, action } = this.props;

    if (action === 'edit') return null;

    return (
      <GridContainer direction="column" spacing={0} alignItems="center">
        <GridItem>
          <div
            className={classnames(
              LOGIC_HELPERS.ifElse(
                smDown,
                classes.eventGridSm,
                classes.eventGrid,
              ),
            )}
          >
            <GridContainer alignItems="center" spacing={0}>
              <GridItem xs />
              <GridItem>
                <JButton bg="dark" onClick={this.handleEditFlightBooking}>
                  <GridContainer alignItems="center" wrap="nowrap">
                    <GridItem>
                      <Icon icon="lnr-plus" size="small" />
                    </GridItem>
                    <GridItem>Flight</GridItem>
                  </GridContainer>
                </JButton>
              </GridItem>
              <GridItem>
                <JButton bg="dark" onClick={this.openEditFlightBooking}>
                  <GridContainer alignItems="center" wrap="nowrap">
                    <GridItem>
                      <Icon icon="lnr-pencil2" size="small" />
                    </GridItem>
                    <GridItem>Edit</GridItem>
                  </GridContainer>
                </JButton>
              </GridItem>
              <GridItem>{this.renderMorePopper()}</GridItem>
            </GridContainer>
          </div>
        </GridItem>
      </GridContainer>
    );
  };

  render = () => (
    <GridContainer direction="column" spacing={3}>
      {this.renderDetail()}

      {this.renderFlightsDetail()}
    </GridContainer>
  );
}

FlightBookingHeader.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,
  resaga: PropTypes.object.isRequired,
  smDown: PropTypes.bool,
  canEditFlightBooking: PropTypes.bool.isRequired,

  // parent props
  data: PropTypes.object,
  formData: PropTypes.object,
  portalId: PropTypes.number,
  eventId: PropTypes.number,
  templateId: PropTypes.number,
  id: PropTypes.number,
  renderEvent: PropTypes.any,
  action: PropTypes.string,
  opened: PropTypes.bool,
  onClose: PropTypes.func,
  onEdit: PropTypes.func,

  // resaga props
};

FlightBookingHeader.defaultProps = {
  data: {},
  formData: {},
};

export default compose(
  withStyles(styles, { name: 'FlightBookingHeader' }),
  withCanEditFlightBooking,
  withSMDown,
  resaga(CONFIG),
)(FlightBookingHeader);
