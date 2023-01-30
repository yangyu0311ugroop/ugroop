import { COGNITO_ACCOUNTSTORE } from 'appConstants';
import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import {
  ONLY_ME,
  ORGANISERS,
} from 'smartComponents/Node/types/TabOther/components/TabAccess/constants';
import { ability } from '../../../../apis/components/Ability/ability';
import { TAB_OTHER } from '../../../../utils/modelConstants';

export const IDS_CONFIG = {
  value: {
    ids: NODE_STORE_SELECTORS.children,
    me: [COGNITO_ACCOUNTSTORE, 'account', 'id'],
  },
};

export const CREATED_BY_ME_CONFIG = {
  value: {
    createdByMe: {
      cacheKey: ({ ids }) => `${ids}.createdByMe`,
      keyPath: ({ ids = [] }) =>
        ids.map(id => NODE_STORE_SELECTORS.createdBy({ id })),
      props: [({ ids = [] }) => ids, ({ me }) => me],
      getter: (...createdByMe) => {
        const me = createdByMe.pop();
        const ids = createdByMe.pop();

        return ids.reduce((accu, id, index) => {
          if (createdByMe[index] !== me) return accu;

          return accu.concat(id);
        }, []);
      },
    },
  },
};

export const CONFIG = {
  value: {
    calculatedVisibleChildren: NODE_STORE_SELECTORS.calculatedVisibleChildren,
    calculatedPrivateIds: NODE_STORE_SELECTORS.calculatedPrivateIds,
    calculatedHiddenIds: NODE_STORE_SELECTORS.calculatedHiddenIds,
    calculatedOnlyMeIds: NODE_STORE_SELECTORS.calculatedOnlyMeIds,

    visibleChildren: {
      cacheKey: ({ ids = [] }) => `${ids}.visibleChildren`,
      keyPath: ({ ids = [] }) =>
        ids.map(id => NODE_STORE_SELECTORS.sharedWith({ id })),
      props: [({ ids = [] }) => ids, ({ createdByMe = [] }) => createdByMe],
      getter: (...sharedWiths) => {
        const createdByMe = sharedWiths.pop();
        const ids = sharedWiths.pop();
        const canExecuteTab = () => ability.can('execute', TAB_OTHER);

        return sharedWiths.reduce(
          (accu, sharedWith, index) => {
            const id = ids[index];

            // No hidden ids now
            if (sharedWith === ONLY_ME) {
              if (createdByMe.indexOf(id) === -1) {
                return {
                  ...accu,
                  notCreatedByMe: accu.hiddenIds.concat(id),
                };
              }

              return {
                ...accu,
                hiddenIds: accu.hiddenIds.concat(id),
                visibleChildren: accu.visibleChildren.concat(id),
              };
            }

            if (sharedWith === ORGANISERS && !canExecuteTab()) {
              return {
                ...accu,
                organizerTabs: accu.privateIds.concat(id),
                // visibleChildren: accu.visibleChildren.concat(id),
              };
            }

            return {
              ...accu,
              visibleChildren: accu.visibleChildren.concat(id),
            };
          },
          {
            visibleChildren: [],
            privateIds: [],
            hiddenIds: [],
            notCreatedByMe: [],
            organizerTabs: [],
          },
        );
      },
      spreadObject: true,
    },
  },
  setValue: {
    visibleChildren: NODE_STORE_SELECTORS.calculatedVisibleChildren,
    privateIds: NODE_STORE_SELECTORS.calculatedPrivateIds,
    hiddenIds: NODE_STORE_SELECTORS.calculatedHiddenIds,
    onlyMedIds: NODE_STORE_SELECTORS.calculatedOnlyMeIds,
  },
};
