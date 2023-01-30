import { NODE_STORE } from 'appConstants';
import { FILE_STORE_SELECTORS } from 'datastore/fileStore/selectors';
import { CONFIG, METAINFO_CONFIG } from '../config';

const testingData = {
  1: {
    content: 'test01',
    customData: { description: 'description01', location: 'location01' },
    photos: ['photo01'],
  },
  2: {
    content: 'test02',
    customData: { description: 'description02', location: 'location02' },
    photos: ['photo02'],
  },
  3: {
    content: 'test03',
    customData: { description: 'description03', location: 'location03' },
    photos: ['photo03'],
  },
  4: {
    content: 'test04',
    customData: { description: 'description04', location: 'location04' },
    photos: ['photo04'],
  },
  5: {
    content: 'test11',
    customData: { description: 'description11', location: 'location11' },
    photos: ['photo11'],
  },
  6: {
    content: 'test12',
    customData: { description: 'description12', location: 'location12' },
    photos: ['photo12'],
  },
  7: {
    content: 'test13',
    customData: { description: 'description13', location: 'location13' },
    photos: ['photo13'],
  },
  8: {
    content: 'test14',
    customData: { description: 'description14', location: 'location14' },
    photos: ['photo14'],
  },
};

describe('PubTemplateHeader/config.js', () => {
  afterEach(() => jest.clearAllMocks());

  describe('Smoke Test', () => {
    it('should exists', () => {
      expect(typeof CONFIG).toBe('object');
    });
  });
  describe('CONFIG value', () => {
    describe('title', () => {
      it('keypath', () => {
        expect(CONFIG.value.title.keyPath).toEqual([NODE_STORE, 'nodes']);
      });
      it('getter', () => {
        const result = CONFIG.value.title.getter(testingData, {
          templateId: 1,
        });
        expect(result).toBe('test01');
      });
    });
    describe('description', () => {
      it('keypath', () => {
        expect(CONFIG.value.description.keyPath).toEqual([NODE_STORE, 'nodes']);
      });
      it('getter', () => {
        const result = CONFIG.value.description.getter(testingData, {
          templateId: 1,
        });
        expect(result).toBe('description01');
      });
    });
    describe('templatePhotoUrl', () => {
      it('should exist', () => {
        const props = { templateId: 1 };
        expect(CONFIG.value.templatePhotoUrl(props)).toEqual([
          NODE_STORE,
          'nodes',
          1,
          'photos',
          0,
        ]);
      });
    });

    describe('photoMetaInfo', () => {
      it('should exist', () => {
        const props = { templatePhotoUrl: 'templatePhotoUrl' };
        expect(METAINFO_CONFIG.value.photoMetaInfo(props)).toEqual(
          FILE_STORE_SELECTORS.templateMetaInfo({ id: 'templatePhotoUrl' }),
        );
      });
    });
  });
});
