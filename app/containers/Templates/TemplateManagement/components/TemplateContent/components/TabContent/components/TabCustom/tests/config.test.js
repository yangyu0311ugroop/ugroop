import { NODE_STORE } from 'appConstants';
import { CONFIG } from '../config';

describe('TabCustom/config.js', () => {
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

    describe('tabIds', () => {
      it('should exists', () => {
        expect(typeof CONFIG.value.tabIds).toBe('function');
      });

      it('should return correctly', () => {
        expect(CONFIG.value.tabIds({ templateId: 999 })).toEqual([
          NODE_STORE,
          'nodes',
          999,
          'children',
        ]);
      });
    });
    describe('sectionIds', () => {
      it('should exists', () => {
        expect(typeof CONFIG.value.sectionIds).toBe('function');
      });

      it('should return correctly', () => {
        expect(CONFIG.value.sectionIds({ id: 999 })).toEqual([
          NODE_STORE,
          'nodes',
          999,
          'children',
        ]);
      });
    });

    describe('pubSectionIds', () => {
      it('should exists', () => {
        expect(typeof CONFIG.value.pubSectionIds).toBe('function');
      });

      it('should return correctly', () => {
        expect(CONFIG.value.pubSectionIds({ id: 999 })).toEqual([
          NODE_STORE,
          'nodes',
          999,
          'children',
        ]);
      });
    });
  });
});
