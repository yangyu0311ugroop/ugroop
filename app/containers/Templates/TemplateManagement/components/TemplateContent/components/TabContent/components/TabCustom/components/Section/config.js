import {
  ATTACHMENT_DATASTORE,
  TEMPLATE_MANAGEMENT_VIEWSTORE,
} from 'appConstants';
import { keys } from 'lodash';
import {
  NODE_STORE_SELECTORS,
  NODE_VIEW_STORE_SELECTORS,
} from 'datastore/nodeStore/selectors';
import { ability } from 'apis/components/Ability/ability';
import { RESAGA_HELPERS } from 'utils/helpers/resaga';
import { ACTIVITY } from 'utils/modelConstants';

export const CONFIG = {
  value: {
    selectedId: [TEMPLATE_MANAGEMENT_VIEWSTORE, 'selectedId'],
    exist: ({ id }) => NODE_STORE_SELECTORS.id({ id }),
    attachmentId: ({ id }) => NODE_STORE_SELECTORS.attachmentId({ id }),
    photoId: ({ id }) => NODE_STORE_SELECTORS.photoId({ id }),

    // dirty data
    dirty: {
      keyPath: ({ id }) => [TEMPLATE_MANAGEMENT_VIEWSTORE, 'editSections', id],
      getter: section => keys(section).length > 1,
    },
    editLocation: ({ id }) => [
      TEMPLATE_MANAGEMENT_VIEWSTORE,
      'editSections',
      id,
      'editLocation',
    ],
    icon: ({ id }) => [
      TEMPLATE_MANAGEMENT_VIEWSTORE,
      'editSections',
      id,
      'icon',
    ],
    placeId: ({ id }) => [
      TEMPLATE_MANAGEMENT_VIEWSTORE,
      'editSections',
      id,
      'placeId',
    ],
    timeZoneId: ({ id }) => [
      TEMPLATE_MANAGEMENT_VIEWSTORE,
      'editSections',
      id,
      'timeZoneId',
    ],
    description: ({ id }) => [
      TEMPLATE_MANAGEMENT_VIEWSTORE,
      'editSections',
      id,
      'description',
    ],
    url: ({ id }) => [TEMPLATE_MANAGEMENT_VIEWSTORE, 'editSections', id, 'url'],
    photo: ({ id }) => [
      TEMPLATE_MANAGEMENT_VIEWSTORE,
      'editSections',
      id,
      'photo',
    ],
    attachment: ({ id }) => [
      TEMPLATE_MANAGEMENT_VIEWSTORE,
      'editSections',
      id,
      'attachment',
    ],
    attachmentDescription: ({ id }) => [
      TEMPLATE_MANAGEMENT_VIEWSTORE,
      'editSections',
      id,
      'attachmentDescription',
    ],
    createdBy: NODE_STORE_SELECTORS.createdBy,
    editable: RESAGA_HELPERS.subscribeIfNotGiven(
      NODE_VIEW_STORE_SELECTORS.editable,
      'editable',
    ),
    batchEditing: {
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
    isEmpty: NODE_STORE_SELECTORS.isEmpty,
  },
  setValue: {
    selectedId: [TEMPLATE_MANAGEMENT_VIEWSTORE, 'selectedId'],
  },
};

export const ATTACHMENT_CONFIG = {
  value: {
    attachmentURL: ({ attachmentId }) => [
      ATTACHMENT_DATASTORE,
      'attachments',
      attachmentId,
      'url',
    ],
    createdBy: NODE_STORE_SELECTORS.createdBy,
  },
  setValue: {
    editSections: [TEMPLATE_MANAGEMENT_VIEWSTORE, 'editSections'],
    selectedId: [TEMPLATE_MANAGEMENT_VIEWSTORE, 'selectedId'],
  },
};
