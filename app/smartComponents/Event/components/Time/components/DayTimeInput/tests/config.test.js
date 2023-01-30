/**
 * Created by stephenkarpinskyj on 25/10/18.
 */

import { CONFIG_TAB_ID, CONFIG_IDS, CONFIG } from '../config';

describe('smartComponents/Event/Time/config', () => {
  describe('CONFIG_TAB_ID', () => {
    it('exists', () => {
      expect(CONFIG_TAB_ID).toBeDefined();
    });

    describe('props', () => {
      it('should only return tabId in object passed to it', () => {
        const props = { tabId: 1, id: 2, others: 3 };
        const expected = 1;

        expect(CONFIG_TAB_ID.value.tabId.props(props)).toBe(expected);
      });
    });

    describe('#value', () => {
      describe('tabId', () => {
        it('return 1 if trail was an array of ids', () => {
          expect(CONFIG_TAB_ID.value.tabId.getter(1)).toBe(1);
        });

        it('return tabId if included', () => {
          expect(CONFIG_TAB_ID.value.tabId.getter(null, 1)).toBe(1);
        });
      });
    });
  });

  describe('CONFIG_IDS', () => {
    it('exists', () => {
      expect(CONFIG_IDS).toBeDefined();
    });

    describe('#value', () => {
      it('contains required properties', () => {
        expect(CONFIG_IDS.value.dayIds).toBeDefined();
        expect(CONFIG_IDS.value.parentNodeId).toBeDefined();
      });
    });
  });

  describe('CONFIG', () => {
    it('exists', () => {
      expect(CONFIG).toBeDefined();
    });

    describe('#value', () => {
      it('contains required properties', () => {
        expect(CONFIG.value.dayDates).toBeDefined();
        expect(CONFIG.value.formBatchCreate).toBeDefined();
      });
    });
  });
});
