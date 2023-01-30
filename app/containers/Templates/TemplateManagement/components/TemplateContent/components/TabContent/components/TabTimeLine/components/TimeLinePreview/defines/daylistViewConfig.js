/**
 * Created by Yang on 21/11/17.
 */
import { NODE_STORE } from 'appConstants';
import dotProp from 'dot-prop-immutable';

export const CONFIG = {
  value: {
    dayIds: {
      keyPath: [NODE_STORE, 'nodes'],
      getter: (tabs, props) => dotProp.get(tabs, `${props.tabId}.children`, []),
    },
  },
};
