import { ORGANISATION_STORE_SELECTORS } from 'datastore/orgStore/selectors';
import { CONFIG, CONFIG2 } from '../config';

describe('Organisation/config.js', () => {
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
  describe('isLoading', () => {
    it('isLoading should return true when all fetching are true', () => {
      expect(CONFIG.isLoading.isLoading.getter(true, true, true, true)).toEqual(
        true,
      );
    });
    it('isLoading should return true when any of the fetching values are true', () => {
      expect(
        CONFIG.isLoading.isLoading.getter(true, false, false, false),
      ).toEqual(false);
    });
    it('isLoading should return false when all fetch values are falsy', () => {
      expect(
        CONFIG.isLoading.isLoading.getter(false, false, false, false),
      ).toEqual(false);
    });
  });

  describe('Smoke Test', () => {
    it('should exists', () => {
      expect(typeof CONFIG2).toBe('object');
    });
  });
  describe('config2.value.orgType', () => {
    it('should exists', () => {
      expect(CONFIG2.value.orgType({ organisationIdFromURL: 1 })).toEqual(
        ORGANISATION_STORE_SELECTORS.getOrganisationType({ id: 1 }),
      );
    });
  });
});
