import { ATTACHMENT_PATHS } from 'datastore/attachmentStore/constants';
import { ATTACHMENT_STORE_HELPERS } from 'datastore/attachmentStore/helpers';

export default {
  base: {
    name: ATTACHMENT_STORE_HELPERS.pathToAttachmentInputName(
      ATTACHMENT_PATHS.description,
    ),
    placeholder: 'Enter description?',
    autoFocus: true,
  },
};
