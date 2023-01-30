import _ from 'lodash';
import { PARTICIPANT_LINKEE } from 'utils/modelConstants';
import { INVITATION_STORE_SELECTORS } from 'datastore/invitationStore/selectors';
import { TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS } from 'datastore/templateManagementStore/selectors';

export const CONFIG_1 = () => ({
  value: {
    shareChildren: INVITATION_STORE_SELECTORS.shareChildren,
  },
});

export const CONFIG_2 = () => ({
  value: {
    shareChildren: INVITATION_STORE_SELECTORS.filterShareSubNodesByRole({
      ids: 'shareChildren',
      roles: [PARTICIPANT_LINKEE],
    }),
  },
});

export const CONFIG_3 = () => ({
  value: {
    nodeId: ({ shareChildren }) => {
      const id = _.first(shareChildren);
      return INVITATION_STORE_SELECTORS.shareSubNodeNodeId({ id });
    },
  },
  setValue: {
    invitationDetailOpen:
      TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.INVITATION_DETAIL.open,
  },
});
