/**
 * Created by quando on 9/8/17.
 */

export const isLessThanOrEqual = (_, value, max) =>
  !Number.isNaN(value) && !Number.isNaN(max) && value <= max;
