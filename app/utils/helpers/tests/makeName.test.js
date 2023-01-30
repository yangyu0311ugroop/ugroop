/**
 * Created by quando on 6/4/17.
 */
import { makeName } from '../makeName';

describe('makeName()  ', () => {
  const firstName = 'Quan';
  const lastName = 'Do';
  it('should be called correctly 1', () => {
    expect(makeName(firstName, '')).toEqual(firstName);
  });
  it('should be called correctly 2', () => {
    expect(makeName('', lastName)).toEqual(lastName);
  });
  it('should be called correctly 3', () => {
    expect(makeName(firstName, lastName)).toEqual(`${firstName} ${lastName}`);
  });
  it('should be called correctly 4', () => {
    expect(makeName()).toEqual('');
  });
});
