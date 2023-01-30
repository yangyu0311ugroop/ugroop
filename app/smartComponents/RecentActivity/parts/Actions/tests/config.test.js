import { COORDINATE_DATA_STORE_SELECTORS } from 'datastore/coordinateDataStore/selectors';
import { CONFIG } from '../config';

describe('Config', () => {
  it('action', () => {
    expect(CONFIG.value.action).toEqual(COORDINATE_DATA_STORE_SELECTORS.action);
  });
  it('actionObj', () => {
    expect(CONFIG.value.actionObjType).toEqual(
      COORDINATE_DATA_STORE_SELECTORS.actionObjType,
    );
  });
});
