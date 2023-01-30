/**
 * Created by quando on 1/7/17.
 */
import { USERLOGOUT } from 'containers/App/constants';
export const PERSON_SETUP_PAGE = 'personSetup';

export const PERSON_CUSTOM_REDUCERS = {
  [USERLOGOUT]: store => store.clear(),
};
