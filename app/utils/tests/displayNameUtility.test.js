import { NameUtility } from 'utils/displayNameUtility';
describe('displayNameUtility ', () => {
  it('return knownAs', () => {
    const res = NameUtility.userDisplayName({ knownAs: 'a b' });
    expect(res).toBe('a b');
  });
  it('return firstname + lastname', () => {
    const res = NameUtility.userDisplayName({ firstName: 'a', lastName: 'b' });
    expect(res).toBe('a b');
  });
  it('return firstname', () => {
    const res = NameUtility.userDisplayName({ firstName: 'a' });
    expect(res).toBe('a');
  });
  it('return lastname', () => {
    const res = NameUtility.userDisplayName({ lastName: 'b' });
    expect(res).toBe('b');
  });
  it('return email', () => {
    const res = NameUtility.userDisplayName({ email: 'a@a.com' });
    expect(res).toBe('a@a.com');
  });
  it('return unknown', () => {
    const res = NameUtility.userDisplayName();
    expect(res).toBe('Unknown User');
  });
});
