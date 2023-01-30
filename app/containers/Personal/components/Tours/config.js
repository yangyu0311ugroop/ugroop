import { COGNITO_STORE_SELECTOR } from 'datastore/stormPathStore/selectors.resaga';
import { USER_STORE_SELECTORS } from 'datastore/userStore/selectors';
import { RESAGA_HELPERS } from 'utils/helpers/resaga';

export const CONFIG = {
  value: {
    rootNodeId: COGNITO_STORE_SELECTOR.rootNodeId.value,
    userId: COGNITO_STORE_SELECTOR.userId.value,
  },
  setValue: {},
};

export const CONFIG_USER_ORGS = {
  value: {
    userOrgs: RESAGA_HELPERS.mapToId(
      USER_STORE_SELECTORS.organisations,
      'userId',
    ),
  },
};
