import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';

export const CONFIG = {
  value: {
    createdBy: NODE_STORE_SELECTORS.createdBy,
    organisationId: NODE_STORE_SELECTORS.organisationId,
    interestedPersonIds: NODE_STORE_SELECTORS.in,
    peopleTabIndex: {
      keyPath: [
        NODE_STORE_SELECTORS.calculatedVisibleChildren,
        NODE_STORE_SELECTORS.calculatedPeopleTabId,
      ],
      cacheKey: ({ id }) => `node.${id}.abountCard.peopleTabIdIndex`,
      getter: (calculatedVisibleChildren, peopleTabId) =>
        calculatedVisibleChildren.indexOf(peopleTabId),
    },
  },
  setValue: {},
};
