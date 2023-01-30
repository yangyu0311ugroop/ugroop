import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { withSMDown } from 'components/material-ui/hocs/withMediaQuery';
import { FormattedMessage as M } from 'react-intl';
import dotProp from 'dot-prop-immutable';
import resaga from 'resaga';
import { withStyles } from '@material-ui/core/styles';
import { VARIANTS } from 'variantsConstants';
// import { PARTICIPANT_ACCESS_LEVELS } from 'utils/constants/people';
import {
  PARTICIPANTS,
  TOUR_PARTICIPANT,
  PARTICIPANT_LINKEE,
  PARTICIPANT,
} from 'utils/modelConstants';
import { makeName } from 'utils/helpers/makeName';
import { ability } from 'apis/components/Ability/ability';
import { NODE_API_HELPERS } from 'apis/components/Node/helpers';
import { TEMPLATE_API_HELPERS } from 'apis/components/Template/helpers';
import { PERSON_DETAIL_HELPER } from 'apis/components/PersonDetail/helpers';
import { DATASTORE_UTILS } from 'datastore';
import { NODE_PATHS } from 'datastore/nodeStore/constants';
import { PERSON_PATHS } from 'datastore/personDataStore/constants';
import Hr from 'components/Hr';
import Dialog from 'components/Dialog';
import DialogTitle from 'components/Dialog/UGDialogTitle';
import DialogContent from 'components/Dialog/UGDialogContent';
import DialogActions from 'components/Dialog/UGDialogAction';
import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import { EditableLabel } from 'viewComponents/Editable';
import Button from 'viewComponents/Button';
import P, { H4 } from 'viewComponents/Typography';
import { LoadingDialog } from 'viewComponents/Dialog';
import { selectLinkedUserData } from 'smartComponents/Node/hoc';
import { ParticipantAccessLevel } from 'smartComponents/Node/logics';
import Node from 'smartComponents/Node';
import Status from 'smartComponents/Node/parts/Status';
import { EditableRTE } from 'smartComponents/Node/parts';
import { CloseButton, Title } from 'ugcomponents/DialogForm/Complex';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import omit from 'lodash/omit';
import LinkedUser from './components/LinkedUser';
import DeleteConfirmation from './components/DeleteConfirmation';
import {
  CONFIG,
  CONFIG2,
  GET_LINK_IDS,
  GET_PARTICIPANT_GROUP_LINKS,
  GET_PARTICIPANT_LINK_IDS,
} from './config';
import styles from './styles';
import m from './messages';
import { Chip } from '../../../../../components/material-ui';

export class ViewParticipant extends React.PureComponent {
  state = {
    confirmingDelete: false,
    // accessLevelState: this.props.defaultAccessLevel,
  };

  componentDidUpdate = prevProps => {
    const { isFetching, open } = this.props;
    if (
      (!prevProps.open && open && !isFetching) ||
      (prevProps.isFetching !== isFetching && !isFetching && open)
    )
      this.handleOpen();
  };

  componentWillUnmount = () => {
    this.props.resaga.setValue({ linkedUser: {} });
  };

  setupPerson = () => {
    const {
      id,
      personId,
      firstName,
      lastName,
      email,
      dateOfBirth,
      isFetching,
    } = this.props;

    if (!personId && !isFetching) {
      let data = {};
      data = dotProp.set(data, PERSON_PATHS.nodeId, id);
      data = dotProp.set(data, PERSON_PATHS.firstName, firstName);
      data = dotProp.set(data, PERSON_PATHS.lastName, lastName);
      data = dotProp.set(
        data,
        PERSON_PATHS.knownAs,
        makeName(firstName, lastName),
      );
      data = dotProp.set(data, PERSON_PATHS.email, email);
      data = dotProp.set(data, PERSON_PATHS.birthDate, dateOfBirth);
      PERSON_DETAIL_HELPER.createPerson(
        { data, onSuccess: this.handleSetupPersonSuccess },
        this.props,
      );
    }
  };

  isContributor = () => ability.can('execute', PARTICIPANT);

  showLinkedUser = () => {
    const { invitationPending, userConnected } = this.props;
    return this.isContributor() && (invitationPending || userConnected);
  };

  handleOpen = () => {
    // TODO: Re-enable once loading experience is less disruptive
    // const { templateId: id, id: ids } = this.props;
    // TEMPLATE_API_HELPERS.getParticipants({ id, ids }, this.props);
    this.setupPerson();
  };

  handleSetupPersonSuccess = ({ peopleById }) => {
    this.props.resaga.setValue({
      calculatedPeople: DATASTORE_UTILS.getObjectIds(peopleById()),
    });
  };

  handleDeleteSuccess = (_, { nodeId }) => {
    this.setState({ confirmingDelete: false });
    const { participantLinkIds } = this.props;
    // TODO: Allow generic deleteNode api to update multiple arrays?
    this.props.resaga.setValue({
      calculatedParticipants: DATASTORE_UTILS.removeItemsInArray(nodeId),
      participants: DATASTORE_UTILS.removeItemsInArray(...participantLinkIds),
    });
    this.handleClose();
  };

