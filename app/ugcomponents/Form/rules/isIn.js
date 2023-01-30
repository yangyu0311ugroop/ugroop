/**
 * Created by quando on 1/3/17.
 */

export default function isIn(values, value, array) {
  return !!value && !!array && array.indexOf(value) >= 0;
}
