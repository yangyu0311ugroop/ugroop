import { CONFIG } from '../config';

describe('EditableRTE/config.js', () => {
  afterEach(() => jest.clearAllMocks());

  describe('Smoke Test', () => {
    it('should exists', () => {
      expect(CONFIG).toMatchSnapshot();
    });

    describe('value', () => {
      it('should exists content', () => {
        expect(
          CONFIG.value.content({
            templateId: 1,
            hashKeyDesc: true,
            example: 'abc',
          }),
        ).toMatchSnapshot();
      });
      it('should exists content', () => {
        expect(
          CONFIG.value.content({
            templateId: 1,
            hashKeyDesc: false,
            example: 'abc',
          }),
        ).toMatchSnapshot();
      });
    });
  });
});
