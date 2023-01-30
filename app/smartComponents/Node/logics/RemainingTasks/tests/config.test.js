import { ALL_CHECKLISTS, CHECKITEMS_STATUS } from '../config';

describe('RemainingTasks/config.js', () => {
  afterEach(() => jest.clearAllMocks());

  describe('Smoke Test', () => {
    it('should exists', () => {
      expect(ALL_CHECKLISTS).toMatchSnapshot();
      expect(CHECKITEMS_STATUS).toMatchSnapshot();
    });
  });
});
