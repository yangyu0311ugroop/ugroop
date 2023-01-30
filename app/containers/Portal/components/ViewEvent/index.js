import { Slide } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import Switch from '@material-ui/core/Switch';
import classnames from 'classnames';
import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import Hr from 'components/Hr';
import JText from 'components/JText';
import { withStyles } from 'components/material-ui';
import { withSMDown } from 'components/material-ui/hocs/withMediaQuery';
import Popper from 'components/Popper';
import MenuItem from 'components/Popper/components/MenuItem';
import AddEventCard from 'containers/Portal/components/AddEvent/components/AddEventCard';
import EditEventCard from 'containers/Portal/components/AddEvent/components/EditEventCard';
import { PORTAL_HELPERS } from 'containers/Portal/helpers';
import EventsWithoutDay from 'containers/Templates/TemplateManagement/components/TemplateContent/components/TabContent/components/TabTimeLine/components/TimeLineContent/components/EventsWithoutDay';
import FlightBookings from 'containers/Templates/TemplateManagement/components/TemplateContent/components/TabContent/components/TabTimeLine/components/TimeLineContent/components/FlightBookings';
import SingleDayEventWithEventIds from 'containers/Templates/TemplateManagement/components/TemplateContent/components/TabContent/components/TabTimeLine/components/TimeLineContent/components/RenderDay/components/Day/components/SingleDayEventList/singleDayEventWithEventIds';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import { withCanEditEvent } from 'smartComponents/Event/hoc';
import Node from 'smartComponents/Node';
import MiniCalendar from 'smartComponents/Node/parts/StartDate/components/MiniCalendar';
import DayDate from 'smartComponents/Node/types/Day/components/DayDate';
import ViewEventCard from 'smartComponents/Node/types/Event/components/ViewEvent';
import withDayIds from 'smartComponents/Node/types/Template/hocs/withDayIds';
import Icon from 'ugcomponents/Icon';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { VARIANTS } from 'variantsConstants';
import JButton from 'viewComponents/Button/variants/JButton';
import { CONFIG } from './config';
import styles from './styles';

export class ViewEvent extends PureComponent {
  state = {
    selectedId: this.props.dayId,
    showAllDays: this.props.showAllDays,
    showType: this.props.showType,
  };

  componentDidUpdate = prevProps => {
    const { dayId, showType } = this.props;

    if (dayId !== prevProps.dayId) {
      this.setState({ selectedId: dayId });
    }
    if (showType !== prevProps.showType) {
      this.setState({ showType });
    }
  };

  handleCloseDialog = () => PORTAL_HELPERS.close(this.props);

  changeShowType = showType => () => {
    const { portalId } = this.props;

    return PORTAL_HELPERS.openViewEvent(
      {
        showType,
        dayId: null,
      },
      this.props,
      portalId,
    );
  };

  changeAction = action => ({ subform = '', ...params } = {}) =>
    this.setState({ action, subform, ...params });

  renderEvent = () => {
    const {
      id,
      templateId,
      classes,
      readOnly,
      isPublic,
      ...props
    } = this.props;
    const { action, selectedId, subform, showType } = this.state;

    if (action === 'create') {
      const typeProps = LOGIC_HELPERS.ifElse(
        showType,
        {
          eventType: LOGIC_HELPERS.ifElse(
            showType === 'Food',
            'Activity',
            showType,
          ),
          subtype: LOGIC_HELPERS.ifElse(showType === 'Food', 'Food'),
        },
        {},
      );

      return (
        <AddEventCard
          {...props}
          {...typeProps}
          showType={showType}
          dayId={selectedId}
          onClose={this.changeAction('view')}
        />
      );
    }

    if (action === 'plan') {
      return (
        <AddEventCard
          selectUnscheduled
          {...props}
          dayId={selectedId}
          onClose={this.changeAction('view')}
        />
      );
    }

    if (action === 'edit') {
      return (
        <EditEventCard
          {...props}
          action={action}
          subform={subform}
          id={id}
          dayId={selectedId}
          onClose={this.changeAction('view')}
          onCloseDialog={this.handleCloseDialog}
        />
      );
    }

    return (
      <ViewEventCard
        {...props}
        action={action}
        id={id}
        templateId={templateId}
        onEdit={this.changeAction('edit')}
        onCloseEdit={this.changeAction('view')}
        onClose={this.handleCloseDialog}
        readOnly={readOnly}
        isPublic={isPublic}
      />
    );
  };

