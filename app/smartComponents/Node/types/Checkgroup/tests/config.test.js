import { CONFIG } from '../config';

describe('Checkgroup/config.js', () => {
  afterEach(() => jest.clearAllMocks());

  describe('Smoke Test', () => {
    it('should exists', () => {
      expect(CONFIG).toMatchSnapshot();
    });
  });
  describe('checklists', () => {
    it('value', () => {
      expect(CONFIG.value.checklists({ id: 1 })).toEqual([
        'nodeStore',
        'nodes',
        1,
        'checklists',
      ]);
    });
  });
});
