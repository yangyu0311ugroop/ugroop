import { INVITATION_API, GET_TOKEN, CANCEL_INVITATION } from 'apis/constants';
import PropTypes from 'prop-types';
import { Component } from 'react';
import { compose } from 'redux';
import resaga, { reducer } from 'resaga';
import { DATASTORE_UTILS } from 'datastore';
import injectReducer from 'utils/injectReducer';

import { CONFIG } from './config';

export class Invitation extends Component {
  componentWillReceiveProps = nextProps =>
    this.props.resaga.analyse(nextProps, {
      [GET_TOKEN]: {
        onSuccess: this.getTokenSuccess,
        onError: this.getTokenError,
      },
      [CANCEL_INVITATION]: { onSuccess: this.props.resaga.setValue },
    });

  shouldComponentUpdate = () => false;

  getTokenSuccess = (notification, { tokenId }) => {
    this.props.resaga.setValue({
      notifications: DATASTORE_UTILS.upsertObject({ [tokenId]: notification }),
    });
  };

  getTokenError = (_, { tokenId }) => {
    this.props.resaga.setValue({
      notifications: DATASTORE_UTILS.upsertObject({ [tokenId]: null }),
    });
  };

  render = () => false;
}

Invitation.propTypes = {
  // hoc props
  resaga: PropTypes.object.isRequired,

  // parent props

  // resaga props
};

Invitation.defaultProps = {};

export default compose(
  injectReducer({ key: INVITATION_API, reducer: reducer(INVITATION_API) }),
  resaga(CONFIG),
)(Invitation);
