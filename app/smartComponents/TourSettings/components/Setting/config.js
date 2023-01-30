import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';

export const CONFIG = {
  value: {
    settingId: NODE_STORE_SELECTORS.getNodeSettingNodeId,
    value: NODE_STORE_SELECTORS.getNodeSetting,
  },
};
