import React from 'react';
import PropTypes from 'prop-types';
import { NODE_HAS_TIMES } from 'utils/constants/nodes';
import { EVENT_GROUPINGS } from 'utils/constants/events';
import CollectEventData from './collectEventData';
import ARRAY_HELPERS from '../../../../utils/helpers/arrays';
/**
 * Enables filtering of a day node's calculated events.
 */

const withEventsOnDay = ({
  outputProp = 'events',
  grouping = EVENT_GROUPINGS.allEvents,
  hasTime = NODE_HAS_TIMES.all,
  hideCancelled,
} = {}) => WrappedComponent => {
  class EventsOnDay extends React.Component {
    // eslint-disable-next-line no-unused-vars
    shouldComponentUpdate = (nextProps, nextState, nextContext) => {
      if (!ARRAY_HELPERS.isSame(nextProps.eventIds, this.props.eventIds)) {
        return true;
      }
      if (JSON.stringify(nextState) !== JSON.stringify(this.state)) {
        return true;
      }
      if (this.props.variant && this.props.variant !== nextProps.variant) {
        return true;
      }
      if (this.props.eventsWithTime !== nextProps.eventsWithTime) {
        return true;
      }
      if (this.props.activeId !== nextProps.activeId) {
        return true;
      }
      if (this.props.showType !== nextProps.showType) {
        return true;
      }
      if (this.props.editing !== nextProps.editing) {
        return true;
      }
      if (this.props.autoSelect !== nextProps.autoSelect) {
        return true;
      }
      return false;
    };

    constructor() {
      super();
      this.state = {
        events: [],
      };
    }

    setEvents = data => {
      this.setState({
        events: data,
      });
    };

    getOutputProp = () => this.props.outputProp || outputProp;

    getGrouping = () => this.props.grouping || grouping;

    render = () => {
      const { events, ...rest } = this.props;
      const props = {
        [this.getOutputProp()]: this.state.events,
        ...rest,
      };
      return (
        <>
          <CollectEventData
            id={this.props.id}
            eventIds={this.props.eventIds}
            grouping={this.getGrouping()}
            hasTime={hasTime}
            hideCancelled={hideCancelled}
            showType={this.props.showType}
            setEvents={this.setEvents}
          />
          <WrappedComponent {...props} />
        </>
      );
    };
  }

  EventsOnDay.propTypes = {
    // parent
    outputProp: PropTypes.string,

    // parent for hoc (note: defaultProps won't be passed to hoc)
    id: PropTypes.number,
    selectedId: PropTypes.number,
    activeId: PropTypes.number,
    grouping: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    hasTime: PropTypes.string,
    variant: PropTypes.string,
    showType: PropTypes.bool,
    editing: PropTypes.bool,
    autoSelect: PropTypes.bool,
    // resaga value
    events: PropTypes.array,
    eventIds: PropTypes.array,
    eventsWithTime: PropTypes.array,
  };

  EventsOnDay.defaultProps = {
    events: [],
    eventIds: [],
  };

  return EventsOnDay;
};

export default withEventsOnDay;
