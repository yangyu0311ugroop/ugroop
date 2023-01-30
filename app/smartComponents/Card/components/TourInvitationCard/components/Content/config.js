import { TEMPLATE_MANAGEMENT_VIEWSTORE } from 'appConstants';
import {
  INVITATION_VIEW_STORE_SELECTORS,
  INVITATION_STORE_SELECTORS,
} from 'datastore/invitationStore/selectors';
import { USER_STORE_SELECTORS } from 'datastore/userStore/selectors';

export const CONFIG = {
  value: {
    show: INVITATION_VIEW_STORE_SELECTORS.show,
    showCompleted: INVITATION_VIEW_STORE_SELECTORS.showCompleted,

    sent: ({ type }) => INVITATION_STORE_SELECTORS.sent({ type }),
    received: ({ type }) => INVITATION_STORE_SELECTORS.received({ type }),
    completedToMe: ({ type }) =>
      INVITATION_STORE_SELECTORS.completedToMe({ type }),
    completedFromMe: ({ type }) =>
      INVITATION_STORE_SELECTORS.completedFromMe({ type }),

    seeDetail: [TEMPLATE_MANAGEMENT_VIEWSTORE, 'seeDetail'],
    orgUserIds: ({ userId }) => USER_STORE_SELECTORS.orgUsers({ id: userId }),
  },
  setValue: {
    seeDetail: [TEMPLATE_MANAGEMENT_VIEWSTORE, 'seeDetail'],
  },
};
