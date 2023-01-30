import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import BigCalendar from '@ugr00p/react-big-calendar';
import moment from 'moment';
import arrayHelper from 'datastore/utils';
import { withStyles } from 'components/material-ui';
import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import IconButton from 'ugcomponents/Buttons/IconButton';
import Icon from 'ugcomponents/Icon';
import EventSubscribe from '../EventSubscribe';
import styles from './styles';
import EventView from './event';

export const EventPropGetter = () => ({
  style: {
    backgroundColor: 'transparent',
    padding: 0,
    cursor: 'initial',
  },
});

const components = {
  event: EventView, // used by each view (Month, Day, Week)
};

export class EventsTimeline extends React.PureComponent {
  constructor(props) {
    super(props);
    this.events = [];
    BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment));
  }

  state = {
    startingUp: true,
  };

  getEventIds = () => {
    const { singleDayEventIds, pinnedEventIds } = this.props;
    const map = (ids, func) => ids.map(event => ({ ...event, func }));
    return [
      ...map(pinnedEventIds, this.renderPinEventIcon),
      ...map(singleDayEventIds, this.renderEventIcon),
    ];
  };

  upInsertEvent = (event, forceUpdate) => {
    if (event) {
      const { id: dayId } = this.props;
      const { id, position, startTime, endTime, ...rest } = event;
      if (!startTime || !endTime) {
        this.events = arrayHelper.removeObjFromArray(this.events, {
          id,
          position,
        });
      } else {
        const eventObj = {
          id,
          dayId,
          position,
          start: startTime,
          end: endTime,
          showLabel: true,
          ...rest,
        };
        this.events = arrayHelper.upsertObjIntoArray(eventObj, this.events, {
          id,
          position,
        });
      }
    }
    if (forceUpdate) {
      if (this.state.startingUp) {
        this.setState({ startingUp: false });
      } else {
        this.forceUpdate();
      }
    }
  };

  upInsertPinEvent = (event, forceUpdate) => {
    if (event) {
      const { id: dayId } = this.props;
      const { id, position, startTime, endTime, ...rest } = event;
      if (!startTime || !endTime) {
        this.events = arrayHelper.removeObjFromArray(this.events, {
          id,
          position,
        });
      } else {
        const eventObj = {
          id,
          dayId,
          position,
          start: startTime,
          end: endTime,
          showLabel: false,
          enableOffset: true,
          showTriangle: true,
          ...rest,
        };
        this.events = arrayHelper.upsertObjIntoArray(eventObj, this.events, {
          id,
          position,
        });
      }
    }
    if (forceUpdate) {
      if (this.state.startingUp) {
        this.setState({ startingUp: false });
      } else {
        this.forceUpdate();
      }
    }
  };

  renderEventIcon = (id, position, index) => {
    const { startingUp } = this.state;
    return (
      <EventSubscribe
        key={`${id}.${position}`}
        index={index}
        id={id}
        position={position}
        updateParentEvents={this.upInsertEvent}
        renderSection="content"
        startingUp={startingUp}
      />
    );
  };

  renderPinEventIcon = (id, position, index) => {
    const { startingUp } = this.state;
    return (
      <EventSubscribe
        key={`${id}.${position}`}
        index={index}
        id={id}
        position={position}
        updateParentEvents={this.upInsertPinEvent}
        renderSection="ceiling"
        startingUp={startingUp}
      />
    );
  };

  renderCardsToggle = () => {
    const { classes, showCardsToggle, openCards, isCardOpen } = this.props;
    return (
      <div className={classes.btnPlacement}>
        {showCardsToggle && (
          <IconButton
            onClick={openCards}
            tooltip={isCardOpen ? 'Close' : 'Open'}
            className={classes.btn}
            disableTriggerFocus
          >
            <Icon icon={isCardOpen ? 'lnr-chevron-up' : 'lnr-chevron-down'} />
          </IconButton>
        )}
      </div>
    );
  };

  renderTimeline = () => {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <BigCalendar
          views={[BigCalendar.Views.SINGLE_DAY]}
          defaultView={BigCalendar.Views.SINGLE_DAY}
          events={this.events}
          toolbar={false}
          eventPropGetter={EventPropGetter}
          components={components}
        />
        <div className={classes.timeline} />
      </React.Fragment>
    );
  };

  renderTimeZone = () => {
    const { classes, timeZone } = this.props;
    return !!timeZone && <div className={classes.timeZone}>{timeZone}</div>;
  };

  renderEventIcons = ids =>
    ids.map(({ id, position, func }, index) =>
      func(id, position, ids.length - index - 1),
    );

  render = () => {
    const { classes } = this.props;
    return (
      <GridItem className={classes.root}>
        <GridContainer spacing={0}>
          <GridItem>{this.renderCardsToggle()}</GridItem>
          <GridItem className={classes.grow}>
            {this.renderTimeline()}
            {this.renderTimeZone()}
            {this.renderEventIcons(this.getEventIds())}
          </GridItem>
        </GridContainer>
      </GridItem>
    );
  };
}

EventsTimeline.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,

  // parent props
  id: PropTypes.number,
  singleDayEventIds: PropTypes.array,
  pinnedEventIds: PropTypes.array,
  timeZone: PropTypes.string,
  showCardsToggle: PropTypes.bool,
  openCards: PropTypes.func,
  isCardOpen: PropTypes.bool,
};

EventsTimeline.defaultProps = {
  id: 0,
  singleDayEventIds: [],
  pinnedEventIds: [],
  timeZone: null,
  showCardsToggle: false,
};

export default compose(withStyles(styles, { name: 'EventsTimeline' }))(
  EventsTimeline,
);
