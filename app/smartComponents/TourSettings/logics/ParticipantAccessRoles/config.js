import zip from 'lodash/zip';
import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import { NODE_SETTING_PARTICIPANT_ACCESS_HELPERS } from 'utils/helpers/nodeSettings';

export const CONFIG = {
  value: {
    settings: {
      keyPath: ({ nodeId }) =>
        Object.keys(NODE_SETTING_PARTICIPANT_ACCESS_HELPERS.KEY_ROLES).map(
          settingKey =>
            NODE_STORE_SELECTORS.getNodeSetting({
              id: nodeId,
              settingKey,
            }),
        ),
      cacheKey: ({ nodeId }) =>
        `smartComponents.TourSettings.logics.ParticipantAccessRoles.${nodeId}`,
      props: null,
      getter: (...values) => {
        const roles = Object.values(
          NODE_SETTING_PARTICIPANT_ACCESS_HELPERS.KEY_ROLES,
        );
        return zip(roles, values).reduce(
          (acc, [role, value]) => (value === '1' ? [...acc, role] : acc),
          [],
        );
      },
    },
  },
};
