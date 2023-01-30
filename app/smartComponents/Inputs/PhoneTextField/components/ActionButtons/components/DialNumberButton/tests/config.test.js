import { CONFIG } from '../config';

describe('CONFIG', () => {
  afterEach(() => jest.clearAllMocks());
  describe('Smoke Test', () => {
    it('should exists', () => {
      expect(CONFIG).toMatchSnapshot();
    });
  });
});
