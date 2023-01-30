import { ORGANISATION_SCHEMA } from 'datastore/orgStore/schema';
import { schema } from 'normalizr';
import { INTERESTED_PEOPLE, PARTICIPANTS } from 'utils/modelConstants';
import { FILE_STORE_SCHEMAS } from 'datastore/fileStore/schema';

// Tab Level, for `GET /nodes/:id/tabtimeline

const comment = new schema.Entity('comments');
export const feedback = new schema.Entity('feedbacks', {
  comments: [comment],
});

export const photo = new schema.Entity('photos');
const attachment = new schema.Entity('attachments');

export const checkitem = new schema.Entity('checkitems', {
  feedbacks: [feedback],
  photos: [photo],
});
// creating circular references
checkitem.define({
  checklists: [checkitem],
  nextNodes: [checkitem],
});

const section = new schema.Entity('sections', {
  checklists: [checkitem],
  feedbacks: [feedback],
  photos: [photo],
  attachment,
});
const event = new schema.Entity('events');
const events = [event];

const follower = new schema.Entity('follower');
const participant = new schema.Entity(PARTICIPANTS, {
  followers: [follower],
});
const participants = [participant];
const participantLink = new schema.Entity('participantLink');
const participantLinks = [participantLink];
const interestedPerson = new schema.Entity(INTERESTED_PEOPLE, {
  [PARTICIPANTS]: participants,
  participantLinks,
});
const interestedPeople = [interestedPerson];

const day = new schema.Entity('days', {
  checklists: [checkitem],
  children: [section],
  feedbacks: [feedback],
  photos: FILE_STORE_SCHEMAS.templatePhotos,
  events,
});

const tabTimeLine = [day];
const tabOther = [section];
const tabGallery = [section];
// Template Level, for `GET /nodes/:id/template

const risk = new schema.Entity('risks');
const group = new schema.Entity('group');

const tab = new schema.Entity('tabs', {
  events,
});

// People [{ person1 }, { person2 }]
const person = new schema.Entity('person', {}, { idAttribute: 'email' });
const people = [person];

const hashkey = new schema.Entity('hashkey', {}, { idAttribute: 'hashkey' });

const templates = new schema.Entity('templates', {
  checklists: [checkitem],
  risks: [risk],
  children: [tab],
  feedbacks: [feedback],
  groups: [group],
  photos: FILE_STORE_SCHEMAS.templatePhotos,
  [INTERESTED_PEOPLE]: interestedPeople,
  [PARTICIPANTS]: participants,
  people,
  events,
  hashkey,
  organisation: ORGANISATION_SCHEMA.organisation,
});

export default {
  templates,
  tabTimeLine,
  tabOther,
  feedback,
  people,
  tabGallery,
  events,
  event,
  attachment,
};
