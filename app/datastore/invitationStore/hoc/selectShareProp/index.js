import resaga from 'resaga';
import { INVITATION_STORE_SELECTORS } from 'datastore/invitationStore/selectors';

/**
 * Input props: id (share id)
 * Output props: [outputProp] (selected prop value)
 */
export default ({ path = 'prop', outputProp = 'value', r = resaga }) =>
  r({
    value: {
      [outputProp]: ({ id }) =>
        INVITATION_STORE_SELECTORS.shareProp({ id, path }),
    },
  });
