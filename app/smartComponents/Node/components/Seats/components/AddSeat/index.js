import { NODE_API_HELPERS } from 'apis/components/Node/helpers';
import { withStyles } from '@material-ui/core/styles';
import { CREATE_LINK, NODE_API } from 'apis/constants';
import { DEFAULT } from 'appConstants';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { PARTICIPANTS, SEAT, SEATS } from 'utils/modelConstants';
import { VARIANTS } from 'variantsConstants';
import CreateButton from 'viewComponents/CreateButton';
import Button from 'viewComponents/Button';
import SeatDialog from '../SeatDialog';

import { CONFIG } from './config';
import styles from './styles';

export class AddSeat extends PureComponent {
  state = {
    open: false,
    loading: false,
  };

  handleSubmitSuccess = participantId => result => {
    if (participantId) {
      const { node } = result;
      this.props.resaga.dispatchTo(NODE_API, CREATE_LINK, {
        payload: {
          id: node.id,
          data: {
            nextNodeId: participantId,
          },
          prevNodeChildKey: PARTICIPANTS,
          nextNodeChildKey: SEATS,
        },
      });
    }
    this.setState({ open: false, loading: false });
  };

  handleSubmit = obj => {
    this.setState({ loading: true });

    const { parentNodeId } = this.props;
    const { node: formData, participantId } = obj;
    const node = { ...formData, type: SEAT };
    NODE_API_HELPERS.createNode(
      {
        node,
        parentNodeId,
        childKey: SEATS,
        onSuccess: this.handleSubmitSuccess(participantId),
      },
      this.props,
    );
  };

  handleOpenDialog = () => this.setState({ open: true });

  handleCloseDialog = () => this.setState({ open: false });

  renderRoundButton = () => (
    <CreateButton
      onClick={this.handleOpenDialog}
      disabled={this.state.loading}
      loading={this.state.loading}
    />
  );

  renderStandardButton = () => (
    <Button
      onClick={this.handleOpenDialog}
      disabled={this.state.loading}
      loading={this.state.loading}
      dense
      size="extraSmall"
      color="primary"
    >
      Add Seat
    </Button>
  );

  render = () => {
    const { variant } = this.props;
    const button = LOGIC_HELPERS.switchCase(variant, {
      [VARIANTS.ROUND]: this.renderRoundButton,
      [VARIANTS.STANDARD]: this.renderStandardButton,
      [DEFAULT]: this.renderRoundButton,
    });
    return (
      <>
        {button}
        <SeatDialog
          open={this.state.open}
          onClose={this.handleCloseDialog}
          onSubmit={this.handleSubmit}
          loading={this.state.loading}
          eventNodeId={this.props.parentNodeId}
        />
      </>
    );
  };
}

AddSeat.propTypes = {
  // hoc props
  resaga: PropTypes.object.isRequired,

  // parent props
  parentNodeId: PropTypes.number,
  variant: PropTypes.string,

  // resaga props
};

AddSeat.defaultProps = {
  variant: VARIANTS.ROUND,
};

export default compose(
  withStyles(styles, { name: 'AddSeat' }),
  resaga(CONFIG),
)(AddSeat);
