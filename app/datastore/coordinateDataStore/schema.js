import { schema } from 'normalizr';
import nodeSchema from 'datastore/nodeStore/schema';

const activity = new schema.Entity(
  'recentActivity',
  {},
  { idAttribute: 'targetId' },
);

const userActivity = new schema.Entity(
  'userActivity',
  {},
  { idAttribute: 'userId' },
);

const activities = [activity];

export const userActivities = [userActivity];

export const recentActivity = {
  recentActivities: activities,
  nodes: nodeSchema.nodes,
};
