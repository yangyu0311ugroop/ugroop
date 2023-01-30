import { FILE_DATA_STORE } from 'appConstants';
import { FILE_CONTAINER_API, UPLOAD_FILE, DESTROY_FILE } from 'apis/constants';
import { requests } from 'utils/request';
import { SET_VALUE } from 'ugcomponents/SnackBar/config';

export const CONFIG = {
  name: FILE_CONTAINER_API,

  requests: {
    [UPLOAD_FILE]: ({ container, ...payload }) =>
      requests.fetchWithAuthorisationUpload(
        'post',
        `/${FILE_CONTAINER_API}/${container}/upload`,
        payload,
      ),
    [DESTROY_FILE]: ({ container, file }) =>
      requests.fetchWithAuthorisation(
        'delete',
        `/FileContainers/${container}/files/${file}`,
      ),
  },

  setValue: {
    files: [FILE_DATA_STORE, 'files'],
    ...SET_VALUE,
  },

  manuallySubscribe: true, // will not auto-subscribe to all values in `@@values`
};
