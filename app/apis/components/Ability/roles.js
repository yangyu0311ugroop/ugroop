export const ORG_ROLE = {
  ADMIN: 'admin',
  REVIEWER: 'reviewer',
  TOUR_CREATOR: 'tour_creator',
  GENERAL: 'general',
  OWNER: 'owner',
  COLLABORATOR: 'collaborator',
  ORG_ORGANIZER: 'org_organizer',
};

export const TOUR_CONTRIBUTOR_ROLE = {
  TOUR_ORGANIZER: 'tour_organizer',
  TOUR_COLLABORATOR: 'tour_collaborator',
  TOUR_VIEWER: 'tour_viewer',
  TOUR_OWNER: 'tour_owner',
};

export const TOUR_CONTRIBUTOR_ROLE_TYPES = Object.values(TOUR_CONTRIBUTOR_ROLE);

export const TOUR_ROLE = {
  ...TOUR_CONTRIBUTOR_ROLE,
  TOUR_INTERESTED: 'tour_interested',
  TOUR_PARTICIPANT: 'tour_participant',
};

export const ACCESS_SETTINGS_TOUR_ROLE = {
  TOUR_PARTICIPANT: 'tour_participant',
  TOUR_INTERESTED: 'tour_interested',
  TOUR_ORGANIZER: 'tour_organizer',
  TOUR_COLLABORATOR: 'tour_collaborator',
  TOUR_OWNER: 'tour_owner',
  TOUR_VIEWER: 'tour_viewer',
};

export const TOUR_ROLE_TYPES = Object.values(TOUR_ROLE);

export const TOUR_ROLE_MAPPER = {
  tour_organizer: 'Organiser',
  tour_collaborator: 'Collaborator',
  tour_viewer: 'Viewer',
  tour_owner: 'Owner',
  tour_interested: 'Follower',
  tour_participant: 'Participant',
};
