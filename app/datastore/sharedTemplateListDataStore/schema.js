import { schema } from 'normalizr';
import userStore from 'datastore/userStore/schema';
const children = new schema.Entity('children', {
  people: userStore.person,
  createdBy: userStore.singlePerson,
  lastModifiedBy: userStore.singlePerson,
});
const folder = new schema.Entity('folder', {
  children: [children],
});

export default {
  folder,
};
