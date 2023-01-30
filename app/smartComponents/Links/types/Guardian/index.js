import { NODE_API_HELPERS } from 'apis/components/Node/helpers';
import { DELETE_LINK, NODE_API, UPDATE_LINK } from 'apis/constants';
import { DEFAULT, RELATIONSHIPS, EMERGENCY_CONTACT_VALUES } from 'appConstants';
import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import Form from 'ugcomponents/Form';
import dotProp from 'dot-prop-immutable';
import { withStyles } from '@material-ui/core/styles';
import { DATASTORE_UTILS } from 'datastore';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import { EditableForm } from 'smartComponents/Editables';
import { selectLinkedUserData } from 'smartComponents/Node/hoc';
import Name from 'smartComponents/Node/parts/Name';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { Select } from 'smartComponents/Inputs';
import FirstName from 'smartComponents/Node/parts/FirstName';
import LastName from 'smartComponents/Node/parts/LastName';
import {
  INTERESTED_LINKEE,
  INTERESTED_PEOPLE,
  INTERESTED_PERSON,
  PARTICIPANT_LINKEE,
} from 'utils/modelConstants';
import { VARIANTS } from 'variantsConstants';
import DeleteButton from 'viewComponents/DeleteButton';
import Relationship from 'smartComponents/Links/parts/Relationship';
import EmergencyContact from 'smartComponents/Links/parts/EmergencyContact';
import { H6 } from 'viewComponents/Typography';
import JText from 'components/JText';
import Checkbox from 'ugcomponents/Inputs/CheckboxField';

import Editable from 'viewComponents/Editable';
import Icon from 'viewComponents/Icon';

import Button from 'viewComponents/Button';
import InviteButton from 'smartComponents/Node/types/InterestedPerson/components/InviteButton';
import first from 'lodash/first';
import Box from '@material-ui/core/Box';
import { CONFIG, CONFIG_0, CONFIG_2, CONFIG_3, CONFIG_4 } from './config';
import styles from './styles';
import Badge from '../../../../viewComponents/Badge';
import { InlineButton } from '../../../../ugcomponents/Buttons';

export class Guardian extends PureComponent {
  state = {
    shouldDeleteAnotherNode: false,
    shouldDeleteFromOtherParticipant: false,
  };

  getAvatarProps = () => {
    const { nextNodeUserId } = this.props;
    const id = nextNodeUserId;
    if (!this.AvatarProps) {
      this.AvatarProps = {
        AvatarProps: {
          noTooltip: true,
          userId: id,
        },
      };
    }
    return this.AvatarProps;
  };

  handleListItemSubmit = ({ model, onSuccess, onError }) => {
    const { nextNodeId, prevNodeId } = this.props;
    const {
      followerId,
      relationship,
      otherRelationship,
      emergencyContact,
    } = model;
    const actionContent = {
      relationship: LOGIC_HELPERS.ifElse(
        relationship === RELATIONSHIPS.OTHER,
        otherRelationship,
        relationship,
      ),
      emergencyContact: LOGIC_HELPERS.ifElse(
        emergencyContact,
        EMERGENCY_CONTACT_VALUES.YES,
        EMERGENCY_CONTACT_VALUES.NO,
      ),
    };
    const data = {
      nextNodeId: followerId,
      action: 'guardian',
      actionContent,
    };

    this.props.resaga.dispatchTo(NODE_API, UPDATE_LINK, {
      payload: {
        id: prevNodeId,
        fk: nextNodeId,
        data,
        prevNodeChildKey: 'followers',
        nextNodeChildKey: 'participantLinks',
        upsertLinkId: true,
      },
      onSuccess,
      onError,
    });
  };

  handleDeleteError = ({ onLoad }) => () => {
    LOGIC_HELPERS.ifFunction(onLoad);
  };

  handleDeleteNodeSuccess = ({ onLoad, onClose }) => (_, { nodeId }) => {
    const { participantFollowers, linkIds } = this.props;
    const toBeRemoved = participantFollowers.map(
      participant => participant.link,
    );
    const newLinkIds = linkIds.filter(id => !toBeRemoved.includes(id));
    this.props.resaga.setValue({
      calculatedParticipants: DATASTORE_UTILS.removeItemsInArray(nodeId),
      nodes: this.handleUpdateFollowers(participantFollowers),
      linkIds: newLinkIds,
    });
    LOGIC_HELPERS.ifFunction(onLoad);
    LOGIC_HELPERS.ifFunction(onClose);
  };

