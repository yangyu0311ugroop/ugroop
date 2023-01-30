import { FILE_DATA_STORE } from 'appConstants';
import { fromJS } from 'immutable';
import { FILE_STORE_RESELECTORS } from '../selectorsViaConnect';

describe('FILE_STORE_RESELECTORS', () => {
  const immutableState = fromJS({
    [FILE_DATA_STORE]: {
      files: {},
    },
  });
  const files = {
    'FileContainer/image1': {
      id: 1,
      type: 'tour_banner',
      url: 'FileContainer/image1',
    },
    'FileContainer/image2': { id: 2, type: null, url: 'FileContainer/image2' },
  };
  const state = immutableState.setIn([FILE_DATA_STORE, 'files'], files);
  describe('getFiles', () => {
    it('should get files from map', () => {
      const filesInStore = FILE_STORE_RESELECTORS.getFiles(state);

      expect(filesInStore).toEqual(files);
    });
  });

  describe('getTourBanner', () => {
    it('should return the photo id of photo with tour banner as type', () => {
      const tourBanner = FILE_STORE_RESELECTORS.getTourBanner(state, [
        'FileContainer/image1',
        'FileContainer/image2',
      ]);

      expect(tourBanner).toBe('FileContainer/image1');
    });
  });

  describe('getPhotoId', () => {
    it('should return the id of photo', () => {
      const photoId = FILE_STORE_RESELECTORS.getPhotoId(
        state,
        'FileContainer/image1',
      );

      expect(photoId).toBe(1);
    });
  });

  describe('getOrgPhoto', () => {
    it('should return a photo with type null', () => {
      const orgPhoto = FILE_STORE_RESELECTORS.getOrgPhoto(state, [
        'FileContainer/image1',
        'FileContainer/image2',
      ]);

      expect(orgPhoto).toBe('FileContainer/image2');
    });
  });
});
