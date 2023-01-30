import { schema } from 'normalizr';

const notification = new schema.Entity('notification');
const notifications = [notification];

export const nodeShareSubNode = new schema.Entity(
  'nodeShareSubNode',
  {},
  {
    // HACK: Because shares use notificationToken as store id
    processStrategy: (value, { notificationToken }) => ({
      ...value,
      notificationToken,
    }),
  },
);
const nodeShareSubNodes = [nodeShareSubNode];

const nodeShare = new schema.Entity(
  'nodeShare',
  {
    notifications,
    subNodes: nodeShareSubNodes,
  },
  { idAttribute: 'notificationToken' },
);
const nodeTransfer = new schema.Entity(
  'nodeTransfer',
  {
    notifications,
  },
  { idAttribute: 'notificationToken' },
);
const nodeShares = [nodeShare];
const nodeTransfers = [nodeTransfer];

const userNode = new schema.Entity('userNodes');
const userNodes = [userNode];
userNode.define({ userNodes });

const orgInvitation = new schema.Entity(
  'orgInvitation',
  {},
  { idAttribute: 'invitationToken' },
);
const orgInvitations = [orgInvitation];

export const INVITATION_STORE_SCHEMA = {
  nodeShare: nodeShares,
  userNodes,
  orgInvitation: orgInvitations,
  notification: notifications,
  nodeTransfer: nodeTransfers,
};

export default INVITATION_STORE_SCHEMA;
