import { INVITATION_STORE_SELECTORS } from 'datastore/invitationStore/selectors';
import { TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS } from 'datastore/templateManagementStore/selectors';
import first from 'lodash/first';

export const CONFIG = {
  value: {
    userParticipantNodeId: ({ userParticipantId }) =>
      INVITATION_STORE_SELECTORS.userNodeNodeId({
        id: first(userParticipantId),
      }),
    userFollowerNodeId: ({ userFollowerId }) =>
      INVITATION_STORE_SELECTORS.userNodeNodeId({
        id: first(userFollowerId),
      }),
  },
  setValue: {
    interestedListViewModalFilter:
      TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.INTERESTED_LIST.FILTER.modal,
  },
};
