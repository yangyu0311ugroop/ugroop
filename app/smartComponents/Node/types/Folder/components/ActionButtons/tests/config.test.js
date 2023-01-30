import { CONFIG } from '../config';

describe('config', () => {
  describe('value', () => {
    it('should be object', () => {
      expect(typeof CONFIG.value).toEqual('object');
    });
    it('should be object', () => {
      expect(typeof CONFIG.value.createdBy({ id: 1 })).toEqual('object');
    });
  });

  describe('setValue', () => {
    it('should be object', () => {
      expect(typeof CONFIG.setValue).toEqual('object');
    });
  });
});
