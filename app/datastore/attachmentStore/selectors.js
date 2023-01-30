import { ATTACHMENT_DATASTORE } from 'appConstants';
import { ARRAY_HELPERS } from 'utils/helpers/arrays';

export const attachments = [ATTACHMENT_DATASTORE, 'attachments'];
export const attachmentProp = ({ id, path }) => [
  ...attachments,
  id,
  ...ARRAY_HELPERS.arrayIfNot(path),
];
export const name = ({ id }) => [...attachments, id, 'name'];
export const description = ({ id }) => [...attachments, id, 'description'];
export const url = ({ id }) => [...attachments, id, 'url'];
export const fileSize = ({ id }) => [...attachments, id, 'fileSize'];
const attachment = ({ id }) => [...attachments, id];
export const ATTACHMENT_STORE_SELECTORS = {
  attachments,
  attachmentProp,
  name,
  description,
  url,
  fileSize,
  attachment,
};
