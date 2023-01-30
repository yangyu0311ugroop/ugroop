import { CONFIG } from '../config';

describe('CONFIG', () => {
  describe('value', () => {
    it('should exist', () => {
      expect(typeof CONFIG.value).toBe('object');
    });
  });
});
