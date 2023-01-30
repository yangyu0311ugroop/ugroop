/**
 * Created by stephenkarpinskyj on 25/10/18.
 */

import { NODE_PATHS } from 'datastore/nodeStore/constants';
import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import { EVENT_STORE_VIEW_SELECTORS } from 'datastore/eventStore/selectors';
import { TEMPLATE_MANAGEMENT_STORE_SELECTORS } from 'datastore/templateManagementStore/selectors';
import { CONFIG_TAB_ID, CONFIG_IDS, CONFIG } from '../config';

describe('smartComponents/Event/parts/BatchCreate/DayRange/config', () => {
  describe('CONFIG_TAB_ID', () => {
    it('exists', () => {
      expect(CONFIG_TAB_ID).toBeDefined();
    });

    describe('#value', () => {
      it('contains required properties', () => {
        const { value } = CONFIG_TAB_ID();
        expect(value.tabId).toEqual(TEMPLATE_MANAGEMENT_STORE_SELECTORS.tabId);
      });
    });
  });

  describe('CONFIG_IDS', () => {
    it('exists', () => {
      expect(CONFIG_IDS).toBeDefined();
    });

    describe('#value', () => {
      it('contains required properties', () => {
        NODE_STORE_SELECTORS.cachedChildren = jest.fn((...args) => [
          'cachedChildren',
          ...args,
        ]);
        NODE_STORE_SELECTORS.calculatedTrailParent = jest.fn(
          () => 'calculatedTrailParent',
        );
        const { value } = CONFIG_IDS();
        expect(value.dayIds).toEqual(
          NODE_STORE_SELECTORS.cachedChildren({ idProp: 'tabId' }),
        );
        expect(value.parentNodeId).toEqual(
          NODE_STORE_SELECTORS.calculatedTrailParent(),
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
        NODE_STORE_SELECTORS.calculatedStartTimeValues = jest.fn((...args) => [
          'calculatedStartTimeValues',
          ...args,
        ]);
        const { value } = CONFIG();
        expect(value.dayDates).toEqual(
          NODE_STORE_SELECTORS.calculatedStartTimeValues({ idsProp: 'dayIds' }),
        );
        expect(value.formCalculatedStartDayValue).toEqual(
          EVENT_STORE_VIEW_SELECTORS.eventFormProp({
            path: NODE_PATHS.calculatedStartTimeValue,
          }),
        );
      });
    });
  });
});
