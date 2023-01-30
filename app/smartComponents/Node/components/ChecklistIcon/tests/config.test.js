import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import { CONFIG, showChecklists } from '../config';

describe('checklistIcon/config.js', () => {
  afterEach(() => jest.clearAllMocks());

  describe('Smoke Test', () => {
    it('should exists', () => {
      expect(typeof CONFIG).toBe('object');
    });
  });

  describe('setValue', () => {
    it('should exists', () => {
      expect(typeof CONFIG.setValue).toBe('object');
    });

    describe('showChecklists()', () => {
      it('should return showChecklists', () => {
        expect(CONFIG.setValue.showChecklists({ parentNodeId: 2233 })).toEqual(
          NODE_STORE_SELECTORS.calculatedShowChecklists({ id: 2233 }),
        );
      });
    });
  });

  describe('value', () => {
    it('should exists', () => {
      expect(typeof CONFIG.value).toBe('object');
    });

    describe('showChecklists()', () => {
      it('should return showChecklists', () => {
        expect(showChecklists({ parentNodeId: 2233 })).toEqual(
          NODE_STORE_SELECTORS.calculatedShowChecklists({ id: 2233 }),
        );
      });
    });
  });
});
