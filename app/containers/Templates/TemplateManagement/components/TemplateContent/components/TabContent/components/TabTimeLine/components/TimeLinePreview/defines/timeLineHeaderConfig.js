/**
 * Created by Yang on 21/11/17.
 */
import { TEMPLATE_MANAGEMENT_DATASTORE, NODE_STORE } from 'appConstants';
import dotProp from 'dot-prop-immutable';
import moment from 'utils/helpers/moment';
import { TEMPLATE_MANAGEMENT_STORE_SELECTORS } from 'datastore/templateManagementStore/selectors';
export const TAB_CONTENT = 'tabContent';

export const CONFIG = {
  value: {
    dayIds: {
      keyPath: [NODE_STORE, 'nodes'],
      getter: (tabs, props) => dotProp.get(tabs, `${props.tabId}.children`, []),
    },
    dateTitle: {
      keyPath: [[NODE_STORE, 'nodes'], [TEMPLATE_MANAGEMENT_DATASTORE, 'id']],
      getter: (templates, id) => {
        if (id === -1) return '';

        const customData = dotProp.get(templates, `${id}.customData`, {});

        if (customData.displayDate && customData.displayDate !== 'none') {
          const startDate = moment.getStartDate(customData);
          return moment.formatDate(startDate, customData.displayDate);
        }
        return '';
      },
    },
    unresolvedFeedbackCount:
      TEMPLATE_MANAGEMENT_STORE_SELECTORS.unresolvedFeedbackCount,
  },
};
