import resaga from 'resaga';
import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';

/**
 * Input props: id (node id)
 * Output props: [outputProp] (selected prop value)
 */
export default ({ path = 'type', outputProp = 'value', r = resaga }) =>
  r({
    value: {
      [outputProp]: ({ id }) => NODE_STORE_SELECTORS.nodeProp({ id, path }),
    },
  });
