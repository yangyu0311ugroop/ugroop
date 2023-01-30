import {
  TEMPLATE_MANAGEMENT_DATASTORE,
  NODE_STORE,
  FILE_DATA_STORE,
} from 'appConstants';
import { PUB_TAB_CONTENT } from '../../../../config';

export const CONFIG = {
  value: {
    days: {
      keyPath: [[NODE_STORE, 'nodes'], [FILE_DATA_STORE, 'files']],
      getter: (days, photos, props) =>
        Array.isArray(props.daysId)
          ? props.daysId.map(dayId => {
              if (days) {
                const dayObject = days[dayId];
                if (dayObject.photos.length > 0) {
                  return { ...dayObject, photos: photos[dayObject.photos[0]] };
                }
                return { ...dayObject, photos: null };
              }
              return { id: dayId };
            })
          : [],
    },
    templateDate: {
      keyPath: [[TEMPLATE_MANAGEMENT_DATASTORE, 'id'], [NODE_STORE, 'nodes']],
      getter: (id, template) => (id ? template[id].customData.startDate : ''),
    },
  },
  setValue: {
    currentQueryDayId: [PUB_TAB_CONTENT, 'currentQueryDayId'],
  },
};
