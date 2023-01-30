import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { debounce, keyBy } from 'lodash';
import { compose } from 'redux';
import resaga from 'resaga';
import MultiRef from 'react-multi-ref';
import { NODE_STORE_UTILS } from 'datastore/nodeStore/utils';
import { CONFIG_1 } from './config';
import CollectEvent from './collectEventTime';
import ARRAY_HELPERS from '../../../../../../utils/helpers/arrays';
/**
 * Maintains a day's calculated events in the store.
 */
export class CalculatedEvents extends Component {
  // eslint-disable-next-line no-unused-vars
  shouldComponentUpdate(nextProps, nextState, nextContext) {
    if (!ARRAY_HELPERS.isSame(nextProps.events, this.props.events)) {
      return true;
    }
    if (!ARRAY_HELPERS.isSame(nextProps.eids, this.props.eids)) {
      return true;
    }
    if (JSON.stringify(nextState) !== JSON.stringify(this.state)) {
      return true;
    }
    if (this.props.templateId !== nextProps.templateId) {
      return true;
    }
    if (this.props.id !== nextProps.id) {
      return true;
    }
    if (this.props.startTimeValue !== nextProps.startTimeValue) {
      return true;
    }
    return false;
  }

  componentWillUnmount() {
    this.debouncedFetchData = null;
  }

  constructor(props) {
    super(props);
    this.items = new MultiRef();
  }

  debouncedCollect = () => {
    if (!this.debouncedFetchData) {
      this.debouncedFetchData = debounce(this.collectData, 100);
    }
    // will debounce
    this.debouncedFetchData();
  };

  collectData = () => {
    if (this.items.map) {
      const allEvents = [];
      this.items.map.forEach(i => {
        const {
          id,
          startValue,
          startMode,
          startTimeZone,
          startTimeReal,
          endValue,
          endMode,
          endTimeZone,
          endTimeReal,
          eventDataId,
          eventType,
          eventSubType,
          cancellation,
        } = i.props;

        allEvents.push({
          id,
          start: {
            value: startValue,
            mode: startMode,
            timeZoneId: startTimeZone,
            real: startTimeReal,
          },
          end: {
            value: endValue,
            mode: endMode,
            timeZoneId: endTimeZone,
            real: endTimeReal,
          },
          dataId: eventDataId,
          subtype: eventSubType,
          type: eventType,
          cancellation,
        });
      });
      const data = NODE_STORE_UTILS.filterAndSortByTime({
        date: this.props.startTimeValue,
        events: allEvents,
      });

      const eventIds = data.map(o => `${o.id}${o.value}${o.position}`);
      const eobjs = keyBy(data, o => `${o.id}${o.value}${o.position}`);
      // this.props.resaga.setValue({
      //   events: data,
      // });

      // eventIds doesn't change when cancellation changed, can't rely on updating only when eventIds changed
      // if (!ARRAY_HELPERS.isSame(eventIds, this.props.eids))
      this.props.resaga.setValue({
        eventIds,
        eventObjects: eobjs,
      });
    }
  };

  render = () => {
    if (this.props.events && this.props.events.length > 0) {
      return this.props.events.map(o => (
        <CollectEvent
          key={o}
          ref={this.items.ref(o)}
          id={o}
          collectData={this.debouncedCollect}
        />
      ));
    }
    return null;
  };
}
CalculatedEvents.propTypes = {
  // parent for hoc (note: defaultProps won't be passed to hoc)
  templateId: PropTypes.number, // eslint-disable-line react/no-unused-prop-types
  id: PropTypes.number, // eslint-disable-line react/no-unused-prop-types
  resaga: PropTypes.object,
  events: PropTypes.array,
  startTimeValue: PropTypes.string,
  eids: PropTypes.array,
};

CalculatedEvents.defaultProps = {
  templateId: null,
  id: null,
  eids: [],
};

export default compose(resaga(CONFIG_1))(CalculatedEvents);
