import { NODE_STORE } from 'appConstants';
import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import { ORGANISATION_STORE_SELECTORS } from 'datastore/orgStore/selectors';
import { CONFIG, MEMBER_CONFIG } from '../config';

describe('EditTab/config.js', () => {
  afterEach(() => jest.clearAllMocks());

  describe('Smoke Test', () => {
    it('should exists', () => {
      expect(typeof CONFIG).toBe('object');
    });
  });

  describe('setValue', () => {
    it('should exists', () => {
      expect(typeof MEMBER_CONFIG.setValue).toBe('object');
    });
  });

  describe('value', () => {
    it('should exists', () => {
      expect(typeof CONFIG.value).toBe('object');
    });

    describe('content', () => {
      it('should exists', () => {
        expect(typeof CONFIG.value.content).toBe('function');
        expect(CONFIG.value.content({ tabId: 123 })).toEqual([
          NODE_STORE,
          'nodes',
          123,
          'content',
        ]);
      });
    });

    describe('isPrivate', () => {
      it('should exists', () => {
        expect(MEMBER_CONFIG.value.isPrivate({ tabId: 123 })).toEqual([
          NODE_STORE,
          'nodes',
          123,
          'customData',
          'private',
        ]);
      });
    });

    describe('createdBy', () => {
      it('should exist', () => {
        expect(CONFIG.value.createdBy({ tabId: 1 })).toEqual(
          NODE_STORE_SELECTORS.createdBy({ id: 1 }),
        );
      });
    });

    describe('role', () => {
      it('should exist', () => {
        expect(MEMBER_CONFIG.value.role({ accountId: 1 })).toEqual(
          ORGANISATION_STORE_SELECTORS.getMemberRole({ id: 1 }),
        );
      });
    });
  });
});
