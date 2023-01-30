import {
  CONFIRM_INVITATION,
  DECLINE_INVITATION,
  ORG_INVITATION_API,
} from 'apis/constants';
import { DATASTORE_UTILS } from 'datastore';
import PropTypes from 'prop-types';
import { Component } from 'react';
import { compose } from 'redux';
import resaga, { reducer } from 'resaga';
import injectReducer from 'utils/injectReducer';

import { CONFIG } from './config';

export class OrgInvitation extends Component {
  componentWillReceiveProps = nextProps =>
    this.props.resaga.analyse(nextProps, {
      [CONFIRM_INVITATION]: { onSuccess: this.confirmInvitationSuccess },
      [DECLINE_INVITATION]: { onSuccess: this.props.resaga.setValue },
    });

  shouldComponentUpdate = () => false;

  confirmInvitationSuccess = ({ orgUser, orgInvitations, notifications }) => {
    this.props.resaga.setValue({
      orgUsers: DATASTORE_UTILS.upsertObject({ [orgUser.orgId]: orgUser }),
      users: DATASTORE_UTILS.upsertArray(
        `${orgUser.userId}.organisations`,
        orgUser.orgId,
      ),
      orgInvitations,
      notifications,
    });

    this.addAbility(orgUser);
  };

  addAbility = ({ orgId, role }) => {
    const { organisationAbilities } = this.props;

    if (!organisationAbilities || !organisationAbilities[role].length) {
      return null;
    }

    // add owner abilities to newly created `id`
    return this.props.resaga.setValue({
      organisationAbilities: DATASTORE_UTILS.upsertArray(
        `${orgId}`,
        organisationAbilities[role],
      ),
    });
  };

  render = () => false;
}

OrgInvitation.propTypes = {
  // hoc props
  resaga: PropTypes.object.isRequired,

  // parent props

  // resaga props
  organisationAbilities: PropTypes.object,
};

OrgInvitation.defaultProps = {
  organisationAbilities: {},
};

export default compose(
  injectReducer({
    key: ORG_INVITATION_API,
    reducer: reducer(ORG_INVITATION_API),
  }),
  resaga(CONFIG),
)(OrgInvitation);
