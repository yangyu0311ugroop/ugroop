import {
  CONFIG_ORGANISATION_ID,
  CONFIG_ORGANISATION_ROOT_NODE_ID,
} from '../config';

describe('OrganisationTemplates/config.js', () => {
  afterEach(() => jest.clearAllMocks());

  describe('Smoke Test', () => {
    it('should exists', () => {
      expect(typeof CONFIG_ORGANISATION_ID).toBe('object');
      expect(typeof CONFIG_ORGANISATION_ROOT_NODE_ID).toBe('object');
    });
  });

  describe('setValue', () => {
    it('should exists', () => {
      expect(typeof CONFIG_ORGANISATION_ROOT_NODE_ID.setValue).toBe('object');
    });
  });

  describe('value', () => {
    it('should exists', () => {
      expect(typeof CONFIG_ORGANISATION_ID.value).toBe('object');
      expect(typeof CONFIG_ORGANISATION_ROOT_NODE_ID.value).toBe('object');
    });
  });
});
