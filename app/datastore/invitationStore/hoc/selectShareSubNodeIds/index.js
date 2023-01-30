import { compose } from 'redux';
import _ from 'lodash';
import resaga from 'resaga';
import { CONFIG_1, CONFIG_2, CONFIG_3, CONFIG_4, CONFIG_5 } from './config';

/**
 * Select all share subNode id's related to a nodeId via one of a set of roles.
 *
 * @param nodeIdProp Optional array of nodeId's to filter by or name of prop
 * @param roles Optional array of roles to filter by or name of prop
 * @param selectShareTokens Optionally returns related share token's instead of share subNode id's
 * @param shareStatuses Optional array of share statuses to filter by when selecting share token's
 * @param outputProp Prop name of selected id's or token's
 */
export default ({
  nodeIds = null,
  roles = null,
  selectShareTokens = false,
  shareStatuses = null,
  outputProp = 'shareSubNodeIds',
  r = resaga,
} = {}) =>
  compose(
    ..._.compact([
      r(CONFIG_1({ outputProp })),
      nodeIds && r(CONFIG_2({ outputProp, nodeIds })),
      roles && r(CONFIG_3({ outputProp, roles })),
      selectShareTokens && r(CONFIG_4({ outputProp })),
      selectShareTokens &&
        shareStatuses &&
        r(CONFIG_5({ outputProp, shareStatuses })),
    ]),
  );
