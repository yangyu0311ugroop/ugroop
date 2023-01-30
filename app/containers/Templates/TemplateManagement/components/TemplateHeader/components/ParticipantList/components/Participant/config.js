import _ from 'lodash';
import { INVITATION_STORE_SELECTORS } from 'datastore/invitationStore/selectors';
import { TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS } from 'datastore/templateManagementStore/selectors';

export const CONFIG = {
  value: {
    nodeId: ({ userNodeIds }) =>
      INVITATION_STORE_SELECTORS.userNodeNodeId({ id: _.first(userNodeIds) }),
  },
  setValue: {
    participantViewOpen:
      TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.PARTICIPANT.VIEW.open,
    participantViewId:
      TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.PARTICIPANT.VIEW.id,
    participantViewMode:
      TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.PARTICIPANT.VIEW.mode,
  },
};
