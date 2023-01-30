import utils from '../utils';

describe('datastore/notificationStore/utils', () => {
  describe('#makeSetValueConfig()', () => {
    it('still matches snapshot', () => {
      expect(utils.makeSetValueConfig()).toMatchSnapshot();
    });
  });
});
