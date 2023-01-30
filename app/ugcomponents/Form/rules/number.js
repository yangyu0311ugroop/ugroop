/**
 * Created by stephenkarpinskyj on 9/5/18.
 */

// TODO: Move all number rules here?

export const isNumber = (_, value) => !value || !Number.isNaN(value * 1);

export const isInt = (_, value) => !value || Number.isInteger(value * 1);

/**
 * Returns true if this field's value is the same or greater than another's.
 */
export const minNumberField = (values, value, opts) => {
  if (!opts) return true;
  const { otherFieldName, offset = 0 } = opts;
  if (!values) return true;
  if (!value || !isNumber(null, value)) return true;
  const otherValue = values[otherFieldName];
  if (!otherValue || !isNumber(null, otherValue)) return true;
  return value >= otherValue + offset;
};

/**
 * Returns true if this field's value is the same or less than another's.
 */
export const maxNumberField = (values, value, opts) => {
  if (!opts) return true;
  const { otherFieldName, offset = 0 } = opts;
  if (!values) return true;
  if (!value || !isNumber(null, value)) return true;
  const otherValue = values[otherFieldName];
  if (!otherValue || !isNumber(null, otherValue)) return true;
  return value + offset <= otherValue;
};

export default {
  isNumber,
  isInt,
  minNumberField,
  maxNumberField,
};
