import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import { FILE_STORE_SELECTORS } from 'datastore/fileStore/selectors';
import { TEMPLATE_MANAGEMENT_VIEWSTORE } from 'appConstants';
import { CONFIG } from '../config';

describe('Day/config.js', () => {
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

    describe('editing', () => {
      it('should exists', () => {
        const props = { dayId: 1 };
        expect(typeof CONFIG.setValue.editing).toBe('function');
        expect(CONFIG.setValue.editing(props)).toEqual(
          NODE_STORE_SELECTORS.editing({ id: 1 }),
        );
      });
    });
  });

  describe('value', () => {
    it('should exists', () => {
      expect(typeof CONFIG.value).toBe('object');
    });

    describe('layout', () => {
      it('should return layout', () => {
        expect(CONFIG.value.layout({ templateId: 2233 })).toEqual(
          NODE_STORE_SELECTORS.calculatedLayout({ id: 2233 }),
        );
      });
    });

    describe('icon', () => {
      it('should exists', () => {
        const props = { dayId: 1 };
        expect(typeof CONFIG.value.icon).toBe('function');
        expect(CONFIG.value.icon(props)).toEqual([
          TEMPLATE_MANAGEMENT_VIEWSTORE,
          'editDays',
          1,
          'icon',
        ]);
      });
    });

    describe('placeId', () => {
      it('should exists', () => {
        const props = { dayId: 1 };
        expect(typeof CONFIG.value.placeId).toBe('function');
        expect(CONFIG.value.placeId(props)).toEqual([
          TEMPLATE_MANAGEMENT_VIEWSTORE,
          'editDays',
          1,
          'placeId',
        ]);
      });
    });

    describe('oldMetaInfo', () => {
      it('should exist', () => {
        const props = { dayPhotoId: 1 };
        expect(CONFIG.value.oldMetaInfo(props)).toEqual(
          FILE_STORE_SELECTORS.templateMetaInfo({ id: 1 }),
        );
      });
    });

    describe('timeZoneId', () => {
      it('should exists', () => {
        const props = { dayId: 1 };
        expect(typeof CONFIG.value.timeZoneId).toBe('function');
        expect(CONFIG.value.timeZoneId(props)).toEqual([
          TEMPLATE_MANAGEMENT_VIEWSTORE,
          'editDays',
          1,
          'timeZoneId',
        ]);
      });
    });

    describe('fk', () => {
      it('should exist', () => {
        const props = { dayPhotoId: [1] };
        expect(CONFIG.value.fk(props)).toEqual(
          FILE_STORE_SELECTORS.selectFileId({ id: [1] }),
        );
      });
    });
    describe('nodeChildren', () => {
      it('should exist', () => {
        const props = { dayId: 1 };
        expect(CONFIG.value.nodeChildren(props)).toEqual(
          NODE_STORE_SELECTORS.children({ id: 1 }),
        );
      });
    });
    describe('checklists', () => {
      it('should exist', () => {
        const props = { dayId: 1 };
        expect(CONFIG.value.checklists(props)).toEqual(
          NODE_STORE_SELECTORS.parentChecklists({ parentNodeId: 1 }),
        );
      });
    });
    describe('isNew', () => {
      it('should exists', () => {
        const props = { dayId: 1 };
        expect(typeof CONFIG.value.isNew).toBe('function');
        expect(CONFIG.value.isNew(props)).toEqual([
          TEMPLATE_MANAGEMENT_VIEWSTORE,
          'editDays',
          1,
          'isNew',
        ]);
      });
    });
    describe('showChecklists', () => {
      it('should exists', () => {
        const props = { dayId: 1 };
        expect(typeof CONFIG.value.showChecklists).toBe('function');
        expect(CONFIG.value.showChecklists(props)).toEqual(
          NODE_STORE_SELECTORS.calculatedShowChecklists({ id: 1 }),
        );
      });
    });
    describe('editing', () => {
      it('should exists', () => {
        const props = { dayId: 1 };
        expect(typeof CONFIG.value.editing).toBe('function');
        expect(CONFIG.value.editing(props)).toEqual(
          NODE_STORE_SELECTORS.editing({ id: 1 }),
        );
      });
    });
  });
});
