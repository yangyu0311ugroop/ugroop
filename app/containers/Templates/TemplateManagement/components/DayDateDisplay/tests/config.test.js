/**
 * Created by stephenkarpinskyj on 25/10/18.
 */

import { TEMPLATE_MANAGEMENT_STORE_SELECTORS } from 'datastore/templateManagementStore/selectors';
import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import { CONFIG_IDS, CONFIG } from '../config';

describe('containers/TemplateManagement/DayDateDisplay/config', () => {
  describe('CONFIG_IDS', () => {
    it('exists', () => {
      expect(CONFIG_IDS).toBeDefined();
    });

    describe('#value', () => {
      it('contains required properties', () => {
        expect(CONFIG_IDS.value.templateId).toEqual(
          TEMPLATE_MANAGEMENT_STORE_SELECTORS.templateId,
        );
      });
    });
  });

  describe('CONFIG', () => {
    it('exists', () => {
      expect(CONFIG).toBeDefined();
    });

    describe('#value', () => {
      it('contains required properties', () => {
        const props = { id: 1 };
        expect(CONFIG.value.displayDate({ templateId: 999 })).toEqual(
          NODE_STORE_SELECTORS.displayDate({ id: 999 }),
        );
        expect(CONFIG.value.startTime(props)).toEqual(
          NODE_STORE_SELECTORS.calculatedStartTimeValue(props),
        );
      });
    });
  });
});
