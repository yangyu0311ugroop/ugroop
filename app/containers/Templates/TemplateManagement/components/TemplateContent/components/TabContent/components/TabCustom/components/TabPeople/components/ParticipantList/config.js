import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import { COGNITO_STORE_SELECTORS } from 'datastore/stormPathStore/selectors';
import { TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS } from 'datastore/templateManagementStore/selectors';
import { RESAGA_HELPERS } from 'utils/helpers/resaga';
import { PORTAL_HELPERS } from 'containers/Portal/helpers';

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
    peopleTabOptionSelected:
      TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.peopleTabOptionSelected,
    paxLabel: TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.paxLabel,
  },
  setValue: {
    participantCreateOpen:
      TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.PARTICIPANT.CREATE.open,
    participantCreateParentNodeId:
      TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.PARTICIPANT.CREATE.parentNodeId,
    participantCreateMode:
      TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.PARTICIPANT.CREATE.mode,
    ...PORTAL_HELPERS.setValue,
  },
};
