import { DATASTORE_UTILS } from 'datastore';
import { PERSON_STORE_SCHEMA } from 'datastore/personDataStore/schema';
import { normalize } from 'normalizr';
import schema from 'datastore/notificationStore/schema';
import { ORGANISATION_SCHEMA } from '../../../datastore/orgStore/schema';
const addNotifications = result => {
  const normalizedData = normalize(result, schema.notifications);
  const normalizedPeople = normalize(result, {
    users: PERSON_STORE_SCHEMA.people,
  });
  const normalizedOrg = normalize(
    result.orgs,
    ORGANISATION_SCHEMA.organisationDatas,
  );
  return {
    organisations: DATASTORE_UTILS.upsertObject(
      normalizedOrg.entities.organisationData,
    ),
    ugroopNotifications: DATASTORE_UTILS.upsertObject(
      normalizedData.entities.ugroopNotification,
    ),
    people: DATASTORE_UTILS.upsertObject(normalizedData.entities.person),
    peopleById: DATASTORE_UTILS.upsertObject(normalizedPeople.entities.person),
    nodes: DATASTORE_UTILS.upsertObject(normalizedData.entities.node),
    ugroopIds: normalizedData.result.ugroopNotifications,
    photo: DATASTORE_UTILS.upsertObject(normalizedData.entities.photo),
  };
};

export const NOTIFICATION_NORMALISERS = {
  addNotifications,
};
