/**
 * Created by edil on 7/27/17.
 */
import { CONFIG as config } from 'resaga';
import { fetchUpload } from 'utils/request';
import { COGNITO_ACCOUNTSTORE } from '../../../../../appConstants';

export const UPLOAD_ORIGINAL_IMAGE = 'uploadOriginalImage';
export const UPLOAD_PROFILE_COMPONENT = 'uploadProfileCP';

export const UPLOAD_ERROR =
  'Whoops, something went wrong while uploading. Please try again.';
export const UPLOAD_SERVER_ERROR =
  'Whoops, something went wrong on the server. Please again later.';

export const CONFIG = {
  [config.PAGE]: UPLOAD_PROFILE_COMPONENT,
  [config.SUBMIT]: {
    /* eslint-disable no-unused-vars */
    [UPLOAD_ORIGINAL_IMAGE]: ({
      payload: { container, data },
      blob,
      imageSize,
    }) => fetchUpload(container, data),
  },
  setValue: {
    avatar: [COGNITO_ACCOUNTSTORE, 'avatar'],
  },
};
