/**
 * Created by stephenkarpinskyj on 8/6/18.
 */
import { isValidNumber } from 'libphonenumber-js';

export const isPhoneNumber = (_, value = '') => !value || isValidNumber(value);

export default {
  isPhoneNumber,
};
