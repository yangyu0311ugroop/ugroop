/**
 * Created by stephenkarpinskyj on 16/3/18.
 */

import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import { RENDER_PROP } from 'appConstants';
import classnames from 'classnames';
import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import { PORTAL_HELPERS } from 'containers/Portal/helpers';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import Measure from 'react-measure';
import { compose } from 'redux';
import resaga from 'resaga';
import {
  EventBookingConfirmed,
  EventDuration,
  EventTime,
} from 'smartComponents/Event/components/Event/parts';
import ViewEventCard from 'smartComponents/Node/types/Event/components/ViewEvent';
import {
  EVENT_CONSTANTS,
  UNKNOWN_EVENT_SUBTYPE,
  UNKNOWN_EVENT_TYPE,
} from 'utils/constants/events';
import { EVENT_UTILS } from 'utils/events';
import { EVENT_HELPERS } from 'utils/helpers/events';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { EventIcon } from 'viewComponents/Event';
import { EVENT_ICON_CUT_POINT } from '../../../../constants';
import style from '../style';
import { CONFIG, CONFIG_EVENT_DATA } from './config';
import { EVENT_ICON_HELPERS } from './helpers';

export class UGEventTooltipIconButton extends PureComponent {
  state = {
    tooltipOpen: false,
    tooltipContentHover: false,
    dimensions: {
      width: -1,
    },
  };

  componentDidMount = () => {
    const { classes, popperClass } = this.props;
    this.tooltipClasses = {
      tooltip: classnames(classes.tooltip),
      popper: classnames(classes.popper, popperClass),
    };
  };

  getButtonSize = () => {
    const { size } = this.props;
    switch (size) {
      case 'xs': {
        return 'buttonXSmall';
      }
      default:
        return 'buttonSmall';
    }
  };

  getIconSize = (type, subtype) => {
    const { size } = this.props;

    switch (size) {
      case 'xs':
        return 'extraSmall';
      case 'small':
        return 'small';
      default:
        return LOGIC_HELPERS.ifElse(
          EVENT_ICON_HELPERS.showSubIconFn(type, subtype, this.props),
          'small',
          'medium',
        );
    }
  };

  getTriangleClass = (triangle, classes, type, subtype, outline) => {
    if (triangle) {
      if (outline) {
        return classnames(
          classes.triangleBorder,
          classes[
            EVENT_HELPERS.getEventSubtypeClassBorderColorName(type, subtype)
          ],
        );
      }
      return classnames(
        classes.triangle,
        classes[
          EVENT_HELPERS.getEventSubtypeClassSolidColorName(type, subtype)
        ],
      );
    }
    return classes.noTriangleStyle;
  };

  getSublabelComponent = () => {
    const { position, event } = this.props;
    switch (EVENT_UTILS.getSublabelType(event.type, position)) {
      case EVENT_CONSTANTS.SUBLABEL_TYPES.time:
        return EventTime;

      case EVENT_CONSTANTS.SUBLABEL_TYPES.duration:
        return EventDuration;

      default:
        return null;
    }
  };

  isCircleIcon = () => false; // no different shape
  // isCircleIcon = (type, subtype, showLabel) =>
  // !showLabel &&
  // (type === EVENT_CONSTANTS.EVENTS.ACCOMMODATION.type ||
  //   subtype === EVENT_CONSTANTS.TRANSPORTATIONS.FLIGHT.type ||
  //   subtype === EVENT_CONSTANTS.TRANSPORTATIONS.VEHICLE_HIRE.type ||
  //   subtype === EVENT_CONSTANTS.TRANSPORTATIONS.COACH.type ||
  //   subtype === EVENT_CONSTANTS.TRANSPORTATIONS.BUS.type ||
  //   subtype === EVENT_CONSTANTS.TRANSPORTATIONS.SHIP.type ||
  //   subtype === EVENT_CONSTANTS.TRANSPORTATIONS.BOAT.type ||
  //   subtype === EVENT_CONSTANTS.TRANSPORTATIONS.FERRY.type ||
  //   subtype === EVENT_CONSTANTS.TRANSPORTATIONS.TRAIN.type ||
  //   subtype === EVENT_CONSTANTS.TRANSPORTATIONS.TRAM.type);

  isCheckOut = () => false; // no different shape
  // isCheckOut = (type, position) =>
  // type === EVENT_CONSTANTS.EVENTS.ACCOMMODATION.type &&
  // position === NODE_CONSTANTS.POSITIONS.end;

  isLanding = () => false; // no different shape
  // isLanding = (type, subtype, position) =>
  // type === EVENT_CONSTANTS.EVENTS.TRANSPORTATION.type &&
  // subtype === EVENT_CONSTANTS.TRANSPORTATIONS.FLIGHT.type &&
  // position === NODE_CONSTANTS.POSITIONS.end;

