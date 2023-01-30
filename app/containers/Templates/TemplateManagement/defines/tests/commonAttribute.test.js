/**
 * Created by Yang on 13/11/17.
 */
import CommonAttribute from '../commonAttribute';

describe('Common Attribute', () => {
  describe('formatDate Test', () => {
    it('Getter shall return empty string', () => {
      const customData = {};
      expect(CommonAttribute.formatDate.getter(customData, {})).toBe('');
    });
    it('Getter shall return empty string', () => {
      const customData = {};
      expect(
        CommonAttribute.formatDate.getter(customData, { templateId: -1 }),
      ).toBe('');
    });
    it('Getter shall return value', () => {
      const customData = {
        displayDate: 'startDate',
        description: '2',
        startDate: '2018-11-30T00:00:00.000Z',
      };
      expect(CommonAttribute.formatDate.getter(customData, 0)).toBe(
        'Fri, 30 Nov 2018',
      );
    });
  });
  describe('formatLongDate Test', () => {
    it('Getter shall return empty string', () => {
      const customData = {};
      expect(CommonAttribute.formatLongDate.getter(customData, {})).toBe('');
    });
    it('Getter shall return empty string', () => {
      const customData = {};
      expect(
        CommonAttribute.formatLongDate.getter(customData, { templateId: -1 }),
      ).toBe('');
    });
    it('Getter shall return value', () => {
      const customData = {
        displayDate: 'startDate',
        description: '2',
        startDate: '2018-11-30T00:00:00.000Z',
      };
      expect(CommonAttribute.formatLongDate.getter(customData, 1)).toBe(
        'Saturday, 1 December 2018',
      );
    });
  });
});
