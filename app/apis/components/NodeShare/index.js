import {
  NODE_SHARE_API,
  CONFIRM_INVITATION,
  DECLINE_INVITATION,
  GET_SHARED_TEMPLATES,
} from 'apis/constants';
import { DATASTORE_UTILS } from 'datastore';
import PropTypes from 'prop-types';
import { Component } from 'react';
import { compose } from 'redux';
import resaga, { reducer } from 'resaga';
import injectReducer from 'utils/injectReducer';

import { CONFIG } from './config';

export class NodeShare extends Component {
  componentWillReceiveProps = nextProps =>
    this.props.resaga.analyse(nextProps, {
      [CONFIRM_INVITATION]: { onSuccess: this.updateTourAbility },
      [DECLINE_INVITATION]: { onSuccess: this.props.resaga.setValue },
      [GET_SHARED_TEMPLATES]: { onSuccess: this.props.resaga.setValue },
    });

  shouldComponentUpdate = () => false;

  updateTourAbility = (result, { role, nodeId }) => {
    const { tourAbilities } = this.props;

    this.props.resaga.setValue({
      tours: DATASTORE_UTILS.upsertArray(`${nodeId}`, tourAbilities[role]),
      ...result,
    });
  };

  render = () => false;
}

NodeShare.propTypes = {
  // hoc props
  resaga: PropTypes.object.isRequired,

  // parent props

  // resaga props
  tourAbilities: PropTypes.object,
};

NodeShare.defaultProps = {
  tourAbilities: {},
};

export default compose(
  injectReducer({ key: NODE_SHARE_API, reducer: reducer(NODE_SHARE_API) }),
  resaga(CONFIG),
)(NodeShare);
