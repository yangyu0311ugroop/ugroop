/**
 * Created by quando on 1/3/17.
 */

export default function hasLength(
  values,
  value = '',
  { min = 0, max = min + 1 } = { min: 0, max: 1 },
) {
  return !!value && value.length >= min && value.length < max;
}
