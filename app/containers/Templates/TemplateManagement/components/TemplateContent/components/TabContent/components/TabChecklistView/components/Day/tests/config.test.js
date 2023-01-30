import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import { FILE_STORE_SELECTORS } from 'datastore/fileStore/selectors';
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

    describe('fk', () => {
      it('should exist', () => {
        const props = { dayPhotoId: [1] };
        expect(CONFIG.value.fk(props)).toEqual(
          FILE_STORE_SELECTORS.selectFileId({ id: [1] }),
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
    describe('showChecklists', () => {
      it('should exists', () => {
        const props = { dayId: 1 };
        expect(typeof CONFIG.value.showChecklists).toBe('function');
        expect(CONFIG.value.showChecklists(props)).toEqual(
          NODE_STORE_SELECTORS.calculatedShowChecklists({ id: 1 }),
        );
      });
    });

    describe('content', () => {
      it('#keyPath 1', () => {
        expect(CONFIG.value.content.keyPath[0]({ dayId: 1 })).toEqual([
          'nodeStore',
          'nodes',
          1,
          'content',
        ]);
      });
      it('#keyPath 2', () => {
        expect(CONFIG.value.content.keyPath[1]({ dayId: 1 })).toEqual([
          'nodeStore',
          'nodes',
          1,
          'children',
        ]);
      });
      it('#keyPath 3', () => {
        expect(CONFIG.value.content.keyPath[2]({ dayId: 1 })).toEqual([
          'nodeStore',
          'nodes',
          1,
          'customData',
          'description',
        ]);
      });
      it('#keyPath 4', () => {
        expect(CONFIG.value.content.keyPath[3]({ dayId: 1 })).toEqual([
          'nodeStore',
          'nodes',
          1,
          'customData',
          'url',
        ]);
      });
    });

    describe('content', () => {
      it('#keyPath 1', () => {
        expect(CONFIG.value.content.getter('1', '2', '3', '4')).toEqual({
          content: '1',
          description: '3',
          hasContent: true,
          url: '4',
        });
        expect(CONFIG.value.content.getter(null, '2', '3', '4')).toEqual({
          content: null,
          description: '3',
          hasContent: true,
          url: '4',
        });
        expect(CONFIG.value.content.getter(null, null, '3', '4')).toEqual({
          content: null,
          description: '3',
          hasContent: true,
          url: '4',
        });
        expect(CONFIG.value.content.getter(null, null, null, '4')).toEqual({
          content: null,
          description: null,
          hasContent: true,
          url: '4',
        });
        expect(CONFIG.value.content.getter(null, [], null, null)).toEqual({
          content: null,
          description: null,
          hasContent: false,
          url: null,
        });
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
