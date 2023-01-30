/**
 * Created by stephenkarpinskyj on 24/10/18.
 */

import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import {
  EVENT_STORE_VIEW_SELECTORS,
  EVENT_STORE_DATA_SELECTORS,
} from 'datastore/eventStore/selectors';
import { EVENT_PATHS } from 'datastore/eventStore/constants';
import { CONFIG_IDS, CONFIG_DATA } from '../config';

describe('EventContainer/Event/Edit/config', () => {
  describe('CONFIG_IDS', () => {
    it('exists', () => {
      expect(CONFIG_IDS).toBeDefined();
    });

    describe('#value', () => {
      it('contains required properties', () => {
        expect(CONFIG_IDS.value.dataId).toEqual(
          NODE_STORE_SELECTORS.eventDataId,
        );
        expect(CONFIG_IDS.value.trail).toEqual(NODE_STORE_SELECTORS.trail);
      });
    });
  });

  describe('CONFIG_DATA', () => {
    it('exists', () => {
      expect(CONFIG_DATA).toBeDefined();
    });

    describe('#value', () => {
      it('contains required properties', () => {
        const props = { dataId: 'dataId' };

        expect(CONFIG_DATA.value.templateId.getter({ trail: null })).toBe(0);
        expect(CONFIG_DATA.value.templateId.getter({ trail: [1, 2] })).toEqual(
          2,
        );

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
        expect(CONFIG_DATA.value.formType).toEqual(
          EVENT_STORE_VIEW_SELECTORS.eventFormProp({ path: EVENT_PATHS.type }),
        );
        expect(CONFIG_DATA.value.formSubtype).toEqual(
          EVENT_STORE_VIEW_SELECTORS.eventFormProp({
            path: EVENT_PATHS.subtype,
          }),
        );

        expect(CONFIG_DATA.value.iconOverride({ dataId: 1 })).toEqual(
          EVENT_STORE_DATA_SELECTORS.eventProp({
            id: 1,
            path: EVENT_PATHS.iconOverride,
          }),
        );
      });
    });

    describe('#setValue', () => {
      it('contains required properties', () => {
        expect(CONFIG_DATA.setValue.form).toEqual(
          EVENT_STORE_VIEW_SELECTORS.eventForm,
        );
      });
    });
  });
});
