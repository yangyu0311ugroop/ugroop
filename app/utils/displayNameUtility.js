const userDisplayName = user => {
  if (!user) return 'Unknown User';
  if (user.knownAs) {
    return user.knownAs;
  }
  if (user.knownas) {
    return user.knownas;
  }
  if (user.firstName && user.lastName) {
    return `${user.firstName} ${user.lastName}`;
  }
  if (user.firstname && user.lastname) {
    return `${user.firstname} ${user.lastname}`;
  }
  if (user.firstName) {
    return user.firstName;
  }
  if (user.firstname) {
    return user.firstname;
  }
  if (user.lastName) {
    return user.lastName;
  }
  if (user.lastname) {
    return user.lastname;
  }
  return user.email;
};

export const NameUtility = {
  userDisplayName,
};
