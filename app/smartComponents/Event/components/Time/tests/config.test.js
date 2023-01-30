/**
 * Created by stephenkarpinskyj on 25/10/18.
 */

import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import { EVENT_PATHS } from 'datastore/eventStore/constants';
import { EVENT_STORE_VIEW_SELECTORS } from 'datastore/eventStore/selectors';
import { CONFIG } from '../config';

describe('smartComponents/Event/Time/config', () => {
  describe('CONFIG', () => {
    it('exists', () => {
      expect(CONFIG).toBeDefined();
    });
  });

  describe('#value', () => {
    it('contains required properties', () => {
      const props = {
        id: 'id',
        templateId: 'templateId',
        valuePath: 'value/path',
        modePath: 'mode/path',
        timeZoneIdPath: 'time/zone/id/path',
        otherValuePath: 'other/value/path',
        otherCalculatedTimeValuePath: 'other/calculated/time/value/path',
        otherCalculatedTimeModePath: 'other/calculated/time/mode/path',
        calculatedTimeValuePath: 'calculated/time/value/path',
        calculatedTimeModePath: 'calculated/time/mode/path',
      };
      expect(CONFIG.value.value(props)).toEqual(
        NODE_STORE_SELECTORS.nodeProp({ id: props.id, path: props.valuePath }),
      );
      expect(CONFIG.value.mode(props)).toEqual(
        NODE_STORE_SELECTORS.nodeProp({ id: props.id, path: props.modePath }),
      );
      expect(CONFIG.value.timeZoneId(props)).toEqual(
        NODE_STORE_SELECTORS.nodeProp({
          id: props.id,
          path: props.timeZoneIdPath,
        }),
      );
      expect(CONFIG.value.otherValue(props)).toEqual(
        NODE_STORE_SELECTORS.nodeProp({
          id: props.id,
          path: props.otherValuePath,
        }),
      );
      expect(CONFIG.value.otherCalculatedTimeValue(props)).toEqual(
        NODE_STORE_SELECTORS.nodeProp({
          id: props.id,
          path: props.otherCalculatedTimeValuePath,
        }),
      );
      expect(CONFIG.value.otherFormCalculatedTimeValue(props)).toEqual(
        EVENT_STORE_VIEW_SELECTORS.eventFormProp({
          path: props.otherCalculatedTimeValuePath,
        }),
      );
      expect(CONFIG.value.otherFormCalculatedTimeMode(props)).toEqual(
        EVENT_STORE_VIEW_SELECTORS.eventFormProp({
          path: props.otherCalculatedTimeModePath,
        }),
      );
      expect(CONFIG.value.displayDate(props)).toEqual(
        NODE_STORE_SELECTORS.displayDate({ id: props.templateId }),
      );
      expect(CONFIG.value.calculatedTimeValue(props)).toEqual(
        NODE_STORE_SELECTORS.nodeProp({
          id: props.id,
          path: props.calculatedTimeValuePath,
        }),
      );
      expect(CONFIG.value.calculatedTimeMode(props)).toEqual(
        NODE_STORE_SELECTORS.nodeProp({
          id: props.id,
          path: props.calculatedTimeModePath,
        }),
      );
      expect(CONFIG.value.calculatedTemplateStartTimeValue(props)).toEqual(
        NODE_STORE_SELECTORS.calculatedStartTimeValue({ id: props.templateId }),
      );
      expect(CONFIG.value.formBatchCreate).toEqual(
        EVENT_STORE_VIEW_SELECTORS.eventFormProp({
          path: EVENT_PATHS.batchCreate,
        }),
      );
    });
  });
});
