import { NODE_STORE } from 'appConstants';
import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import { CONFIG, PHOTO_ID_CONFIG } from '../contentConfig';

describe('Config Test', () => {
  describe('Content Test', () => {
    it('should exist', () => {
      expect(CONFIG.value.content({ dayId: 1 })).toEqual(
        NODE_STORE_SELECTORS.content({ id: 1 }),
      );
    });
  });

  describe('editing Test', () => {
    it('should exist', () => {
      expect(CONFIG.value.editing({ dayId: 1 })).toEqual(
        NODE_STORE_SELECTORS.editing({ id: 1 }),
      );
    });
  });

  describe('description Test', () => {
    it('should exist', () => {
      expect(CONFIG.value.description({ dayId: 1 })).toEqual(
        NODE_STORE_SELECTORS.description({ id: 1 }),
      );
    });
  });

  describe('url test', () => {
    it('should exist', () => {
      expect(CONFIG.value.url({ dayId: 1 })).toEqual(
        NODE_STORE_SELECTORS.url({ id: 1 }),
      );
    });
  });

  describe('location Test', () => {
    it('should exist', () => {
      expect(CONFIG.value.location({ dayId: 1 })).toEqual(
        NODE_STORE_SELECTORS.location({ id: 1 }),
      );
    });
  });

  describe('icon Test', () => {
    it('should exist', () => {
      expect(CONFIG.value.icon({ dayId: 1 })).toEqual(
        NODE_STORE_SELECTORS.icon({ id: 1 }),
      );
    });
  });

  describe('placeId Test', () => {
    it('should exist', () => {
      expect(CONFIG.value.placeId({ dayId: 1 })).toEqual(
        NODE_STORE_SELECTORS.placeId({ id: 1 }),
      );
    });
  });

  describe('timeZoneId Test', () => {
    it('should exist', () => {
      expect(CONFIG.value.timeZoneId({ dayId: 2 })).toEqual([
        NODE_STORE,
        'nodes',
        2,
        'customData',
        'timeZoneId',
      ]);
    });
  });

  describe('layout value', () => {
    it('should exist', () => {
      expect(PHOTO_ID_CONFIG.value.layout({ templateId: 2 })).toEqual(
        NODE_STORE_SELECTORS.calculatedLayout({ id: 2 }),
      );
    });
  });

  describe('layout', () => {
    it('should exist', () => {
      expect(PHOTO_ID_CONFIG.setValue.layout({ templateId: 2 })).toEqual(
        NODE_STORE_SELECTORS.calculatedLayout({ id: 2 }),
      );
    });
  });
});
