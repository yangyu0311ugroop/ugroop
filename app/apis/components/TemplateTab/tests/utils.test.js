import { TEMPLATE_TAB_UTILS } from '../utils';

describe('TemplateTab/utils.js', () => {
  afterEach(() => jest.clearAllMocks());

  describe('Smoke Test', () => {
    it('should exists', () => {
      expect(typeof TEMPLATE_TAB_UTILS).toBe('object');
    });
  });

  describe('addTab', () => {
    it('should return a particular object shape for set value', () => {
      const node = {
        id: 1,
        type: 'tabtimeline',
      };
      const result = TEMPLATE_TAB_UTILS.addTab(node);
      expect(result).toMatchSnapshot();
      expect(result.nodes({})).toMatchSnapshot();
    });
  });

  describe('addMultipleNode', () => {
    it('should return a particular object shape for set value', () => {
      const nodes = [
        {
          id: 1,
          type: 'tabtimeline',
          children: [
            {
              id: 4,
              type: 'day',
              children: [],
            },
          ],
          parentNodeId: 1,
        },
        {
          id: 2,
          type: 'tabother',
          children: [],
        },
        {
          id: 3,
          type: 'tabother',
          children: [],
        },
      ];
      const result = TEMPLATE_TAB_UTILS.addMultipleNode(nodes);
      expect(result).toMatchSnapshot();
    });
    it('should return empty array', () => {
      const result = TEMPLATE_TAB_UTILS.addMultipleNode();
      expect(result).toMatchSnapshot();
    });
    it('should return empty array', () => {
      const result = TEMPLATE_TAB_UTILS.addMultipleNode([{ parentNodeId: 1 }]);
      expect(result).toMatchSnapshot();
    });
  });
});
