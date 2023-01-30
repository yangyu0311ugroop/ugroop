import { schema } from 'normalizr';
import { FILE_STORE_SCHEMAS } from '../fileStore/schema';

const ugroopNotification = new schema.Entity('ugroopNotification');
const node = new schema.Entity('node');
const person = new schema.Entity(
  'person',
  {
    photo: FILE_STORE_SCHEMAS.photo,
  },
  { idAttribute: 'userId' },
);
const org = new schema.Entity('org');

// Define your article
const notifications = {
  ugroopNotifications: [ugroopNotification],
  nodes: [node],
  users: [person],
  orgs: [org],
};

export default {
  notifications,
};
