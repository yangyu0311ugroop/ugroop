import { RESET_GLOBAL_ERROR } from './constants';

/**
 * Return Reset Error Action
 * @returns {{type}}
 */
export function resetError() {
  return {
    type: RESET_GLOBAL_ERROR,
  };
}
