import { NODE_API_HELPERS } from 'apis/components/Node/helpers';
import { CREATE_LINK, NODE_API } from 'apis/constants';
import { withStyles } from '@material-ui/core/styles';
import { INVITATION_STORE_HOC } from 'datastore/invitationStore/hoc';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import { SIZE_CONSTANTS } from 'sizeConstants';

import DialogForm, { Title } from 'ugcomponents/DialogForm/Complex';
import { PARTICIPANTS, RATING, RATINGS } from 'utils/modelConstants';
import get from 'lodash/get';

import styles from './styles';
import { CONFIG, GET_MY_USER_ID, GET_NODE_ID, GET_USER_NODES } from './config';
import RatingForm from '../RatingForm';

export class AddRatingDialog extends PureComponent {
  state = {
    error: false,
    loading: false,
  };

  handleLinkSuccess = () => {
    const { onClose } = this.props;
    onClose();
    this.setState({ loading: false });
  };

  handleSubmitSuccess = ({ node }) => {
    const { participantId } = this.props;

    this.props.resaga.dispatchTo(NODE_API, CREATE_LINK, {
      payload: {
        id: node.id,
        data: {
          nextNodeId: participantId,
        },
        prevNodeChildKey: PARTICIPANTS,
        nextNodeChildKey: RATINGS,
      },
      onSuccess: this.handleLinkSuccess,
    });
  };

  handleSubmit = model => {
    this.setState({ loading: true });
    const { parentNodeId } = this.props;

    const rating = get(model, 'customData.rating', 0);

    if (rating === 0) {
      this.setState({ error: true, loading: false });
      return;
    }

    const node = { ...model, type: RATING, parentNodeId };
    NODE_API_HELPERS.createNode(
      {
        node,
        parentNodeId,
        childKey: RATINGS,
        onSuccess: this.handleSubmitSuccess,
      },
      this.props,
    );
  };

  renderDialogHeader = ({ renderCloseButton }) => (
    <>
      <Title heading="Rate and Review" />
      {renderCloseButton()}
    </>
  );

  renderDialogContent = () => {
    const { error } = this.state;

    return <RatingForm error={error} />;
  };

  render = () => {
    const { open, onClose } = this.props;
    const { loading } = this.state;

    return (
      <DialogForm
        open={open}
        onClose={onClose}
        onCancel={onClose}
        onValidSubmit={this.handleSubmit}
        renderHeader={this.renderDialogHeader}
        submitButtonContent="Post"
        size={SIZE_CONSTANTS.XS}
        loading={loading}
      >
        {this.renderDialogContent()}
      </DialogForm>
    );
  };
}

AddRatingDialog.propTypes = {
  // hoc props
  resaga: PropTypes.object.isRequired,

  // parent props
  open: PropTypes.bool,
  onClose: PropTypes.func,
  parentNodeId: PropTypes.number,

  // resaga props
  participantId: PropTypes.number,
};

AddRatingDialog.defaultProps = {};

export default compose(
  withStyles(styles, { name: 'AddRatingDialog' }),
  resaga(GET_MY_USER_ID),
  INVITATION_STORE_HOC.selectUserNodeIds({
    userIds: 'userId',
    nodeIds: 'templateId',
  }),
  resaga(GET_USER_NODES),
  resaga(GET_NODE_ID),
  resaga(CONFIG),
)(AddRatingDialog);
