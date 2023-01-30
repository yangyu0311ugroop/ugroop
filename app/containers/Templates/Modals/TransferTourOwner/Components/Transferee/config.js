import {
  COGNITO_ACCOUNTSTORE,
  TEMPLATE_MANAGEMENT_VIEWSTORE,
} from 'appConstants';

import { INVITATION_STORE_SELECTORS } from 'datastore/invitationStore/selectors';

export const CONFIG = {
  value: {
    me: [COGNITO_ACCOUNTSTORE, 'account', 'id'],
    content: ({ templateId }) =>
      INVITATION_STORE_SELECTORS.nodeContent({ id: templateId }),
  },

  setValue: {
    seeDetail: [TEMPLATE_MANAGEMENT_VIEWSTORE, 'seeDetail'],
  },
};
