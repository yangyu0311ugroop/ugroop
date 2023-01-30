/**
 * Created by quando on 1/3/17.
 */

import isIn from './rules/isIn';
import hasLength from './rules/hasLength';
import isAfter from './rules/isAfter';
import { isLessThanOrEqual } from './rules/isBetween';
import { isGreaterThanOrEqual } from './rules/isHigher';
import number from './rules/number';
import duration from './rules/duration';
import dateTime from './rules/dateTime';
import phone from './rules/phone';
import email from './rules/email';

/*
 * custom validation rules for our form
 */
const validators = {
  isIn,
  hasLength,
  isAfter,
  isLessThanOrEqual,
  isGreaterThanOrEqual,
  ...number,
  ...duration,
  ...dateTime,
  ...phone,
  ...email,
};

export default validators;
