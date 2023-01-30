import { NODE_PATHS } from 'datastore/nodeStore/constants';
import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import { TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS } from 'datastore/templateManagementStore/selectors';
import { RESAGA_HELPERS } from '../../../../../utils/helpers/resaga';

export const CONFIG = {
  value: {
    firstName: ({ parentNodeId: id }) =>
      NODE_STORE_SELECTORS.nodeProp({ id, path: NODE_PATHS.firstName }),
    participantWithRelationship:
      TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.PARTICIPANT.CREATE
        .withRelationship,
    followerId:
      TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.INTERESTED_PERSON.VIEW.id,
    groupId: TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.PARTICIPANT.CREATE.groupId,
    participantInGroup:
      TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.PARTICIPANT.CREATE
        .participantInGroup,
    orgId: RESAGA_HELPERS.mapToId(
      NODE_STORE_SELECTORS.organisationId,
      'templateId',
    ),
    paxLabel: TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.paxLabel,
  },
  setValue: {
    calculatedParticipants: ({ templateId: id }) =>
      NODE_STORE_SELECTORS.calculatedParticipants({ id }),
    participantWithRelationship:
      TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.PARTICIPANT.CREATE
        .withRelationship,
    groupId: TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.PARTICIPANT.CREATE.groupId,
    participantInGroup:
      TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.PARTICIPANT.CREATE
        .participantInGroup,
  },
};
