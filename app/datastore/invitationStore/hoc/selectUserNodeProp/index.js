import resaga from 'resaga';
import { INVITATION_STORE_SELECTORS } from 'datastore/invitationStore/selectors';

/**
 * Input props: id (user node id)
 * Output props: [outputProp] (selected prop value)
 */
export default ({ path = 'prop', outputProp = 'value', r = resaga }) =>
  r({
    value: {
      [outputProp]: ({ id }) =>
        INVITATION_STORE_SELECTORS.userNodeProp({ id, path }),
    },
  });
