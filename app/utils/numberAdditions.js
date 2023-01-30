export function isNumber(number) {
  // eslint-disable-next-line no-restricted-globals
  if (typeof number === 'number' && !isNaN(number)) {
    return true;
  }
  return false;
}
