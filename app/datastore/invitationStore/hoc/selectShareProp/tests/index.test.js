import { INVITATION_STORE_SELECTORS } from 'datastore/invitationStore/selectors';
import selectShareProp from '..';

describe('datastore/invitationStore/hoc/selectShareProp', () => {
  describe('#value', () => {
    it('contains required properties', () => {
      const id = 'id';
      const { value } = selectShareProp({ r: jest.fn(args => args) });
      expect(value.value({ id })).toEqual(
        INVITATION_STORE_SELECTORS.shareProp({
          id,
          path: 'prop',
        }),
      );
    });

    it('still matches snapshot with resaga', () => {
      expect(selectShareProp({})()).toMatchSnapshot();
    });
  });
});
