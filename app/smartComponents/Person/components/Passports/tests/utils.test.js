import { PASSPORT_UTILS } from '../utils';

describe('PASSPORT_UTILS', () => {
  it('should replace passportType with whatever the value of passportOtherType is if passportOtherType exist in the object', () => {
    const result = PASSPORT_UTILS.validateData({
      passportType: 'other',
      passportOtherType: 'qqq',
    });
    expect(result).toEqual({
      passportType: 'qqq',
    });
  });

  it('not replaces passportType passportOtherType not exists', () => {
    const data = { x: 1 };
    expect(PASSPORT_UTILS.validateData(data)).toBe(data);
  });
});