  handleUpdateFollowers = affectedParticipants => store => {
    let editedStore = store;
    affectedParticipants.forEach(affectedParticipant => {
      const followers = dotProp.get(
        editedStore,
        `${affectedParticipant.participantId}.followers`,
        [],
      );
      editedStore = dotProp.set(
        editedStore,
        `${affectedParticipant.participantId}.followers`,
        followers.filter(followerId => followerId !== affectedParticipant.link),
      );
    });

    return editedStore;
  };

  handleDeleteNode = ({ onLoad, onClose }) => {
    const { nextNodeId, templateId: parentNodeId } = this.props;
    // TODO: Delete participant's person as well?
    NODE_API_HELPERS.deleteNode(
      {
        nodeId: nextNodeId,
        childKey: INTERESTED_PEOPLE,
        parent: parentNodeId,
        onSuccess: this.handleDeleteNodeSuccess({ onLoad, onClose }),
        onError: this.handleDeleteError({ onLoad, onClose }),
        type: INTERESTED_PERSON,
      },
      this.props,
    );
  };

  handleDeleteSuccess = ({ onLoad, onClose }) => () => {
    const {
      shouldDeleteAnotherNode,
      shouldDeleteFromOtherParticipant,
    } = this.state;
    if (shouldDeleteAnotherNode || shouldDeleteFromOtherParticipant) {
      this.handleDeleteNode({ onLoad, onClose });
    } else {
      LOGIC_HELPERS.ifFunction(onLoad);
      LOGIC_HELPERS.ifFunction(onClose);
    }
  };

  handleDelete = (id, fk) => ({ onLoad, onClose }) => {
    const { id: linkKey } = this.props;
    this.props.resaga.dispatchTo(NODE_API, DELETE_LINK, {
      payload: {
        id,
        fk,
        linkKey,
        nextNodeChildKey: 'followers',
      },
      onSuccess: this.handleDeleteSuccess({ onLoad, onClose }),
      onError: this.handleDeleteError({ onLoad }),
    });
  };

  handleUnlinkFollower = (_, value) =>
    this.setState({ shouldDeleteFromOtherParticipant: value });

  handleDeleteRelationship = (_, value) =>
    this.setState({ shouldDeleteAnotherNode: value });

  /*  renderInviteButton = id => {
    const { templateId } = this.props;
    return <InviteButton templateId={templateId} id={id} />;
  }; */

  renderStatus = () => {
    const { userConnected, invitationPending, classes } = this.props;

    if (userConnected) return null;

    if (invitationPending)
      // return <Badge color="yellow">Pending Invitation</Badge>;
      return (
        <Button
          size="extraSmall"
          color="base"
          onClick={this.openSeeDetail}
          variant={VARIANTS.OUTLINE}
          className={classes.invitBtn}
        >
          Pending
        </Button>
      );

    return <Badge color="translucent">Not Yet Connected</Badge>;
  };

  renderInviteButton = id => {
    const { userConnected, invitationPending, templateId } = this.props;
    if (!userConnected && !invitationPending)
      return <InviteButton templateId={templateId} id={id} />;

    return this.renderStatus();
  };

  openSeeDetail = e => {
    const { subNodeShareTokens } = this.props;
    e.stopPropagation();
    this.props.resaga.setValue({ seeDetail: first(subNodeShareTokens) });
  };

  getFollowerOptions = () => {
    const { selectableFollowers, nextNodeId } = this.props;
    const options = LOGIC_HELPERS.ifElse(
      nextNodeId,
      [...selectableFollowers, nextNodeId],
      selectableFollowers,
    );

    return options.map(id => ({
      value: id,
      children: (
        <GridContainer>
          <GridItem>
            <FirstName
              variant={VARIANTS.TEXT_ONLY}
              id={id}
              renderValue={this.renderValue}
            />{' '}
            <LastName
              variant={VARIANTS.TEXT_ONLY}
              id={id}
              renderValue={this.renderValue}
            />
          </GridItem>
        </GridContainer>
      ),
    }));
  };

  renderValue = value => value;

  renderForm = (followerDisabled = false) => {
    const { selectableFollowers, nextNodeId, id } = this.props;

    const followerValue = LOGIC_HELPERS.ifElse(
      nextNodeId,
      nextNodeId,
      selectableFollowers[0],
    );

    return (
      <GridContainer direction="column">
        <GridItem>
          <Select
            value={followerValue}
            label="Follower"
            name="followerId"
            fullWidth
            options={this.getFollowerOptions()}
            disabled={followerDisabled}
          />
        </GridItem>
        <GridItem>
          <Relationship id={id} />
        </GridItem>
        <GridItem>
          <EmergencyContact id={id} />
        </GridItem>
      </GridContainer>
    );
  };

