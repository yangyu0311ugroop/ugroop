import { withStyles } from '@material-ui/core/styles';
import { NODE_API_HELPERS } from 'apis/components/Node/helpers';
import { NODE_API, UPDATE_NODE } from 'apis/constants';
import { CALENDAR_BADGE, DEFAULT, SMALL_BADGE, SUB_TITLE } from 'appConstants';
import classnames from 'classnames';
import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import Popper from 'components/Popper';
import MenuItem from 'components/Popper/components/MenuItem';
import { DAY_TAB_INDEX } from 'containers/Templates/TemplateManagement/constants';
import { DatePicker } from 'material-ui-pickers';
import momentjs from 'moment';
import PropTypes from 'prop-types';
import React, { Fragment, PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import resaga from 'resaga';
import Icon from 'ugcomponents/Icon';
import { FORMATS_DATE_TIME } from 'utils/constants/dateTime';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { parseQueryParam, stringifyParam } from 'utils/helpers/url';
import { DAY, TEMPLATE } from 'utils/modelConstants';
import { VARIANTS } from 'variantsConstants';
import Button from 'viewComponents/Button';
import Tooltip from 'viewComponents/Tooltip';
import Subtitle from './components/Subtitle';
import { CONFIG } from './config';
import styles from './styles';
import { PORTAL_HELPERS } from '../../../../containers/Portal/helpers';

export class StartDate extends PureComponent {
  state = {
    portalId: null,
  };

  contentClassName = () => {
    const { classes, className, darkMode, dense, editable } = this.props;

    const displayDate = this.displayDate();

    return classnames(
      classes.calendarBlock,
      LOGIC_HELPERS.ifElse(editable, classes.calendarBlockEdit),
      LOGIC_HELPERS.ifElse(displayDate === 'none', classes.blockNoDate),
      LOGIC_HELPERS.ifElse(darkMode, classes.darkMode, classes.dayMode),
      LOGIC_HELPERS.ifElse(dense, classes.blockDense),
      className,
    );
  };

  updateTimes = () => {
    const { timelineId } = this.props;
    NODE_API_HELPERS.getTreeAndTimes(
      { id: timelineId },
      { resaga: this.props.resaga },
    );
  };

  changeStartDate = node => {
    const { id } = this.props;

    this.props.resaga.dispatchTo(NODE_API, UPDATE_NODE, {
      payload: {
        nodeId: id,
        node,
      },
      onSuccess: this.updateTimes,
    });
  };

  closePortal = () => {
    const { portalId } = this.state;
    if (portalId) {
      PORTAL_HELPERS.closePortal(this.state.portalId, this.props);
      return this.setState({ portalId: null });
    }
    return null;
  };

  handlePickDate = newStartDate => {
    const { startDate } = this.props;

    const start = newStartDate.utcOffset(0, true).startOf('d');

    if (momentjs(start).isSame(startDate, 'day')) {
      return null;
    }

    const node = {
      type: TEMPLATE,
      customData: {
        startDate: start.toISOString(),
        weekDay: null,
        displayDate: 'startDate',
      },
    };

    return this.changeStartDate(node);
  };

  handlePickerRef = ref => {
    this.picker = ref;
  };

  handlePickWeekDay = weekDay => () => {
    const node = {
      type: TEMPLATE,
      customData: {
        weekDay,
        startDate: null,
        displayDate: 'weekDay',
      },
    };

    this.changeStartDate(node);
  };

  handleRemoveDate = () => {
    const node = {
      type: TEMPLATE,
      customData: {
        weekDay: null,
        startDate: null,
        displayDate: 'none',
      },
    };

    this.changeStartDate(node);
  };

  startPickDate = () => {
    this.picker.open();
    this.closePortal();
  };

  displayDate = () => {
    const { displayDate } = this.props;

    return displayDate;
  };

  startDate = () => {
    const { startDate } = this.props;

    if (!startDate) return null;

    return momentjs(startDate);
  };

  weekend = () => {
    const { displayDate, weekDay } = this.props;

    let dow;

    if (displayDate === 'weekDay') {
      dow = weekDay;
    } else {
      const date = this.startDate();
      dow = momentjs(date).day();
    }

    return LOGIC_HELPERS.ifElse([dow === 0, dow === 6], true, false, true);
  };

  goToDayView = () => {
    const { location, history } = this.props;

    const parsedQuery = parseQueryParam(location.search);
    let locationShouldChange = false;

    if (Number(parsedQuery.tab) !== DAY_TAB_INDEX) {
      parsedQuery.tab = DAY_TAB_INDEX;
      locationShouldChange = true;
    }
    if (parsedQuery.dayView !== DAY) {
      parsedQuery.dayView = DAY;
      locationShouldChange = true;
    }

    if (locationShouldChange) {
      history.push(`${location.pathname}?${stringifyParam(parsedQuery)}`);
    }

    this.props.resaga.setValue({
      layout: DAY,
      selectedId: undefined,
    });
  };

  renderTitle = () => {
    const { startDate: date } = this.props;

    if (!date) return {};

    const startDate = momentjs(date);

    return {
      title: `${startDate.fromNow()} (${startDate.format(
        FORMATS_DATE_TIME.DATE,
      )})`,
    };
  };

  renderDefault = () => {
    const { weekDay, shorten } = this.props;

    const displayDate = this.displayDate();
    const startDate = this.startDate();

    if (shorten) {
      return LOGIC_HELPERS.switchCase(displayDate, {
        startDate: momentjs(startDate).format("D MMM 'YY"),
        weekDay: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][weekDay],
        [DEFAULT]: '',
      });
    }

    switch (displayDate) {
      case 'startDate':
        return momentjs(startDate).format("MMM 'YY");
      case 'weekDay':
        return [
          'Sunday',
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
        ][weekDay];
      default:
        return '';
    }
  };

  renderProp = () => {
    const { children } = this.props;

    const displayDate = this.displayDate();

    if (!displayDate || displayDate === 'none') return null;

    const content = this.renderDefault();

    if (typeof children === 'function') {
      return children({ content });
    }

    return content;
  };

  renderFirstRow = () => {
    const displayDate = this.displayDate();
    const startDate = this.startDate();

    switch (displayDate) {
      case 'startDate':
        return momentjs(startDate).format('MMM');
      case 'weekDay':
        return 'Start';
      default:
        return 'Start';
    }
  };

  renderSecondRow = () => {
    const { weekDay } = this.props;

    const displayDate = this.displayDate();
    const startDate = this.startDate();

    switch (displayDate) {
      case 'startDate':
        return momentjs(startDate).format('D');
      case 'weekDay':
        return [
          'Sunday',
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
        ][weekDay];
      default:
        return '?';
    }
  };

  renderEvent = ({ timeToGo }) => ({ icon, onClick }) => {
    const { classes } = this.props;

    return (
      <div
        className={classnames(classes.countdownBlock, classes.countdownHover)}
        title="See event information"
      >
        <GridContainer alignItems="center" onClick={onClick}>
          <GridItem>{icon}</GridItem>
          <GridItem>{timeToGo}</GridItem>
        </GridContainer>
      </div>
    );
  };

  renderButtonContent = () => {
    const { classes, dense } = this.props;

    const displayDate = this.displayDate();

    return (
      <Fragment>
        <GridContainer direction="column">
          <GridItem>
            <GridContainer direction="column" spacing={0}>
              <GridItem>
                <div
                  className={classnames(
                    classes.calendarFirstRow,
                    LOGIC_HELPERS.ifElse(dense, classes.firstRowDense),
                    LOGIC_HELPERS.ifElse(
                      displayDate === 'none',
                      classes.firstRowNoDate,
                    ),
                  )}
                >
                  {this.renderFirstRow()}
                </div>
              </GridItem>
              <GridItem>
                <div
                  className={classnames(
                    classes.calendarSecondRow,
                    LOGIC_HELPERS.ifElse(
                      displayDate === 'none',
                      classes.secondRowNoDate,
                    ),
                    LOGIC_HELPERS.ifElse(
                      displayDate === 'weekDay',
                      classes.secondRowWeekDay,
                    ),
                    LOGIC_HELPERS.ifElse(dense, classes.secondRowDense),
                  )}
                >
                  {this.renderSecondRow()}
                </div>
              </GridItem>
            </GridContainer>
          </GridItem>
        </GridContainer>
      </Fragment>
    );
  };

  renderDayAgo = dayDiff => {
    if (dayDiff === 0) {
      return 'today';
    }
    if (dayDiff === 1) {
      return 'yesterday';
    }
    return `${dayDiff} days ago`;
  };

  renderCalendarButton = ({ openMenu }) => {
    const { editable } = this.props;

    const content = this.renderButtonContent();

    if (!editable) {
      return <div className={this.contentClassName()}>{content}</div>;
    }

    return (
      <Button
        dense
        noPadding
        size="extraSmall"
        color="black"
        variant={VARIANTS.BORDERLESS}
        className={this.contentClassName()}
        onClick={openMenu}
      >
        {content}
      </Button>
    );
  };

  renderCalendarMenu = ({ closeMenu }) => {
    const { classes } = this.props;

    const displayDate = this.displayDate();

    return (
      <GridContainer direction="column" wrap="nowrap">
        <GridItem>
          <MenuItem>Tour commencement date</MenuItem>
          <MenuItem button onClick={this.startPickDate}>
            Pick a date
          </MenuItem>
        </GridItem>
        <GridItem>
          <MenuItem>Or select a day of week</MenuItem>
          <div className={classes.dow}>
            <GridContainer alignItems="center" wrap="nowrap">
              <GridItem>
                <MenuItem
                  button
                  closeMenu={closeMenu}
                  onClick={this.handlePickWeekDay(0)}
                  className={classnames(classes.weekday, classes.weekend)}
                >
                  Sun
                </MenuItem>
              </GridItem>
              <GridItem>
                <MenuItem
                  button
                  closeMenu={closeMenu}
                  onClick={this.handlePickWeekDay(1)}
                  className={classes.weekday}
                >
                  Mon
                </MenuItem>
              </GridItem>
              <GridItem>
                <MenuItem
                  button
                  closeMenu={closeMenu}
                  onClick={this.handlePickWeekDay(2)}
                  className={classes.weekday}
                >
                  Tue
                </MenuItem>
              </GridItem>
              <GridItem>
                <MenuItem
                  button
                  closeMenu={closeMenu}
                  onClick={this.handlePickWeekDay(3)}
                  className={classes.weekday}
                >
                  Wed
                </MenuItem>
              </GridItem>
              <GridItem>
                <MenuItem
                  button
                  closeMenu={closeMenu}
                  onClick={this.handlePickWeekDay(4)}
                  className={classes.weekday}
                >
                  Thu
                </MenuItem>
              </GridItem>
              <GridItem>
                <MenuItem
                  button
                  closeMenu={closeMenu}
                  onClick={this.handlePickWeekDay(5)}
                  className={classes.weekday}
                >
                  Fri
                </MenuItem>
              </GridItem>
              <GridItem>
                <MenuItem
                  button
                  closeMenu={closeMenu}
                  onClick={this.handlePickWeekDay(6)}
                  className={classnames(classes.weekday, classes.weekend)}
                >
                  Sat
                </MenuItem>
              </GridItem>
            </GridContainer>
          </div>
        </GridItem>
        {displayDate !== 'none' && (
          <GridItem>
            <MenuItem
              button
              closeMenu={closeMenu}
              onClick={this.handleRemoveDate}
            >
              Unset date
            </MenuItem>
          </GridItem>
        )}
      </GridContainer>
    );
  };

  getPortalId = portalId => {
    if (portalId) this.setState({ portalId });
  };

  renderCalendarBadge = () => {
    const { component: Component, weekDay, editable, classes } = this.props;

    const displayDate = this.displayDate();
    const startDate = this.startDate();

    if (!editable && displayDate !== 'startDate' && displayDate !== 'weekDay') {
      return null;
    }

    return (
      <Component>
        <GridContainer
          direction="column"
          alignItems="center"
          wrap="nowrap"
          {...this.renderTitle()}
        >
          <GridItem>
            <Popper
              className={classes.popper}
              placement="bottom-start"
              renderButton={this.renderCalendarButton}
              value={`${editable}${displayDate}${startDate}${weekDay}`}
              onOpenPortal={this.getPortalId}
            >
              {this.renderCalendarMenu}
            </Popper>
          </GridItem>
        </GridContainer>

        <DatePicker
          ref={this.handlePickerRef}
          onChange={this.handlePickDate}
          value={startDate}
          defaultValue={null}
          TextFieldComponent={this.renderPickerTextField}
          leftArrowIcon={<Icon icon="arrow-left" />}
          rightArrowIcon={<Icon icon="arrow-right" />}
        />
      </Component>
    );
  };

  renderSmallBadge = () => {
    const {
      component: Component,
      displayDate,
      className,
      classes,
      startDate,
    } = this.props;

    if (!startDate || displayDate !== 'startDate') {
      return null;
    }

    return (
      <Component>
        <Tooltip
          title={`${momentjs(startDate).fromNow()} (${momentjs(
            startDate,
          ).format(FORMATS_DATE_TIME.DATE)})`}
          isLight
          enterDelay={700}
        >
          <GridContainer
            direction="column"
            alignItems="center"
            wrap="nowrap"
            className={className}
          >
            <GridItem>
              <div className={classes.rowOne}>
                {momentjs(startDate).format('MMM')}
              </div>
            </GridItem>
            <GridItem>
              <div className={classes.rowTwo}>
                {momentjs(startDate).format('D')}
              </div>
            </GridItem>
          </GridContainer>
        </Tooltip>
      </Component>
    );
  };

  renderSubtitle = () => {
    const {
      component,
      className,
      startDate,
      displayDate,
      duration,
    } = this.props;

    return (
      <Subtitle
        startDate={startDate}
        displayDate={displayDate}
        duration={duration}
        component={component}
        className={className}
      />
    );
  };

  renderPickerTextField = () => null;

  render = () => {
    const { variant, children } = this.props;

    if (typeof children === 'function') {
      return this.renderProp();
    }

    // pass in your custom variant if you need a different UI rendering
    return LOGIC_HELPERS.switchCase(variant, {
      [CALENDAR_BADGE]: this.renderCalendarBadge,
      [SMALL_BADGE]: this.renderSmallBadge,
      [SUB_TITLE]: this.renderSubtitle,
      [DEFAULT]: this.renderDefault,
    });
  };
}

StartDate.propTypes = {
  // hoc props
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  resaga: PropTypes.object.isRequired,

  // parent props
  id: PropTypes.number, // template id
  timelineId: PropTypes.number,
  children: PropTypes.func,
  variant: PropTypes.node,
  className: PropTypes.string,
  component: PropTypes.any,
  editable: PropTypes.bool,
  darkMode: PropTypes.bool,
  dense: PropTypes.bool,
  shorten: PropTypes.bool,

  // resaga props
  duration: PropTypes.number,
  firstEventId: PropTypes.number,
  startDate: PropTypes.string,
  status: PropTypes.string,
  displayDate: PropTypes.string,
  weekDay: PropTypes.number,
};

StartDate.defaultProps = {
  variant: '',
  className: '',

  startDate: '',
  component: 'span',
};

export default compose(
  withStyles(styles, { name: 'StartDate' }),
  withRouter,
  resaga(CONFIG),
)(StartDate);
