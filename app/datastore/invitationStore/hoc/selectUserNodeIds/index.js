import { compose } from 'redux';
import resaga from 'resaga';
import _ from 'lodash';
import { CONFIG_1, CONFIG_2, CONFIG_3, CONFIG_4 } from './config';

/**
 * Select all userNode id's connected to one of a set of nodeIds via one of a set of roles.
 *
 * @param userIds Optional array of userIds to filter by or name of prop
 * @param nodeIds Optional array of nodeIds to filter by or name of prop
 * @param outputProp Prop name of selected userNode id's
 */
export default ({
  userIds = null,
  nodeIds = null,
  outputProp = 'userNodeIds',
  roles = null,
} = {}) =>
  compose(
    ..._.compact([
      resaga(CONFIG_1({ outputProp })),
      userIds && resaga(CONFIG_2({ outputProp, userIds })),
      nodeIds && resaga(CONFIG_3({ outputProp, nodeIds })),
      resaga(CONFIG_4({ outputProp, roles })),
    ]),
  );
