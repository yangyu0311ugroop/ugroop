import { CONFIG, PARENT_CONFIG } from '../config';

describe('SeeDetailCheckitem/config.js', () => {
  afterEach(() => jest.clearAllMocks());

  describe('Smoke Test', () => {
    it('should exists', () => {
      expect(CONFIG).toMatchSnapshot();
    });
    it('should exists', () => {
      expect(PARENT_CONFIG).toMatchSnapshot();
    });
  });
  describe('value Test', () => {
    it('should exists', () => {
      expect(CONFIG.value.parentType({ parentParentNodeId: 1 })).toEqual([
        'nodeStore',
        'nodes',
        1,
        'type',
      ]);
    });
  });
});
