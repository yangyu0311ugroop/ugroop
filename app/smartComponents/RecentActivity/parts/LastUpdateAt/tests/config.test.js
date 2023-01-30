import { COORDINATE_DATA_STORE_SELECTORS } from 'datastore/coordinateDataStore/selectors';
import { CONFIG } from '../config';
describe('Config', () => {
  it('lastUpdate', () => {
    expect(CONFIG.value.lastUpdate).toEqual(
      COORDINATE_DATA_STORE_SELECTORS.lastUpdate,
    );
  });
});