  renderUnlinkFollower = (nextNodeId, prevNodeId) => (
    <DeleteButton
      text="Unlink Follower"
      iconButton={false}
      dialogTitle="Delete this relationship"
      headlineText={
        <Form>
          <JText>Are you sure you want to delete this follower?</JText>
          <Checkbox
            onChange={this.handleUnlinkFollower}
            name="shouldUnlinkFollower"
            label={<JText sm>Delete the follower as well</JText>}
          />
        </Form>
      }
      onClick={this.handleDelete(nextNodeId, prevNodeId)}
    />
  );

  renderEditableFormActions = (nextNodeId, prevNodeId) => () => (
    <DeleteButton
      dialogTitle="Delete this relationship"
      headlineText={
        <>
          <JText>Are you sure you want to delete this relationship?</JText>
          <Checkbox
            onChange={this.handleDeleteRelationship}
            name="shouldDeleteFollower"
            label={<JText sm>Delete the follower as well</JText>}
          />
        </>
      }
      onClick={this.handleDelete(nextNodeId, prevNodeId)}
    />
  );

  renderListItemValue = (followerId, linkId) => () => (
    <GridContainer alignItems="center" spacing={2}>
      <GridItem>
        <GridItem>
          <Name
            variant={VARIANTS.AVATAR}
            {...this.getAvatarProps()}
            id={followerId}
          />
        </GridItem>
      </GridItem>
      <GridItem xs>
        <GridContainer direction="column" spacing={0}>
          <GridItem>
            <GridItem>
              <JText md bold>
                <FirstName id={followerId} variant={VARIANTS.TEXT_ONLY} />{' '}
                <LastName id={followerId} variant={VARIANTS.TEXT_ONLY} />
              </JText>
            </GridItem>
          </GridItem>
          <GridItem>
            <JText md ellipsis capitalize nowrap={false} italic>
              <Relationship
                id={linkId}
                variant={VARIANTS.TEXT_ONLY}
                withECStatus
              />
            </JText>
          </GridItem>
        </GridContainer>
      </GridItem>
    </GridContainer>
  );

  handleClick = () => {
    const { nextNodeId: followerId } = this.props;
    this.props.resaga.setValue({
      interestedPersonViewOpen: true,
      interestedPersonViewId: followerId,
      interestedPersonViewMode: null,
    });
  };

  renderRelationshipList = () => {
    const { id, nextNodeId, prevNodeId } = this.props;

    return (
      <EditableForm
        isRow
        value={id}
        popoverProps={{
          transformOrigin: {
            vertical: 'bottom',
            horizontal: 'left',
          },
        }}
        renderValue={this.renderRelationship}
        onSubmit={this.handleListItemSubmit}
        renderSecondaryFormActions={this.renderEditableFormActions(
          nextNodeId,
          prevNodeId,
        )}
      >
        <GridContainer direction="column">
          <GridItem>
            <H6 dense weight="bold">
              Relationship Details
            </H6>
          </GridItem>
          <GridItem>{this.renderForm(true)}</GridItem>
        </GridContainer>
      </EditableForm>
    );
  };

  renderRelationship = () => {
    const { id, classes } = this.props;
    return (
      <GridContainer
        direction="row"
        alignItems="center"
        justify="space-between"
        spacing={0}
        wrap="nowrap"
      >
        <GridItem>
          <Button
            variant={VARIANTS.ICON}
            size="xs"
            color="darkgray"
            weight="light"
            noMargin
            noPadding
          >
            <JText md ellipsis capitalize nowrap={false} italic>
              <Relationship id={id} variant={VARIANTS.TEXT_ONLY} />{' '}
              <EmergencyContact id={id} variant={VARIANTS.BADGE} />
            </JText>{' '}
            <Icon
              size="xxsmall"
              icon="lnr-chevron-down"
              className={classes.iconPaddingLeft}
            />
          </Button>
        </GridItem>
      </GridContainer>
    );
  };

  renderFollowersList = () => {
    const { nextNodeId } = this.props;
    return (
      <GridContainer alignItems="center">
        <GridItem>
          <Icon icon="user" size="small" />
        </GridItem>
        <GridItem xs>
          <Editable onClick={this.handleClick}>
            <JText md bold>
              <div className="j-text-ellipsis">
                <FirstName id={nextNodeId} variant={VARIANTS.TEXT_ONLY} />{' '}
                <LastName id={nextNodeId} variant={VARIANTS.TEXT_ONLY} />{' '}
              </div>
            </JText>
          </Editable>
        </GridItem>
        <GridItem>
          <GridContainer justify="flex-end">
            {this.renderUnlinkFollower(
              this.props.nextNodeId,
              this.props.prevNodeId,
            )}
          </GridContainer>
        </GridItem>
      </GridContainer>
    );
  };

