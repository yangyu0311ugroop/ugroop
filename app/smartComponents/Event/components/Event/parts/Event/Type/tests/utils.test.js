/**
 * Created by stephenkarpinskyj on 4/11/18.
 */

import typeUtils from '../utils';

describe('smartComponents/Event/parts/Type/utils', () => {
  describe('#makeSubtypeOptions()', () => {
    it('still matches snapshot', () => {
      expect(typeUtils.renderTypeOptions()).toMatchSnapshot();
    });
  });
});
