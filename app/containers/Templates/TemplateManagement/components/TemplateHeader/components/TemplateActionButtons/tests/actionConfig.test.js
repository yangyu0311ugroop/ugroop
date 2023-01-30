import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import { CONFIG } from '../actionConfig';

describe('TemplateActionButtonList/actionConfig.js', () => {
  afterEach(() => jest.clearAllMocks());

  describe('Smoke Test', () => {
    it('should exists', () => {
      expect(CONFIG.value).toBeDefined();
    });
  });

  describe('value', () => {
    it('should have createdBy', () => {
      expect(CONFIG.value.createdBy({ templateId: 999 })).toEqual(
        NODE_STORE_SELECTORS.createdBy({ id: 999 }),
      );
    });
    it('should have transferStatus', () => {
      expect(CONFIG.value.transferStatus({ templateId: 999 })).toEqual(
        NODE_STORE_SELECTORS.nodeTransferStatus({ id: 999 }),
      );
    });
    it('should have transferStatus', () => {
      expect(CONFIG.value.content({ templateId: 999 })).toEqual(
        NODE_STORE_SELECTORS.content({ id: 999 }),
      );
    });
  });

  describe('setValue', () => {});
});
