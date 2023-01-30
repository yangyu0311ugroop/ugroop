export const RECEIVED = 'received';
export const SENT = 'sent';
export const COMPLETED = 'completed';
export const PENDING = 'pending';
export const CONFIRMED = 'confirmed';
export const DECLINED = 'decline';
export const CANCELED = 'cancelled';
export const ORG_MEMBER = 'orgMember';

// show
export const BOTH = 'default';
export const FROM_ME = 'fromMe';
export const TO_ME = 'toMe';
export const ORG_SHARE_INDICATOR = 'orgShare';

export const TOUR_CONTRIBUTOR_ROLES = {
  tour_organizer: 'Organiser',
  tour_collaborator: 'Collaborator',
  tour_viewer: 'Viewer',
};
export const VALID_TOUR_ROLES_FREE_PLAN = {
  tour_viewer: 'Viewer',
};
export const TOUR_ROLES = {
  ...TOUR_CONTRIBUTOR_ROLES,
  tour_owner: 'Owner',
  tour_interested: 'Follower',
  tour_participant: 'Participant',
};
export const ORG_ROLES = {
  owner: 'Owner',
  admin: 'Admin',
  member: 'Member',
  guest: 'Guest',
};
export const ASSIGNABLE_ORG_ROLES = {
  admin: 'Admin',
  member: 'Member',
  guest: 'Guest',
};

export const INVITATION_TYPE = {
  BY_EMAIL: 'byEmail',
  BY_MEMBER: 'byMember',
};

export const EXCLUDED_ORG_ROLES = ['guest'];
