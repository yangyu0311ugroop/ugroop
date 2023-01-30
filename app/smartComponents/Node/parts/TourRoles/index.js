import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import Icon from 'ugcomponents/Icon';
import { CONFIG } from './config';

const TOUR_ROLES = {
  tour_owner: 'Owner',
  tour_organizer: 'Organiser',
  tour_collaborator: 'Collaborator',
  tour_viewer: 'Viewer',
  tour_interested: 'Follower',
  tour_participant: 'Participant',
};

export class TourRoles extends PureComponent {
  translateRoles = tourRoles => {
    const { paxLabel } = this.props;
    TOUR_ROLES.tour_participant = paxLabel;
    return tourRoles.map(tourRole => TOUR_ROLES[tourRole]);
  };

  formatRoles = tourRoles => {
    let roles = '';

    const translatedRoles = this.translateRoles(tourRoles);

    if (translatedRoles.length === 1) roles = translatedRoles[0];
    else if (translatedRoles.length === 2)
      roles = `${translatedRoles[0]} and ${translatedRoles[1]}`;
    else {
      roles = translatedRoles.reduce((accu, tourRole, index) => {
        if (index === 0) return tourRole;
        if (index < translatedRoles.length - 1) return `${accu}, ${tourRole}`;

        return `${accu} and ${tourRole}`;
      }, '');
    }

    return roles;
  };

  renderRoles = roles => {
    const { className } = this.props;
    const role = `You are ${roles}`;

    return (
      <GridItem>
        <GridContainer
          alignItems="center"
          className={className}
          spacing={0}
          wrap="nowrap"
        >
          <GridItem>
            <Icon icon="lnr-users" size="xsmall" paddingRight />
          </GridItem>
          <GridItem className="j-text-ellipsis" title={role}>
            {role}
          </GridItem>
        </GridContainer>
      </GridItem>
    );
  };

  render = () => {
    const { tourRoles } = this.props;

    if (!tourRoles.length) {
      return null;
    }

    return this.renderRoles(this.formatRoles(tourRoles));
  };
}

TourRoles.propTypes = {
  className: PropTypes.string,
  tourRoles: PropTypes.array,
  paxLabel: PropTypes.string,
};

TourRoles.defaultProps = {
  tourRoles: [],
  paxLabel: '',
};

export default compose(resaga(CONFIG))(TourRoles);
