import resaga from 'resaga';
import { EVENT_STORE_DATA_SELECTORS } from 'datastore/eventStore/selectors';

/**
 * Input props: dataId (event data id)
 * Output props: [outputProp] (selected prop value)
 */
export default ({ path = 'type', outputProp = 'value', r = resaga }) =>
  r({
    value: {
      [outputProp]: ({ dataId: id }) =>
        EVENT_STORE_DATA_SELECTORS.flightBookingProp({ id, path }),
    },
  });
