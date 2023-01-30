import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { debounce } from 'lodash';
import MultiRef from 'react-multi-ref';
import { NODE_STORE_UTILS } from 'datastore/nodeStore/utils';
import EachEventData from './eachEventData';
import { MOMENT_HELPERS } from '../../../../utils/helpers/moment';
import ResetEventData from './resetEventData';
import ARRAY_HELPERS from '../../../../utils/helpers/arrays';
/**
 * Maintains a day's calculated events in the store.
 */
export class CollectEventData extends PureComponent {
  componentWillUnmount() {
    this.debouncedFetchData = null;
  }

  constructor(props) {
    super(props);
    this.items = new MultiRef();
  }

  // eslint-disable-next-line no-unused-vars
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (
      this.props.grouping &&
      prevProps.grouping.name !== this.props.grouping.name
    ) {
      this.collectData();
    }
    if (!ARRAY_HELPERS.isSame(this.props.eventIds, prevProps.eventIds)) {
      this.collectData();
    }
  }

  debouncedCollect = () => {
    if (!this.debouncedFetchData) {
      this.debouncedFetchData = debounce(this.collectData, 50);
    }
    // will debounce
    this.debouncedFetchData();
  };

  collectData = () => {
    if (this.items.map) {
      let allEvents = [];
      allEvents =
        this.props.eventIds &&
        this.props.eventIds.map(o => {
          const i = this.items.map.get(o);
          const {
            id,
            type,
            subType,
            mode,
            timeZoneId,
            value,
            position,
            real,
            dayCount,
            cancellation,
          } = i.props;

          return {
            id,
            type,
            subtype: subType,
            mode,
            timeZoneId,
            value,
            position,
            real,
            dayCount,
            cancellation,
          };
        });

      const d = allEvents.filter(
        NODE_STORE_UTILS.calculatedEventsFilter({
          grouping: this.props.grouping.obj,
          hasTime: this.props.hasTime,
          hideCancelled: this.props.hideCancelled,
          showType: this.props.showType,
        }),
      );

      const data = d.map(({ value, timeZoneId: tz, ...rest }) => ({
        value: MOMENT_HELPERS.setTimeZone(value, tz),
        ...rest,
      }));

      this.props.setEvents(data);
    }
  };

  render = () => {
    if (this.props.eventIds && this.props.eventIds.length > 0) {
      return this.props.eventIds.map(o => (
        <EachEventData
          key={o}
          ref={this.items.ref(o)}
          eid={o}
          id={this.props.id}
          collectData={this.debouncedCollect}
        />
      ));
    }
    return (
      <ResetEventData
        eventIds={this.props.eventIds}
        setEvents={this.props.setEvents}
      />
    );
  };
}
CollectEventData.propTypes = {
  id: PropTypes.number,
  eventIds: PropTypes.array, // eslint-disable-line react/no-unused-prop-types
  grouping: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  hasTime: PropTypes.string,
  showType: PropTypes.string,
  setEvents: PropTypes.func,
  hideCancelled: PropTypes.bool,
};

CollectEventData.defaultProps = {
  eventIds: null,
};

export default CollectEventData;
