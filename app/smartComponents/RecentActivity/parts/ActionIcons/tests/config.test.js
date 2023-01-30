import { COORDINATE_DATA_STORE_SELECTORS } from 'datastore/coordinateDataStore/selectors';
import { CONFIG } from '../config';

describe('Config', () => {
  it('value', () => {
    expect(CONFIG.value.action).toEqual(COORDINATE_DATA_STORE_SELECTORS.action);
  });
});