  handleSelectDay = selectedId => {
    const { portalId } = this.props;

    this.setState({ selectedId });
    PORTAL_HELPERS.openViewEvent(
      {
        id: 0,
      },
      this.props,
      portalId,
    );
  };

  handleScheduleEvent = () => {
    const { dayIds } = this.props;

    if (!dayIds.length) return null;

    this.setState({ action: 'plan' });

    return this.handleSelectDay(dayIds[0]);
  };

  renderSelectDate = () => {
    const { templateId } = this.props;
    const { selectedId } = this.state;

    return (
      <GridItem>
        <GridContainer direction="column" spacing={0} alignItems="center">
          <GridItem>
            <MiniCalendar
              selectedId={selectedId}
              templateId={templateId}
              onClick={this.handleSelectDay}
            />
          </GridItem>
        </GridContainer>
      </GridItem>
    );
  };

  renderEventListEmpty = () => {
    const { showType } = this.state;

    return (
      <>
        <Hr half />

        <GridItem>
          <JText gray italic>
            There are no{' '}
            {LOGIC_HELPERS.ifElse(
              showType,
              <JText dark bold capitalize>
                {showType}{' '}
              </JText>,
            )}
            events on this day
          </JText>
        </GridItem>
      </>
    );
  };

  renderCreateEvent = () => {
    const { canEditEvent, readOnly } = this.props;
    const { action } = this.state;

    if (readOnly) return null;

    if (!canEditEvent) return null;

    return (
      <GridItem>
        <JButton
          bg={LOGIC_HELPERS.ifElse(action === 'create', 'gray', 'green')}
          onClick={LOGIC_HELPERS.ifElse(
            action === 'create',
            this.changeAction('view'),
            this.changeAction('create'),
          )}
        >
          {LOGIC_HELPERS.ifElse(
            action === 'create',
            'Go Back',
            <GridContainer alignItems="center" spacing={0} wrap="nowrap">
              <GridItem>
                <Icon icon="lnr-plus" size="small" paddingRight />
              </GridItem>
              <GridItem>Event</GridItem>
            </GridContainer>,
          )}
        </JButton>
      </GridItem>
    );
  };

  renderEventsWithoutDay = ids => {
    const { classes } = this.props;
    const { action } = this.state;

    if (!ids.length) return null;

    return (
      <>
        <Hr half />
        <GridItem>
          <GridContainer
            alignItems="center"
            className={classnames(classes.card, classes.arrowHover)}
            onClick={LOGIC_HELPERS.ifElse(
              action === 'plan',
              this.changeAction('view'),
              this.changeAction('plan'),
            )}
          >
            <GridItem xs>{ids.length} to be planned</GridItem>
            {LOGIC_HELPERS.ifElse(
              action === 'plan',
              <GridItem>
                <JButton bg="gray">Finish</JButton>
              </GridItem>,
              <GridItem className={classes.nextButton}>
                <Icon icon="lnr-arrow-right" />
              </GridItem>,
            )}
          </GridContainer>
        </GridItem>
      </>
    );
  };

  renderCloseButton = () => (
    <GridItem>
      <GridContainer alignItems="center" wrap="nowrap">
        <GridItem xs />
        <GridItem>
          <JButton noBorderRadius onClick={this.handleCloseDialog}>
            <Icon icon="lnr-cross" size="small" />
          </JButton>
        </GridItem>
      </GridContainer>
    </GridItem>
  );

  changeShowAll = () =>
    this.setState(({ showAllDays }) => ({
      showAllDays: !showAllDays,
    }));

  renderDay = dayId => {
    const { id, templateId, classes, portalId, isPublic } = this.props;
    const { showType } = this.state;

    return (
      <GridItem key={dayId}>
        <Node id={dayId} key={dayId} variant={VARIANTS.LOGIC} />

        <div className={classnames(classes.dayWrapper)}>
          <GridContainer direction="column">
            <GridItem>
              <DayDate
                id={dayId}
                templateId={templateId}
                eventSchedule
                showDayIndex
              />
            </GridItem>

            <SingleDayEventWithEventIds
              id={dayId}
              key={`${dayId}__${showType}`}
              templateId={templateId}
              portalId={portalId}
              smDown
              simplify
              activeId={id}
              renderEmpty={this.renderEventListEmpty}
              isPublic={isPublic}
              showType={showType}
              onEdit={this.changeAction('edit')}
              editing
            />
          </GridContainer>
        </div>
      </GridItem>
    );
  };

