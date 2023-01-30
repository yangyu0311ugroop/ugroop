import { EVENT_ATTACHMENT_PATHS } from 'datastore/eventStore/constants';
import { EVENT_STORE_DATA_SELECTORS } from 'datastore/eventStore/selectors';

export const CONFIG = {
  value: {
    name: ({ dataId: id }) =>
      EVENT_STORE_DATA_SELECTORS.eventAttachmentProp({
        id,
        path: EVENT_ATTACHMENT_PATHS.name,
      }),
    type: ({ dataId: id }) =>
      EVENT_STORE_DATA_SELECTORS.eventAttachmentProp({
        id,
        path: EVENT_ATTACHMENT_PATHS.type,
      }),
    link: ({ dataId: id }) =>
      EVENT_STORE_DATA_SELECTORS.eventAttachmentProp({
        id,
        path: EVENT_ATTACHMENT_PATHS.link,
      }),
    size: ({ dataId: id }) =>
      EVENT_STORE_DATA_SELECTORS.eventAttachmentProp({
        id,
        path: EVENT_ATTACHMENT_PATHS.size,
      }),
    description: ({ dataId: id }) =>
      EVENT_STORE_DATA_SELECTORS.eventAttachmentProp({
        id,
        path: EVENT_ATTACHMENT_PATHS.description,
      }),
    isDeleted: ({ dataId: id }) =>
      EVENT_STORE_DATA_SELECTORS.eventAttachmentProp({
        id,
        path: EVENT_ATTACHMENT_PATHS.isDeleted,
      }),
  },
  setValue: {},
};
