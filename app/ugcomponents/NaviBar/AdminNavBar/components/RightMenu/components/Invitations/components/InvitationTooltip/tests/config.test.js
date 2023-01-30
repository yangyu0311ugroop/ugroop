import { CONFIG } from '../config';

describe('InvitationTooltip/config.js', () => {
  afterEach(() => jest.clearAllMocks());

  describe('Smoke Test', () => {
    it('should exists', () => {
      expect(typeof CONFIG).toBe('object');
    });
  });

  describe('setValue', () => {
    it('should exists', () => {
      expect(typeof CONFIG.setValue).toBe('object');
    });
  });

  describe('value', () => {
    it('should exists', () => {
      expect(typeof CONFIG.value).toBe('object');
    });

    describe('shareFrom', () => {
      it('should exists', () => {
        expect(CONFIG.value.shareFrom({ token: '2233' })).toMatchSnapshot();
      });
    });
  });
});
