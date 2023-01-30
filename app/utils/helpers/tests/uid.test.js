import { UID_HELPERS } from 'utils/helpers/uid';

describe('UID_HELPERS ', () => {
  describe('generateUID', () => {
    it('should return something', () => {
      expect(UID_HELPERS.generateUID()).toBeDefined();
    });
  });
});
