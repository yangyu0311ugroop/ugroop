import { NODE_STORE_HELPERS } from 'datastore/nodeStore/helpers';
import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import { TEMPLATE_MANAGEMENT_STORE_SELECTORS } from 'datastore/templateManagementStore/selectors';
import { RESAGA_HELPERS } from 'utils/helpers/resaga';

export const CONFIG = {
  value: {
    followers: NODE_STORE_SELECTORS.followers,
    oldFollowerId: NODE_STORE_SELECTORS.oldFollowerProp(['id']),
    templateId: TEMPLATE_MANAGEMENT_STORE_SELECTORS.templateId,
  },
};

export const CONFIG_2 = {
  value: {
    nextNodeIds: NODE_STORE_HELPERS.nextNodeIds(),
    interestedPeople: RESAGA_HELPERS.mapToId(
      NODE_STORE_SELECTORS.interestedPeople,
      'templateId',
    ),
  },
};

export const CONFIG_3 = {
  value: {
    selectableFollowers: {
      getter: ({ nextNodeIds = [], interestedPeople = [], oldFollowerId }) =>
        interestedPeople.filter(
          interestedPersonId =>
            !nextNodeIds.includes(interestedPersonId) &&
            interestedPersonId !== oldFollowerId,
        ),
    },
  },
  setValue: {},
};
