import { NODE_STORE, TEMPLATE_MANAGEMENT_DATASTORE } from 'appConstants';
import { requests } from 'utils/request';
import { CONFIG, CUSTOM_TABS_CONFIG } from '../config';

describe('Print tour Page config.test.js', () => {
  describe('config', () => {
    it('should exists', () => {
      expect(CONFIG).toBeDefined();
    });
  });

  describe('CONFIG', () => {
    beforeEach(() => {
      requests.fetchWithAuthorisation = jest.fn();
      requests.fetchWithURL = jest.fn();
    });
    afterEach(() => jest.clearAllMocks());
    describe('value', () => {
      it('template id value', () => {
        expect(CONFIG.value.templateId()).toEqual([
          TEMPLATE_MANAGEMENT_DATASTORE,
          'id',
        ]);
      });
      it('tabId id value', () => {
        expect(CONFIG.value.tabId()).toEqual([
          TEMPLATE_MANAGEMENT_DATASTORE,
          'tabId',
        ]);
      });
      it('tabOCustomIds value', () => {
        expect(CONFIG.value.tabOCustomIds()).toEqual([
          TEMPLATE_MANAGEMENT_DATASTORE,
          'tabOther',
        ]);
      });
      it('tabOCustomIds getter', () => {
        const id = 1;
        const templates = { 1: { children: [2], createdBy: 1 } };
        const expected = { tabIds: [2], createdBy: 1 };
        expect(CONFIG.value.templateInfo.getter(id, templates)).toEqual(
          expected,
        );
        expect(CONFIG.value.templateInfo.getter(id)).toEqual({
          tabIds: [],
          createdBy: 0,
        });
      });
    });
  });

  describe('CUSTOM_TABS_CONFIG', () => {
    it('should have cacheKey if tabIds exists', () => {
      const tabIds = [1, 2];
      const cacheKey = 'cacheKey';
      expect(
        CUSTOM_TABS_CONFIG.value.relatedIds.cacheKey({ tabIds, cacheKey }),
      ).toEqual(`pairRelatedId.${cacheKey}.${tabIds.toString()}`);
    });
    it('should have cacheKey if tabIds does not exist', () => {
      const tabIds = null;
      const cacheKey = 'cacheKey';
      expect(
        CUSTOM_TABS_CONFIG.value.relatedIds.cacheKey({ tabIds, cacheKey }),
      ).toEqual(`pairRelatedId.${cacheKey}.${null}`);
    });
    it('should have props', () => {
      expect(
        CUSTOM_TABS_CONFIG.value.relatedIds.props({ tabIds: [1, 2] }),
      ).toEqual([1, 2]);
    });
    it('should have keyPath if there are tabIds', () => {
      const tabIds = [1, 2];
      const mapped = [
        ['nodeStore', 'nodes', 1, 'type'],
        ['nodeStore', 'nodes', 2, 'type'],
      ];
      CUSTOM_TABS_CONFIG.value.relatedIds.keyPath({});
      expect(CUSTOM_TABS_CONFIG.value.relatedIds.keyPath({ tabIds })).toEqual(
        mapped,
      );
    });
    it('should have getter', () => {
      const mapped = [1, 2];
      const relatedIds = [[1, undefined], [2, undefined]];
      expect(CUSTOM_TABS_CONFIG.value.relatedIds.getter(mapped)).toEqual(
        relatedIds,
      );
    });
    it('sharedWith value', () => {
      expect(CUSTOM_TABS_CONFIG.value.shareWithTimeLine({ tabId: 1 })).toEqual([
        NODE_STORE,
        'nodes',
        1,
        'sharedWith',
      ]);
    });
  });
});
