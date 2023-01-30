import { normalize } from 'normalizr';
import { get, concat, orderBy, first } from 'lodash';
import dotProp from 'dot-prop-immutable';
import MOMENT_HELPERS from 'utils/helpers/moment';
import { CREATED_AT, DISCUSSION_DATASTORE, ASC, CONTENT } from 'appConstants';
import upsertHelpers, { ARRAY_MODE } from 'utils/helpers/upsertStore';
import arrays from 'datastore/templateManagementStore/helpers/arrays';
import { COMMENT_STATUS } from 'containers/Templates/TemplateManagement/components/Comment/constants';
import { DISCUSSION_STORE_DATA_SELECTORS } from 'datastore/discussionStore/selectors';
import momentjs from 'moment';
import schemas, { KEYS as SCHEMA_KEYS } from './schema';

export const KEYS = {
  ...SCHEMA_KEYS,
  TEMPLATE_IDS: 'templateIds',
};

const normaliseTemplates = templates => {
  const convertedTemplates =
    templates &&
    templates.map(template =>
      dotProp.set(template, 'children', children => arrays.convert(children)),
    );
  return normalise(convertedTemplates, schemas.templates);
};

const normalise = (data, schema) => {
  const normalised = normalize(data, schema);

  // TODO: Handle id arrays generically
  normalised.entities[KEYS.TEMPLATE_IDS] = Object.keys(
    normalised.entities.templates,
  );

  return { ...normalised.entities };
};

const makeSetValueObj = (normalised, mode = ARRAY_MODE.APPEND) => {
  const keys = Object.keys(normalised);

  const setValueObj = {};

  keys.forEach(k => {
    switch (k) {
      // TODO: Handle id arrays generically
      case KEYS.TEMPLATE_IDS:
        setValueObj[k] = upsertHelpers.array(normalised[k], mode);
        break;

      default:
        setValueObj[k] = upsertHelpers.object(
          normalised[k],
          mode === ARRAY_MODE.SET,
        );
        break;
    }
  });

  return setValueObj;
};

const makeSetValueConfig = () => {
  const config = {};
  Object.values(KEYS).forEach(v => {
    config[v] = [DISCUSSION_DATASTORE, v];
  });
  return config;
};

const selectTemplateIds = () => [DISCUSSION_DATASTORE, KEYS.TEMPLATE_IDS];

const selectTemplate = templateId => [
  DISCUSSION_DATASTORE,
  KEYS.TEMPLATES,
  templateId,
];

const selectTabTimelines = () => [DISCUSSION_DATASTORE, KEYS.TAB_TIMELINES];

const selectDay = dayId => [DISCUSSION_DATASTORE, KEYS.DAYS, dayId];

const selectDays = () => [DISCUSSION_DATASTORE, KEYS.DAYS];

const selectNode = (nodeId, nodeType) =>
  nodeType === 'template' ? selectTemplate(nodeId) : selectDay(nodeId);

const getDayIds = (template, tabs) => {
  const childTabs = template.children.map(tabId =>
    dotProp.get(tabs, `${tabId}`),
  );
  // eslint-disable-next-line prefer-spread
  return [].concat.apply([], childTabs.map(tab => tab.children));
};

const unresolvedFeedbackFilter = feedback =>
  get(feedback, 'status') !== COMMENT_STATUS.RESOLVED;

const getUnresolvedFeedbackCountForNode = node => {
  let count = 0;

  if (node) {
    count += node.feedbacks.filter(unresolvedFeedbackFilter).length;
  }

  return count;
};

const getUnresolvedFeedbackCountForTemplateAndDays = (template, tabs, days) => {
  let count = 0;

  if (template) {
    count += template.feedbacks.filter(unresolvedFeedbackFilter).length;

    const childTabs = template.children.map(tabId =>
      dotProp.get(tabs, `${tabId}`),
    );
    childTabs.forEach(tab => {
      if (tab) {
        const childDays = tab.children.map(dayId =>
          dotProp.get(days, `${dayId}`),
        );
        childDays.forEach(day => {
          if (day) {
            count += day.feedbacks.filter(unresolvedFeedbackFilter).length;
          }
        });
      }
    });
  }

  return count;
};

