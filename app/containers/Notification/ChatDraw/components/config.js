import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import {
  drawerKeepOpen,
  chatDrawerKeepOpen,
} from '../../../../ugcomponents/NaviBar/AdminNavBar/components/LeftMenu/config';

export const CONFIG = {
  value: {
    drawerKeepOpen,
    chatDrawerKeepOpen,
  },
  setValue: {
    drawerKeepOpen,
    chatDrawerKeepOpen,
  },
};

export const CONFIG1 = {
  value: {
    templateName: NODE_STORE_SELECTORS.content,
  },
};
