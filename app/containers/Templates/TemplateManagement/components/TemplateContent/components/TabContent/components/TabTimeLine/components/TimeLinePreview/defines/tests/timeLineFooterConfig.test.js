import { TEMPLATE_MANAGEMENT_DATASTORE, NODE_STORE } from 'appConstants';
import FN, { CONFIG } from '../timeLineFooterConfig';

describe('TimeLineFooter', () => {
  describe('getChildren', () => {
    it('returns correct keyPath', () => {
      const props = { tabId: 'tabId' };
      expect(FN.getChildren(props)).toEqual([
        NODE_STORE,
        'nodes',
        props.tabId,
        'children',
      ]);
    });
  });

  describe('dateTitle Test', () => {
    it('KeyPath Should Exist', () => {
      expect(CONFIG.value.dateTitle.keyPath).toEqual([
        [NODE_STORE, 'nodes'],
        [TEMPLATE_MANAGEMENT_DATASTORE, 'id'],
        FN.getChildren,
      ]);
    });
    it('Getter shall return empty string on negative id', () => {
      expect(CONFIG.value.dateTitle.getter({}, -1, {})).toBe('');
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
    it('Getter shall return value', () => {
      const templates = {
        2: {
          content: '50',
          type: 'template',
          id: 2,
          customData: {
            displayDate: 'startDate',
            description: '2',
            startDate: '2018-11-30T00:00:00.000Z',
          },
        },
      };
      expect(CONFIG.value.dateTitle.getter(templates, 2, [{ id: 1 }])).toBe(
        'Fri, 30 Nov',
      );
      expect(
        CONFIG.value.dateTitle.getter(templates, 2, [{ id: 1 }, { id: 2 }]),
      ).toBe('Sat, 01 Dec');
      expect(CONFIG.value.dateTitle.getter(templates, 2)).toBe('Fri, 30 Nov');
    });
  });
  it('should return tab config correctly', () => {
    const tabs = {
      3: {
        content: 'Days & Events',
        parentNodeId: 2,
        type: 'tabtimeline',
        tabId: 3,
        customData: {
          duration: 50,
        },
        photos: [],
        feedbacks: [],
        children: [4, 53],
        nextNodes: [],
      },
    };
    const data = CONFIG.value.dayIds;
    expect(data.keyPath).toEqual([NODE_STORE, 'nodes']);
    expect(typeof data.getter).toBe('function');
    expect(data.getter(tabs, { tabId: 3 })).toEqual([4, 53]);
  });
});
