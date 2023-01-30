import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import _ from 'lodash';
import { EVENT_STORE } from 'appConstants';

export const CONFIG = {
  value: {
    sectionIds: NODE_STORE_SELECTORS.children,
    eventObjIds: {
      getter: ({ events = [] }) => events.map(event => event.id),
    },
  },
};

export const CONFIG2 = {
  value: {
    values: {
      keyPath: ({ sectionIds }) =>
        sectionIds.map(id => NODE_STORE_SELECTORS.attachmentId({ id })),
      getter: (...values) => {
        values.pop();
        return values.map(value => value);
      },
    },
    attachmentIds: {
      getter: ({ values }) => _.uniq(_.compact(values)),
    },
    eventDataIds: NODE_STORE_SELECTORS.eventDataIds({
      idsProp: 'eventObjIds',
    }),
  },
};

export const CONFIG3 = {
  value: {
    eventValues: {
      keyPath: ({ eventDataIds }) =>
        eventDataIds.map(id => [EVENT_STORE, 'events', id, 'eventAttachments']),
      cacheKey: ({ eventDataIds = [] }) =>
        `events.eventAttachmentCount.${eventDataIds.toString()}.overview.filter`,
      getter: (...values) => {
        values.pop();
        return values.map(value => value);
      },
    },
    eventAttachmentsIds: {
      getter: ({ eventValues }) => {
        const val = eventValues.reduce((accu, curr) => {
          if (curr && curr.length > 0) {
            return [...accu, ...curr];
          }
          return [...accu];
        }, []);
        return _.uniq(_.compact(val));
      },
    },
  },
};

export const CONFIG4 = {
  value: {
    eventIds: NODE_STORE_SELECTORS.calculatedEventIds,
  },
};
