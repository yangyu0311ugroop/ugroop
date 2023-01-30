/**
 * Created by stephenkarpinskyj on 20/8/18.
 */

import { TEMPLATE_MANAGEMENT_STORE_SELECTORS } from 'datastore/templateManagementStore/selectors';
import { EVENT_STORE_VIEW_SELECTORS } from 'datastore/eventStore/selectors';
import { EVENT_PATHS } from 'datastore/eventStore/constants';
import { SET_VALUE } from 'ugcomponents/SnackBar/config';

export const CONFIG = {
  value: {
    templateId: TEMPLATE_MANAGEMENT_STORE_SELECTORS.templateId,
    tabId: TEMPLATE_MANAGEMENT_STORE_SELECTORS.tabId,
    formType: EVENT_STORE_VIEW_SELECTORS.eventFormProp({
      path: EVENT_PATHS.type,
    }),
    formSubtype: EVENT_STORE_VIEW_SELECTORS.eventFormProp({
      path: EVENT_PATHS.subtype,
    }),
    formIconOverride: EVENT_STORE_VIEW_SELECTORS.eventFormProp({
      path: EVENT_PATHS.iconOverride,
    }),
    formBatchCreate: EVENT_STORE_VIEW_SELECTORS.eventFormProp({
      path: EVENT_PATHS.batchCreate,
    }),
  },
  setValue: {
    form: EVENT_STORE_VIEW_SELECTORS.eventForm,
    ...SET_VALUE,
  },
};
