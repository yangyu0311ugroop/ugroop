import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import { CONFIG } from '../config';

describe('Content/config.js', () => {
  afterEach(() => jest.clearAllMocks());

  describe('Smoke Test', () => {
    it('should exists', () => {
      expect(CONFIG).toMatchSnapshot();
    });
  });
  describe('value', () => {});
  describe('setValue', () => {
    it('should have nodes', () => {
      expect(CONFIG.setValue.nodes).toEqual(NODE_STORE_SELECTORS.nodes);
    });
  });
});
