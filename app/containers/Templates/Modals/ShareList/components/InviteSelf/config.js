import {
  NODE_API,
  SHARE_NODE,
  USER_API,
  ORGANISATION_API,
  GET_TEMPLATE_DETAIL,
} from 'apis/constants';
import { COGNITO_STORE_SELECTORS } from 'datastore/stormPathStore/selectors';
import { COGNITO_ACCOUNTSTORE, USER_DATA_STORE } from 'appConstants';
import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import { PORTAL_HELPERS } from 'containers/Portal/helpers';

export const CONFIG = {
  value: {
    orgId: NODE_STORE_SELECTORS.organisationId,
    userId: [USER_DATA_STORE, 'userId'],
    myEmail: COGNITO_STORE_SELECTORS.myEmail,
    ownerId: NODE_STORE_SELECTORS.createdBy,
    isMember: {
      keyPath: [
        [COGNITO_ACCOUNTSTORE, 'orgs'],
        NODE_STORE_SELECTORS.organisationId,
      ],
      getter: (orgs, orgId = 0) => {
        let isMember = false;
        if (orgs) {
          orgs.forEach(({ id }) => {
            if (id === orgId) isMember = true;
          });
        }
        return isMember;
      },
    },
    tourRoles: NODE_STORE_SELECTORS.tourRoles,
  },
  isLoading: {
    fetching: [USER_API],
    sending: [NODE_API, SHARE_NODE],
    templateLoading: [ORGANISATION_API, GET_TEMPLATE_DETAIL],
  },
};

export const CONFIG2 = {
  value: {},
  setValue: {
    ...PORTAL_HELPERS.setValue,
  },
};
