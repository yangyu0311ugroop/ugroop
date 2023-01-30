import { PHONE_HELPERS } from '../phone';

describe('utils/helpers/phone', () => {
  describe('PHONE_HELPERS', () => {
    describe('#isValidNumber()', () => {
      it('validates correctly', () => {
        expect(PHONE_HELPERS.isValidNumber('021')).toBe(false);
        expect(PHONE_HELPERS.isValidNumber('+61412123456')).toBe(true);
      });
    });

    describe('#parseNumber()', () => {
      it('parses correctly', () => {
        expect(PHONE_HELPERS.parseNumber()).toBe(null);
        expect(PHONE_HELPERS.parseNumber('+61412123456')).toEqual(
          expect.objectContaining({ country: 'AU', phone: '412123456' }),
        );
      });
    });

    describe('#renderNumberInternational()', () => {
      it('renders correctly', () => {
        expect(PHONE_HELPERS.renderNumberInternational('+61412123456')).toEqual(
          '+61 412 123 456',
        );
      });
    });
  });
});
