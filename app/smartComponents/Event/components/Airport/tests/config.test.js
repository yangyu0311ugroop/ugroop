/**
 * Created by stephenkarpinskyj on 25/10/18.
 */

import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import { EVENT_STORE_DATA_SELECTORS } from 'datastore/eventStore/selectors';
import { CONFIG } from '../config';

describe('smartComponents/Event/Airport/config', () => {
  describe('CONFIG', () => {
    it('exists', () => {
      expect(CONFIG).toBeDefined();
    });
  });

  describe('#value', () => {
    it('contains required properties', () => {
      const props = {
        id: 'id',
        dataId: 'dataId',
        valuePath: 'value/path',
        cityNamePath: 'city/name/path',
        iataCodePath: 'iata/code/path',
        timeZoneIdPath: 'time/zone/id/path',
      };
      expect(CONFIG.value.value(props)).toEqual(
        EVENT_STORE_DATA_SELECTORS.eventProp({
          id: props.dataId,
          path: props.valuePath,
        }),
      );
      expect(CONFIG.value.cityName(props)).toEqual(
        EVENT_STORE_DATA_SELECTORS.eventProp({
          id: props.dataId,
          path: props.cityNamePath,
        }),
      );
      expect(CONFIG.value.iataCode(props)).toEqual(
        EVENT_STORE_DATA_SELECTORS.eventProp({
          id: props.dataId,
          path: props.iataCodePath,
        }),
      );
      expect(CONFIG.value.timeZoneId(props)).toEqual(
        NODE_STORE_SELECTORS.nodeProp({
          id: props.id,
          path: props.timeZoneIdPath,
        }),
      );
    });
  });
});
