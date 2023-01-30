import { EVENT_STORE_DATA_SELECTORS } from 'datastore/eventStore/selectors';
import { ATTACHMENT_STORE_SELECTORS } from 'datastore/attachmentStore/selectors';
import { EVENT_STORE, ATTACHMENT_DATASTORE } from '../../../../../appConstants';

const selectAttachmentProperty = (selectors, propName) => ({
  keyPath: ({ selector, id }) => selectors[selector || EVENT_STORE]({ id }),
  props: ({ [propName]: value }) => value,
  getter: (storeValue, value) => value || storeValue,
});

export const CONFIG = {
  value: {
    eventAttachment: selectAttachmentProperty({
      [EVENT_STORE]: EVENT_STORE_DATA_SELECTORS.eventAttachment,
      [ATTACHMENT_DATASTORE]: ATTACHMENT_STORE_SELECTORS.attachment,
    }),
  },
  setValue: {},
};
