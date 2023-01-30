import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import sortBy from 'lodash/sortBy';
import { EVENT_GROUPINGS } from 'utils/constants/events';
import { NODE_HAS_TIMES } from 'utils/constants/nodes';
import { MOMENT_HELPERS } from 'utils/helpers/moment';
import { withEventsOnDay } from 'smartComponents/Node/hoc';
import EventsTimeline from '../EventsTimeline';

export class EventsTimelines extends React.PureComponent {
  splitEventIdsByTimeZone = () => {
    const { eventsWithTime, pinnedEvents } = this.props;

    const ids = [];

    const add = key => ({ id, position, value }) => {
      if (value) {
        const tz = MOMENT_HELPERS.renderZone(value);
        const tzOffset = MOMENT_HELPERS.renderZoneOffset(value);
        let tzIds = ids.find(({ tzOffset: t }) => t === tzOffset);
        if (!tzIds) {
          tzIds = {
            tz,
            tzOffset,
            singleDayEventIds: [],
            pinnedEventIds: [],
          };
          ids.push(tzIds);
        }
        tzIds[key].push({ id, position, value: value.toISOString() });
      }
    };

    eventsWithTime.forEach(add('singleDayEventIds'));
    pinnedEvents.forEach(add('pinnedEventIds'));

    if (ids.length) {
      // Sort by first event
      return sortBy(
        ids,
        ({ singleDayEventIds: sIds, pinnedEventIds: pIds }) => {
          if (sIds.length && pIds.length) {
            return sortBy([sIds[0], pIds[0]], ({ value }) => value)[0].value;
          }
          return sIds.length ? sIds[0].value : pIds[0].value;
        },
      );
    }
    return [
      {
        tz: '',
        tzOffset: '',
        singleDayEventIds: [],
        pinnedEventIds: [],
      },
    ];
  };

  render = () =>
    this.splitEventIdsByTimeZone().map(({ tz, tzOffset, ...rest2 }, index) => (
      <EventsTimeline
        key={tzOffset}
        timeZone={tz}
        showCardsToggle={!index}
        {...rest2}
        {...this.props}
      />
    ));
}

EventsTimelines.propTypes = {
  // hoc
  eventsWithTime: PropTypes.array,
  pinnedEvents: PropTypes.array,

  // parent
  id: PropTypes.number,
};

EventsTimelines.defaultProps = {
  id: null,
};

export default compose(
  withEventsOnDay({
    outputProp: 'eventsWithTime',
    grouping: EVENT_GROUPINGS.singleDayEvents,
    hasTime: NODE_HAS_TIMES.withTime,
    hideCancelled: true,
  }),
  withEventsOnDay({
    outputProp: 'pinnedEvents',
    grouping: EVENT_GROUPINGS.pinnedEvents,
    hasTime: NODE_HAS_TIMES.withTime,
    hideCancelled: true,
  }),
)(EventsTimelines);
