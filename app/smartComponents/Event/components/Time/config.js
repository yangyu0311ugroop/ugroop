/**
 * Created by stephenkarpinskyj on 21/8/18.
 */

import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import { EVENT_PATHS } from 'datastore/eventStore/constants';
import { EVENT_STORE_VIEW_SELECTORS } from 'datastore/eventStore/selectors';

const selectNodeProp = (id, path) =>
  NODE_STORE_SELECTORS.nodeProp({ id, path });
const selectEventFormProp = path =>
  EVENT_STORE_VIEW_SELECTORS.eventFormProp({ path });

export const CONFIG = {
  value: {
    value: ({ id, valuePath }) => selectNodeProp(id, valuePath),
    mode: ({ id, modePath }) => selectNodeProp(id, modePath),
    timeZoneId: ({ id, timeZoneIdPath }) => selectNodeProp(id, timeZoneIdPath),
    otherValue: ({ id, otherValuePath }) => selectNodeProp(id, otherValuePath),
    otherCalculatedTimeValue: ({ id, otherCalculatedTimeValuePath }) =>
      selectNodeProp(id, otherCalculatedTimeValuePath),
    otherFormCalculatedTimeValue: ({ otherCalculatedTimeValuePath }) =>
      selectEventFormProp(otherCalculatedTimeValuePath),
    otherFormCalculatedTimeMode: ({ otherCalculatedTimeModePath }) =>
      selectEventFormProp(otherCalculatedTimeModePath),
    displayDate: ({ templateId: id }) =>
      NODE_STORE_SELECTORS.displayDate({ id }),
    calculatedTimeValue: ({ id, calculatedTimeValuePath }) =>
      selectNodeProp(id, calculatedTimeValuePath),
    calculatedTimeMode: ({ id, calculatedTimeModePath }) =>
      selectNodeProp(id, calculatedTimeModePath),
    calculatedTemplateStartTimeValue: ({ templateId: id }) =>
      NODE_STORE_SELECTORS.calculatedStartTimeValue({ id }),
    formBatchCreate: selectEventFormProp(EVENT_PATHS.batchCreate),
  },
};
