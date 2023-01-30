import { COGNITO_STORE_SELECTOR } from 'datastore/stormPathStore/selectors.resaga';
import {
  TEMPLATE_MANAGEMENT_STORE_SELECTORS,
  TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS,
} from 'datastore/templateManagementStore/selectors';
import { COGNITO_STORE_SELECTORS } from 'datastore/stormPathStore/selectors';
import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import { RESAGA_HELPERS } from 'utils/helpers/resaga';

export const CONFIG_0 = {
  value: {
    templateId: TEMPLATE_MANAGEMENT_STORE_SELECTORS.templateId,
    myId: COGNITO_STORE_SELECTOR.userId,
    userId: COGNITO_STORE_SELECTORS.myId,
  },
};

export const CONFIG = {
  value: {
    peopleView: TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.peopleView,
    peopleTabOptionSelected:
      TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.peopleTabOptionSelected,
    participantIds: RESAGA_HELPERS.mapToId(
      NODE_STORE_SELECTORS.participants,
      'templateId',
    ),
  },
  setValue: {
    shareListFilter: TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.shareListFilter,
    filterRoleBy: TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.filterRoleBy,
    peopleTabOptionSelected:
      TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.peopleTabOptionSelected,
    invitationMode: TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.invitationMode,
    participantViewOpen:
      TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.PARTICIPANT.VIEW.open,
    participantViewId:
      TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.PARTICIPANT.VIEW.id,
  },
};
