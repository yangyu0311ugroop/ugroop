import { EVENT_PATHS } from 'datastore/eventStore/constants';
import { EVENT_STORE_DATA_SELECTORS } from 'datastore/eventStore/selectors';
import get from 'lodash/get';

export const CONFIG = {
  value: {
    details: ({ id }) =>
      EVENT_STORE_DATA_SELECTORS.eventProp({
        id,
        path: EVENT_PATHS.activityDetails,
      }),
  },
};

export const CONFIG_2 = {
  value: {
    detailKeys: {
      keyPath: props => {
        const details = get(props, 'details', []);

        return details.map(id =>
          EVENT_STORE_DATA_SELECTORS.activityDetailProp({
            id,
            path: EVENT_PATHS.activityDetailKey,
          }),
        );
      },
      cacheKey: ({ details, targetKey, id }) =>
        `events.SelectActivityDetail.${
          details ? details.toString() : null
        }.detail.${id}.${targetKey}`,
      props: () => null,
      getter: (...value) => value,
    },
  },
};

export const CONFIG_3 = {
  value: {
    dataId: {
      getter: props => {
        const activityDetailKeys = get(props, 'detailKeys', []);
        const activityDetails = get(props, 'details', []);
        const targetKey = get(props, 'targetKey', '');
        const indexOfId = activityDetailKeys.indexOf(targetKey);

        if (indexOfId !== -1) return activityDetails[indexOfId];

        return 0;
      },
    },
  },
};
