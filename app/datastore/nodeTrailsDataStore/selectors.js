import { NODE_TRAILS_DATASTORE } from 'appConstants';

const content = ({ id }) => [NODE_TRAILS_DATASTORE, 'trail', id, 'content'];
const status = ({ id }) => [NODE_TRAILS_DATASTORE, 'trail', id, 'status'];
const trail = ({ id }) => [NODE_TRAILS_DATASTORE, 'breadcrumb', id, 'trail'];

export const NODE_TRAIL_STORE_SELECTORS = {
  trails: {
    content,
    status,
  },
  breadcrumb: {
    trail,
  },
};
