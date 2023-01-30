const inviteYourself = me => (_, value) =>
  value !== me ? true : "Hey that's you.";
const inviteOwner = (owner, people) => (_, value) =>
  value !== owner && people.indexOf(value) === -1
    ? true
    : 'This person is already in the tour.';

export default {
  inviteYourself,
  inviteOwner,
};
