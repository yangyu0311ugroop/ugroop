import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import { COGNITO_STORE_SELECTORS } from 'datastore/stormPathStore/selectors';
import { TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS } from 'datastore/templateManagementStore/selectors';
import { RESAGA_HELPERS } from 'utils/helpers/resaga';

export const CONFIG = {
  value: {
    myId: COGNITO_STORE_SELECTORS.myId,
    interestedPersonIds: RESAGA_HELPERS.mapToId(
      NODE_STORE_SELECTORS.interestedPeople,
      'templateId',
    ),
    participantIds: RESAGA_HELPERS.mapToId(
      NODE_STORE_SELECTORS.calculatedParticipants,
      'templateId',
    ),
  },
  setValue: {
    participantViewModeModalFilter:
      TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.PARTICIPANT.VIEW.modal,
    participantViewModeModalSortBy:
      TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.PARTICIPANT.VIEW.sort,
    participantViewModeModalMode:
      TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.PARTICIPANT_LIST.MODE.list,
  },
};
