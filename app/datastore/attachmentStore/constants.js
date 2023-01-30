import { ARRAY_HELPERS } from 'utils/helpers/arrays';

// region Paths
const makePath = path => ARRAY_HELPERS.arrayIfNot(path);

/**
 * Paths to each property of any attachment store object.
 */
export const ATTACHMENT_PATHS = {
  id: makePath('id'),
  url: makePath('url'),
  description: makePath('description'),
};
// endregion
