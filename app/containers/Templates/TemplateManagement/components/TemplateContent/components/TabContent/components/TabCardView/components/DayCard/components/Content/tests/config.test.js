import { NODE_STORE } from 'appConstants';
import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import { CONFIG } from '../config';

describe('Content/config.js', () => {
  afterEach(() => jest.clearAllMocks());

  describe('Smoke test', () => {
    it('should exist', () => {
      expect(typeof CONFIG).toBe('object');
    });
  });

  describe('value', () => {
    it('should exist', () => {
      expect(typeof CONFIG.value).toBe('object');
    });
  });

  describe('placeId test', () => {
    expect(CONFIG.value.placeId({ dayId: 123 })).toEqual([
      NODE_STORE,
      'nodes',
      123,
      'customData',
      'placeId',
    ]);
  });

  describe('layout', () => {
    it('should exist', () => {
      expect(CONFIG.setValue.layout({ templateId: 2 })).toEqual(
        NODE_STORE_SELECTORS.calculatedLayout({ id: 2 }),
      );
    });
  });
});
