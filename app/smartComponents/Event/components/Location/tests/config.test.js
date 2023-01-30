/**
 * Created by stephenkarpinskyj on 25/10/18.
 */

import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import { EVENT_STORE_DATA_SELECTORS } from 'datastore/eventStore/selectors';
import { EVENT_PATHS } from 'datastore/eventStore/constants';
import { CONFIG, CONFIG_2 } from '../config';

describe('smartComponents/Event/Location/config', () => {
  describe('CONFIG', () => {
    it('exists', () => {
      expect(CONFIG).toBeDefined();
    });
  });

  describe('CONFIG_2', () => {
    describe('value.values', () => {
      it('should have keyPath', () => {
        const activityDetails = [1, 2];
        expect(CONFIG_2.value.values.keyPath({ activityDetails })).toEqual(
          activityDetails.map(id =>
            EVENT_STORE_DATA_SELECTORS.activityDetailProp({
              id,
              path: EVENT_PATHS.activityDetailValue,
            }),
          ),
        );
      });
      it('should have keyPath if no activityDetails', () => {
        expect(CONFIG_2.value.values.keyPath({})).toEqual([]);
      });
      it('should have cacheKey', () => {
        const activityDetails = [1, 2];
        expect(CONFIG_2.value.values.cacheKey({ activityDetails })).toEqual(
          `smartComponents.Event.Location.${activityDetails.toString()}.value`,
        );
      });
      it('should have cacheKey if null activityDetails', () => {
        expect(
          CONFIG_2.value.values.cacheKey({ activityDetails: null }),
        ).toEqual(`smartComponents.Event.Location.null.value`);
      });
      it('should have props', () => {
        const activityDetails = [1, 2];
        expect(CONFIG_2.value.values.props({ activityDetails })).toEqual(
          activityDetails,
        );
      });
      it('should have getter', () => {
        expect(CONFIG_2.value.values.getter(1)).toEqual([1]);
      });
    });
  });

  describe('#value', () => {
    it('contains required properties', () => {
      const props = {
        id: 'id',
        dataId: 'dataId',
        valuePath: 'value/path',
        iconPath: 'icon/path',
        placeIdPath: 'place/id/path',
        timeZoneIdPath: 'time/zone/id/path',
      };
      expect(CONFIG.value.value(props)).toEqual(
        EVENT_STORE_DATA_SELECTORS.eventProp({
          id: props.dataId,
          path: props.valuePath,
        }),
      );
      expect(CONFIG.value.icon(props)).toEqual(
        EVENT_STORE_DATA_SELECTORS.eventProp({
          id: props.dataId,
          path: props.iconPath,
        }),
      );
      expect(CONFIG.value.placeId(props)).toEqual(
        EVENT_STORE_DATA_SELECTORS.eventProp({
          id: props.dataId,
          path: props.placeIdPath,
        }),
      );
      expect(CONFIG.value.timeZoneId(props)).toEqual(
        NODE_STORE_SELECTORS.nodeProp({
          id: props.id,
          path: props.timeZoneIdPath,
        }),
      );
      expect(CONFIG.value.startPlaceId(props)).toEqual(
        EVENT_STORE_DATA_SELECTORS.eventProp({
          id: props.dataId,
          path: EVENT_PATHS.transportationDetailStartPlaceId,
        }),
      );
      expect(CONFIG.value.endPlaceId(props)).toEqual(
        EVENT_STORE_DATA_SELECTORS.eventProp({
          id: props.dataId,
          path: EVENT_PATHS.transportationDetailEndPlaceId,
        }),
      );
      expect(CONFIG.value.startName(props)).toEqual(
        EVENT_STORE_DATA_SELECTORS.eventProp({
          id: props.dataId,
          path: EVENT_PATHS.transportationDetailStartName,
        }),
      );
      expect(CONFIG.value.endName(props)).toEqual(
        EVENT_STORE_DATA_SELECTORS.eventProp({
          id: props.dataId,
          path: EVENT_PATHS.transportationDetailEndName,
        }),
      );
      expect(CONFIG.value.activityDetails(props)).toEqual(
        EVENT_STORE_DATA_SELECTORS.eventProp({
          id: props.dataId,
          path: EVENT_PATHS.activityDetails,
        }),
      );
    });
  });
});
