/**
 * Created by stephenkarpinskyj on 25/10/18.
 */

import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import {
  EVENT_STORE_VIEW_SELECTORS,
  EVENT_STORE_DATA_SELECTORS,
} from 'datastore/eventStore/selectors';
import { CONFIG, CONFIG_EVENT_DATA } from '../config';

describe('containers/TemplateManagement/Event/Buttons/TooltipIconButton/config', () => {
  describe('CONFIG', () => {
    it('exists', () => {
      expect(CONFIG).toBeDefined();
    });

    describe('#value', () => {
      it('contains required properties', () => {
        expect(CONFIG.value.dataId).toEqual(NODE_STORE_SELECTORS.eventDataId);
        expect(CONFIG.value.active).toBe(NODE_STORE_SELECTORS.calculatedActive);
      });
    });
  });

  describe('CONFIG_EVENT_DATA', () => {
    it('exists', () => {
      expect(CONFIG_EVENT_DATA).toBeDefined();
    });

    describe('#value', () => {
      it('contains required properties', () => {
        const props = { dataId: 1 };
        expect(CONFIG_EVENT_DATA.value.event(props)).toEqual(
          EVENT_STORE_DATA_SELECTORS.event({ id: props.dataId }),
        );
      });
    });

    describe('#setValue', () => {
      it('contains required properties', () => {
        expect(CONFIG_EVENT_DATA.setValue.eventView).toEqual(
          EVENT_STORE_VIEW_SELECTORS.eventView,
        );
        expect(CONFIG_EVENT_DATA.setValue.active).toBe(
          NODE_STORE_SELECTORS.calculatedActive,
        );
      });
    });
  });
});
