import {
  NODE_STORE,
  TEMPLATE_MANAGEMENT_VIEWSTORE,
  FILE_DATA_STORE,
  ATTACHMENT_DATASTORE,
} from 'appConstants';
import { get } from 'lodash';
import {
  NODE_STORE_SELECTORS,
  NODE_VIEW_STORE_SELECTORS,
} from 'datastore/nodeStore/selectors';
import { ability } from 'apis/components/Ability/ability';
import { RESAGA_HELPERS } from 'utils/helpers/resaga';
import { ACTIVITY } from 'utils/modelConstants';

export const CONFIG = {
  value: {
    // data store
    title: NODE_STORE_SELECTORS.content,
    description: ({ id }) => NODE_STORE_SELECTORS.description({ id }),
    attachmentId: ({ id }) => NODE_STORE_SELECTORS.attachmentId({ id }),
    url: ({ id }) => NODE_STORE_SELECTORS.url({ id }),
    attachmentExist: {
      keyPath: [
        ({ id }) => [NODE_STORE, 'nodes', id, 'attachment'],
        [ATTACHMENT_DATASTORE, 'attachments'],
      ],
      getter: (id, attachments) => {
        if (!id) return false;

        const { fileSize, description } = get(attachments, `${id}`, {});
        return !!(fileSize || description);
      },
    },

    // view store
    editing: {
      keyPath: ({ id }) => [
        [TEMPLATE_MANAGEMENT_VIEWSTORE, 'editSections', id, 'id'],
        NODE_STORE_SELECTORS.createdBy,
      ],
      getter: (editing, createdBy, { isPublic }) => {
        const canUpdate = ability.can('update', { type: ACTIVITY, createdBy });
        if (!canUpdate || isPublic) return null;
        return editing;
      },
    },
    createdBy: NODE_STORE_SELECTORS.createdBy,
    editable: RESAGA_HELPERS.subscribeIfNotGiven(
      NODE_VIEW_STORE_SELECTORS.editable,
      'editable',
    ),
    location: NODE_STORE_SELECTORS.location,
    icon: NODE_STORE_SELECTORS.icon,
    placeId: NODE_STORE_SELECTORS.placeId,
    timeZoneId: NODE_STORE_SELECTORS.timeZoneId,
  },
  setValue: {
    photos: [FILE_DATA_STORE, 'files'],
    sections: [NODE_STORE, 'nodes'],
    editSections: [TEMPLATE_MANAGEMENT_VIEWSTORE, 'editSections'],
  },
};
