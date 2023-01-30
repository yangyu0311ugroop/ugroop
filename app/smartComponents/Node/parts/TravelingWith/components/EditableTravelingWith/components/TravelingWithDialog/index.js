import JText from 'components/JText';
import { NODESTORE_HOOKS } from 'datastore/nodeStore/hooks';
import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import JDialog from 'ugcomponents/JDialog';
import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import Name from 'smartComponents/Node/parts/Name';
import Status from 'smartComponents/Node/parts/Status';
import { PARTICIPANT } from 'utils/modelConstants';
import Editable from 'viewComponents/Editable';
import { VARIANTS } from 'variantsConstants';
import withResaga from 'resaga';
import { CREATE_LINK, NODE_API } from 'apis/constants';
import { LoadingText } from 'ugcomponents/Progress';
import { ability } from 'apis/components/Ability/ability';
import first from 'lodash/first';
import Hr from 'components/Hr';
import { NODE_API_HELPERS } from 'apis/components/Node/helpers';
import { HEADING, CONTENT, TEXT } from 'appConstants';
import NodeProp from 'smartComponents/Node/components/NodeProp';
import { useSelector } from 'react-redux';
import { NODE_STORE_RESELECTORS } from 'datastore/nodeStore/selectorsViaConnect';
import isFunction from 'lodash/isFunction';
import Button from 'viewComponents/Button';
import classnames from 'classnames';
import RemoveLinkButton from './components/RemoveLinkButton';

const useStyles = makeStyles(() => ({
  root: {},
  content: {
    paddingTop: 0,
  },
  group: {
    flex: 1,
    // background: '#E0E8ED',
    margin: 'auto',
    // padding: 8,
    paddingRight: 4,
  },
  groupName: {
    background: '#E0E8ED',
    padding: 8,
    width: '100%',
    '&:hover': {
      background: '#ebedf0',
    },
  },
  groupCard: {
    // padding: 4,
  },
  actionButton: {
    minHeight: 'unset',
    color: '#0a2644',
    padding: 0,
    background: 'unset',
    boxShadow: 'unset',
    border: 'unset',

    '&:hover': {
      background: '#ebedf0',
    },
  },
  fullWidth: {
    width: '100%',
  },
  marginBottom: {
    marginBottom: 10,
  },
}));

const renderPerson = (id, isLoading) => (
  <GridItem xs>
    <GridContainer alignItems="center">
      <GridItem>
        <Name id={id} variant={VARIANTS.AVATAR} />
      </GridItem>
      <GridItem>
        <GridContainer direction="column" spacing={0}>
          <GridItem>
            <JText bold>
              <Name id={id} variant={VARIANTS.TEXT_ONLY} />
            </JText>
          </GridItem>
          <GridItem>
            <JText>
              <Status type={PARTICIPANT} id={id} />
            </JText>
          </GridItem>
        </GridContainer>
      </GridItem>
      {isLoading && (
        <GridItem>
          <LoadingText />
        </GridItem>
      )}
    </GridContainer>
  </GridItem>
);

