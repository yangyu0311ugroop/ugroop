import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import { CONFIG } from '../config';

describe('NodeProp/config.js', () => {
  afterEach(() => jest.clearAllMocks());

  describe('Smoke Test', () => {
    it('should exists', () => {
      expect(CONFIG).toMatchSnapshot();
    });
  });

  describe('value', () => {
    describe('value', () => {
      it('should return valueKey keyPath', () => {
        expect(CONFIG.value.value({ valueKey: 'content' })).toBe(
          NODE_STORE_SELECTORS.content,
        );
      });
    });
  });

  describe('setValue', () => {});
});
