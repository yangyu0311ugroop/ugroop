/**
 * Created by quando on 9/8/17.
 */

export default function isAfter(values, value) {
  const min = new Date();
  const date = new Date(value);
  return date > min;
}