  handleDeleteError = () => {
    this.setState({ confirmingDelete: false });
  };

  handleDeleteConfirm = () => {
    const { id, parentNodeId } = this.props;
    // TODO: Delete participant's person as well?
    NODE_API_HELPERS.deleteNode(
      {
        nodeId: id,
        childKey: PARTICIPANTS,
        parent: parentNodeId,
        onSuccess: this.handleDeleteSuccess,
        onError: this.handleDeleteError,
        type: PARTICIPANT,
      },
      this.props,
    );
  };

  handleDeleteCancel = () => {
    this.setState({ confirmingDelete: false });
  };

  handleDeleteClick = e => {
    e.preventDefault();
    this.setState({ confirmingDelete: true });
  };

  handleClose = () => {
    this.props.resaga.setValue({ linkedUser: {} });
    this.props.onClose();
  };

  handleUserLink = () => {
    const { templateId: id, id: ids } = this.props;
    TEMPLATE_API_HELPERS.getParticipants({ id, ids }, this.props);
  };

  renderPart = (Component, variant, props = {}) => {
    const prop = omit(this.props, ['classes']);
    return <Component {...prop} variant={variant} {...props} />;
  };

  renderDeleteButton = () => {
    const { invitationPending, userConnected } = this.props;
    return (
      !invitationPending &&
      !userConnected && (
        <GridItem key="delete">
          <Button
            size="small"
            variant="outline"
            color="alert"
            iconButton
            icon="lnr-trash2"
            dense
            title={
              <M
                {...m.deleteButtonLabel}
                values={{ paxLabel: this.props.paxLabel }}
              />
            }
            onClick={this.handleDeleteClick}
          />
        </GridItem>
      )
    );
  };

  renderActions = () => (
    <GridContainer alignItems="flex-end" wrap="nowrap">
      {this.renderDeleteButton()}
    </GridContainer>
  );

  renderNonLinkUser = () => {
    const { knownAs, classes } = this.props;
    const renderLabel = (
      <P dense weight="bold">
        <div className="j-text-ellipsis">{knownAs}</div>
      </P>
    );
    if (this.showLinkedUser()) return null;
    return (
      <GridItem>
        <Chip
          className={classes.chip}
          // avatar={this.renderChipAvatar()}
          label={renderLabel}
          placement="bottom-start"
        />
      </GridItem>
    );
  };

  renderHeadingBackground = () => (
    <M {...m.headingBackground} values={{ paxLabel: this.props.paxLabel }} />
  );

  renderHeading = heading => {
    // const { accessLevelState } = this.state;
    const { smDown, classes } = this.props;
    if (smDown) {
      return (
        <GridContainer
          direction="row"
          justify="flex-start"
          alignItems="center"
          noWrap
        >
          <GridItem className={classes.textNoWrap}>{heading}</GridItem>
          {this.renderLinkedUser()}
          {this.renderNonLinkUser()}
          {this.renderPart(
            Status,
            LOGIC_HELPERS.ifElse(this.isContributor(), VARIANTS.SELECT_FIELD),
          )}
        </GridContainer>
      );
    }
    return (
      <GridContainer
        direction="row"
        justify="flex-start"
        alignItems="center"
        noWrap
      >
        <GridItem>{heading}</GridItem>
        {this.renderLinkedUser()}
        {this.renderNonLinkUser()}
        {this.renderPart(
          Status,
          LOGIC_HELPERS.ifElse(this.isContributor(), VARIANTS.SELECT_FIELD),
        )}
      </GridContainer>
    );
  };

  renderLinkedUser = () => {
    const {
      id,
      templateId,
      userId,
      personId,
      shareToken,
      userNodeId,
      invitationPending,
      userConnected,
    } = this.props;
    return (
      this.showLinkedUser() && (
        <GridItem>
          <LinkedUser
            id={id}
            templateId={templateId}
            role={TOUR_PARTICIPANT}
            linkeeRole={PARTICIPANT_LINKEE}
            userId={userId}
            personId={personId}
            shareToken={shareToken}
            userNodeId={userNodeId}
            invitationPending={invitationPending}
            userConnected={userConnected}
            onLink={this.handleUserLink}
            isCustomMaxWidth
          />
        </GridItem>
      )
    );
  };

  renderTitle = () => (
    <React.Fragment>
      <Title
        heading={
          <M {...m.heading} values={{ paxLabel: this.props.paxLabel }} />
        }
        headingBackground={this.renderHeadingBackground()}
        renderHeading={this.renderHeading}
        headingUnderline={false}
      />
      <CloseButton onClick={this.handleClose} />
    </React.Fragment>
  );

