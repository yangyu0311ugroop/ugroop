import {
  CREATE_LINK,
  DELETE_LINK,
  NODE_API,
  REMOVE_NODE_AND_LINKS,
  UPDATE_LINK,
} from 'apis/constants';
import GridItem from 'components/GridItem';
import GridContainer from 'components/GridContainer';
import { NODE_API_HELPERS } from 'apis/components/Node/helpers';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import { Editable } from 'smartComponents/Editables';
import { IMAGE_SIZES_CONSTANTS } from 'smartComponents/File/types/Photo/constants';
import Content from 'smartComponents/Node/parts/Content';
import { PARTICIPANTS, SEAT, SEATS } from 'utils/modelConstants';
import DeleteButton from 'viewComponents/DeleteButton';
import { VARIANTS } from 'variantsConstants';
import P from 'viewComponents/Typography';
import Name from 'smartComponents/Node/parts/Name';
import Icon from 'viewComponents/Icon';

import SeatDialog from '../SeatDialog';
import { CONFIG, GET_TEMPLATE_PARENT } from './config';
import styles from './styles';

export class EditableSeat extends PureComponent {
  state = {
    removeLoading: false,
    open: false,
    submitLoading: false,
  };

  avatarProps = {
    sm: false,
    xxs: true,
    imageSize: IMAGE_SIZES_CONSTANTS.XXXS,
  };

  handleRemove = () => {
    const { id, participantId, parentNodeId } = this.props;
    this.setState({
      removeLoading: true,
    });
    this.props.resaga.dispatchTo(NODE_API, REMOVE_NODE_AND_LINKS, {
      payload: {
        id,
        fk: participantId,
        parentNodeId,
        childKey: SEATS,
        nextNodeChildKey: SEATS,
      },
      onSuccess: this.handleRemoveSuccess,
    });
  };

  handleRemoveSuccess = () => {
    this.setState({
      open: false,
      removeLoading: false,
    });
  };

  handleOpenDialog = () =>
    this.setState({
      open: true,
    });

  handleCloseDialog = () =>
    this.setState({
      open: false,
    });

  handleMoveSuccess = () => {
    this.setState({
      open: false,
      submitLoading: false,
    });
  };

  handleSubmitSuccess = newParticipantId => () => {
    const { id, participantId } = this.props;

    // This means that a particular seat would be unassigned or assigned to none
    if (newParticipantId === 0) {
      return this.props.resaga.dispatchTo(NODE_API, DELETE_LINK, {
        payload: {
          id,
          fk: participantId,
          prevNodeChildKey: PARTICIPANTS,
          nextNodeChildKey: SEATS,
        },
        onSuccess: this.handleMoveSuccess,
      });
    }

    if (participantId === 0) {
      return this.props.resaga.dispatchTo(NODE_API, CREATE_LINK, {
        payload: {
          id,
          data: {
            nextNodeId: newParticipantId,
          },
          prevNodeChildKey: PARTICIPANTS,
          nextNodeChildKey: SEATS,
        },
        onSuccess: this.handleMoveSuccess,
      });
    }

    return this.props.resaga.dispatchTo(NODE_API, UPDATE_LINK, {
      payload: {
        id,
        fk: participantId,
        data: {
          nextNodeId: newParticipantId,
        },
        prevNodeChildKey: PARTICIPANTS,
        nextNodeChildKey: SEATS,
      },
      onSuccess: this.handleMoveSuccess,
    });
  };

  handleSubmit = obj => {
    this.setState({
      submitLoading: true,
    });
    const { node: formData, participantId } = obj;
    const { id } = this.props;
    const node = {
      ...formData,
      type: SEAT,
    };

    NODE_API_HELPERS.updateNode(
      {
        nodeId: id,
        node,
        onSuccess: this.handleSubmitSuccess(participantId),
      },
      this.props,
    );
  };

  renderValue = () => value => {
    const { participantId } = this.props;
    const participant =
      participantId === 0 ? null : (
        <>
          <GridItem>
            <P dense weight="bolder">
              <Icon icon="arrow-right" size="extraSmall" />
            </P>
          </GridItem>
          <GridItem>
            <Name
              id={this.props.participantId}
              variant={VARIANTS.AVATAR}
              AvatarProps={this.avatarProps}
            />{' '}
          </GridItem>
          <GridItem>
            <P dense>
              <Name id={this.props.participantId} />
            </P>
          </GridItem>
        </>
      );
    return (
      <GridContainer alignItems="center">
        <GridItem>
          <P dense>{value}</P>
        </GridItem>
        {participant}
      </GridContainer>
    );
  };

  renderDialogFooter = () => ({
    renderSubmitButton,
    renderCancelButton,
    renderActions,
  }) => {
    const submitBtn = this.state.removeLoading ? null : (
      <GridItem key="submit">{renderSubmitButton()}</GridItem>
    );

    return renderActions([
      <GridItem key="delete">
        <DeleteButton
          onClick={this.handleRemove}
          loading={this.state.removeLoading}
          disabled={this.state.submitLoading}
          size="base"
        />
      </GridItem>,
      <GridItem key="cancel">{renderCancelButton()}</GridItem>,
      submitBtn,
    ]);
  };

  render = () => {
    const { id, parentNodeId } = this.props;

    return (
      <>
        <Content id={id} variant={VARIANTS.RENDER_PROP}>
          {content => (
            <Editable
              renderValue={this.renderValue()}
              value={content}
              loading={this.state.submitLoading}
              onClick={this.handleOpenDialog}
            />
          )}
        </Content>
        <SeatDialog
          open={this.state.open}
          mode="edit"
          onClose={this.handleCloseDialog}
          seatNodeId={id}
          eventNodeId={parentNodeId}
          onSubmit={this.handleSubmit}
          renderFooter={this.renderDialogFooter()}
          loading={this.state.submitLoading}
        />
      </>
    );
  };
}

EditableSeat.propTypes = {
  // hoc props
  resaga: PropTypes.object.isRequired,

  // parent props
  id: PropTypes.number,

  // resaga props
  parentNodeId: PropTypes.number,
  participantId: PropTypes.number,
};

EditableSeat.defaultProps = {
  participantId: 0,
};

export default compose(
  withStyles(styles, { name: 'EditableSeat' }),
  resaga(CONFIG),
  resaga(GET_TEMPLATE_PARENT),
)(EditableSeat);