  renderAmountsViewingButton = ({ openMenu, showType }) => (
    <GridItem>
      <JButton borderGray bg="white" onClick={openMenu}>
        <GridContainer alignItems="center" wrap="nowrap" spacing={0}>
          <GridItem>
            {LOGIC_HELPERS.ifElse(
              showType,
              <JText bold blue>
                {showType}
              </JText>,
              <JText gray>Category</JText>,
            )}
          </GridItem>
          <GridItem>
            <Icon icon="lnr-chevron-down" size="xsmall" paddingLeft />
          </GridItem>
        </GridContainer>
      </JButton>
    </GridItem>
  );

  // changeShowType = showType => () => {
  //   this.setState({ showType });
  // };

  renderAmountsViewingMenu = ({ closeMenu, showType }) => (
    <GridItem>
      <GridContainer direction="column">
        <GridItem>
          <MenuItem
            selected={showType === 'Transportation'}
            closeMenu={closeMenu}
            onClick={this.changeShowType('Transportation')}
          >
            Transportation
          </MenuItem>
        </GridItem>
        <GridItem>
          <MenuItem
            selected={showType === 'Accommodation'}
            closeMenu={closeMenu}
            onClick={this.changeShowType('Accommodation')}
          >
            Accommodation
          </MenuItem>
        </GridItem>
        <GridItem>
          <MenuItem
            selected={showType === 'Activity'}
            closeMenu={closeMenu}
            onClick={this.changeShowType('Activity')}
          >
            Activities
          </MenuItem>
        </GridItem>
        <GridItem>
          <MenuItem
            selected={showType === 'Food'}
            closeMenu={closeMenu}
            onClick={this.changeShowType('Food')}
          >
            Food
          </MenuItem>
        </GridItem>

        {LOGIC_HELPERS.ifElse(
          showType,
          <GridItem>
            <MenuItem closeMenu={closeMenu} onClick={this.changeShowType('')}>
              <JText danger>Clear</JText>
            </MenuItem>
          </GridItem>,
        )}
      </GridContainer>
    </GridItem>
  );

  renderAmountsViewingPopper = () => {
    const { showType } = this.state;

    return (
      <Popper
        renderButton={this.renderAmountsViewingButton}
        showType={showType}
      >
        {this.renderAmountsViewingMenu}
      </Popper>
    );
  };

