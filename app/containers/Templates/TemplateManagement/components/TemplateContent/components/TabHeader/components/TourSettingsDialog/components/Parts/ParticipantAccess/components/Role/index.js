import React from 'react';
import PropTypes from 'prop-types';
import { TOUR_CONTRIBUTOR_ROLES } from 'datastore/invitationStore/constants';
import { TourSetting } from 'smartComponents/TourSettings';
import { NODE_SETTING_PARTICIPANT_ACCESS_HELPERS } from 'utils/helpers/nodeSettings';

export class ParticipantAccessRole extends React.PureComponent {
  renderLabel = () => {
    const { role, paxLabel } = this.props;
    const customTourRoles = {
      ...TOUR_CONTRIBUTOR_ROLES,
      tour_owner: 'Owner',
      tour_interested: `Followers of ${paxLabel}`,
      tour_participant: `Other Going ${paxLabel}`,
      tour_collaborator: 'Collaborators',
      tour_viewer: 'Viewers',
    };
    return customTourRoles[role];
  };

  render = () => {
    const { role } = this.props;
    return (
      <TourSetting
        label={this.renderLabel()}
        settingKey={NODE_SETTING_PARTICIPANT_ACCESS_HELPERS.makeTourSettingRoleKey(
          role,
        )}
        {...this.props}
      />
    );
  };
}

ParticipantAccessRole.propTypes = {
  // parent
  role: PropTypes.string,
  paxLabel: PropTypes.string,
};

ParticipantAccessRole.defaultProps = {
  role: null,
  paxLabel: 'PAX',
};

export default ParticipantAccessRole;
