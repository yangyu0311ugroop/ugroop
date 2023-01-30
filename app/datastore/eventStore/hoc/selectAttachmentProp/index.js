import resaga from 'resaga';
import { EVENT_STORE_DATA_SELECTORS } from 'datastore/eventStore/selectors';
import { SNACKBAR_SET_VALUE } from 'ugcomponents/SnackBar/config';

/**
 * Input props: dataId (event data id)
 * Output props: [outputProp] (selected prop value)
 */
export default ({ path = 'type', outputProp = 'value', r = resaga }) =>
  r({
    value: {
      [outputProp]: ({ dataId: id }) =>
        EVENT_STORE_DATA_SELECTORS.eventAttachmentProp({ id, path }),
    },
    setValue: {
      ...SNACKBAR_SET_VALUE,
    },
  });
