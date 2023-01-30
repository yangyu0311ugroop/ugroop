import { withStyles } from '@material-ui/core/styles';
import { TOUR_ROLE } from 'apis/components/Ability/roles';
import { INVITATION_STORE_HOC } from 'datastore/invitationStore/hoc';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import InterestedListModal from 'containers/Templates/Modals/InterestedList';
import { withNodeRole } from 'smartComponents/Node/hoc/withNodeRole';
import { isFunction } from 'lodash';
import {
  INTERESTED_LINKEE,
  PARTICIPANT_LINKEE,
  TOUR_ORGANIZER,
  TOUR_OWNER,
} from 'utils/modelConstants';
import { VARIANTS } from 'variantsConstants';

import {
  CONFIG_0,
  CONFIG_2,
  CONFIG_3,
} from '../../../../../FollowerList/config';
import { CONFIG } from './config';
import styles from './styles';

export class Filters extends PureComponent {
  componentWillUnmount() {
    this.props.resaga.setValue({
      interestedListViewModalFilter: VARIANTS.ALL_FOLLOWERS,
    });
  }

  getFollowerIds = () => {
    const {
      interestedPersonIds,
      participantFollowerNodeIds,
      userFollowerNodeId,
      roles,
    } = this.props;

    if (roles.includes(TOUR_ORGANIZER) || roles.includes(TOUR_OWNER))
      return interestedPersonIds;

    if (roles.includes(TOUR_ROLE.TOUR_PARTICIPANT))
      return participantFollowerNodeIds;

    if (roles.includes(TOUR_ROLE.TOUR_INTERESTED)) return [userFollowerNodeId];

    return [];
  };

  render = () => {
    const { templateId, variant, children } = this.props;
    if (isFunction(children)) {
      return (
        <InterestedListModal
          templateId={templateId}
          interestedPersonIds={this.getFollowerIds()}
          variant={variant}
        >
          {children}
        </InterestedListModal>
      );
    }

    return (
      <InterestedListModal
        templateId={templateId}
        interestedPersonIds={this.getFollowerIds()}
        variant={variant}
      />
    );
  };
}

Filters.propTypes = {
  // hoc props
  resaga: PropTypes.object.isRequired,

  // parent props
  templateId: PropTypes.number,
  variant: PropTypes.string,
  children: PropTypes.func,

  // resaga props
  roles: PropTypes.array,
  interestedPersonIds: PropTypes.array,
  participantFollowerNodeIds: PropTypes.array,
  userFollowerNodeId: PropTypes.number,
};

Filters.defaultProps = {
  variant: VARIANTS.FILTERS_ONLY,
  interestedPersonIds: [],
  roles: [],
  participantFollowerNodeIds: [],
};

export default compose(
  resaga(CONFIG_0),
  INVITATION_STORE_HOC.selectUserNodeIds({
    userIds: 'userId',
    nodeIds: 'participantIds',
    roles: [PARTICIPANT_LINKEE],
    outputProp: 'userParticipantId',
  }),
  INVITATION_STORE_HOC.selectUserNodeIds({
    userIds: 'userId',
    nodeIds: 'interestedPersonIds',
    roles: [INTERESTED_LINKEE],
    outputProp: 'userFollowerId',
  }),
  withNodeRole,
  withStyles(styles, { name: 'Filters' }),
  resaga(CONFIG),
  resaga(CONFIG_2),
  resaga(CONFIG_3),
)(Filters);
