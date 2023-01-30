/**
 * Created by quando on 6/4/17.
 */
export function makeName(firstName = '', lastName = '') {
  if (firstName && !lastName) {
    return firstName;
  }
  if (!firstName && lastName) {
    return lastName;
  }
  if (firstName && lastName) {
    return `${firstName} ${lastName}`;
  }
  return '';
}
