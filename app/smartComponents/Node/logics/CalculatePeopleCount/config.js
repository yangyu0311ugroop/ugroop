import {
  TOUR_CONTRIBUTOR_ROLE,
  TOUR_CONTRIBUTOR_ROLE_TYPES,
} from 'apis/components/Ability/roles';
import { INVITATION_STORE_SELECTORS } from 'datastore/invitationStore/selectors';
import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import { COGNITO_STORE_SELECTORS } from 'datastore/stormPathStore/selectors';
import { TEMPLATE_MANAGEMENT_STORE_SELECTORS } from 'datastore/templateManagementStore/selectors';
import { USER_STORE_SELECTORS } from 'datastore/userStore/selectors';
import { RESAGA_HELPERS } from 'utils/helpers/resaga';
import { UID_HELPERS } from 'utils/helpers/uid';
import dropRight from 'lodash/dropRight';
import union from 'lodash/union';

export const CONFIG_0 = {
  value: {
    templateId: TEMPLATE_MANAGEMENT_STORE_SELECTORS.templateId,
    userId: COGNITO_STORE_SELECTORS.myId,
    calculatedPeopleCount: NODE_STORE_SELECTORS.calculatedPeopleCount,
  },
};

export const GET_ROLES = {
  value: {
    roles: {
      getter: ({ roles = [] }) => {
        if (
          roles.includes(TOUR_CONTRIBUTOR_ROLE.TOUR_ORGANIZER) ||
          roles.includes(TOUR_CONTRIBUTOR_ROLE.TOUR_OWNER) ||
          roles.includes(TOUR_CONTRIBUTOR_ROLE.TOUR_COLLABORATOR) ||
          roles.includes(TOUR_CONTRIBUTOR_ROLE.TOUR_VIEWER)
        ) {
          return TOUR_CONTRIBUTOR_ROLE_TYPES;
        }
        // for non contributors and public
        return [
          TOUR_CONTRIBUTOR_ROLE.TOUR_ORGANIZER,
          TOUR_CONTRIBUTOR_ROLE.TOUR_OWNER,
        ];
      },
    },
  },
};

export const CONFIG = {
  value: {
    ownerId: RESAGA_HELPERS.mapToId(
      NODE_STORE_SELECTORS.createdBy,
      'templateId',
    ),

    followersEmail: {
      keyPath: ({ followers = [] }) =>
        followers.map(followerId =>
          NODE_STORE_SELECTORS.email({ id: followerId }),
        ),
      cacheKey: ({ followers = [] }) =>
        `CalculatePeopleCount.${followers.toString()}.followersCount`,
      props: ({ followers }) => followers,
      getter: (...args) => {
        const followerEmails = dropRight(args);

        return followerEmails.filter(email => email !== undefined);
      },
    },

    participantEmails: {
      keyPath: ({ participants = [] }) =>
        participants.map(participantId =>
          NODE_STORE_SELECTORS.email({ id: participantId }),
        ),
      cacheKey: ({ participants = [] }) =>
        `CalculatePeopleCount.${participants.toString()}.participantsCount`,
      props: ({ participants }) => participants,
      getter: (...args) => {
        const participantEmails = dropRight(args);

        return participantEmails.filter(email => email !== undefined);
      },
    },

    organiserUserIds: {
      keyPath: ({ userNodeIds = [] }) =>
        userNodeIds.map(userNodeId =>
          INVITATION_STORE_SELECTORS.userNodeUserId({ id: userNodeId }),
        ),
      cacheKey: ({ userNodeIds = [] }) =>
        `CalculatePeopleCount.${userNodeIds.toString()}.organiserUserIds`,
      props: ({ userNodeIds }) => userNodeIds,
      getter: (...args) => {
        const organiserEmails = dropRight(args);

        return organiserEmails;
      },
    },
  },
};

export const CONFIG_2 = {
  value: {
    ownerEmail: RESAGA_HELPERS.mapToId(USER_STORE_SELECTORS.email, 'ownerId'),
    organiserEmails: {
      keyPath: ({ organiserUserIds = [] }) =>
        organiserUserIds.map(organiserUserId =>
          USER_STORE_SELECTORS.email({ id: organiserUserId }),
        ),
      cacheKey: ({ organiserUserIds = [] }) =>
        `CalculatePeopleCount.${organiserUserIds.toString()}.organiserEmails`,
      props: ({ organiserUserIds }) => organiserUserIds,
      getter: (...args) => {
        const organiserEmails = dropRight(args);

        return organiserEmails.filter(email => email !== undefined);
      },
    },
  },
};

export const CONFIG_3 = {
  value: {
    mergedUserEmails: {
      cacheKey: ({ followers = [], userNodeIds = [], participants = [] }) =>
        `CalculatePeopleCount.${followers.toString()}.${userNodeIds.toString()}.${participants.toString()}.mergedUserEmails`,
      getter: ({
        organiserEmails = [],
        participantEmails = [],
        followersEmail = [],
        ownerEmail,
      }) => {
        const filteredFollowerEmails = followersEmail.map(email =>
          email === '' ? UID_HELPERS.generateUID() : email,
        );

        const filteredParticipantEmails = participantEmails.map(email =>
          email === '' ? UID_HELPERS.generateUID() : email,
        );

        const filteredOrganiserEmails = organiserEmails.map(email =>
          email === '' ? UID_HELPERS.generateUID() : email,
        );

        const merged = union(
          filteredFollowerEmails,
          filteredParticipantEmails,
          filteredOrganiserEmails,
          [ownerEmail],
        );

        return merged;
      },
    },
  },
  setValue: {
    calculatedPeopleCount: NODE_STORE_SELECTORS.calculatedPeopleCount,
  },
};
