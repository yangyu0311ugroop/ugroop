import { NODE_STORE } from 'appConstants';
import { CONFIG } from '../config';

describe('Body/config.js', () => {
  afterEach(() => jest.clearAllMocks());

  describe('Smoke Test', () => {
    it('should exists', () => {
      expect(typeof CONFIG).toBe('object');
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

    describe('photo', () => {
      it('should exists', () => {
        expect(typeof CONFIG.value.photo).toBe('object');
        const { keyPath, getter } = CONFIG.value.photo;
        expect(typeof keyPath).toBe('object');
        expect(keyPath).toMatchSnapshot();
        expect(keyPath[0]({ id: 999 })).toEqual([
          NODE_STORE,
          'nodes',
          999,
          'photos',
          0,
        ]);

        expect(typeof getter).toBe('function');

        expect(getter(999, { 999: { content: 'photo' } })).toEqual({
          photoId: 999,
          content: 'photo',
        });
        expect(getter(999)).toEqual({ photoId: 999, content: undefined });
      });
    });
  });
});
