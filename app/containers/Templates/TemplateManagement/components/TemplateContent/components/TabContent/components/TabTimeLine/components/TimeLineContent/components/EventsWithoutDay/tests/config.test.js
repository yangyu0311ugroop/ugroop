import { EVENT_STORE_VIEW_SELECTORS } from 'datastore/eventStore/selectors';
import { CONFIG } from '../config';

describe('TabTimeLine/TimelineContent/EventsWithoutDay/config.js', () => {
  describe('Smoke Test', () => {
    it('should exists', () => {
      expect(typeof CONFIG).toBe('object');
    });
  });

  describe('setValue', () => {
    it('should exists', () => {
      expect(typeof CONFIG.setValue).toBe('object');
    });
    it('eventCreate', () => {
      expect(CONFIG.setValue.eventCreate).toEqual(
        EVENT_STORE_VIEW_SELECTORS.eventCreate,
      );
    });
  });
});
