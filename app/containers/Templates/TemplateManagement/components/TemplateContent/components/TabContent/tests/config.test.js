import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
/**
 * Created by quando on 1/9/17.
 */
import { CONFIG } from '../config';

describe('TabContent/tests/config.test.js', () => {
  describe('CONFIG', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });
    it('should exists', () => {
      expect(CONFIG).toBeDefined();
    });
    describe('value', () => {
      it('should exists', () => {
        expect(CONFIG.value).toBeDefined();
      });

      it('should return type correctly', () => {
        const data = CONFIG.value.type;
        expect(typeof data).toBe('function');

        expect(data({ tabId: 123 })).toEqual(
          NODE_STORE_SELECTORS.type({ id: 123 }),
        );
      });

      it('should return ids', () => {
        expect(CONFIG.value.ids({ templateId: 123 })).toEqual(
          NODE_STORE_SELECTORS.children({ id: 123 }),
        );
      });

      it('should return layout correctly', () => {
        const data = CONFIG.value.layout;
        expect(typeof data).toBe('function');

        expect(data({ templateId: 123 })).toEqual(
          NODE_STORE_SELECTORS.calculatedLayout({ id: 123 }),
        );
      });

      it('should return displayDate correctly', () => {
        const data = CONFIG.value.displayDate;
        expect(typeof data).toBe('function');

        expect(data({ templateId: 123 })).toEqual(
          NODE_STORE_SELECTORS.displayDate({ id: 123 }),
        );
      });
    });

    describe('setValue', () => {
      it('should exists', () => {
        expect(CONFIG.setValue).toBeDefined();
      });

      it('should return layoutRecheck', () => {
        const data = CONFIG.setValue.layoutRecheck;
        expect(typeof data).toBe('function');

        expect(data({ templateId: 123 })).toEqual(
          NODE_STORE_SELECTORS.calculatedLayoutRecheck({ id: 123 }),
        );
      });
    });
  });
});
