import { ORGANISATION_STORE_SELECTORS } from 'datastore/orgStore/selectors';
import { CONFIG } from '../config';

describe('Organisation/tests/config.test.js', () => {
  afterEach(() => jest.clearAllMocks());

  describe('CONFIG', () => {
    it('should exists', () => {
      expect(CONFIG).toBeDefined();
    });
  });

  describe('setValue', () => {
    it('should exists', () => {
      expect(CONFIG.setValue).toBeDefined();
    });
  });

  describe('value', () => {
    it('should exists', () => {
      expect(CONFIG.value).toBeDefined();
    });

    describe('myOrganisationName', () => {
      it('should exists', () => {
        expect(typeof CONFIG.value.myOrganisationName).toBe('function');
        expect(
          CONFIG.value.myOrganisationName({ myOrganisationId: 2233 }),
        ).toEqual(
          ORGANISATION_STORE_SELECTORS.getOrganisationName({ id: 2233 }),
        );
      });
    });

    describe('theirOrganisationName', () => {
      it('should exists', () => {
        expect(typeof CONFIG.value.theirOrganisationName).toBe('function');
        expect(CONFIG.value.theirOrganisationName({})).toEqual('');
        expect(CONFIG.value.theirOrganisationName({ id: 999 })).toEqual(
          ORGANISATION_STORE_SELECTORS.getOrganisationName({ id: 999 }),
        );
      });
    });
  });
});
