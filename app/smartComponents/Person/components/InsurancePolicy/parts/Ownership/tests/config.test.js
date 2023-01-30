import { CONFIG_1 } from '../config';

describe('CONFIG_1', () => {
  afterEach(() => jest.clearAllMocks());

  describe('Smoke Test', () => {
    it('should exists', () => {
      expect(typeof CONFIG_1).toBe('object');
    });
  });

  describe('value', () => {
    it('should exists', () => {
      expect(typeof CONFIG_1.value).toBe('object');
    });
    it('should exists', () => {
      expect(typeof CONFIG_1.value.personNodeId({ personId: 1 })).toBe(
        'object',
      );
    });
  });
});
