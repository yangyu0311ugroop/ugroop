import { EVENT_PATHS } from 'datastore/eventStore/constants';
import {
  EVENT_STORE_DATA_SELECTORS,
  EVENT_STORE_VIEW_SELECTORS,
} from 'datastore/eventStore/selectors';
import { TEMPLATE_MANAGEMENT_STORE_SELECTORS } from 'datastore/templateManagementStore/selectors';

export const CONFIG = {
  value: {
    templatePageId: TEMPLATE_MANAGEMENT_STORE_SELECTORS.templateId,
    templateId: ({ dataId: id }) =>
      EVENT_STORE_DATA_SELECTORS.flightBookingTemplateId({ id }),
  },
  setValue: {
    eventCreate: EVENT_STORE_VIEW_SELECTORS.eventCreate,
    formType: EVENT_STORE_VIEW_SELECTORS.eventFormProp({
      path: EVENT_PATHS.type,
    }),
    formSubtype: EVENT_STORE_VIEW_SELECTORS.eventFormProp({
      path: EVENT_PATHS.subtype,
    }),
    formFlightBooking: EVENT_STORE_VIEW_SELECTORS.eventFormProp({
      path: EVENT_PATHS.flightBooking,
    }),
  },
};
