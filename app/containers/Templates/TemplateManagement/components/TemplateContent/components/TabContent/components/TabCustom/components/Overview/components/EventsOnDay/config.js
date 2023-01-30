import { TEMPLATE_MANAGEMENT_VIEWSTORE } from 'appConstants';
import { EVENT_PATHS } from 'datastore/eventStore/constants';
import { EVENT_STORE_VIEW_SELECTORS } from 'datastore/eventStore/selectors';

export const CONFIG = {
  value: {},
  setValue: {
    selectedId: [TEMPLATE_MANAGEMENT_VIEWSTORE, 'selectedId'],
    eventCreate: EVENT_STORE_VIEW_SELECTORS.eventCreate,
    formType: EVENT_STORE_VIEW_SELECTORS.eventFormProp({
      path: EVENT_PATHS.type,
    }),
    formSubtype: EVENT_STORE_VIEW_SELECTORS.eventFormProp({
      path: EVENT_PATHS.subtype,
    }),
    iconOverride: EVENT_STORE_VIEW_SELECTORS.eventFormProp({
      path: EVENT_PATHS.iconOverride,
    }),
  },
};
