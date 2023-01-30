/**
 * Created by stephenkarpinskyj on 25/10/18.
 */

import { EVENT_STORE_DATA_SELECTORS } from 'datastore/eventStore/selectors';
import selectEventProp from '..';

describe('datastore/eventStore/hoc/selectEventProp', () => {
  describe('#value', () => {
    it('contains required properties', () => {
      const props = { dataId: 'dataId' };
      const { value } = selectEventProp({ r: jest.fn(args => args) });
      expect(value.value(props)).toEqual(
        EVENT_STORE_DATA_SELECTORS.eventProp({
          id: props.dataId,
          path: 'type',
        }),
      );
    });

    it('still matches snapshot with resaga', () => {
      expect(selectEventProp({})()).toMatchSnapshot();
    });
  });
});
