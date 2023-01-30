import { CONFIG } from '../config';

describe('AdminNavBar/config.js', () => {
  describe('Smoke Test', () => {
    it('should exists', () => {
      expect(typeof CONFIG).toBe('object');
    });
  });
});
