/**
 * Created by Yang on 21/11/17.
 */
import { TEMPLATE_MANAGEMENT_DATASTORE, NODE_STORE } from 'appConstants';
import dotProp from 'dot-prop-immutable';
import moment from 'utils/helpers/moment';
export const TAB_CONTENT = 'tabContent';

const getChildren = props => [NODE_STORE, 'nodes', props.tabId, 'children'];
export const CONFIG = {
  value: {
    dayIds: {
      keyPath: [NODE_STORE, 'nodes'],
      getter: (tabs, props) => dotProp.get(tabs, `${props.tabId}.children`, []),
    },
    // Probably needs a refactor but hopefully this would be addressed in nodeStore
    dateTitle: {
      keyPath: [
        [NODE_STORE, 'nodes'],
        [TEMPLATE_MANAGEMENT_DATASTORE, 'id'],
        getChildren,
      ],
      getter: (templates, id, days = []) => {
        if (id === -1) return '';
        const customData = dotProp.get(templates, `${id}.customData`, {});
        if (customData.displayDate && customData.displayDate !== 'none') {
          const startDate = moment.getStartDate(customData);
          const thisDay =
            days.length > 0
              ? startDate.add(days.length - 1, 'days')
              : startDate;
          return moment.formatDate(thisDay, customData.displayDate);
        }
        return '';
      },
    },
  },
};

export default { getChildren };
