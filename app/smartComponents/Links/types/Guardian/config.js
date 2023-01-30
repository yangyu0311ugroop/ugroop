import { NODE_STORE_HELPERS } from 'datastore/nodeStore/helpers';
import { NODE_STORE, TEMPLATE_MANAGEMENT_VIEWSTORE } from 'appConstants';
import takeRight from 'lodash/takeRight';
import dropRight from 'lodash/dropRight';
import zip from 'lodash/zip';
import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import {
  TEMPLATE_MANAGEMENT_STORE_SELECTORS,
  TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS,
} from 'datastore/templateManagementStore/selectors';
import { RESAGA_HELPERS } from 'utils/helpers/resaga';

export const CONFIG_0 = {
  value: {
    templateId: TEMPLATE_MANAGEMENT_STORE_SELECTORS.templateId,
    oldFollowerId: RESAGA_HELPERS.mapToId(
      NODE_STORE_SELECTORS.oldFollowerProp(['id']),
      'participantId',
    ),
    linkIds: NODE_STORE_SELECTORS.linkIds,
    followers: RESAGA_HELPERS.mapToId(
      NODE_STORE_SELECTORS.followers,
      'participantId',
    ),
  },
};

export const CONFIG = {
  value: {
    nextNodeIds: NODE_STORE_HELPERS.nextNodeIds(),
    interestedPeople: RESAGA_HELPERS.mapToId(
      NODE_STORE_SELECTORS.interestedPeople,
      'templateId',
    ),
    nextNodeId: NODE_STORE_SELECTORS.linkProp(['nextNodeId']),
    prevNodeId: NODE_STORE_SELECTORS.linkProp(['prevNodeId']),
    relationship: NODE_STORE_SELECTORS.linkProp(['content', 'relationship']),
    linkIdsWithNextNodeIds: {
      keyPath: ({ linkIds = [] }) =>
        linkIds.map(linkId => [NODE_STORE, 'links', linkId, 'nextNodeId']),
      cacheKey: ({ linkIds = [] }) =>
        `smartComponents.Links.types.Guardian.linkIdsWithNextNodeIds.${
          linkIds.length ? linkIds.toString() : null
        }`,
      props: ({ linkIds = [] }) => ({ linkIds }),
      getter: (...args) => {
        const nextNodeIds = dropRight(args, 1);
        const propsObject = takeRight(args, 1);
        const { linkIds } = propsObject[0];
        const paired = zip(linkIds, nextNodeIds);
        return paired;
      },
    },
  },
};

export const CONFIG_2 = {
  value: {
    selectableFollowers: {
      getter: ({ nextNodeIds, interestedPeople, oldFollowerId }) =>
        interestedPeople.filter(
          interestedPersonId =>
            !nextNodeIds.includes(interestedPersonId) &&
            oldFollowerId !== interestedPersonId,
        ),
    },
    participantLinkIds: {
      keyPath: ({ linkIdsWithNextNodeIds = [] }) =>
        linkIdsWithNextNodeIds.map(item => [
          NODE_STORE,
          'links',
          item[0],
          'prevNodeId',
        ]),
      cacheKey: ({ linkIdsWithNextNodeIds = [] }) =>
        `smartComponents.Links.types.Guardian.linkIdsWithNextNodeIds.${
          linkIdsWithNextNodeIds.length
            ? linkIdsWithNextNodeIds.toString()
            : null
        }`,
      props: ({ linkIdsWithNextNodeIds = [], nextNodeId }) => ({
        linkIdsWithNextNodeIds,
        nextNodeId,
      }),
      getter: (...args) => {
        const propsObject = takeRight(args, 1);
        const participantIds = dropRight(args, 1);
        const { linkIdsWithNextNodeIds, nextNodeId } = propsObject[0];
        const paired = linkIdsWithNextNodeIds.map((item, index) => [
          participantIds[index],
          ...item,
        ]);
        const filtered = paired.filter(item => item[0]);
        const filteredWithNextNodeId = filtered.filter(
          item => item[2] === nextNodeId,
        );
        return filteredWithNextNodeId;
      },
    },
  },
};

export const CONFIG_3 = {
  value: {
    participantFollowers: {
      keyPath: ({ participantLinkIds = [] }) =>
        participantLinkIds.map(item => [
          NODE_STORE,
          'nodes',
          item[0],
          'followers',
        ]),
      cacheKey: ({ participantLinkIds = [] }) =>
        `smartComponents.Links.types.Guardian.linkIdsWithNextNodeIds.${
          participantLinkIds.length ? participantLinkIds.toString() : null
        }`,
      props: ({ participantLinkIds = [] }) => participantLinkIds,
      getter: (...args) => {
        const followerArray = dropRight(args, 1);
        const [otherIds] = takeRight(args, 1);
        const toBeReturned = otherIds.map((item, index) => ({
          participantId: item[0],
          followers: followerArray[index],
          link: item[1],
        }));
        return toBeReturned;
      },
    },
  },
  setValue: {
    calculatedParticipants: ({ templateId: id }) =>
      NODE_STORE_SELECTORS.calculatedParticipants({ id }),
    nodes: NODE_STORE_SELECTORS.nodes,
    linkIds: NODE_STORE_SELECTORS.linkIds,
  },
};

export const CONFIG_4 = () => ({
  setValue: {
    interestedPersonViewOpen:
      TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.INTERESTED_PERSON.VIEW.open,
    interestedPersonViewId:
      TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.INTERESTED_PERSON.VIEW.id,
    interestedPersonViewMode:
      TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.INTERESTED_PERSON.VIEW.mode,
    seeDetail: [TEMPLATE_MANAGEMENT_VIEWSTORE, 'seeDetail'],
  },
});
