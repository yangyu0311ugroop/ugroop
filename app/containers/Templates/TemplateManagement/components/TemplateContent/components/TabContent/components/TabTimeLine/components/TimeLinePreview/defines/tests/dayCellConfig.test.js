/**
 * Created by Yang on 13/11/17.
 */
import {
  TEMPLATE_MANAGEMENT_DATASTORE,
  TEMPLATE_MANAGEMENT_VIEWSTORE,
} from 'appConstants';
import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import { SELECTDAYID, CONFIG } from '../dayCellConfig';

describe('DayCellConfig', () => {
  describe('config', () => {
    it('should exists', () => {
      expect(CONFIG).toBeDefined();
    });
  });
  describe('selectDayId Test', () => {
    it('Should Exist', () => {
      expect(CONFIG.value.selectDayId).toEqual([
        TEMPLATE_MANAGEMENT_VIEWSTORE,
        SELECTDAYID,
      ]);
    });
  });
  describe('dateTitle Test', () => {
    it('KeyPath Should Exist', () => {
      expect(CONFIG.value.dateTitle.keyPath).toEqual([
        [TEMPLATE_MANAGEMENT_DATASTORE, 'templates'],
        [TEMPLATE_MANAGEMENT_DATASTORE, 'id'],
      ]);
    });
    it('Getter shall return empty string', () => {
      const templates = {};
      expect(CONFIG.value.dateTitle.getter(templates, {})).toBe('');
    });
    it('Getter shall return empty string', () => {
      const templates = {};
      expect(CONFIG.value.dateTitle.getter(templates, { templateId: -1 })).toBe(
        '',
      );
    });
    it('Getter shall return empty string on negative id', () => {
      expect(CONFIG.value.dateTitle.getter({}, -1, {})).toBe('');
    });
    it('Getter shall return value', () => {
      const templates = {
        2: {
          content: '50',
          type: 'template',
          id: 2,
          customData: {
            displayDate: 'startDate',
            description: '2',
            startDate: '2017-11-30T00:00:00.000Z',
          },
        },
      };
      expect(CONFIG.value.dateTitle.getter(templates, 2, { row: 0 })).toBe(
        'Thursday',
      );
    });
  });
  describe('dayContent Test', () => {
    it('Days shall return value', () => {
      const props = { dayId: 1 };
      expect(CONFIG.value.dayContent(props)).toEqual(
        NODE_STORE_SELECTORS.content({ id: 1 }),
      );
    });
  });
});
