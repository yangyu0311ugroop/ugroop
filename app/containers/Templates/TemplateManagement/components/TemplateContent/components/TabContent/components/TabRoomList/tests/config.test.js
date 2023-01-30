import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import { CONFIG, PARENT_CONFIG } from '../config';

describe('TabRiskAssessment/config.js', () => {
  afterEach(() => jest.clearAllMocks());

  describe('Smoke Test', () => {
    it('should exists', () => {
      expect(typeof CONFIG).toBe('object');
    });
  });

  describe('setValue', () => {
    it('should exists', () => {
      expect(typeof PARENT_CONFIG.setValue).toBe('object');
    });
  });

  describe('value', () => {
    it('should exists', () => {
      expect(typeof CONFIG.value).toBe('object');
    });
  });

  describe('PARENT_CONFIG.parentNodeId', () => {
    it('should exists', () => {
      expect(
        PARENT_CONFIG.value.parentNodeId({ selectedRoomId: 3344 }),
      ).toEqual(NODE_STORE_SELECTORS.parentNodeId({ id: 3344 }));
    });
  });

  describe('PARENT_CONFIG.createdBy', () => {
    it('should exists', () => {
      expect(PARENT_CONFIG.value.createdBy({ selectedRoomId: 3344 })).toEqual(
        NODE_STORE_SELECTORS.createdBy({ id: 3344 }),
      );
    });
  });

  describe('PARENT_CONFIG.rooms', () => {
    it('should exists', () => {
      expect(PARENT_CONFIG.value.rooms({ templateId: 3344 })).toEqual(
        NODE_STORE_SELECTORS.rooms({ id: 3344 }),
      );
    });
  });
});
