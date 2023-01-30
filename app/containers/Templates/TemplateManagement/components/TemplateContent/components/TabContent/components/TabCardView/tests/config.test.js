import { NODE_STORE } from 'appConstants';
import { CONFIG } from '../config';

describe('TabCardView/config.js', () => {
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
  });

  describe('value', () => {
    it('should exists', () => {
      expect(typeof CONFIG.value).toBe('object');
    });

    describe('tabChildren', () => {
      it('should return a particular shape of array given the props provided', () => {
        expect(CONFIG.value.tabChildren({ tabId: 1 })).toMatchSnapshot();
      });
    });

    describe('startDate', () => {
      it('should return a particular shape of array given the props provided', () => {
        expect(CONFIG.value.startDate({ templateId: 1 })).toMatchSnapshot();
      });
    });

    describe('displayDate', () => {
      it('should return a displayDate', () => {
        const props = { templateId: 1 };
        expect(CONFIG.value.displayDate(props)).toEqual([
          NODE_STORE,
          'nodes',
          props.templateId,
          'customData',
          'displayDate',
        ]);
      });
    });
  });
});
