import { NODE_STORE } from 'appConstants';
import { CONFIG } from '../daylistViewConfig';

describe('DayListViewConfig', () => {
  it('Should Exist', () => {
    expect(CONFIG.value.dayIds.keyPath).toEqual([NODE_STORE, 'nodes']);
  });
  it('Getter shall get correct children', () => {
    const tabs = {
      2: {
        content: '50',
        type: 'template',
        id: 2,
        children: [1, 2],
      },
    };
    expect(CONFIG.value.dayIds.getter(tabs, { tabId: 2 })).toEqual([1, 2]);
  });
  it('Getter shall get empty array', () => {
    const tabs = {
      2: {
        content: '50',
        type: 'template',
        id: 2,
        children: [1, 2],
      },
    };
    expect(CONFIG.value.dayIds.getter(tabs, { tabId: 1 })).toEqual([]);
  });
});
