import { compose } from 'redux';
import _ from 'lodash';
import resaga from 'resaga';
import { CONFIG_1, CONFIG_2, CONFIG_3 } from './config';

/**
 * Select organisation members property by user id and org id.
 *
 * @param orgId required, orgid to get the members from
 * @param userId required, reference id
 * @outputProp outputProp Prop name of selected id
 */
export default ({
  orgId = null,
  userId = null,
  keyProp = 'role',
  outputProp = 'role',
} = {}) =>
  compose(
    ..._.compact([
      orgId && resaga(CONFIG_1({ orgId })),
      userId && resaga(CONFIG_2({ userId })),
      resaga(CONFIG_3({ outputProp, keyProp })),
    ]),
  );
