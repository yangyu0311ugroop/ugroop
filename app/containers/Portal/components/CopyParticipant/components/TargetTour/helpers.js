const createModel = data => {
  const {
    firstName,
    lastName,
    email,
    dob,
    dobMode,
    namePersonId,
    personType,
    comment,
    note,
    primary,
    phone,
    phoneId,
    ageType,
    honorificTitle,
    orgId,
  } = data;
  return {
    firstName,
    lastName,
    email,
    dob,
    dobMode,
    namePersonId,
    personType,
    comment,
    note,
    primary,
    phone,
    phoneId,
    ageType,
    honorificTitle,
    orgId,
  };
};

const getParticipant = (nodes, { firstName, lastName, email }) =>
  nodes
    .map(node => node.customData)
    .filter(
      person =>
        (person.firstName === firstName && person.lastName === lastName) ||
        (person.email === email && !!person.email),
    );

export const MODEL_HELPERS = {
  createModel,
  getParticipant,
};
