import { ability } from 'apis/components/Ability/ability';
import { NODE_VIEW_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import { TAB_OTHER } from 'utils/modelConstants';
import { COGNITO_ACCOUNTSTORE, NODE_STORE, PUBLIC_LINK } from 'appConstants';
import { LOGIC_HELPERS } from 'utils/helpers/logic';

const CONFIG = {
  value: {
    label: {
      keyPath: ({ tabId }) => [NODE_STORE, 'nodes', tabId, 'content'],
      getter: (label, { tabId }) =>
        LOGIC_HELPERS.ifElse(
          tabId === -1,
          PUBLIC_LINK.PUBLIC_TAB_MAP_LABEL,
          label,
        ),
    },
    privateTab: ({ tabId }) => [
      NODE_STORE,
      'nodes',
      tabId,
      'customData',
      'private',
    ],
    accessible: {
      keyPath: [
        ({ tabId }) => [NODE_STORE, 'nodes', tabId, 'createdBy'],
        ({ tabId }) => [NODE_STORE, 'nodes', tabId, 'customData', 'private'],
        [COGNITO_ACCOUNTSTORE, 'account', 'id'],
      ],
      getter: (createdBy, isPrivate) => {
        const isAccessible = ability.can('execute', {
          type: TAB_OTHER,
          private: isPrivate,
        });
        const isAccessibleByOwner = ability.can('execute', {
          type: TAB_OTHER,
          createdBy,
        });
        return LOGIC_HELPERS.ifElse(
          [!isPrivate, isAccessibleByOwner, isAccessible],
          true,
          false,
          true,
        );
      },
    },
    editable: NODE_VIEW_STORE_SELECTORS.editable,
  },
};

export default CONFIG;
