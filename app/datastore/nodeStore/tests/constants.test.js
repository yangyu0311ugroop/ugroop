/**
 * Created by stephenkarpinskyj on 25/10/18.
 */

import { NODE_BATCH_ACTIONS, NODE_PATHS } from 'datastore/nodeStore/constants';

describe('datastore/nodeStore/constants', () => {
  describe('#NODE_BATCH_ACTIONS', () => {
    it('still matches snapshot', () => {
      expect(NODE_BATCH_ACTIONS).toMatchSnapshot();
    });
  });

  describe('#NODE_PATHS', () => {
    it('still matches snapshot', () => {
      expect(NODE_PATHS).toMatchSnapshot();
    });
  });
});