const getLatestDiscussionForTemplateAndDays = (template, tabs, days) => {
  let discussions = [];

  if (template) {
    const templateFeedback = template.feedbacks.filter(
      unresolvedFeedbackFilter,
    );
    if (templateFeedback.length) {
      discussions = concat(discussions, templateFeedback);
    }
    const childTabs = template.children.map(tabId =>
      dotProp.get(tabs, `${tabId}`),
    );
    childTabs.forEach(tab => {
      if (tab) {
        const childDays = tab.children.map(dayId =>
          dotProp.get(days, `${dayId}`),
        );
        childDays.forEach(day => {
          if (day) {
            const dayFeedback = day.feedbacks.filter(unresolvedFeedbackFilter);
            if (dayFeedback.length) {
              discussions = concat(discussions, dayFeedback);
            }
          }
        });
      }
    });
  }
  const sorted = orderBy(discussions, o => o.updatedAt, ['desc']);
  if (sorted.length) {
    const latest = get(sorted, '0.createdAt', '');
    return MOMENT_HELPERS.renderDateShorter(latest);
  }

  return '';
};

const getSortOrderSelector = (sortBy, sortType) => {
  switch (sortBy) {
    case CREATED_AT:
      return DISCUSSION_STORE_DATA_SELECTORS.createAtSelect[sortType];
    case CONTENT:
      return DISCUSSION_STORE_DATA_SELECTORS.contentSelect[sortType];
    default:
      return DISCUSSION_STORE_DATA_SELECTORS.createAtSelect[sortType];
  }
};
const getSortOrderDiscussionSelector = sortBy => {
  switch (sortBy) {
    case CREATED_AT:
      return DISCUSSION_STORE_DATA_SELECTORS.discussionFeedBackcreatedAt;
    case CONTENT:
      return DISCUSSION_STORE_DATA_SELECTORS.discussionCommentcreatedAt;
    default:
      return DISCUSSION_STORE_DATA_SELECTORS.discussionFeedBackcreatedAt;
  }
};

const sortTime = order => (a, b) => {
  const aValue = first(a);
  const bValue = first(b);

  // asc
  if (order === ASC) {
    if (!bValue) return 1;
    if (!aValue) return -1;
    return momentjs(first(a)).isAfter(first(b)) ? 1 : -1;
  }

  // desc
  if (!bValue) return -1;
  if (!aValue) return 1;
  return momentjs(first(a)).isBefore(first(b)) ? 1 : -1;
};
const sortValue = order => (a, b) => {
  const aValue = first(a);
  const bValue = first(b);

  // asc
  if (order === ASC) {
    if (!bValue) return 1;
    if (!aValue) return -1;

    return aValue > bValue ? 1 : -1;
  }

  // desc
  if (!bValue) return -1;
  if (!aValue) return 1;
  return aValue < bValue ? 1 : -1;
};
const getSortFunction = (sortBy, order) => {
  switch (sortBy) {
    case CREATED_AT:
      return sortTime(order);
    case CONTENT:
      return sortTime(order);
    default:
      return sortValue(order);
  }
};

const getVal = (data, index, position) => get(data, `${index}.${position}`);

export default {
  normaliseTemplates,
  makeSetValueObj,
  makeSetValueConfig,
  selectTemplateIds,
  selectTemplate,
  selectTabTimelines,
  selectDay,
  selectDays,
  selectNode,
  getDayIds,
  getUnresolvedFeedbackCountForNode,
  getLatestDiscussionForTemplateAndDays,
  getUnresolvedFeedbackCountForTemplateAndDays,
  unresolvedFeedbackFilter,
  getVal,
};

export const DISCUSSION_STORE_SORT_HELPER = {
  getSortOrderSelector,
  sortTime,
  sortValue,
  getSortFunction,
  getSortOrderDiscussionSelector,
};
