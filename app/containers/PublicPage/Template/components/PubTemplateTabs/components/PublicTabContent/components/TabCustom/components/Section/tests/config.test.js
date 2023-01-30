import { NODE_STORE } from 'appConstants';
import { CONFIG } from '../config';

describe('Section/config.js', () => {
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

    describe('exist', () => {
      it('should exists', () => {
        expect(typeof CONFIG.value.exist).toBe('function');
        expect(CONFIG.value.exist({ id: 999 })).toEqual([
          NODE_STORE,
          'nodes',
          999,
          'id',
        ]);
      });
    });

    describe('content', () => {
      it('should exists', () => {
        expect(typeof CONFIG.value.content).toBe('function');

        expect(CONFIG.value.content({ id: 999 })).toEqual([
          NODE_STORE,
          'nodes',
          999,
          'content',
        ]);
      });
    });

    describe('location', () => {
      it('should exists', () => {
        expect(typeof CONFIG.value.location).toBe('function');

        expect(CONFIG.value.location({ id: 999 })).toEqual([
          NODE_STORE,
          'nodes',
          999,
          'customData',
          'location',
        ]);
      });
    });

    describe('icon', () => {
      it('should exists', () => {
        expect(typeof CONFIG.value.icon).toBe('function');

        expect(CONFIG.value.icon({ id: 999 })).toEqual([
          NODE_STORE,
          'nodes',
          999,
          'customData',
          'icon',
        ]);
      });
    });

    describe('placeId', () => {
      it('should exists', () => {
        expect(typeof CONFIG.value.placeId).toBe('function');

        expect(CONFIG.value.placeId({ id: 999 })).toEqual([
          NODE_STORE,
          'nodes',
          999,
          'customData',
          'placeId',
        ]);
      });
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

    describe('attachment', () => {
      it('should exists', () => {
        expect(typeof CONFIG.value.attachment).toBe('function');

        expect(CONFIG.value.attachment({ id: 999 })).toEqual([
          NODE_STORE,
          'nodes',
          999,
          'customData',
          'attachment',
        ]);
      });
    });

    describe('photo', () => {
      it('should exists', () => {
        expect(typeof CONFIG.value.photo).toBe('function');

        expect(CONFIG.value.photo({ id: 999 })).toEqual([
          NODE_STORE,
          'nodes',
          999,
          'photos',
          0,
        ]);
      });
    });
  });
});
