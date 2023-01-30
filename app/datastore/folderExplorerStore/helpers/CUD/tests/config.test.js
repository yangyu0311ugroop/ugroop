import { NODE_STORE_SELECTORS } from '../../../../nodeStore/selectors';
import { CONFIG, GET_USER_ID_CONFIG, PHOTO_METAINFO_CONFIG } from '../config';

describe('CRUD/config.js', () => {
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
  });
});

describe('CRUD/config.js GET_USER_ID_CONFIG', () => {
  afterEach(() => jest.clearAllMocks());

  describe('Smoke Test', () => {
    it('should exists', () => {
      expect(typeof GET_USER_ID_CONFIG).toBe('object');
    });
  });

  describe('value', () => {
    it('should exists', () => {
      expect(typeof GET_USER_ID_CONFIG.value).toBe('object');
    });

    it('should have parentId', () => {
      expect(GET_USER_ID_CONFIG.value.parentId({ folderId: 1 })).toEqual(
        NODE_STORE_SELECTORS.parentNodeId({ id: 1 }),
      );
    });
  });
});

describe('CRUD/config.js PHOTO_METAINFO_CONFIG', () => {
  afterEach(() => jest.clearAllMocks());

  describe('Smoke Test', () => {
    it('should exists', () => {
      expect(typeof PHOTO_METAINFO_CONFIG).toBe('object');
    });
  });

  describe('setValue', () => {
    it('should exists', () => {
      expect(typeof PHOTO_METAINFO_CONFIG.setValue).toBe('object');
    });
  });

  describe('value', () => {
    it('should exists', () => {
      expect(typeof PHOTO_METAINFO_CONFIG.value).toBe('object');
    });

    describe('userMetaInfo', () => {
      describe('keyPath', () => {
        it('should return a particular keypath shape', () => {
          expect(
            PHOTO_METAINFO_CONFIG.value.userMetaInfo.keyPath({
              userProfilePhotoUrl: '/photo',
            }),
          ).toMatchSnapshot();
        });
      });
    });
  });
});
