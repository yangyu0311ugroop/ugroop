import { compose } from 'redux';
import _ from 'lodash';
import resaga from 'resaga';
import { CONFIG_1, CONFIG_2, CONFIG_3, CONFIG_4, CONFIG_5 } from './config';

/**
 * Select all share/notification tokens related to a userId and/or nodeId via one of a set of roles, optionally filtered by invitation status.
 *
 * @param shareToUserIds Optional array of shareToUserId's to filter by or name of prop
 * @param nodeIdProp Optional array of nodeId's to filter by or name of prop
 * @param outputProp Prop name of selected share tokens
 */
export default ({
  shareToUserIds = null,
  nodeIds = null,
  outputProp = 'shareTokens',
} = {}) =>
  compose(
    ..._.compact([
      resaga(CONFIG_1({ outputProp })),
      shareToUserIds && resaga(CONFIG_2({ outputProp, shareToUserIds })),
      nodeIds && resaga(CONFIG_3({ outputProp, nodeIds })),
      resaga(CONFIG_4({ outputProp })),
      resaga(CONFIG_5({ outputProp })),
    ]),
  );
