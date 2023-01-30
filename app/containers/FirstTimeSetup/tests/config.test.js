import { CONFIG } from '../config';

describe('FirstTimeSetup/config.js', () => {
  describe('Smoke Test', () => {
    it('should exists', () => {
      expect(CONFIG).toMatchSnapshot();
    });
  });
});
