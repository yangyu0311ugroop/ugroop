import { CONFIG } from '../config';

describe('Content/config.js', () => {
  afterEach(() => jest.clearAllMocks());

  describe('Smoke Test', () => {
    it('should match snapshot', () => {
      expect(CONFIG).toMatchSnapshot();
    });
  });
});
