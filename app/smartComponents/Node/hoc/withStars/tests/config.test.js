import { CONFIG } from '../config';

describe('withStars/config', () => {
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
