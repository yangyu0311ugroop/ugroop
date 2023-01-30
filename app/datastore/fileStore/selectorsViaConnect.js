import { FILE_DATA_STORE } from 'appConstants';
import createCachedSelector from 're-reselect';

const getFiles = state => state.get(FILE_DATA_STORE).get('files');

const getTourBanner = createCachedSelector(
  getFiles,
  (_, photos) => photos,
  (files, photos = []) => {
    if (!photos) return null;
    const filtered = photos.filter(photo => {
      if (!files[photo]) return false;
      return files[photo].type === 'tour_banner';
    });

    return filtered[0];
  },
)(
  (_, photos = []) =>
    `files.getTourBanner.${photos ? photos.toString() : 'null'}`,
);

const getPhotoId = createCachedSelector(
  getFiles,
  (_, id) => id,
  (files = [], id) => {
    if (!files[id]) return null;
    return files[id].id;
  },
)((_, id) => `files.getPhotoId.${id}`);

const getOrgPhoto = createCachedSelector(
  getFiles,
  (_, ids) => ids,
  (files, ids = []) => {
    if (!ids) return null;
    const filtered = ids.filter(id => {
      const file = files[id];
      if (!file) return false;
      const type = file.type;

      return type === null;
    });

    return filtered[0];
  },
)((_, ids = []) => `files.getOrgPhoto.${ids ? ids.toString() : 'null'}`);

export const FILE_STORE_RESELECTORS = {
  getTourBanner,
  getPhotoId,
  getFiles,
  getOrgPhoto,
};