  isDropoff = () => false; // no different shape
  // isDropoff = (type, subtype, position) =>
  // type === EVENT_CONSTANTS.EVENTS.TRANSPORTATION.type &&
  // position === NODE_CONSTANTS.POSITIONS.end;

  handleIconButtonClick = e => {
    this.closeTooltip();
    e.preventDefault();
    return this.openViewDialog();
  };

  handleEventView = e => {
    this.closeTooltip();
    e.preventDefault();
    this.openViewDialog();
  };

  handleTooltipOpen = () => this.setState({ tooltipOpen: true });

  handleTooltipClose = () => this.setState({ tooltipOpen: false });

  handleTooltipContentMouseEnter = () =>
    this.setState({ tooltipContentHover: true });

  handleTooltipContentMouseLeave = () =>
    this.setState({ tooltipContentHover: false });

  handleButtonEnter = () => {
    this.props.resaga.setValue({ active: true });
  };

  handleButtonLeave = () => {
    this.props.resaga.setValue({ active: false });
  };

  openViewDialog = () => {
    const { id, dayId } = this.props;

    return PORTAL_HELPERS.openViewEvent(
      {
        id,
        dayId,
      },
      this.props,
    );
    //
    // this.props.resaga.setValue({
    //   eventView: EVENT_STORE_HELPERS.setEventView(true, id),
    // });
  };

  closeTooltip = () => {
    this.setState({ tooltipOpen: false, tooltipContentHover: false });
  };

  resize = contentRect => {
    this.setState({ dimensions: contentRect.bounds });
  };

  renderPart = (Component, props = {}) => {
    const { id, dataId } = this.props;
    return (
      !!Component && (
        <Component
          id={id}
          dataId={dataId}
          variant={EVENT_CONSTANTS.VARIANTS.labelValue}
          {...props}
        />
      )
    );
  };

  renderBookingConfirmed = hover => {
    const { classes, showTick, event } = this.props;

    const { type = UNKNOWN_EVENT_TYPE.type, detail } = event;
    const { type: subtype = UNKNOWN_EVENT_SUBTYPE.type } = detail || {};

    return (
      showTick &&
      this.renderPart(EventBookingConfirmed, {
        variant: EVENT_CONSTANTS.VARIANTS.icon,
        className: classnames(
          classes[EVENT_HELPERS.getEventSubtypeClassName(type, subtype)],
          LOGIC_HELPERS.ifElse(
            hover,
            classnames(
              classes[`${type}.confirmedHover`],
              classes[`${subtype}.confirmedHover`],
            ),
            classes.confirmed,
          ),
        ),
      })
    );
  };

  renderEventIcon = (type, subtype, position, iconOverride) => {
    const { showSubIcon } = this.props;

    return (
      <EventIcon
        type={type}
        subtype={subtype}
        position={position}
        iconOverride={iconOverride}
        size={this.getIconSize(type, subtype)}
        showSubIcon={showSubIcon}
        color="inherit"
      />
    );
  };

  renderButton = (event, dragging, position) => ({ measureRef }) => {
    const {
      classes,
      id,
      dataId,
      showLabel,
      showTriangle,
      enableOffset,
      active: hover,
      isClickable,
      showButton,
    } = this.props;
    const { width } = this.state.dimensions;
    // const hover = false;
    const { type = UNKNOWN_EVENT_TYPE.type, detail, name: eventName } = event;
    const { type: subtype = UNKNOWN_EVENT_SUBTYPE.type, iconOverride } =
      detail || {};
    // TODO: Handle outline more generically
    const checkOut = this.isCheckOut(type, position);
    const landing = this.isLanding(type, subtype, position);
    const dropoff = this.isDropoff(type, subtype, position);
    const outline = checkOut || landing || dropoff;
    const tooltipId = `${id}.eventIconTooltip`;
    const className = classnames({
      [classes.button]: true,
      [classes.buttonHover]: hover,
      [classes.buttonSmall]: true,
      [classes.buttonSmallHover]: hover,
      [classes[this.getButtonSize()]]: true,
      [classes[EVENT_HELPERS.getEventSubtypeClassName(type, subtype)]]: true,
      [classes[
        EVENT_HELPERS.getEventSubtypeHoverClassName(type, subtype)
      ]]: hover,
      [classes.circle]: this.isCircleIcon(type, subtype, showLabel),
      [classes.checkOut]: checkOut,
      [classes.landing]: landing,
      [classes[`${subtype.toLowerCase()}Dropoff`]]: dropoff,
      [classes.buttonDragging]: dragging,
      [classes.buttonWithLabel]: showLabel,
      [classes.buttonLeftSideOffset]: enableOffset,
      [classes.notClickable]: !isClickable,
      [classes.showButton]: showButton,
    });
    const eventLabel = width > EVENT_ICON_CUT_POINT && (
      <label htmlFor={dataId} className={classes.eventLabel}>
        {eventName}
      </label>
    );

    const onClick = LOGIC_HELPERS.ifElse(
      isClickable,
      this.handleIconButtonClick,
      null,
    );

    return (
      <div ref={measureRef}>
        <IconButton
          className={className}
          key={tooltipId}
          onClick={onClick}
          onMouseEnter={this.handleButtonEnter}
          onMouseLeave={this.handleButtonLeave}
          disableRipple
        >
          <div
            className={this.getTriangleClass(
              showTriangle,
              classes,
              type,
              subtype,
              outline,
            )}
          >
            {this.renderEventIcon(type, subtype, position, iconOverride)}
            {showLabel ? eventLabel : ''}
            {this.renderBookingConfirmed(hover)}
          </div>
        </IconButton>
      </div>
    );
  };

