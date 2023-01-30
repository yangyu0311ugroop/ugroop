import { COORDINATE_DATA_STORE_SELECTORS } from 'datastore/coordinateDataStore/selectors';
import { CONFIG } from '../config';
describe('Config', () => {
  it('lastAccess', () => {
    expect(CONFIG.value.lastAccess).toEqual(
      COORDINATE_DATA_STORE_SELECTORS.lastAccess,
    );
  });
});
