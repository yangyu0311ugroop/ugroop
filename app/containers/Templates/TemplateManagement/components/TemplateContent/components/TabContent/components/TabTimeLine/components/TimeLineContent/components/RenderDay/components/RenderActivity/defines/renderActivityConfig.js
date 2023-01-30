import dotProp from 'dot-prop-immutable';
import { NODE_STORE, TEMPLATE_MANAGEMENT_VIEWSTORE } from 'appConstants';
import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
export const SECTIONS = 'sections';
export const CONFIG = {
  value: {
    photoId: {
      keyPath: [NODE_STORE, 'nodes'],
      getter: (data, props) =>
        dotProp.get(data, `${props.activityId}.photos.0`, 0),
    },
    attachmentId: ({ activityId }) =>
      NODE_STORE_SELECTORS.attachmentId({ id: activityId }),
    activityIds: {
      keyPath: [NODE_STORE, 'nodes'],
      getter: (data, props) => dotProp.get(data, `${props.dayId}.children`, []),
    },
    createdBy: ({ activityId }) =>
      NODE_STORE_SELECTORS.createdBy({ id: activityId }),
  },
  setValue: {
    selectedActivityId: [TEMPLATE_MANAGEMENT_VIEWSTORE, 'selectedActivityId'],
  },
};
