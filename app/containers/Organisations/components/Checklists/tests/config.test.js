import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import { CONFIG, CONFIG_ORGANISATION_ID } from '../config';

describe('Checklists/config.js', () => {
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
      expect(typeof CONFIG_ORGANISATION_ID.value).toBe('object');
    });
    it('CONFIG contains required properties', () => {
      expect(CONFIG.value.parentChecklists({ rootNodeId: 1 })).toEqual(
        NODE_STORE_SELECTORS.parentChecklists({ parentNodeId: 1 }),
      );
    });
  });
});
