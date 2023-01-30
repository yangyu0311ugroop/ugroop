import { TEMPLATE_MANAGEMENT_VIEWSTORE } from 'appConstants';
import {
  NODE_STORE_SELECTORS,
  NODE_VIEW_STORE_SELECTORS,
} from 'datastore/nodeStore/selectors';
import { isEmptyString } from 'utils/stringAdditions';
import { FILE_STORE_SELECTORS } from 'datastore/fileStore/selectors';

export const CONFIG = {
  value: {
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
    fk: props => FILE_STORE_SELECTORS.selectFileId({ id: props.dayPhotoId }),
    checklists: props =>
      NODE_STORE_SELECTORS.parentChecklists({ parentNodeId: props.dayId }),
    showChecklists: ({ dayId }) =>
      NODE_STORE_SELECTORS.calculatedShowChecklists({ id: dayId }),
    editing: ({ dayId }) => NODE_STORE_SELECTORS.editing({ id: dayId }),
    editable: NODE_VIEW_STORE_SELECTORS.editable,
  },

  setValue: {
    selectDayId: [TEMPLATE_MANAGEMENT_VIEWSTORE, 'selectedId'],
    selectedActivityId: [TEMPLATE_MANAGEMENT_VIEWSTORE, 'selectedActivityId'],
    editDayId: [TEMPLATE_MANAGEMENT_VIEWSTORE, 'editDayId'],
    editDays: [TEMPLATE_MANAGEMENT_VIEWSTORE, 'editDays'],
    editing: ({ dayId }) => NODE_STORE_SELECTORS.editing({ id: dayId }),
  },
};
