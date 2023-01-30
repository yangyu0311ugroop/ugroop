import { ATTACHMENT_STORE_SELECTORS } from 'datastore/attachmentStore/selectors';

export const CONFIG = {
  value: {
    url: props => ATTACHMENT_STORE_SELECTORS.url({ id: props.attachmentId }),
    name: props => ATTACHMENT_STORE_SELECTORS.name({ id: props.attachmentId }),
    description: props =>
      ATTACHMENT_STORE_SELECTORS.description({
        id: props.attachmentId,
      }),
  },
  setValue: {},
};
