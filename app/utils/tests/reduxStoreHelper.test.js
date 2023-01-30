/**
 * Created by Yang on 6/3/17.
 */
import { fromJS } from 'immutable';
import { getDataStoreState } from '../reduxStoreHelper';

describe('Test Redux Store Helper', () => {
  const mockedData = fromJS({
    global: { globalstore: 'abc' },
    stormPathDataStore: { account: 'bbb' },
  });
  it('getDataStoreState', () => {
    expect(getDataStoreState(mockedData, 'stormPathDataStore')).toEqual(
      fromJS({ account: 'bbb' }),
    );
  });
});
