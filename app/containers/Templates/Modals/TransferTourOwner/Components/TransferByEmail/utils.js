const inviteYourself = me => (_, value) =>
  value !== me ? true : "Hey that's you.";
const inviteOwner = (owner, people) => (_, value) =>
  value !== owner && people.indexOf(value) === -1
    ? true
    : 'The person is already the owner.';

const transToOwner = ownerEmail => (_, value) =>
  value !== ownerEmail ? true : 'The person is already the owner.';

export default {
  inviteYourself,
  inviteOwner,
  transToOwner,
};
