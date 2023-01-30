import {
  CANCEL_INVITATION,
  DELETE_ORG_MEMBER,
  GET_ORG_MEMBERS,
  GET_ORG_SUBTYPES,
  GET_ORG_TYPES,
  GET_ORGANISATION,
  GET_OWN_ORG_INFO,
  GET_PERSON,
  ORGANISATION_API,
  PATCH_ORG,
  SETUP_PERSONAL_TOUR,
  SETUP_TOUR,
  SHARE_ORGANISATION,
  UPDATE_ORG_MEMBER,
  UPDATE_ORG_ROLE,
  ORG_SYNC,
  CREATE_ORGANISATION,
  BATCH_GET_ORG_MEMBERS,
} from 'apis/constants';
import { DATASTORE_UTILS } from 'datastore';
import PropTypes from 'prop-types';
import { Component } from 'react';
import { compose } from 'redux';
import resaga, { reducer } from 'resaga';
import injectReducer from 'utils/injectReducer';
import { CONFIG } from './config';

export class Organisation extends Component {
  componentWillReceiveProps = nextProps =>
    this.props.resaga.analyse(nextProps, {
      [GET_OWN_ORG_INFO]: { onSuccess: this.props.resaga.setValue },
      [GET_ORG_TYPES]: { onSuccess: this.props.resaga.setValue },
      [PATCH_ORG]: { onSuccess: this.props.resaga.setValue },
      [GET_ORG_MEMBERS]: { onSuccess: this.props.resaga.setValue },
      [GET_ORGANISATION]: { onSuccess: this.props.resaga.setValue },
      [GET_ORG_SUBTYPES]: { onSuccess: this.props.resaga.setValue },
      [UPDATE_ORG_ROLE]: { onSuccess: this.props.resaga.setValue },
      [UPDATE_ORG_MEMBER]: { onSuccess: this.props.resaga.setValue },
      [DELETE_ORG_MEMBER]: { onSuccess: this.props.resaga.setValue },
      [GET_PERSON]: { onSuccess: this.props.resaga.setValue },
      [SHARE_ORGANISATION]: { onSuccess: this.props.resaga.setValue },
      [BATCH_GET_ORG_MEMBERS]: { onSuccess: this.props.resaga.setValue },
      [SETUP_TOUR]: { onSuccess: this.props.resaga.setValue },
      [SETUP_PERSONAL_TOUR]: { onSuccess: this.handleSetupPersonalTourSuccess },
      [CANCEL_INVITATION]: { onSuccess: this.props.resaga.setValue },
      [CREATE_ORGANISATION]: { onSuccess: this.createOrganisationSuccess },
      [ORG_SYNC]: { onSuccess: this.orgSyncSuccess },
    });

  shouldComponentUpdate = () => false;

  createOrganisationSuccess = processedResult => {
    this.props.resaga.setValue(processedResult);
    this.addAbility(processedResult.id);
  };

  addAbility = id => {
    const { organisationOwnerAbilities } = this.props;

    if (!organisationOwnerAbilities.length) {
      return null;
    }

    // add owner abilities to newly created `id`
    return this.props.resaga.setValue({
      organisationAbilities: DATASTORE_UTILS.upsertArray(
        `${id}`,
        organisationOwnerAbilities,
      ),
    });
  };

  orgSyncSuccess = data => {
    this.props.resaga.setValue({
      accountRelatedOrgs: DATASTORE_UTILS.updateObject(data),
    });
  };

  handleSetupPersonalTourSuccess = ({ userId, rootNodeId }) => {
    this.props.resaga.setValue({
      members: DATASTORE_UTILS.upsertObject(userId, { rootNodeId }),
    });
  };

  render = () => false;
}

Organisation.propTypes = {
  // hoc props
  resaga: PropTypes.object.isRequired,

  // parent props
  organisationOwnerAbilities: PropTypes.array,

  // resaga props
};

Organisation.defaultProps = {
  organisationOwnerAbilities: [],
};

export default compose(
  injectReducer({ key: ORGANISATION_API, reducer: reducer(ORGANISATION_API) }),
  resaga(CONFIG),
)(Organisation);