  renderLeft = () => {
    const {
      id,
      templateId,
      classes,
      portalId,
      dayId,
      tabId,
      readOnly,
      isPublic,
      hideEventList,
      flightBookingId,
      dayIds,
    } = this.props;
    const { selectedId, showAllDays, showType } = this.state;

    if (hideEventList) return null;

    // render unplanned events
    if (!selectedId && (!dayId || dayId === tabId) && !showAllDays) {
      return (
        <GridItem className={classes.left}>
          <div className={classes.scrollableX}>
            <GridContainer direction="column" spacing={2}>
              <EventsWithoutDay
                templateId={templateId}
                tabId={tabId}
                activeId={id}
                portalId={portalId}
                smDown
                onClose={this.handleCloseDialog}
                renderCreateEvent={LOGIC_HELPERS.ifElse(
                  !readOnly,
                  this.renderCreateEvent,
                )}
                showEmpty
              />

              <Hr half />
              <GridItem>
                <GridContainer
                  alignItems="center"
                  className={classnames(
                    classes.padding,
                    classes.card,
                    classes.arrowHover,
                  )}
                  onClick={this.handleScheduleEvent}
                >
                  <GridItem xs>Schedule events</GridItem>
                  <GridItem className={classes.nextButton}>
                    <Icon icon="lnr-arrow-right" />
                  </GridItem>
                </GridContainer>
              </GridItem>
            </GridContainer>
          </div>
        </GridItem>
      );
    }

    return (
      <GridItem className={classes.left}>
        <div className={classes.scrollableX}>
          <GridContainer direction="column" spacing={0}>
            <GridItem>
              <div className={classes.leftHeader}>
                <GridContainer direction="column" spacing={1}>
                  {this.renderCloseButton()}

                  {this.renderSelectDate()}

                  <GridItem>
                    <div className={classes.halfPadding}>
                      <GridContainer alignItems="center" spacing={0}>
                        <GridItem xs />

                        {this.renderCreateEvent()}
                      </GridContainer>
                    </div>
                  </GridItem>
                </GridContainer>
              </div>
            </GridItem>

            <GridItem>
              <GridContainer direction="column" spacing={0}>
                <GridItem>
                  <div className={classes.halfPadding}>
                    <GridContainer alignItems="center">
                      <GridItem>
                        <GridContainer
                          alignItems="center"
                          spacing={1}
                          wrap="nowrap"
                        >
                          <GridItem>
                            <Icon bold icon="lnr-equalizer" size="small" />
                          </GridItem>
                          <GridItem>
                            <JText gray sm uppercase>
                              Show
                            </JText>
                          </GridItem>
                        </GridContainer>
                      </GridItem>
                      <GridItem>
                        <JButton borderGray bg="white">
                          <GridContainer
                            alignItems="center"
                            wrap="nowrap"
                            spacing={0}
                          >
                            <GridItem>
                              <JText
                                gray={!showAllDays}
                                blue={showAllDays}
                                bold={showAllDays}
                              >
                                All Days
                              </JText>
                            </GridItem>
                            <GridItem>
                              <Switch
                                color="primary"
                                size="small"
                                checked={showAllDays}
                                onChange={this.changeShowAll}
                              />
                            </GridItem>
                          </GridContainer>
                        </JButton>
                      </GridItem>
                      <GridItem>{this.renderAmountsViewingPopper()}</GridItem>
                    </GridContainer>
                  </div>
                </GridItem>

                <GridItem>
                  <GridContainer card direction="column">
                    {!showAllDays && selectedId && (
                      <>
                        <GridItem>
                          <DayDate
                            id={selectedId}
                            templateId={templateId}
                            eventSchedule
                            showDayIndex
                          />
                        </GridItem>

                        <SingleDayEventWithEventIds
                          id={selectedId}
                          key={`${selectedId}__${showType}`}
                          templateId={templateId}
                          portalId={portalId}
                          smDown
                          simplify
                          activeId={id}
                          renderEmpty={this.renderEventListEmpty}
                          isPublic={isPublic}
                          autoSelect={!flightBookingId}
                          showType={showType}
                          onEdit={this.changeAction('edit')}
                          editing
                        />

                        <EventsWithoutDay
                          templateId={templateId}
                          tabId={tabId}
                          portalId={portalId}
                          smDown
                          showEmpty={false}
                        >
                          {this.renderEventsWithoutDay}
                        </EventsWithoutDay>
                      </>
                    )}

                    {showAllDays && (
                      <GridItem>
                        <GridContainer direction="column" spacing={2}>
                          {LOGIC_HELPERS.ifElse(
                            [
                              !showType,
                              showType && showType === 'Transportation',
                            ],
                            <FlightBookings
                              templateId={templateId}
                              portalId={portalId}
                              selectedId={flightBookingId}
                              showType={showType}
                              editing
                              className={classnames(classes.dayWrapper)}
                            />,
                            null,
                            true,
                          )}

                          {dayIds.map(this.renderDay)}
                        </GridContainer>
                      </GridItem>
                    )}
                  </GridContainer>
                </GridItem>
              </GridContainer>
            </GridItem>
          </GridContainer>
        </div>
      </GridItem>
    );
  };

  render = () => {
    const { classes, smDown } = this.props;
    const { action } = this.state;

    const mobileProps = LOGIC_HELPERS.ifElse(
      smDown,
      {
        fullScreen: true,
        TransitionComponent: Slide,
        TransitionProps: { direction: 'up' },
      },
      {},
    );

    return (
      <Dialog open fullScreen onClose={this.handleCloseDialog} {...mobileProps}>
        <GridContainer
          wrap="nowrap"
          spacing={0}
          className={classes.notScrollable}
        >
          {LOGIC_HELPERS.ifElse(
            [!smDown, action !== 'edit'],
            this.renderLeft(),
          )}

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
      </Dialog>
    );
  };
}

ViewEvent.propTypes = {
  // hoc props
  resaga: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  smDown: PropTypes.bool,
  canEditEvent: PropTypes.bool,
  templateId: PropTypes.number,
  flightBookingId: PropTypes.number,
  tabId: PropTypes.number,
  dayIds: PropTypes.array,

  // parent props
  id: PropTypes.number, // event id
  dataId: PropTypes.number, // event data id
  dayId: PropTypes.number,
  portalId: PropTypes.number,
  readOnly: PropTypes.bool,
  isPublic: PropTypes.bool,
  hideEventList: PropTypes.bool,
  showAllDays: PropTypes.bool,
  showType: PropTypes.string,

  // resaga props
};

ViewEvent.defaultProps = {
  isPublic: false,
  dayIds: [],
};

export default compose(
  withStyles(styles, { name: 'ViewEvent' }),
  withDayIds,
  withSMDown,
  withCanEditEvent,
  resaga(CONFIG),
)(ViewEvent);
