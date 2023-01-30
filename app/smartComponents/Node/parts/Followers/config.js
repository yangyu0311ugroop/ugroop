import { TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS } from 'datastore/templateManagementStore/selectors';

export const CONFIG = {
  value: {},
  setValue: {
    createLinkFollowerDialogOpen:
      TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.createLinkFollowerDialogOpen,
    interestedPersonCreateOpen:
      TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.INTERESTED_PERSON.CREATE.open,
    interestedPersonCreateParticipantId:
      TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.INTERESTED_PERSON.CREATE
        .participantId,
  },
};
