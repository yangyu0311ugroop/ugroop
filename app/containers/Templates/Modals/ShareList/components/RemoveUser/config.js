import { REMOVE_USER_FROM_TOUR, TEMPLATE_API } from 'apis/constants';
import { COGNITO_STORE_SELECTORS } from 'datastore/stormPathStore/selectors';
import { TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS } from 'datastore/templateManagementStore/selectors';
import { TOUR_INTERESTED, TOUR_PARTICIPANT } from 'utils/modelConstants';
import { TOUR_CONTRIBUTOR_ROLE_TYPES } from 'apis/components/Ability/roles';
import {
  ABILITY_DATA_STORE,
  TEMPLATE_MANAGEMENT_VIEWSTORE,
} from 'appConstants';
import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';

export const CONFIG = {
  value: {
    me: COGNITO_STORE_SELECTORS.myId,
    createdBy: ({ nodeId: id }) => NODE_STORE_SELECTORS.createdBy({ id }),
    closeDetailDlg: {
      keyPath: [
        TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.PARTICIPANT_LIST.open,
        TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.INTERESTED_LIST.open,
        TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.TOUR_CONNECTION.open,
      ],
      getter: (partDlg, intDlg, shareDlg, { role }) =>
        (partDlg && role === TOUR_PARTICIPANT) ||
        (intDlg && role === TOUR_INTERESTED) ||
        (shareDlg && TOUR_CONTRIBUTOR_ROLE_TYPES.includes(role)),
    },
    participantDialog:
      TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.PARTICIPANT.VIEW.open,
    interestedDialog:
      TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.INTERESTED_PERSON.VIEW.open,
  },
  isLoading: {
    sending: [TEMPLATE_API, REMOVE_USER_FROM_TOUR],
  },
};

export const CONFIG2 = {
  value: {},
  setValue: {
    closeRoleDialog:
      TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.TOUR_CONNECTION.open,
    participantDialog:
      TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.PARTICIPANT.VIEW.open,
    interestedDialog:
      TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.INTERESTED_PERSON.VIEW.open,
    executeAbilityUpdate: [ABILITY_DATA_STORE, 'executeAbilityUpdate'],
    shareDialog: [TEMPLATE_MANAGEMENT_VIEWSTORE, 'shareDialog'],
    nodes: NODE_STORE_SELECTORS.nodes,
    removeUser: [TEMPLATE_MANAGEMENT_VIEWSTORE, 'cancelInvitation'],
    tourConnectionOpen:
      TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.TOUR_CONNECTION.open,
    tourConnectionId:
      TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.TOUR_CONNECTION.id,
  },
};
