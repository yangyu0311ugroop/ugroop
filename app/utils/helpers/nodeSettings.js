import { ACCESS_SETTINGS_TOUR_ROLE } from 'apis/components/Ability/roles';
import { TOUR_SETTINGS } from 'appConstants';

const includeTourSetting = role => {
  switch (role) {
    case ACCESS_SETTINGS_TOUR_ROLE.TOUR_ORGANIZER:
    case ACCESS_SETTINGS_TOUR_ROLE.TOUR_OWNER:
      return false;

    default:
      return true;
  }
};

const makeTourSettingRoleKey = role =>
  `${TOUR_SETTINGS.SHOW_PARTICIPANTS_TO}_${role}`;

const KEY_ROLES = Object.values(ACCESS_SETTINGS_TOUR_ROLE).reduce(
  (acc, role) =>
    includeTourSetting(role)
      ? { ...acc, [makeTourSettingRoleKey(role)]: role }
      : acc,
  {},
);

export const NODE_SETTING_PARTICIPANT_ACCESS_HELPERS = {
  includeTourSetting,
  makeTourSettingRoleKey,

  KEY_ROLES,
};