  handleClickOpenEdit = id => () => {
    this.props.resaga.setValue({
      interestedPersonViewOpen: true,
      interestedPersonViewId: id,
      interestedPersonViewMode: null,
    });
  };

  editFollower = id => (
    <InlineButton onClick={this.handleClickOpenEdit(id)} title="Edit Follower">
      <Icon size="xsmall" icon="lnr-pencil" />
    </InlineButton>
  );

  renderEditable = () => {
    const {
      id,
      nextNodeId,
      prevNodeId,
      showUnlink,
      readOnly,
      classes,
      showEditBtn,
    } = this.props;
    if (showUnlink) {
      return (
        <GridContainer className={classes.editableMarginTop} spacing={0}>
          <GridItem md={12} xs={12}>
            <GridContainer spacing={0} direction="row" justify="space-between">
              <GridItem xs={12} md={12} sm={12}>
                {this.renderFollowersList()}
              </GridItem>
            </GridContainer>
            <GridContainer
              direction="column"
              spacing={0}
              className={classes.relationshipMarginTop}
            >
              {this.renderRelationshipList()}
            </GridContainer>
          </GridItem>
        </GridContainer>
      );
    }
    return (
      <GridContainer justify="space-between" alignItems="center">
        <GridItem className={classes.grow}>
          <EditableForm
            isRow
            value={id}
            popoverProps={{
              transformOrigin: {
                vertical: 'bottom',
                horizontal: 'left',
              },
            }}
            renderValue={this.renderListItemValue(nextNodeId, id)}
            onSubmit={this.handleListItemSubmit}
            renderSecondaryFormActions={this.renderEditableFormActions(
              nextNodeId,
              prevNodeId,
            )}
            readOnly={readOnly}
          >
            <GridContainer direction="column">
              <GridItem>
                <H6 dense weight="bold">
                  Relationship Details
                </H6>
              </GridItem>
              <GridItem>{this.renderForm(true)}</GridItem>
            </GridContainer>
          </EditableForm>
        </GridItem>
        <GridItem>
          <Box pr={3}>{this.renderInviteButton(nextNodeId)}</Box>
        </GridItem>
        {showEditBtn && <GridItem>{this.editFollower(nextNodeId)}</GridItem>}
      </GridContainer>
    );
  };

  render = () => {
    const { variant } = this.props;

    return LOGIC_HELPERS.switchCase(variant, {
      [VARIANTS.EDITABLE]: this.renderEditable,
      [DEFAULT]: this.renderForm,
    });
  };
}

Guardian.propTypes = {
  // hoc props
  resaga: PropTypes.object.isRequired,
  classes: PropTypes.object,
  subNodeShareTokens: PropTypes.array,
  userConnected: PropTypes.bool,
  invitationPending: PropTypes.bool,
  xsDown: PropTypes.bool,
  // parent props
  variant: PropTypes.string,
  showUnlink: PropTypes.bool,
  readOnly: PropTypes.bool,

  // resaga props
  id: PropTypes.number,
  nextNodeId: PropTypes.number,
  prevNodeId: PropTypes.number,
  selectableFollowers: PropTypes.array,
  participantFollowers: PropTypes.array,
  linkIds: PropTypes.array,
  nextNodeUserId: PropTypes.number,
  prevNodeUserId: PropTypes.number,
  templateId: PropTypes.number,
  showEditBtn: PropTypes.bool,
};

Guardian.defaultProps = {
  selectableFollowers: [],
  showUnlink: false,
  linkIds: [],
  readOnly: false,
};

export default compose(
  withStyles(styles, { name: 'Guardian' }),
  resaga(CONFIG_0),
  resaga(CONFIG),
  selectLinkedUserData({
    nodeIdProp: 'prevNodeId',
    roles: [PARTICIPANT_LINKEE],
    outputProp: 'prevNodeUserId',
  }),
  selectLinkedUserData({
    nodeIdProp: 'nextNodeId',
    roles: [INTERESTED_LINKEE],
    outputProp: 'nextNodeUserId',
  }),
  resaga(CONFIG_2),
  resaga(CONFIG_3),
  resaga(CONFIG_4()),
)(Guardian);
