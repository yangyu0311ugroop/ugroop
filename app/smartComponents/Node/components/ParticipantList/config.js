import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import { COGNITO_STORE_SELECTORS } from 'datastore/stormPathStore/selectors';
import { TEMPLATE_MANAGEMENT_STORE_SELECTORS } from 'datastore/templateManagementStore/selectors';
import { RESAGA_HELPERS } from 'utils/helpers/resaga';

export const CONFIG_0 = {
  value: {
    templateId: TEMPLATE_MANAGEMENT_STORE_SELECTORS.templateId,
  },
};
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
};
