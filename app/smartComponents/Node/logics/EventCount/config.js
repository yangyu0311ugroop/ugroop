import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import { NODE_STORE_UTILS } from 'datastore/nodeStore/utils';
import { EVENT_GROUPINGS } from 'utils/constants/events';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { DEFAULT, EVENT_STORE } from 'appConstants';
import { compact } from 'lodash';
export const eventView = [
  'ITINERARY',
  'ACCOMMODATIONS',
  'ACTIVITIES',
  'FOOD',
  'TRANSPORTATION',
];

export const grouping = headerValue =>
  LOGIC_HELPERS.switchCase(headerValue, {
    ACCOMMODATIONS: EVENT_GROUPINGS.accommodationGrouping,
    TRANSPORTATION: EVENT_GROUPINGS.transportationGrouping,
    FOOD: EVENT_GROUPINGS.foodGrouping,
    ATTACHMENT: EVENT_GROUPINGS.allEvents,
    [DEFAULT]: EVENT_GROUPINGS.activityGrouping,
  });

export const CONFIG = {
  value: {
    eventValues: {
      keyPath: ({ ids }) =>
        ids.map(id => NODE_STORE_SELECTORS.calculatedEvents({ id })),
      cacheKey: ({ ids = [] }) =>
        `eventCount.eventValues.${ids.toString()}.overview.filter`,
      getter: (...values) => {
        values.pop();
        return values.map(value => value);
      },
    },
    sectionValues: {
      keyPath: ({ ids }) =>
        ids.map(id => NODE_STORE_SELECTORS.children({ id })),
      cacheKey: ({ ids = [] }) =>
        `eventCount.sectionValues.${ids.toString()}.overview.filter`,
      getter: (...values) => {
        values.pop();
        return values.map(value => value);
      },
    },
    eventNodeValues: {
      keyPath: ({ ids }) =>
        ids.map(id => NODE_STORE_SELECTORS.eventIds({ id })),
      cacheKey: ({ ids = [] }) =>
        `eventCount.eventNodeValues.${ids.toString()}.overview.filter`,
      getter: (...values) => {
        values.pop();
        return values.map(value => value);
      },
    },
    checklistValues: {
      keyPath: ({ ids }) =>
        ids.map(id => NODE_STORE_SELECTORS.checklists({ id })),
      cacheKey: ({ ids = [] }) =>
        `eventCount.checklistValues.${ids.toString()}.overview.filter`,
      getter: (...values) => {
        values.pop();
        return values.map(value => value);
      },
    },
    events: {
      getter: ({ eventValues = [] }) =>
        compact(eventValues).reduce((accu, curr) => [...accu, ...curr], []),
    },
    sectionIds: {
      getter: ({ sectionValues = [] }) =>
        compact(sectionValues).reduce((accu, curr) => [...accu, ...curr], []),
    },
    eventNodeIds: {
      getter: ({ eventNodeValues = [] }) =>
        compact(eventNodeValues).reduce((accu, curr) => [...accu, ...curr], []),
    },
    checklistIds: {
      getter: ({ checklistValues = [] }) =>
        compact(checklistValues).reduce((accu, curr) => [...accu, ...curr], []),
    },
  },
};
export const CONFIG1 = {
  value: {
    eventDataIds: {
      keyPath: ({ eventNodeIds }) =>
        eventNodeIds.map(id => NODE_STORE_SELECTORS.eventDataId({ id })),
      cacheKey: ({ eventNodeIds = [] }) =>
        `eventCount.eventDataIds.${eventNodeIds.toString()}.overview.filter`,
      getter: (...values) => {
        values.pop();
        return values.filter(value => !!value);
      },
    },
  },
};

export const CONFIG2 = {
  value: {
    sectionAttachment: {
      keyPath: ({ sectionIds }) =>
        sectionIds.map(id => NODE_STORE_SELECTORS.attachmentId({ id })),
      cacheKey: ({ sectionIds = [] }) =>
        `eventCount.sectionAttachments.${sectionIds.toString()}.overview.filter`,
      getter: (...values) => {
        values.pop();
        return values.filter(value => !!value);
      },
    },
    eventAttachment: {
      keyPath: ({ eventDataIds }) =>
        eventDataIds.map(id => [EVENT_STORE, 'events', id, 'eventAttachments']),
      getter: (...values) => {
        values.pop();
        return compact(values).reduce((accu, curr) => [...accu, ...curr], []);
      },
    },
  },
};

export const CONFIG3 = {
  value: {
    eventCounts: {
      getter: ({
        events = [],
        eventAttachment = [],
        sectionAttachment = [],
        checklistIds = [],
      }) => {
        const eventsData = eventView.reduce(
          (acc, curr) => ({
            ...acc,
            [curr]: events.filter(
              NODE_STORE_UTILS.calculatedEventsFilter({
                grouping: grouping(curr),
                hasTime: 'all',
              }),
            ).length,
          }),
          {},
        );
        return {
          ...eventsData,
          ATTACHMENT: compact(eventAttachment.concat(sectionAttachment)).length,
          checklist: checklistIds.length,
        };
      },
    },
  },
};
