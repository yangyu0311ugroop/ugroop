import { EVENT_STORE } from 'appConstants';
import { ATTACHMENT_STORE_SELECTORS } from 'datastore/attachmentStore/selectors';
export const CONFIG = {
  value: {
    link: ({ id, type }) =>
      type === 'events'
        ? [EVENT_STORE, 'attachments', id, 'link']
        : ATTACHMENT_STORE_SELECTORS.url({ id }),
    name: ({ id, type }) =>
      type === 'events'
        ? [EVENT_STORE, 'attachments', id, 'name']
        : ATTACHMENT_STORE_SELECTORS.name({ id }),
    description: ({ id, type }) =>
      type === 'events'
        ? [EVENT_STORE, 'attachments', id, 'description']
        : ATTACHMENT_STORE_SELECTORS.description({ id }),
  },
  setValue: {},
};
