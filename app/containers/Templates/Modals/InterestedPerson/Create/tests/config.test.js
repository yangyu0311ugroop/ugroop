import { CONFIG } from '../config';

describe('CONFIG', () => {
  describe('value', () => {
    it('should exist', () => {
      expect(CONFIG.value).toBeDefined();
    });
  });

  describe('setValue', () => {
    it('should exist', () => {
      expect(CONFIG.setValue).toBeDefined();
    });
  });
});
