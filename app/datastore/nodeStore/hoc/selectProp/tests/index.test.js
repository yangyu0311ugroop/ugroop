import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import selectProp from '..';

describe('datastore/nodeStore/hoc/selectProp', () => {
  describe('#value', () => {
    it('contains required properties', () => {
      const props = { id: 'id' };
      const { value } = selectProp({ r: jest.fn(args => args) });
      expect(value.value(props)).toEqual(
        NODE_STORE_SELECTORS.nodeProp({ id: props.id, path: 'type' }),
      );
    });

    it('still matches snapshot with resaga', () => {
      expect(selectProp({})()).toMatchSnapshot();
    });
  });
});
