/**
 * Created by Yang on 21/11/17.
 */
import {
  TEMPLATE_MANAGEMENT_DATASTORE,
  TEMPLATE_MANAGEMENT_VIEWSTORE,
} from 'appConstants';
import { TEMPLATE_MANAGEMENT_STORE_SELECTORS } from 'datastore/templateManagementStore/selectors';
import moment from 'utils/helpers/moment';
import dotProp from 'dot-prop-immutable';
import { dateDisplay } from 'utils/constant';
import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
export const SELECTDAYID = 'selectedId';
export const DAYS = 'days';
export const CONFIG = {
  value: {
    unresolvedFeedbackCount:
      TEMPLATE_MANAGEMENT_STORE_SELECTORS.unresolvedFeedbackCount,
    selectDayId: [TEMPLATE_MANAGEMENT_VIEWSTORE, SELECTDAYID],
    dateTitle: {
      keyPath: [
        [TEMPLATE_MANAGEMENT_DATASTORE, 'templates'],
        [TEMPLATE_MANAGEMENT_DATASTORE, 'id'],
      ],
      getter: (templates, id, props) => {
        if (id === -1) return '';

        const customData = dotProp.get(templates, `${id}.customData`, {});

        if (customData.displayDate && customData.displayDate !== 'none') {
          const startDate = moment.getStartDate(customData);
          const thisDay = startDate.add(props.row, 'days');
          return moment.formatDate(thisDay, dateDisplay.weekDay, 'dddd');
        }
        return '';
      },
    },
    dayContent: props => NODE_STORE_SELECTORS.content({ id: props.dayId }),
  },
  setValue: {
    selectDayId: [TEMPLATE_MANAGEMENT_VIEWSTORE, SELECTDAYID],
  },
};
