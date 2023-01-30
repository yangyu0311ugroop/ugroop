import { DO_NOTHING } from 'appConstants';
import Dialog from 'components/Dialog';
import DialogContent from 'components/Dialog/UGDialogContent';
import DialogTitle from 'components/Dialog/UGDialogTitle';
import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import Hr from 'components/Hr';
import { withStyles } from 'components/material-ui';
import { PORTAL_HELPERS } from 'containers/Portal/helpers';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import { CloseButton, Title } from 'ugcomponents/DialogForm/Complex';
import { PARTICIPANT_ACCESS_LEVELS } from 'utils/constants/people';
import Icon from 'ugcomponents/Icon';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import Button from 'viewComponents/Button';
import Node from 'smartComponents/Node';
import JText from 'components/JText';
import { VARIANTS } from 'variantsConstants';
import { CREATE_LINK, DELETE_LINK, NODE_API } from 'apis/constants';
import classnames from 'classnames';
import { CONFIG, TEMPLATE_CONFIG, CONFIG2 } from './config';
import styles from './styles';

export const CONTENT = {
  id: 'content',
  name: 'content',
  label: 'What is the room no.?',
  placeholder: 'Room number',
  type: 'text',
  required: true,
  autoFocus: true,
};

export class AddRoomPax extends PureComponent {
  state = {
    loading: false,
    processId: null,
  };

  handleClose = () => {
    PORTAL_HELPERS.close(this.props);
  };

  handleCreateSuccess = ({ node }) => {
    this.handleClose();

    this.props.resaga.setValue({
      selectedRoomId: node.id,
      layout: 'room',
    });
  };

  handleCreateLink = ({ participantId, occupant }) => event => {
    event.preventDefault();
    event.stopPropagation();

    const { id } = this.props;
    const { loading } = this.state;
    if (loading) return null;

    this.setLoading({ value: true, id: participantId });

    return this.props.resaga.dispatchTo(NODE_API, CREATE_LINK, {
      payload: {
        id: Number(participantId),
        data: {
          nextNodeId: id,
          action: 'occupant',
          actionContent: {
            ...occupant,
          },
        },
        prevNodeChildKey: 'rooms',
        nextNodeChildKey: 'participants',
        upsertLinkId: false,
      },
      onSuccess: this.handleCreateLinkSuccess,
      onError: this.handleCreateLinkError,
    });
  };

  setLoading = ({ value, id }) =>
    this.setState({ loading: value, processId: id });

  handleRemoveLink = ({ participantId }) => () => {
    const { id, parentNodeId } = this.props;
    this.setLoading({ value: true, id: participantId });
    return this.props.resaga.dispatchTo(NODE_API, DELETE_LINK, {
      payload: {
        id: Number(participantId),
        fk: id,
        linkKey: id,
        parentNodeId,
        prevNodeChildKey: 'rooms',
        nextNodeChildKey: 'participants',
        removeLinkId: false,
      },
      onSuccess: this.handleremoveLinkSuccess,
      onerror: this.handleremoveLinkSuccess,
    });
  };

  handleremoveLinkSuccess = () => {
    this.setLoading({ value: false, id: null });
  };

  renderSaveCancelButton = () => (
    <GridContainer alignItems="center">
      <GridItem xs />

      <GridItem>
        <Button size="xs" color="gray" onClick={this.handleClose}>
          Discard
        </Button>
      </GridItem>

      <GridItem>
        <Button size="xs" color="primary" type="submit">
          <GridContainer alignItems="center" spacing={0}>
            <GridItem>Continue</GridItem>
            <GridItem>
              <Icon icon="lnr-chevron-right" size="xsmall" paddingLeft />
            </GridItem>
          </GridContainer>
        </Button>
      </GridItem>
    </GridContainer>
  );

  renderNoPax = () => {
    const { participantId } = this.props;
    if (participantId) return null;
    return (
      <React.Fragment>
        <GridContainer direction="column" alignItems="center" spacing={1}>
          <GridItem>
            <JText lg italic gray>
              {LOGIC_HELPERS.ifElse(
                participantId,
                'There are no pax to room with yet.',
                'There are no Pax allocated on this room yet',
              )}
            </JText>
          </GridItem>
        </GridContainer>
      </React.Fragment>
    );
  };

  availableIds = () => {
    const { allRoomPaxIds, confirmedParticipantIds } = this.props;
    return confirmedParticipantIds.filter(id => !allRoomPaxIds.includes(id));
  };

  handleCreateLinkSuccess = () => {
    this.setState({ loading: false });
  };

  handleCreateLinkError = () => {
    this.setState({ loading: false });
  };

  handleClickRow = () => DO_NOTHING;

