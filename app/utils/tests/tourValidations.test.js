import { TAB_OTHER, TAB_TIMELINE } from 'utils/modelConstants';
import { getTabTimeLine, excludePrivate } from '../tourValidations';

describe('Test excludePrivate', () => {
  it('shall return the right values when userid is the owner', () => {
    const tabs = {
      1: { id: 1, customData: { private: true }, createdBy: 1 },
      2: { id: 2, customData: { private: false }, createdBy: 1 },
    };
    expect(excludePrivate(1, tabs)).toEqual(tabs);
  });
  it('shall return the right values when userid is not the owner', () => {
    const tabs = {
      1: { id: 1, customData: { private: true }, createdBy: 1 },
      2: { id: 2, customData: { private: false }, createdBy: 1 },
    };
    const expectedResult = {
      2: { id: 2, customData: { private: false }, createdBy: 1 },
    };
    expect(excludePrivate(2, tabs)).toEqual(expectedResult);
  });
  it('Object pass not shape of a tab should not explode', () => {
    const tabs = { 1: { id: 1, customData: { private: true } } };
    expect(excludePrivate(2, tabs)).toEqual({});
  });
  it('Return all non-private tabs', () => {
    const tabs = {
      1: { id: 1, customData: { private: true } },
      2: { id: 1, customData: { private: false } },
    };
    expect(excludePrivate(2, tabs, true)).toEqual({
      2: { id: 1, customData: { private: false } },
    });
  });
  it('Return return filter1d', () => {
    const tabs = {
      1: { id: 1, customData: { private: false } },
      2: { id: 2, customData: { private: true } },
    };
    expect(excludePrivate(2, tabs, true, 1)).toEqual({
      1: { id: 1, customData: { private: false } },
    });
  });
});

describe('Test getTabTimeLine', () => {
  it('should return TAB_TIMELINE only', () => {
    const expected = { 1: { id: 1, type: TAB_TIMELINE } };
    const tabs = { ...expected, 2: { id: 2, type: TAB_OTHER } };
    expect(getTabTimeLine(tabs)).toEqual(expected);
  });
});
