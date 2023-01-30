import { FILE_DATA_STORE } from 'appConstants';
import { LOGIC_HELPERS } from 'utils/helpers/logic';

// added isTemplatePhoto to reuse new photo props w/ old photo structure
export const selectFileUrl = ({ id, isTemplatePhoto }) =>
  LOGIC_HELPERS.ifElse(
    isTemplatePhoto,
    [FILE_DATA_STORE, 'files', id, 'content'],
    [FILE_DATA_STORE, 'files', id, 'url'],
  );
export const templatePhoto = ({ id }) => [
  FILE_DATA_STORE,
  'files',
  id,
  'content',
];
export const templateMetaInfo = ({ id }) => [
  FILE_DATA_STORE,
  'files',
  id,
  'metaInfo',
];
export const files = [FILE_DATA_STORE, 'files'];

export const selectPhoto = ({ id }) => [FILE_DATA_STORE, 'files', id, 'url'];
export const selectMetaInfo = () => ({
  keyPath: ({ id }) => [FILE_DATA_STORE, 'files', id, 'metaInfo'],
  spreadObject: true,
});
export const selectFileId = ({ id }) => [FILE_DATA_STORE, 'files', id, 'id'];
export const noSpreadMetaInfo = ({ id }) => [
  FILE_DATA_STORE,
  'files',
  id,
  'metaInfo',
];
export const selectFileName = ({ id }) => [
  FILE_DATA_STORE,
  'files',
  id,
  'name',
];
export const selectFileDescription = ({ id }) => [
  FILE_DATA_STORE,
  'files',
  id,
  'description',
];
export const selectFileSize = ({ id }) => [
  FILE_DATA_STORE,
  'files',
  id,
  'fileSize',
];
export const type = ({ id }) => [FILE_DATA_STORE, 'files', id, 'type'];

export const FILE_STORE_SELECTORS = {
  selectFileUrl,
  files,
  selectPhoto,
  selectMetaInfo,
  templatePhoto,
  templateMetaInfo,
  selectFileId,
  noSpreadMetaInfo,
  selectFileName,
  selectFileDescription,
  selectFileSize,
  type,
};
