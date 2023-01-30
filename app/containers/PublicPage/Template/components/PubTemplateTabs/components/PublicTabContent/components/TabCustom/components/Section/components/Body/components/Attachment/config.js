import { FILE_DATA_STORE } from 'appConstants';

export const CONFIG = {
  value: {
    name: ({ id }) => [FILE_DATA_STORE, 'files', id, 'name'],
    attachmentURL: ({ id }) => [FILE_DATA_STORE, 'files', id, 'url'],
    fileSize: ({ id }) => [FILE_DATA_STORE, 'files', id, 'fileSize'],
    description: ({ id }) => [FILE_DATA_STORE, 'files', id, 'description'],
  },
};
