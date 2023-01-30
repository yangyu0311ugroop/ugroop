import { CONFIG } from '../config';

describe('CONFIG', () => {
  describe('value', () => {
    it('should be object with particular value', () => {
      expect(CONFIG.value).toMatchSnapshot();
    });
  });

  describe('setValue', () => {
    it('should be object with particular value', () => {
      expect(CONFIG.setValue).toMatchSnapshot();
    });
  });
});