export const TravelingWithDialog = memo(props => {
  const classes = useStyles();
  const [loadingState, setLoading] = useState(props.isLoading);
  const [tranIdState, setTranId] = useState(props.processId);
  const [joining, setJoining] = useState(props.defaultJoining);
  const [creating, setCreating] = useState(false);

  const {
    open,
    onClose,
    onButtonClose,
    hasGroup,
    currentGroupId,
    renderDeleteGroup,
  } = props;

  const travelWiths = currentGroupId
    ? NODESTORE_HOOKS.useNodeGetTravelingWithByGroupId(currentGroupId)
    : NODESTORE_HOOKS.useNodeGetTravelingWith(props.id);
  const availableIds = NODESTORE_HOOKS.useNodeGetParticipantNoGroup(
    props.templateId,
  );
  const groups = NODESTORE_HOOKS.useNodeGetAllTravellingWithGroups(
    props.templateId,
  );

  let groupId = currentGroupId
    ? [currentGroupId]
    : NODESTORE_HOOKS.useNodeGetTravelingWithGroupId(props.id);
  const getCurrentName = useSelector(state =>
    NODE_STORE_RESELECTORS.getNodeParticipantsFullName(state, [props.id]),
  );
  const linkIdArr = NODESTORE_HOOKS.useNodeGetParticipantLinkId(props.id);
  const linkId = first(linkIdArr);

  const textName = first(getCurrentName);
  groupId = first(groupId);

  const handleCreateGroup = () => {
    const node = {
      type: 'group',
      parentNodeId: props.templateId,
      content: `${textName}'s Travel Group `,
      customData: {
        type: 'travelgroup',
      },
    };
    setCreating(true);
    setLoading(true);
    NODE_API_HELPERS.createNode(
      {
        node,
        parentNodeId: props.templateId,
        childKey: 'groups',
        onSuccess: handleCreateLink({ participantId: props.id }),
        onError: handleSetState(),
      },
      props,
    );
  };

  const onCloseDlg = () => {
    handleSetState()();
    onClose();
  };
  const onButtonCloseDlg = () => {
    handleSetState()();
    onButtonClose();
  };

  const handleRemoveGroup = () => {
    if (travelWiths.length) return;

    NODE_API_HELPERS.deleteNode(
      {
        nodeId: groupId,
        parent: props.templateId,
        childKey: 'groups',
      },
      props,
    );
  };

  const handleCreateLink = ({ participantId, groupTargetId }) => ({ node }) => {
    const nodeId = groupId || groupTargetId || node.id; // LOGIC_HELPERS.ifElse(!groupId, node.id, groupId);
    handleSetState(true, participantId, nodeId)();

    return props.resaga.dispatchTo(NODE_API, CREATE_LINK, {
      payload: {
        id: nodeId,
        data: {
          nextNodeId: Number(participantId),
          action: 'group',
          actionContent: {
            type: 'travelgroup',
          },
        },
        prevNodeChildKey: 'participants',
        nextNodeChildKey: 'groups',
        upsertLinkId: true,
      },
      onSuccess: handleSetState(),
      onError: handleSetState(),
    });
  };

  const handleSetState = (
    loading = false,
    id = null,
    isJoining = null,
  ) => () => {
    setLoading(loading);
    setTranId(id);
    setJoining(isJoining);
    setCreating(false);
  };
  const leaveOrRemove = () => {
    if (!currentGroupId) {
      return (
        <GridItem>
          <RemoveLinkButton
            variant={TEXT}
            label="Leave group"
            nodeId={props.id}
            linkId={Number(linkId)}
            onSuccess={handleRemoveGroup}
            parentId={groupId}
          />
        </GridItem>
      );
    }
    if (isFunction(renderDeleteGroup))
      return <GridItem>{renderDeleteGroup()}</GridItem>;
    return null;
  };

  const renderGroup = id => {
    if (!id) return null;
    return (
      <React.Fragment>
        <NodeProp
          id={id}
          bold
          variant={HEADING}
          valueKey={CONTENT}
          editable={ability.can('execute', PARTICIPANT)}
          showEmpty
          ellipsis
          component={GridItem}
          isCustomData={false}
          required
          placeholder="Group Name"
        />
        {hasGroup && (
          <React.Fragment>
            <JText link onClick={handleRemoveGroup}>
              Delete group
            </JText>
            <JText link onClick={handleCreateLink({ participantId: linkId })}>
              Remove Participant
            </JText>
            <JText link onClick={onCloseDlg}>
              Close Dialog
            </JText>
            <JText link onClick={onButtonCloseDlg}>
              Close Button Dialog
            </JText>
          </React.Fragment>
        )}
        <GridItem>{leaveOrRemove()}</GridItem>
        <Hr half />
      </React.Fragment>
    );
  };

  const noEmptyNoGroups = (
    <>
      <GridItem className={classes.marginBottom}>
        <JText italic gray>
          Not travelling with anyone
        </JText>
      </GridItem>
      <GridItem>
        {!groupId && !groups.length && (
          <Button
            size="xs"
            color="primary"
            onClick={handleCreateGroup}
            loading={creating}
            className={classes.fullWidth}
          >
            Create Group
          </Button>
        )}
      </GridItem>
    </>
  );

  const renderGroups = groups.map(id => (
    <GridItem className={classes.groupCard}>
      <GridContainer noWrap spacing={0}>
        <GridItem className={classes.group}>
          <Button
            noMargin
            dense
            size="small"
            variant={VARIANTS.OUTLINE}
            buttonTitle="Join group"
            onClick={handleCreateLink({
              participantId: props.id,
              groupTargetId: id,
            })}
            className={classnames(classes.actionButton, classes.fullWidth)}
            disabled={loadingState}
            loading={joining === id}
          >
            <JText bold ellipsis className={classes.groupName}>
              <NodeProp
                id={id}
                bold
                variant={TEXT}
                valueKey={CONTENT}
                editable={false}
                showEmpty
                ellipsis
                component={GridItem}
                isCustomData={false}
                required
                placeholder="Group Name"
              />
            </JText>
          </Button>
        </GridItem>
      </GridContainer>
    </GridItem>
  ));

  const addGroupsOrJoin = (
    <GridItem xs>
      <GridContainer direction="column">
        <GridItem xs>
          <JText gray>Click a group below to join or create a new one.</JText>
        </GridItem>
        <GridItem>
          <GridContainer direction="column">{renderGroups}</GridContainer>
        </GridItem>
        <GridItem />
        <GridItem xs>
          <Button
            size="xs"
            color="primary"
            onClick={handleCreateGroup}
            className={classes.fullWidth}
            loading={creating}
          >
            Create a new group
          </Button>
        </GridItem>
      </GridContainer>
    </GridItem>
  );

  const empltyPlaceHolder = (
    <GridItem>
      <GridContainer direction="column" spacing={0}>
        {groups.length && !groupId ? addGroupsOrJoin : noEmptyNoGroups}
      </GridContainer>
    </GridItem>
  );

  const renderAvailableParticipantList = (
    <React.Fragment>
      <Hr half />
      {!!availableIds.length && (
        <GridItem>
          <JText italic gray>
            Choose participant to travel with
          </JText>
        </GridItem>
      )}
      {availableIds.map(participant => (
        <GridItem id={`${participant}`} key={`new-${participant}`}>
          <Editable
            readOnly={loadingState}
            onClick={handleCreateLink({
              participantId: participant,
            })}
            data-testid="test-ni-dan" // {`editable-${participant}`}
          >
            <GridContainer alignItems="center">
              {renderPerson(participant, tranIdState === participant)}
            </GridContainer>
          </Editable>
        </GridItem>
      ))}
    </React.Fragment>
  );
  const participantsTravelingWith = travelWiths.map(travelWith => (
    <GridItem id={`${travelWith[1]}`}>
      <GridContainer alignItems="center">
        {renderPerson(travelWith[1])}
        <GridItem>
          <RemoveLinkButton
            nodeId={travelWith[1]}
            linkId={travelWith[0]}
            parentId={groupId}
          />
        </GridItem>
      </GridContainer>
    </GridItem>
  ));

  const content = !travelWiths.length
    ? empltyPlaceHolder
    : participantsTravelingWith;

  return (
    <JDialog
      open={open}
      onClose={onCloseDlg}
      onButtonClose={onButtonCloseDlg}
      header={
        <JText lg bold ellipsis>
          {`Traveling With ${textName}`}
        </JText>
      }
      maxWidth="xs"
      fullWidth
      hideSubmitButton
      contentClassName={classes.content}
      headerNoWrap
    >
      <GridContainer direction="column" spacing={1}>
        {renderGroup(groupId)}
        {content}
        {!!groupId && availableIds && renderAvailableParticipantList}
      </GridContainer>
    </JDialog>
  );
});

TravelingWithDialog.propTypes = {
  resaga: PropTypes.object.isRequired,
  id: PropTypes.number,
  templateId: PropTypes.number,
  open: PropTypes.bool,
  onClose: PropTypes.func,
  onButtonClose: PropTypes.func,
  hasGroup: PropTypes.bool,
  isLoading: PropTypes.bool,
  processId: PropTypes.number,
  defaultJoining: PropTypes.bool,
  currentGroupId: PropTypes.number,
  renderDeleteGroup: PropTypes.func,
};

export default withResaga()(TravelingWithDialog);
