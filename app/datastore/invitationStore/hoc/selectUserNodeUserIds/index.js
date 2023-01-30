import _ from 'lodash';
import { compose } from 'redux';
import resaga from 'resaga';
import { CONFIG_1, CONFIG_2, CONFIG_3, CONFIG_4 } from './config';

/**
 * Select all user id's connected to one of a set of nodeIds via one of a set of roles.
 *
 * @param nodeIds Optional array of nodeIds to filter by or name of prop
 * @param roles Optional array of roles to filter by or name of prop
 * @param outputProp Prop name of selected user id's
 */
export default ({
  nodeIds = null,
  outputProp = 'userNodeUserIds',
  roles = 'roles',
} = {}) =>
  compose(
    ..._.compact([
      resaga(CONFIG_1({ outputProp })),
      nodeIds && resaga(CONFIG_2({ outputProp, nodeIds })),
      roles && resaga(CONFIG_3({ outputProp, roles })),
      resaga(CONFIG_3({ outputProp })),
      resaga(CONFIG_4({ outputProp })),
    ]),
  );
