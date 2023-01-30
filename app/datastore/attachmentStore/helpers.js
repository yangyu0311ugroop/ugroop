import { ARRAY_HELPERS } from 'utils/helpers/arrays';
import { INPUT_UTILS } from 'ugcomponents/Inputs';

const pathToAttachmentInputName = (path, { nameKey = 'attachment' } = {}) => {
  const pathArray = [
    ...ARRAY_HELPERS.arrayIfNot(nameKey),
    ...ARRAY_HELPERS.arrayIfNot(path),
  ];
  return INPUT_UTILS.storePathToInputName(pathArray);
};

export const ATTACHMENT_STORE_HELPERS = {
  pathToAttachmentInputName,
};
