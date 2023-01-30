import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import { CONFIG, CHECKITEMS_CONFIG, PARENT_CONFIG } from '../config';
import { TEMPLATE_MANAGEMENT_VIEWSTORE } from '../../../../../appConstants';

describe('Checklists/config.js', () => {
  afterEach(() => jest.clearAllMocks());

  describe('Smoke Test', () => {
    it('should exists', () => {
      expect(PARENT_CONFIG).toMatchSnapshot();
    });
  });

  describe('Smoke Test', () => {
    it('should exists', () => {
      expect(CONFIG).toMatchSnapshot();
    });
  });
  describe('Smoke Test', () => {
    it('should exists', () => {
      const result = CONFIG.value.createdBy({ expandedChecklistId: 1 });
      expect(result).toEqual(['nodeStore', 'nodes', 1, 'createdBy']);
    });
    it('should exists', () => {
      const result = CONFIG.value.type({ parentNodeId: 1 });
      expect(result).toEqual(['nodeStore', 'nodes', 1, 'type']);
    });
  });

  describe('PARENT_CONFIG value.showClosed', () => {
    it('should have keyPath', () => {
      expect(PARENT_CONFIG.value.showClosed({ parentNodeId: 1 })).toEqual([
        TEMPLATE_MANAGEMENT_VIEWSTORE,
        'checklists',
        1,
        'showClosed',
      ]);
    });
  });
  describe('CHECKITEMS_CONFIG checkItems', () => {
    it('should have keyPath', () => {
      const checklists = [1, 3, 3];
      expect(
        CHECKITEMS_CONFIG.value.checkItems.keyPath({ checklists }),
      ).toEqual(
        checklists.map(checklist =>
          NODE_STORE_SELECTORS.parentChecklists({ parentNodeId: checklist }),
        ),
      );
    });
    it('should have a keyPath that returns empty object if there are no checklists', () => {
      const checklists = null;
      expect(
        CHECKITEMS_CONFIG.value.checkItems.keyPath({ checklists }),
      ).toEqual({});
    });
    it('should have cacheKey', () => {
      const checklists = [1, 2, 3];
      expect(
        CHECKITEMS_CONFIG.value.checkItems.cacheKey({ checklists }),
      ).toEqual(
        `templateManagementPage.checkitems.${checklists.toString()}.checkitems`,
      );
    });
    it('should have cacheKey with null checklists', () => {
      expect(
        CHECKITEMS_CONFIG.value.checkItems.cacheKey({ checklists: null }),
      ).toEqual('templateManagementPage.checkitems.null.checkitems');
    });
    it('should have a getter', () => {
      const checkItems = [1, 2, 3];
      expect(CHECKITEMS_CONFIG.value.checkItems.getter(...checkItems)).toEqual(
        checkItems.filter(item => item),
      );
    });
  });
});
