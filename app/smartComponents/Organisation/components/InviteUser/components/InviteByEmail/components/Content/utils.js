const inviteYourself = me => (_, value) =>
  value !== me ? true : "Hey that's you.";
const inviteOwner = (owner, people) => (_, value) =>
  value !== owner && people.indexOf(value) === -1
    ? true
    : 'This person is already a member.';
const invitePending = (owner, people) => (_, value) =>
  people.indexOf(value) === -1 ? true : 'This person has a pending invitation.';
export default {
  inviteYourself,
  inviteOwner,
  invitePending,
};
