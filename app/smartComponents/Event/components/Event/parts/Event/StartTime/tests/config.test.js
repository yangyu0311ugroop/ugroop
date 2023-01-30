/**
 * Created by stephenkarpinskyj on 25/10/18.
 */

import { NODE_PATHS } from 'datastore/nodeStore/constants';
import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import { EVENT_STORE_VIEW_SELECTORS } from 'datastore/eventStore/selectors';
import { EVENT_PATHS } from 'datastore/eventStore/constants';
import { CONFIG } from '../config';

describe('smartComponents/Event/parts/StartTime/config', () => {
  describe('CONFIG', () => {
    it('exists', () => {
      expect(CONFIG).toBeDefined();
    });
  });

  describe('#value', () => {
    it('contains required properties', () => {
      const props = { id: 'id' };
      NODE_STORE_SELECTORS.calculatedStartTimeMoment = jest.fn(
        () => 'calculatedStartTimeMoment',
      );
      const { value } = CONFIG();
      expect(value.mode(props)).toEqual(
        NODE_STORE_SELECTORS.nodeProp({
          id: props.id,
          path: NODE_PATHS.startTimeMode,
        }),
      );
      expect(value.calculatedTime).toEqual(
        NODE_STORE_SELECTORS.calculatedStartTimeMoment(),
      );
      expect(value.formType).toEqual(
        EVENT_STORE_VIEW_SELECTORS.eventFormProp({ path: EVENT_PATHS.type }),
      );
      expect(value.formSubtype).toEqual(
        EVENT_STORE_VIEW_SELECTORS.eventFormProp({ path: EVENT_PATHS.subtype }),
      );
    });
  });
});
