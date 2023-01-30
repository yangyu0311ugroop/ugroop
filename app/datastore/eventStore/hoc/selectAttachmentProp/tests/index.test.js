import { EVENT_STORE_DATA_SELECTORS } from 'datastore/eventStore/selectors';
import selectAttachmentProp from '..';

describe('datastore/eventStore/hoc/selectEventProp', () => {
  describe('#value', () => {
    it('contains required properties', () => {
      const props = { dataId: 'dataId' };
      const { value } = selectAttachmentProp({ r: jest.fn(args => args) });
      expect(value.value(props)).toEqual(
        EVENT_STORE_DATA_SELECTORS.eventAttachmentProp({
          id: props.dataId,
          path: 'type',
        }),
      );
    });

    it('still matches snapshot with resaga', () => {
      expect(selectAttachmentProp({})()).toMatchSnapshot();
    });
  });
});