  isFull = () => {
    const { guestCount, occupantIds } = this.props;
    if (!guestCount) return false;
    return occupantIds.length >= guestCount;
  };

  renderAvailableParticipantList = () => {
    const ids = this.availableIds();
    return (
      <GridContainer direction="column">
        {ids.map(id => (
          <GridItem key={id}>
            <Node
              id={id}
              variant={VARIANTS.ROW_SIMPLE}
              handleEditableClick={this.handleCreateLink({
                participantId: id,
                occupant: { ageClass: 'adult' },
              })}
              accessLevel={PARTICIPANT_ACCESS_LEVELS.full}
              readOnlyStatus={this.isFull()}
            />
          </GridItem>
        ))}
      </GridContainer>
    );
  };

  renderDeleteButton = id => {
    const { classes } = this.props;
    const { loading, processId } = this.state;
    return (
      <Button
        size="xs"
        color="black"
        onClick={this.handleRemoveLink({ participantId: id })}
        className={classnames(classes.button)}
        loading={loading && processId === id}
        disabled={loading}
        title="Remove from this room"
      >
        <GridContainer alignItems="center" spacing={0}>
          <GridItem>
            <Icon icon="lnr-trash2" size="xsmall" paddingRight />
          </GridItem>
        </GridContainer>
      </Button>
    );
  };

  renderAddButton = (id, occupant) => {
    const { classes } = this.props;
    const { loading, processId } = this.state;
    return (
      <Button
        size="xs"
        color="black"
        onClick={this.handleCreateLink({ participantId: id, occupant })}
        className={classnames(classes.button)}
        loading={loading && processId === id}
        disabled={loading}
      >
        <GridContainer alignItems="center" spacing={0}>
          <GridItem>
            <Icon icon="lnr-plus" size="xsmall" paddingRight />
          </GridItem>
        </GridContainer>
      </Button>
    );
  };

  renderOccupants = () => {
    const { occupantIds, participantId } = this.props;
    const ids = occupantIds.filter(item => item !== participantId);
    if (!ids.length) return this.renderNoPax();
    return (
      <React.Fragment>
        <GridItem>
          <GridContainer direction="column">
            {ids.map(id => (
              <GridItem key={id}>
                <GridContainer justify="space-between" wrap="nowrap">
                  <GridItem>
                    <Node id={id} variant={VARIANTS.ROW_SIMPLE} />
                  </GridItem>
                  <GridItem>{this.renderDeleteButton(id)}</GridItem>
                </GridContainer>
              </GridItem>
            ))}
          </GridContainer>
        </GridItem>
        <Hr half />
      </React.Fragment>
    );
  };

  renderContent = () => {
    const ids = this.availableIds();
    return (
      <GridContainer direction="column">
        {this.renderOccupants()}
        <GridItem>
          {this.isFull() && (
            <JText italic danger>
              This room is now complete.
            </JText>
          )}
          {!this.isFull() && (
            <JText italic gray>
              {LOGIC_HELPERS.ifElse(
                ids.length,
                'Add Pax to the room',
                'There are no more pax to be added.',
              )}
            </JText>
          )}
        </GridItem>
        {this.isFull() && !!ids.length && (
          <GridItem>
            <JText JText italic gray>
              People still to be allocated are:
            </JText>
          </GridItem>
        )}
        <GridItem>
          {/* {!this.isFull() && this.renderAvailableParticipantList()} */}
          {this.renderAvailableParticipantList()}
        </GridItem>
      </GridContainer>
    );
  };

  render = () => (
    <Dialog maxWidth="xs" fullWidth open onClose={this.handleClose}>
      <DialogTitle noPaddingBottom>
        <Title heading={this.props.heading} />
        <CloseButton onClick={this.handleClose} />
      </DialogTitle>
      <DialogContent halfPaddingTop>{this.renderContent()}</DialogContent>
    </Dialog>
  );
}

AddRoomPax.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,
  resaga: PropTypes.object.isRequired,

  // parent props
  id: PropTypes.number,
  occupantIds: PropTypes.array,
  parentNodeId: PropTypes.number,
  heading: PropTypes.any,
  participantId: PropTypes.number,

  // resaga props
  confirmedParticipantIds: PropTypes.array,
  allRoomPaxIds: PropTypes.array,
  guestCount: PropTypes.number,
};

AddRoomPax.defaultProps = {
  occupantIds: [],
  confirmedParticipantIds: [],
  heading: 'Add Pax to a Room',
  guestCount: 0,
  participantId: 0,
};

export default compose(
  withStyles(styles, { name: 'AddRoomPax' }),
  resaga(TEMPLATE_CONFIG),
  resaga(CONFIG),
  resaga(CONFIG2),
)(AddRoomPax);
