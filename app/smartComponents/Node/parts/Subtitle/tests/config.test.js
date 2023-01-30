import { CONFIG } from '../config';

describe('Content/config.js', () => {
  afterEach(() => jest.clearAllMocks());

  describe('Smoke Test', () => {
    it('should exists', () => {
      expect(CONFIG).toMatchSnapshot();
    });
  });
  describe('value', () => {});
  describe('setValue', () => {});
});
