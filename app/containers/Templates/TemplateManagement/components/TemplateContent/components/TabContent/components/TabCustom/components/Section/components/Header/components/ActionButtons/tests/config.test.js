import { NODE_STORE } from 'appConstants';
import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import { CONFIG } from '../config';

describe('ActionButtons/config.js', () => {
  afterEach(() => jest.clearAllMocks());

  describe('Smoke Test', () => {
    it('should exists', () => {
      expect(typeof CONFIG).toMatchSnapshot();
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

    describe('moveMode', () => {
      it('should exists', () => {
        expect(typeof CONFIG.value.moveMode).toBe('object');
        expect(typeof CONFIG.value.moveMode.getter).toBe('function');

        expect(CONFIG.value.moveMode.getter('not moveMode')).toBe(false);
        expect(CONFIG.value.moveMode.getter('moveMode')).toBe(true);
      });
    });

    describe('content', () => {
      it('should exist', () => {
        expect(CONFIG.value.content({ id: 1 })).toEqual(
          NODE_STORE_SELECTORS.content({ id: 1 }),
        );
      });
    });

    describe('createdBy', () => {
      it('should exists', () => {
        expect(CONFIG.value.createdBy({ id: 999 })).toEqual([
          NODE_STORE,
          'nodes',
          999,
          'createdBy',
        ]);
      });
    });
  });
});
