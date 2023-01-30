import _ from 'lodash';
import { INVITATION_STORE_SELECTORS } from 'datastore/invitationStore/selectors';
import { TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS } from 'datastore/templateManagementStore/selectors';

export const CONFIG = {
  value: {
    nodeId: ({ userNodeIds }) =>
      INVITATION_STORE_SELECTORS.userNodeNodeId({ id: _.first(userNodeIds) }),
  },
  setValue: {
    interestedPersonViewOpen:
      TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.INTERESTED_PERSON.VIEW.open,
    interestedPersonViewId:
      TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.INTERESTED_PERSON.VIEW.id,
    interestedPersonViewMode:
      TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.INTERESTED_PERSON.VIEW.mode,
  },
};
