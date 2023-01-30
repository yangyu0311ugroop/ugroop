import { INVITATION_STORE_SELECTORS } from 'datastore/invitationStore/selectors';
import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import { COGNITO_STORE_SELECTORS } from 'datastore/stormPathStore/selectors';
import { TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS } from 'datastore/templateManagementStore/selectors';
import first from 'lodash/first';
import { RESAGA_HELPERS } from 'utils/helpers/resaga';

export const CONFIG_0 = {
  value: {
    userId: COGNITO_STORE_SELECTORS.myId,
    participantIds: RESAGA_HELPERS.mapToId(
      NODE_STORE_SELECTORS.calculatedParticipants,
      'templateId',
    ),
    interestedPersonIds: RESAGA_HELPERS.mapToId(
      NODE_STORE_SELECTORS.interestedPeople,
      'templateId',
    ),
  },
};

export const CONFIG = {
  value: {
    userParticipantNodeId: ({ userParticipantId }) =>
      INVITATION_STORE_SELECTORS.userNodeNodeId({
        id: first(userParticipantId),
      }),
    userFollowerNodeId: ({ userFollowerId }) =>
      INVITATION_STORE_SELECTORS.userNodeNodeId({
        id: first(userFollowerId),
      }),
    peopleTabOptionSelected:
      TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.peopleTabOptionSelected,
  },
};

export const CONFIG_2 = {
  value: {
    participantFollowers: RESAGA_HELPERS.mapToId(
      NODE_STORE_SELECTORS.followers,
      'userParticipantNodeId',
    ),
  },
};

export const CONFIG_3 = {
  value: {
    participantFollowerNodeIds: {
      keyPath: ({ participantFollowers = [] }) =>
        participantFollowers.map(participantFollower =>
          NODE_STORE_SELECTORS.linkProp(['nextNodeId'])({
            id: participantFollower,
          }),
        ),
      cacheKey: ({ participantFollowers = [] }) =>
        `TabPeople.FollowerList.${participantFollowers.toString()}`,
      props: () => null,
      getter: (...args) => args.filter(arg => arg),
    },
  },
};

export const SET_VALUE = {
  setValue: {
    participantCreateOpen:
      TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.PARTICIPANT.CREATE.open,
    participantCreateParentNodeId:
      TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.PARTICIPANT.CREATE.parentNodeId,
    participantCreateMode:
      TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.PARTICIPANT.CREATE.mode,
    interestedPersonCreateOpen:
      TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.INTERESTED_PERSON.CREATE.open,
  },
};
