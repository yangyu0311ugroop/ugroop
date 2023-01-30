import { CREATED_AT, CREATED_BY } from 'appConstants';
import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import { DATA_HELPERS } from 'datastore/utils';
import momentjs from 'moment';

// select start time value
const createdAt = id => NODE_STORE_SELECTORS.createdAt({ id });
const createdBy = id => NODE_STORE_SELECTORS.createdBy({ id });
const getSelector = groupBy => {
  switch (groupBy) {
    case CREATED_AT:
      return helpers.createdAt;
    case CREATED_BY:
      return helpers.createdBy;
    default:
      return helpers.createdBy;
  }
};

const selectProp = key => ({ [key]: value }) => value;

const reduceGroup = groupBy => ({ groupIds, groupData }, [groupId, id]) => {
  let group = groupId;
  if (groupBy === CREATED_AT) {
    group = momentjs(groupId)
      .hour(0)
      .minute(0)
      .second(0)
      .millisecond(0)
      .toISOString();
  }

  return {
    groupIds: DATA_HELPERS.arrayAdd(group)(groupIds),
    groupData: {
      ...groupData,
      [group]: DATA_HELPERS.arrayAdd(id)(groupData[group]),
    },
  };
};

export const helpers = {
  createdAt,
  createdBy,
  selectProp,
  getSelector,
  reduceGroup,
};

export const ALL_VALUES = {
  value: {
    values: {
      cacheKey: ({ ids, groupBy }) => `${ids.toString()}.groupBy.${groupBy}`,
      keyPath: ({ ids, groupBy }) => ids.map(helpers.getSelector(groupBy)),
      props: [helpers.selectProp('ids'), helpers.selectProp('groupBy')],
      getter: (...values) => {
        const groupBy = values.pop();
        const ids = values.pop();

        // make array of [value, id]
        const groups = values.map((value, index) => [value, ids[index]]);

        return groups.reduce(helpers.reduceGroup(groupBy), {
          groupIds: [],
          groupData: {},
        });
      },
    },
  },
};
