export const myEmail = (_, value, me) => !value || value !== me;

export const emailBlacklist = (_, value, blacklist) =>
  !value || !blacklist.includes(value);

export default {
  myEmail,
  emailBlacklist,
};
