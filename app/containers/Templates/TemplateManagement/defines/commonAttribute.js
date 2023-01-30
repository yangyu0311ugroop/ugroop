import moment from 'utils/helpers/moment';
import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';

const formatDate = {
  keyPath: ({ templateId: id }) => NODE_STORE_SELECTORS.customData({ id }),
  cacheKey: ({ id, templateId }) =>
    `TemplateManagment.commonAtribute.formatDate.${id}.${templateId}`,
  props: ({ index }) => index,
  getter: (customData, index) => {
    const dateFormat = !customData.startDate ? 'dddd' : 'ddd, D MMM YYYY';
    if (customData.displayDate && customData.displayDate !== 'none') {
      const startDate = moment.getStartDate(customData);
      const thisDay = startDate.add(index, 'days');
      return moment.formatDate(thisDay, customData.displayDate, dateFormat);
    }

    return '';
  },
};

const formatLongDate = {
  keyPath: ({ templateId: id }) => NODE_STORE_SELECTORS.customData({ id }),
  cacheKey: ({ id, templateId }) =>
    `TemplateManagment.commonAtribute.formatLongDate.${id}.${templateId}`,
  props: ({ index }) => index,
  getter: (customData, index) => {
    const dateFormat = !customData.startDate ? 'dddd' : 'dddd, D MMMM YYYY';
    if (customData.displayDate && customData.displayDate !== 'none') {
      const startDate = moment.getStartDate(customData);
      const thisDay = startDate.add(index, 'days');
      return moment.formatDate(thisDay, customData.displayDate, dateFormat);
    }

    return '';
  },
};

const CommonAttribute = {
  formatDate,
  formatLongDate,
};

export default CommonAttribute;
