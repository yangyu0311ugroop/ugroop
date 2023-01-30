/**
 * Created by stephenkarpinskyj on 30/4/18.
 */

import { AWAITING } from 'appConstants';
import { DATA_HELPERS } from 'datastore/utils';

export FileDropzone from './components/Dropzone';

export withUploadFile from './hoc/withUploadFile';

export const MAX_PHOTO_SIZE = 10 * 1000000; // 10MB

const genId = (max = 999999) => Math.floor(Math.random() * Math.floor(max));

const reduceDrop = ({ droppedFiles, droppedIds }, requestFile) => {
  const index = FILE_HELPERS.genId();
  return {
    droppedFiles: DATA_HELPERS.objectUpdate({
      [index]: {
        id: index,
        requestFile,
        status: AWAITING,
      },
    })(droppedFiles),
    droppedIds: DATA_HELPERS.arrayAdd(index)(droppedIds),
  };
};

const normaliseDrop = files =>
  files.reduce(FILE_HELPERS.reduceDrop, {
    droppedFiles: {},
    droppedIds: [],
  });

export const FILE_HELPERS = {
  genId,
  reduceDrop,
  normaliseDrop,
};
