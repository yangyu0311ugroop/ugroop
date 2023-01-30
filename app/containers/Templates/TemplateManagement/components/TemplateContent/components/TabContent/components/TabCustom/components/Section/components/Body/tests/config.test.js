import { TEMPLATE_MANAGEMENT_VIEWSTORE, NODE_STORE } from 'appConstants';
import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import { ability } from 'apis/components/Ability/ability';
import { CONFIG } from '../config';

describe('Body/config.js', () => {
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

  describe('value', () => {
    it('should exists', () => {
      expect(typeof CONFIG.value).toBe('object');
    });

    describe('description', () => {
      it('should exists', () => {
        expect(typeof CONFIG.value.description).toBe('function');
        expect(CONFIG.value.description({ id: 999 })).toEqual([
          NODE_STORE,
          'nodes',
          999,
          'customData',
          'description',
        ]);
      });
    });

    describe('url', () => {
      it('should exists', () => {
        expect(typeof CONFIG.value.url).toBe('function');
        expect(CONFIG.value.url({ id: 999 })).toEqual([
          NODE_STORE,
          'nodes',
          999,
          'customData',
          'url',
        ]);
      });
    });

    describe('attachmentId', () => {
      it('should exists', () => {
        expect(typeof CONFIG.value.attachmentId).toBe('function');
        expect(CONFIG.value.attachmentId({ id: 999 })).toEqual([
          NODE_STORE,
          'nodes',
          999,
          'attachment',
        ]);
      });
    });

    describe('attachmentExist', () => {
      it('should exists', () => {
        expect(typeof CONFIG.value.attachmentExist).toBe('object');
        const { keyPath, getter } = CONFIG.value.attachmentExist;

        expect(typeof keyPath).toBe('object');
        expect(typeof keyPath[0]).toBe('function');
        expect(keyPath[0]({ id: 999 })).toEqual([
          NODE_STORE,
          'nodes',
          999,
          'attachment',
        ]);

        expect(typeof getter).toBe('function');
        expect(getter()).toBe(false);
        expect(getter(1, { 1: { fileSize: 0, description: '' } })).toBe(false);
        expect(getter(1, { 1: { fileSize: 123, description: '' } })).toBe(true);
        expect(getter(1, { 1: { fileSize: 0, description: '123' } })).toBe(
          true,
        );
      });
    });

    describe('editing', () => {
      it('keypath', () => {
        expect(typeof CONFIG.value.editing).toBe('object');
        expect(CONFIG.value.editing.keyPath({ id: 1 })).toEqual([
          [TEMPLATE_MANAGEMENT_VIEWSTORE, 'editSections', 1, 'id'],
          NODE_STORE_SELECTORS.createdBy,
        ]);
      });
      it('getter: should return the id when new activity', () => {
        ability.can = jest.fn(() => true);
        expect(
          CONFIG.value.editing.getter(1, 0, { id: 1, isPublic: false }),
        ).toEqual(1);
      });
      it('getter: should return the editing value when activity is not new', () => {
        ability.can = jest.fn(() => true);
        expect(
          CONFIG.value.editing.getter(0, 1, { id: 1, isPublic: false }),
        ).toEqual(0);
      });
      it('getter: should return the editing value when activity null', () => {
        ability.can = jest.fn(() => false);
        expect(
          CONFIG.value.editing.getter(0, 1, { id: 1, isPublic: false }),
        ).toEqual(null);
      });
    });
  });
});
