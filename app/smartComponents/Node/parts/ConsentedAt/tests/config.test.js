import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import { CONFIG } from '../config';

describe('config', () => {
  it('should have value', () => {
    expect(CONFIG.value.value).toEqual(NODE_STORE_SELECTORS.updatedAt);
  });
});
