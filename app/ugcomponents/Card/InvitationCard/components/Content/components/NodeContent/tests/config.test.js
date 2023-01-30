import { NODE_STORE } from 'appConstants';
import { CONFIG } from '../config';

describe('NodeContent/config.js', () => {
  afterEach(() => jest.clearAllMocks());

  describe('Smoke Test', () => {
    it('should exists', () => {
      expect(typeof CONFIG).toBe('object');
    });
  });

  describe('setValue', () => {
    it('should exists', () => {
      expect(typeof CONFIG.setValue).toBe('object');
    });
  });

  describe('value', () => {
    it('should exists', () => {
      expect(typeof CONFIG.value).toBe('object');
    });

    describe('target', () => {
      it('should return blank', () => {
        expect(CONFIG.value.target.getter(123)).toBe('_blank');
      });

      it('should return empty', () => {
        expect(CONFIG.value.target.getter()).toBe('');
      });
    });

    describe('content', () => {
      it('should exists', () => {
        expect(CONFIG.value.content({ nodeId: 123 })).toEqual([
          NODE_STORE,
          'nodes',
          123,
          'content',
        ]);
      });
    });
  });
});
