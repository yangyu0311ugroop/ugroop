import { compose } from 'redux';
import resaga from 'resaga';
import withPropFilter from 'utils/hoc/withPropFilter';
import { CONFIG_1, CONFIG_2, CONFIG_3 } from './config';

/**
 * Select all events that do not match any day's date.
 *
 * Input props:
 *   templateId
 *   tabId
 */
export default () =>
  compose(
    resaga(CONFIG_1),
    resaga(CONFIG_2),
    resaga(CONFIG_3),
    withPropFilter({ filter: ['resaga', 'dayIds'] }),
  );
