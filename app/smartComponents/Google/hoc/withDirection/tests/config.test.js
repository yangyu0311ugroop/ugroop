import { CONFIG } from '../config';

describe('withRecent/config', () => {
  describe('CONFIG', () => {
    it('exists', () => {
      expect(CONFIG).toBeDefined();
    });
  });

  describe('#value', () => {
    it('exists', () => {
      expect(CONFIG.value).toBeDefined();
    });
  });
});
