import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import {
  INTERESTED_PERSON_STATUSES,
  PARTICIPANT_STATUSES,
} from 'utils/constants/nodes';

export const CONFIG_0 = {
  value: {
    peopleTabId: ({ templateId: id }) =>
      NODE_STORE_SELECTORS.calculatedPeopleTabId({ id }),
    interestedPersonIds: ({ templateId: id }) =>
      NODE_STORE_SELECTORS.interestedPeople({ id }),
    participantIds: ({ templateId: id }) =>
      NODE_STORE_SELECTORS.calculatedParticipants({ id }),
  },
};
export const CONFIG = {
  value: {
    peopleTabIndex: {
      keyPath: ({ templateId }) =>
        NODE_STORE_SELECTORS.calculatedVisibleChildren({ id: templateId }),
      cacheKey: ({ templateId }) => `node.${templateId}.peopleTabIdIndex`,
      props: ({ peopleTabId }) => peopleTabId,
      getter: (calculatedVisibleChildren, peopleTabId) =>
        calculatedVisibleChildren.indexOf(peopleTabId),
    },
    interestedIds: NODE_STORE_SELECTORS.filterByStatuses({
      ids: 'interestedPersonIds',
      statuses: [INTERESTED_PERSON_STATUSES.pending],
    }),
    confirmedParticipantIds: NODE_STORE_SELECTORS.filterByStatuses({
      ids: 'participantIds',
      statuses: [PARTICIPANT_STATUSES.confirmed],
    }),
    pendingParticipantIds: NODE_STORE_SELECTORS.filterByStatuses({
      ids: 'participantIds',
      statuses: [PARTICIPANT_STATUSES.pending],
    }),
  },
  setValue: {},
};
