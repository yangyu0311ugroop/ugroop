import { INVITATION_STORE_SELECTORS } from 'datastore/invitationStore/selectors';
import selectUserNodeProp from '..';

describe('datastore/invitationStore/hoc/selectUserNodeProp', () => {
  describe('#value', () => {
    it('contains required properties', () => {
      const id = 'id';
      const { value } = selectUserNodeProp({ r: jest.fn(args => args) });
      expect(value.value({ id })).toEqual(
        INVITATION_STORE_SELECTORS.userNodeProp({
          id,
          path: 'prop',
        }),
      );
    });

    it('still matches snapshot with resaga', () => {
      expect(selectUserNodeProp({})()).toMatchSnapshot();
    });
  });
});
