import {
  PHONE_STORE_FIELDS,
  PHONE_STORE_SELECTOR_CREATOR,
  PHONE_STORE_SET_VALUE_SELECTOR,
} from '../selectors';

describe('fileStore/selectors.js', () => {
  describe('PHONE_STORE_SET_VALUE_SELECTOR', () => {
    it('should return particular array shape', () => {
      Object.keys(PHONE_STORE_SET_VALUE_SELECTOR).forEach(key => {
        expect(
          PHONE_STORE_SET_VALUE_SELECTOR[key]({ id: 1 }),
        ).toMatchSnapshot();
      });
    });
  });

  describe('PHONE_STORE_SELECTOR_CREATOR', () => {
    it('should generate selector based on specified fields', () => {
      Object.keys(PHONE_STORE_FIELDS).forEach(key => {
        expect(PHONE_STORE_SELECTOR_CREATOR(key)({ id: 1 })).toMatchSnapshot();
      });
    });
  });
});
