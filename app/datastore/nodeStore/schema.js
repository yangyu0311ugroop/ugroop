import { feedback, photo } from 'datastore/templateManagementStore/schema';
import { FILE_STORE_SCHEMAS } from 'datastore/fileStore/schema';
import { normalize, schema } from 'normalizr';
import { INTERESTED_PEOPLE, PARTICIPANTS } from 'utils/modelConstants';
import { NODE_STORE_HELPERS } from 'datastore/nodeStore/helpers';
import UserStore from '../userStore/schema';

const checkitem = new schema.Entity('checkitems', {
  feedbacks: [feedback],
  photos: [photo],
});
// creating circular references
checkitem.define({
  nextNodes: [checkitem],
  checklists: [checkitem],
});

const hashkey = new schema.Entity(
  'hashkey',
  {},
  {
    idAttribute: 'hashkey',
    processStrategy: NODE_STORE_HELPERS.processHashkey,
  },
);
const hazard = new schema.Entity('hazards');

const risk = new schema.Entity('risks', {
  children: [hazard],
});

const follower = new schema.Entity('follower');

// const room = new schema.Entity('rooms');
const participant = new schema.Entity('participants');
const room = new schema.Entity('rooms', {
  participants: [participant],
});

const nodeUser = new schema.Entity('nodeUser', {
  profilePhotoUrl: FILE_STORE_SCHEMAS.photo,
});

const group = new schema.Entity('group');
const groups = [group];

const node = new schema.Entity('node', {
  risks: [risk],
  rooms: [room],
  groups,
  hashkey,
  createdBy: nodeUser,
  lastModifiedBy: nodeUser,
});

const comment = new schema.Entity('comments');
export const feedbacks = new schema.Entity('feedbacks', {
  comments: [comment],
});

const templatesetting = new schema.Entity(
  'templatesettings',
  {},
  {
    idAttribute: NODE_STORE_HELPERS.attributeSelector,
    processStrategy: NODE_STORE_HELPERS.processTemplateSettings,
  },
);
const templatesettings = [templatesetting];

const nodes = [node];

const eventNode = new schema.Entity('eventNodes');
const eventNodes = [eventNode];

const participantNode = new schema.Entity('participantNodes', {
  followers: [follower],
  rooms: [room],
});
const participantNodes = [participantNode];
const participantLink = new schema.Entity('participantLink');
const participantLinks = [participantLink];

eventNode.define({
  seats: eventNodes,
  ratings: eventNodes,
  participants: participantNodes,
});

participantNode.define({
  seats: eventNodes,
  ratings: eventNodes,
  groups,
});

const link = new schema.Entity('link');
const links = [link];

group.define({
  participants: links,
});

node.define({
  people: UserStore.person,
  nextNodes: nodes,
  children: nodes,
  feedbacks: [feedbacks],
  events: eventNodes,
  forms: nodes,
  photos: [FILE_STORE_SCHEMAS.templatePhoto],
  attachment: FILE_STORE_SCHEMAS.attachment,
  checklists: nodes,
  routes: nodes,
  [INTERESTED_PEOPLE]: nodes,
  [PARTICIPANTS]: participantNodes,
  participantLinks,
  hashkey,
  templatesettings,
  reactions: links,
  user: nodes,
});

link.define({
  userNode: nodes,
});

const folder = new schema.Entity('folder', {
  children: nodes,
  personal: nodes,
});

const day = new schema.Entity('day');
const days = [day];

const normalisedDay = data => {
  const { entities, result } = normalize(data, days);
  return { days: entities.day, result };
};

export default {
  nodes,
  folder,
};

export const NODE_SCHEMA = {
  singleNode: node,
  node: nodes,
  checkitem,
  checklists: nodes,
  nextNodes: nodes,
  eventNode,
  normalisedDay,
  links,
  link,
};

const normalise = data => {
  const { entities, result } = normalize(data, checkitem);

  return {
    node: entities.checkitems,
    result,
  };
};

const folderNormalise = data => {
  const { entities, result } = normalize(data, folder);

  return {
    nodes: entities.node,
    people: entities.person,
    folder: entities.folder,
    files: entities.photo,
    id: result,
    nodeUsers: entities.nodeUser,
  };
};

export const NODE_NORMALISERS = {
  normalise,
  folderNormalise,
};