  renderNote = () => (
    <GridItem xs>
      <EditableLabel>
        <M {...m.noteLabel} />
      </EditableLabel>
      {this.renderPart(EditableRTE, VARIANTS.EDITABLE, {
        nodePath: NODE_PATHS.note,
        patch: true,
        showHeader: false,
        dense: true,
        emptyPlaceholder: 'Click to add note',
      })}
    </GridItem>
  );

  renderContentWithAccessLevel = accessLevel => {
    const { userId, userConnected, templateId, invitationPending } = this.props;
    // this.setState({ accessLevelState: accessLevel });
    return this.renderPart(Node, VARIANTS.EDITABLE, {
      noName: !!userId,
      readOnlyStatus: !this.isContributor(),
      accessLevel,
      userConnected,
      templateId,
      invitationPending,
    });
  };

  renderContent = () => {
    const {
      id,
      defaultAccessLevel,
      interestedPersonNodeId,
      participantNodeId,
    } = this.props;
    return (
      <ParticipantAccessLevel
        id={id}
        defaultAccessLevel={defaultAccessLevel}
        interestedPersonNodeId={interestedPersonNodeId}
        participantNodeId={participantNodeId}
      >
        {this.renderContentWithAccessLevel}
      </ParticipantAccessLevel>
    );
  };

  renderContributorSection = () =>
    this.isContributor() && (
      <GridContainer justify="space-between" alignItems="center">
        {this.renderNote()}
        <GridItem>{this.renderActions()}</GridItem>
      </GridContainer>
    );

  renderDeleteConfirmation = () => {
    const { personId, personType } = this.props;
    const { confirmingDelete } = this.state;
    return (
      <DeleteConfirmation
        personId={personId}
        personType={personType}
        open={confirmingDelete}
        onConfirm={this.handleDeleteConfirm}
        onCancel={this.handleDeleteCancel}
      />
    );
  };

  renderDetailDialog = () => {
    const { open, personId, classes } = this.props;
    return (
      <Dialog
        open={open && !!personId}
        onClose={this.handleClose}
        fullWidth
        maxWidth="md"
        disableBackdropClick
      >
        <DialogTitle noPaddingBottom>{this.renderTitle()}</DialogTitle>
        <DialogContent className={classes.content}>
          {this.renderContent()}
        </DialogContent>
        {this.isContributor() && <Hr noMarginTop />}
        <DialogActions noPaddingTop disableActionSpacing>
          {this.renderContributorSection()}
        </DialogActions>
      </Dialog>
    );
  };

  renderLoadingDialog = () => {
    const { open, personId, isFetching } = this.props;
    return (
      <LoadingDialog open={open && !personId}>
        <H4 dense weight="bold">
          <M
            {...LOGIC_HELPERS.ifElse(
              isFetching,
              m.loadingText,
              m.initialiseHeading,
            )}
            values={{ paxLabel: this.props.paxLabel }}
          />
        </H4>
      </LoadingDialog>
    );
  };

  render = () => (
    <React.Fragment>
      {this.renderLoadingDialog()}
      {this.renderDetailDialog()}
      {this.renderDeleteConfirmation()}
    </React.Fragment>
  );
}

ViewParticipant.propTypes = {
  // hoc
  resaga: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  smDown: PropTypes.bool,

  // parent
  templateId: PropTypes.number,
  defaultAccessLevel: PropTypes.string,
  interestedPersonNodeId: PropTypes.number,
  participantNodeId: PropTypes.number,
  id: PropTypes.number,
  open: PropTypes.bool,
  onClose: PropTypes.func,

  // resaga value
  userId: PropTypes.number,
  personId: PropTypes.number,
  shareToken: PropTypes.string,
  userNodeId: PropTypes.number,
  invitationPending: PropTypes.bool,
  userConnected: PropTypes.bool,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  email: PropTypes.string,
  dateOfBirth: PropTypes.string,
  personType: PropTypes.string,
  parentNodeId: PropTypes.number,
  participantLinkIds: PropTypes.array,
  knownAs: PropTypes.string,
  // resaga isLoading
  loading: PropTypes.bool,
  paxLabel: PropTypes.string,
  isFetching: PropTypes.bool,
};

ViewParticipant.defaultProps = {
  templateId: null,
  id: null,
  open: false,
  onClose: () => {},

  userId: null,
  personId: null,
  shareToken: null,
  userNodeId: null,
  invitationPending: false,
  userConnected: false,
  firstName: null,
  lastName: null,
  email: null,
  dateOfBirth: null,
  personType: null,
  parentNodeId: null,
  participantLinkIds: [],

  loading: false,
};

export default compose(
  selectLinkedUserData({ nodeIdProp: 'id', roles: [PARTICIPANT_LINKEE] }),
  withStyles(styles),
  resaga(GET_LINK_IDS),
  resaga(GET_PARTICIPANT_GROUP_LINKS),
  resaga(GET_PARTICIPANT_LINK_IDS),
  resaga(CONFIG),
  resaga(CONFIG2),
  withSMDown,
)(ViewParticipant);
