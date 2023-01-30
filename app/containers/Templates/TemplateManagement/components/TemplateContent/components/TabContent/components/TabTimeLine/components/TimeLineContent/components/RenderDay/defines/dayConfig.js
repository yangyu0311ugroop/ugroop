import { isEmptyString } from 'utils/stringAdditions';
import { TEMPLATE_MANAGEMENT_VIEWSTORE } from 'appConstants';
import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
export const CONFIG = {
  value: {
    activityIds: ({ dayId }) => NODE_STORE_SELECTORS.children({ id: dayId }),
    photoId: ({ dayId }) => NODE_STORE_SELECTORS.photoId({ id: dayId }),
    editing: ({ dayId }) => NODE_STORE_SELECTORS.editing({ id: dayId }),
    content: {
      keyPath: [
        ({ dayId: id }) => NODE_STORE_SELECTORS.content({ id }),
        ({ dayId: id }) => NODE_STORE_SELECTORS.children({ id }),
        ({ dayId: id }) => NODE_STORE_SELECTORS.description({ id }),
        ({ dayId: id }) => NODE_STORE_SELECTORS.url({ id }),
      ],
      props: null,
      getter: (content, storeChildren, description, url) => {
        let hasContent = true;
        const children = storeChildren || [];
        if (
          isEmptyString(content) &&
          isEmptyString(description) &&
          isEmptyString(url) &&
          children.length === 0
        ) {
          hasContent = false;
        }
        return { hasContent, content, description, url };
      },
      spreadObject: true,
    },
    selectActivityId: [TEMPLATE_MANAGEMENT_VIEWSTORE, 'selectedActivityId'],
  },
  setValue: {
    editing: ({ dayId }) => NODE_STORE_SELECTORS.editing({ id: dayId }),
  },
};
