import resaga from 'resaga';
import { ATTACHMENT_STORE_SELECTORS } from 'datastore/attachmentStore/selectors';

/**
 * Input props: id (attachment id)
 * Output props: [outputProp] (selected prop value)
 */
export default ({ path = 'type', outputProp = 'value', r = resaga }) =>
  r({
    value: {
      [outputProp]: ({ id }) =>
        ATTACHMENT_STORE_SELECTORS.attachmentProp({ id, path }),
    },
  });
