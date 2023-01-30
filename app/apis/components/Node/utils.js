import lodash from 'lodash';
import { compose } from 'redux';
import {
  FOLDER,
  TAB_GALLERY,
  TAB_OTHER,
  TAB_TIMELINE,
  TEMPLATE,
} from 'utils/modelConstants';
import upsertHelpers, { ARRAY_MODE } from 'utils/helpers/upsertStore';
import { DATASTORE_UTILS } from 'datastore';
import { FILE_STORE_SCHEMAS } from 'datastore/fileStore/schema';
import { normalize } from 'normalizr';

export const createTemplateData = data => ({
  ...data,
  id: data.cloneId,
  people: [data.createdBy],
  children: [],
  content: data.content,
  customData: {
    shortDescription: data.shortDescription || '',
    duration: data.duration || 0,
  },
});

export const createNodeData = (type, data) => {
  switch (type) {
    case TEMPLATE: {
      return createTemplateData(data);
    }

    case FOLDER: {
      return {
        ...data,
        id: data.cloneId,
      };
    }

    default:
      return data;
  }
};

export const upsertCalculatedTimes = props => nodes => {
  props.resaga.setValue({
    nodes: upsertHelpers.deepMerge(nodes, ARRAY_MODE.SET),
  });
};

export const upsertActivityData = (node, payload) => {
  const photo = lodash.get(payload, 'node.customData.photo', undefined)
    ? {
        metaInfo: lodash.get(payload, 'node.customData.metaInfo', undefined),
        content: lodash.get(payload, 'node.customData.photo', undefined),
      }
    : null;
  const photoContent = lodash.get(photo, 'content', '');
  const customData = node.customData;
  const attachmentId = lodash.get(payload, 'node.attachment', null);
  const attachment = lodash.get(payload, 'node.customData.attachment', {});
  const attachmentDesc = lodash.get(
    payload,
    'node.customData.attachment.description',
    '',
  );

  const normalizedPhoto = photo
    ? normalize(photo, FILE_STORE_SCHEMAS.templatePhoto)
    : {};

  const attachmentOperations = attachmentId
    ? [
        DATASTORE_UTILS.upsertObject({ [attachmentId]: attachment }), // upsert attachment
        DATASTORE_UTILS.updateAttribute(
          `${attachmentId}.description`,
          attachmentDesc,
        ), // manually update description attribute
      ]
    : [];

  const photoOperations = photo
    ? [
        DATASTORE_UTILS.upsertObject(normalizedPhoto.entities.photo),
        DATASTORE_UTILS.removeObjectById(node.oldPhotoId),
      ]
    : [];

  const nodePhotoOperations = photo
    ? [
        DATASTORE_UTILS.upsertArray(`${payload.nodeId}.photos`, [photoContent]), // manually upsert photo
        DATASTORE_UTILS.upsertObject({
          [node.id]: { ...node, customData: { ...customData } },
        }),
        DATASTORE_UTILS.removeItemsArray(
          `${payload.nodeId}.photos`,
          node.oldPhotoId,
        ),
      ]
    : [];

  return {
    files: compose(...photoOperations),
    attachments: compose(...attachmentOperations),
    nodes: compose(
      DATASTORE_UTILS.upsertObject({
        [node.id]: { ...node, customData: { ...customData } },
      }),
      ...nodePhotoOperations,
    ),
  };
};

const getGalleryId = (template = {}) => {
  const { children } = template;
  if (Array.isArray(children)) {
    for (let i = 0; i < children.length; i += 1) {
      const { id, type } = children[i];

      if (type === TAB_GALLERY) {
        return id;
      }
    }
  }

  return -1;
};

const getPeopleTabId = (template = {}) => {
  const { children } = template;

  if (Array.isArray(children)) {
    for (let i = 0; i < children.length; i += 1) {
      const { id, type, customData } = children[i];

      if (type === TAB_OTHER && customData.subtype === 'tabpeople') {
        return id;
      }
    }
  }

  return -1;
};

const getTimelineId = (template = {}) => {
  const { children } = template;
  if (Array.isArray(children)) {
    for (let i = 0; i < children.length; i += 1) {
      const { id, type } = children[i];

      if (type === TAB_TIMELINE) {
        return id;
      }
    }
  }

  return -1;
};

export const NODE_API_UTILS = {
  getGalleryId,
  getTimelineId,
  getPeopleTabId,
  createTemplateData,
  createNodeData,
  upsertCalculatedTimes,
  upsertActivityData,
};
