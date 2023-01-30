import { EVENT_STORE_VIEW_SELECTORS } from 'datastore/eventStore/selectors';
import { FILE_CONTAINER_API, UPLOAD_FILE } from 'apis/constants';

export const CONFIG = {
  value: {},
  setValue: {
    flightBookingView: EVENT_STORE_VIEW_SELECTORS.flightBookingView,
    eventView: EVENT_STORE_VIEW_SELECTORS.eventView,
  },
  isLoading: {
    fileUploading: [FILE_CONTAINER_API, UPLOAD_FILE],
  },
};