  renderTooltipContent = id => <ViewEventCard id={id} tooltip action="view" />;
  // (
  //   <TooltipContent
  //     id={id}
  //     dataId={dataId}
  //     position={position}
  //     onView={this.handleEventView}
  //     onMouseEnter={this.handleTooltipContentMouseEnter}
  //     onMouseLeave={this.handleTooltipContentMouseLeave}
  //     attachmentOnly={this.props.attachmentOnly}
  //   />
  // );

  renderIconButton = (event, dragging, position) => (
    <div>
      <Measure bounds onResize={this.resize}>
        {this.renderButton(event, dragging, position)}
      </Measure>
    </div>
  );

  renderTooltipButton = () => {
    const {
      id,
      dataId,
      position,
      tooltipPlacement,
      dragging,
      event,
      hideTooltip,
    } = this.props;
    const { tooltipOpen, tooltipContentHover } = this.state;

    const iconButton = this.renderIconButton(event, dragging, position);

    if (hideTooltip) {
      return iconButton;
    }

    return (
      <Tooltip
        interactive
        open={tooltipOpen || tooltipContentHover}
        onOpen={this.handleTooltipOpen}
        onClose={this.handleTooltipClose}
        placement={tooltipPlacement}
        enterDelay={400}
        leaveDelay={100}
        title={this.renderTooltipContent(id, dataId, position)}
        classes={this.tooltipClasses}
        disableFocusListener
      >
        {iconButton}
      </Tooltip>
    );
  };

  renderSublabel = () => {
    const { position } = this.props;
    return this.renderPart(this.getSublabelComponent(), { position });
  };

  renderProp = () => {
    const { event, renderEvent } = this.props;

    if (!event) return null;

    const { type = UNKNOWN_EVENT_TYPE.type, detail } = event;
    const { type: subtype = UNKNOWN_EVENT_SUBTYPE.type, iconOverride } =
      detail || {};

    const icon = this.renderEventIcon(type, subtype, null, iconOverride);

    return renderEvent({ icon, onClick: this.handleIconButtonClick });
  };

  render = () => {
    const { event, showSublabel, variant } = this.props;

    if (variant === RENDER_PROP) {
      return this.renderProp();
    }

    return (
      !!event &&
      (showSublabel ? (
        <GridContainer direction="column" spacing={0} alignItems="center">
          <GridItem>{this.renderTooltipButton()}</GridItem>
          <GridItem>{this.renderSublabel()}</GridItem>
        </GridContainer>
      ) : (
        this.renderTooltipButton()
      ))
    );
  };
}

UGEventTooltipIconButton.propTypes = {
  // hoc
  resaga: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,

  // parent
  id: PropTypes.number.isRequired,
  variant: PropTypes.string,
  position: PropTypes.string,
  tooltipPlacement: PropTypes.string,
  dragging: PropTypes.bool,
  popperClass: PropTypes.string,
  size: PropTypes.string,
  showLabel: PropTypes.bool,
  showTick: PropTypes.bool,
  showTriangle: PropTypes.bool,
  enableOffset: PropTypes.bool,
  showSublabel: PropTypes.bool,
  renderEvent: PropTypes.func,
  isClickable: PropTypes.bool,
  showSubIcon: PropTypes.bool,
  showButton: PropTypes.bool,
  hideTooltip: PropTypes.bool,
  showSublabelMiddle: PropTypes.bool,
  templateId: PropTypes.number,
  dayId: PropTypes.number,
  attachmentOnly: PropTypes.bool,

  // resaga value
  dataId: PropTypes.number,
  active: PropTypes.bool,
  event: PropTypes.object,
};

UGEventTooltipIconButton.defaultProps = {
  position: null,
  tooltipPlacement: 'bottom',
  dragging: false,
  popperClass: '',
  size: 'small',
  showLabel: false,
  showTick: true,
  showTriangle: false,
  enableOffset: false,
  showSublabel: false,
  isClickable: true,

  dataId: 0,
  active: false,
  event: null,
  attachmentOnly: false,
};

export default compose(
  withStyles(style, { name: 'UGEventTooltipIconButton' }),
  resaga(CONFIG),
  resaga(CONFIG_EVENT_DATA),
)(UGEventTooltipIconButton);
