import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';

import { CONFIG, CONFIG1 } from '../config';

describe('Sidebar/config.js', () => {
  afterEach(() => jest.clearAllMocks());

  describe('Smoke Test', () => {
    it('should exists', () => {
      expect(typeof CONFIG).toBe('object');
    });
  });

  describe('value', () => {
    it('should exists', () => {
      expect(typeof CONFIG.value).toBe('object');
    });
  });
});
describe('Sidebar/config1.js', () => {
  describe('setValue', () => {
    it('should exists', () => {
      expect(typeof CONFIG1.setValue).toBe('object');
    });
  });
  describe('value', () => {
    it('orgId', () => {
      expect(CONFIG1.value.orgId({ templateId: 1 })).toEqual(
        NODE_STORE_SELECTORS.organisationId({ id: 1 }),
      );
    });
    it('tourCreatedBy', () => {
      expect(CONFIG1.value.tourCreatedBy({ templateId: 1 })).toEqual(
        NODE_STORE_SELECTORS.createdBy({ id: 1 }),
      );
    });
  });
});
