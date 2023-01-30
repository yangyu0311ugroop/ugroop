import { CONFIG } from '../config';

describe('FirstTimeSetupLayout/config.js', () => {
  describe('Smoke Test', () => {
    it('should exists', () => {
      expect(CONFIG).toMatchSnapshot();
    });
  });
});
