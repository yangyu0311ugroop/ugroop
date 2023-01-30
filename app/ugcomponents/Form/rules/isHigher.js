/**
 * Created by edil on 01/24/18.
 */

export const isGreaterThanOrEqual = (_, value, min) =>
  (value !== 0 && !value) || (min !== 0 && !min) || value >= min;
