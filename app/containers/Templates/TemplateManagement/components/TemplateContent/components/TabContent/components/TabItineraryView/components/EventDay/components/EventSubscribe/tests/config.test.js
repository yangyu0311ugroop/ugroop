import { EVENT_PATHS } from 'datastore/eventStore/constants';
import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import { EVENT_STORE_DATA_SELECTORS } from 'datastore/eventStore/selectors';
import { CONFIG, CONFIG_DATA } from '../config';

describe('EventsSubscribe/config.js', () => {
  describe('CONFIG', () => {
    it('should exists', () => {
      expect(typeof CONFIG).toBe('object');
    });

    describe('value', () => {
      it('has correct properties', () => {
        const props = { id: 1 };
        expect(typeof CONFIG.value).toBe('object');
        expect(CONFIG.value.startTime(props)).toEqual(
          NODE_STORE_SELECTORS.calculatedStartTimeValue(props),
        );
        expect(CONFIG.value.endTime(props)).toEqual(
          NODE_STORE_SELECTORS.calculatedEndTimeValue(props),
        );
        expect(CONFIG.value.dataId).toEqual(NODE_STORE_SELECTORS.eventDataId);
      });
    });
  });

  describe('CONFIG_DATA', () => {
    it('should exists', () => {
      expect(typeof CONFIG_DATA).toBe('object');
    });

    describe('value', () => {
      it('has correct properties', () => {
        const props = { dataId: 1 };
        expect(typeof CONFIG_DATA.value).toBe('object');
        expect(CONFIG_DATA.value.type(props)).toEqual(
          EVENT_STORE_DATA_SELECTORS.eventProp({
            id: props.dataId,
            path: EVENT_PATHS.type,
          }),
        );
        expect(CONFIG_DATA.value.subtype(props)).toEqual(
          EVENT_STORE_DATA_SELECTORS.eventProp({
            id: props.dataId,
            path: EVENT_PATHS.subtype,
          }),
        );
      });
    });
  });
});
