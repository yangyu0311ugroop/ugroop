/**
 * Created by stephenkarpinskyj on 25/10/18.
 */

import { EVENT_STORE_VIEW_SELECTORS } from 'datastore/eventStore/selectors';
import { CONFIG } from '../config';

describe('smartComponents/Event/Time/config', () => {
  describe('CONFIG', () => {
    it('exists', () => {
      expect(CONFIG).toBeDefined();
    });
  });

  describe('#setValue', () => {
    it('contains required properties', () => {
      const props = {
        calculatedTimeValuePath: 'calculated/time/value/path',
        calculatedTimeModePath: 'calculated/time/mode/path',
      };

      expect(CONFIG.setValue.calculatedTimeValue(props)).toEqual(
        EVENT_STORE_VIEW_SELECTORS.eventFormProp({
          path: props.calculatedTimeValuePath,
        }),
      );
      expect(CONFIG.setValue.calculatedTimeMode(props)).toEqual(
        EVENT_STORE_VIEW_SELECTORS.eventFormProp({
          path: props.calculatedTimeModePath,
        }),
      );
    });
  });
});
