import { INVITATION_STORE, TEMPLATE_MANAGEMENT_VIEWSTORE } from 'appConstants';
import { INVITATION_VIEW_STORE_SELECTORS } from 'datastore/invitationStore/selectors';

export const CONFIG = {
  value: {
    show: INVITATION_VIEW_STORE_SELECTORS.show,
    showCompleted: INVITATION_VIEW_STORE_SELECTORS.showCompleted,

    sent: [INVITATION_STORE, 'fromMe'],
    received: [INVITATION_STORE, 'toMe'],
    completedToMe: [INVITATION_STORE, 'completedToMe'],
    completedFromMe: [INVITATION_STORE, 'completedFromMe'],

    seeDetail: [TEMPLATE_MANAGEMENT_VIEWSTORE, 'seeDetail'],
  },
  setValue: {
    seeDetail: [TEMPLATE_MANAGEMENT_VIEWSTORE, 'seeDetail'],
  },
};
