import { NODE_API_HELPERS } from 'apis/components/Node/helpers';
import { PERSON_DETAIL_HELPER } from 'apis/components/PersonDetail/helpers';
import JText from 'components/JText';
import { DATASTORE_UTILS } from 'datastore';
import { PERSON_PATHS } from 'datastore/personDataStore/constants';
import { withSMDown } from 'components/material-ui/hocs/withMediaQuery';
import dotProp from 'dot-prop-immutable';
import React from 'react';
import { ability } from 'apis/components/Ability/ability';
import { withStyles } from '@material-ui/core/styles';
import { Popper, ClickAwayListener, Paper, Grow } from '@material-ui/core';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import resaga from 'resaga';
import classnames from 'classnames';
import Hr from 'components/Hr';
import {
  GET_PERSON,
  NODE_API,
  TEMPLATE_API,
  UPDATE_NODE,
} from 'apis/constants';
import {
  DEFAULT,
  LINK,
  PERSON_DATA_STORE,
  USER_DATA_STORE,
  TEXT_WITH_LABEL,
  DETAILED_VIEW,
  THE_BIG_DOT,
  CONFIRMED,
  ADD_FOLLOWER_TOOLTIP_MSG,
} from 'appConstants';
import TravelingWith from 'smartComponents/Node/parts/TravelingWith';
import inputs from 'smartComponents/Node/types/Participant/inputs';
import { makeName } from 'utils/helpers/makeName';
import { VARIANTS } from 'variantsConstants';
import {
  PARTICIPANT_LINKEE,
  PARTICIPANT,
  INTERESTED_PERSON,
  TOUR_PARTICIPANT,
} from 'utils/modelConstants';
import { PARTICIPANT_ACCESS_LEVELS } from 'utils/constants/people';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import Hidden from '@material-ui/core/Hidden';
import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import P, { H4, H5, H6, Span } from 'viewComponents/Typography';
import Editable from 'viewComponents/Editable';
import Button from 'viewComponents/Button';
import { PeopleListRow } from 'viewComponents/People';
import { ConditionsBorderStyle } from 'smartComponents/Node/logics';
import { selectLinkedUserData } from 'smartComponents/Node/hoc';
import Name from 'smartComponents/Node/parts/Name';
import PersonKnownAs from 'smartComponents/Person/parts/KnownAs';
import PersonEmail from 'smartComponents/Person/parts/Email';
import FirstName from 'smartComponents/Node/parts/FirstName';
import LastName from 'smartComponents/Node/parts/LastName';
import Gender from 'smartComponents/Node/parts/Gender';
import Email from 'smartComponents/Node/parts/Email';
import DateOfBirth from 'smartComponents/Node/parts/DateOfBirth';
import Passport from 'smartComponents/Node/parts/Passport';
import Phone from 'smartComponents/Node/parts/Phone';
import Insurance from 'smartComponents/Node/parts/Insurance';
import Medicals from 'smartComponents/Node/parts/Medicals';
import Dietaries from 'smartComponents/Node/parts/Dietaries';
import PersonType from 'smartComponents/Node/parts/PersonType';
import CreatedAt from 'smartComponents/Node/parts/CreatedAt';
import Comment from 'smartComponents/Node/parts/Comment';
import Forms from 'smartComponents/Node/parts/Forms';
import Status from 'smartComponents/Node/parts/Status';
import Followers from 'smartComponents/Node/parts/Followers';
import Relationship from 'smartComponents/Links/parts/Relationship';
import UploadZone from 'smartComponents/Node/parts/Forms/components/UploadZone';
import LastAccessAt from 'smartComponents/RecentActivity/parts/LastAccessAt';
import AgeType from 'smartComponents/Node/parts/AgeType';
import HonorificTitle from 'smartComponents/Node/parts/HonorificTitle';
import PaxRoom from 'smartComponents/Node/parts/PaxRoom';
import Room from 'smartComponents/Node/types/Room';
import { FormattedMessage as M } from 'react-intl';
import InviteUser from 'containers/Templates/Modals/Participant/View/components/LinkedUser/components/InviteUser';
import intersection from 'lodash/intersection';
import isFunction from 'lodash/isFunction';
import NewIcon from 'viewComponents/Icon';
import List from 'smartComponents/Node/parts/Followers/components/List';
import { TableCell } from 'viewComponents/Table';
import first from 'lodash/first';
import omit from 'lodash/omit';
import { CONFIG, CONFIG_PARENT, CONFIG_3 } from './config';
import InviteButton from './components/InviteButton';
import MoveButton from './components/MoveButton';
import MoveDialog from './components/MoveDialog';

import m from './messages';
import styles from './styles';
import {
  ANIMATION_MAX_INDEX,
  ANIMATION_TIMEOUT,
  INCREMENT_TIMEOUT,
  NO_ANIMATION_TIMEOUT,
} from '../../../../containers/Templates/Modals/ShareList/components/Invitee/constants';

// TODO: Extract the action buttons from this component
// TODO: Move entirely all functions related to invite to invite button
export class Participant extends React.PureComponent {
  state = {
    dialogOpen: false,
    dialogUnlinkOpen: false,
    dialoglinkOpen: false,
    showForms: true,
    anchorEl: null,
    loading: false,
    showRoomingWith: true,
    show: false,
  };

  componentDidMount = () => {
    const { index } = this.props;

    // only show animation of the first ANIMATION_MAX_INDEX items
    let timeout;

    if (index < ANIMATION_MAX_INDEX) {
      timeout = ANIMATION_TIMEOUT + index * INCREMENT_TIMEOUT;
    } else {
      timeout = NO_ANIMATION_TIMEOUT;
    }
    this.show = setTimeout(() => this.setState({ show: true }), timeout);
  };

  componentWillUnmount = () => {
    clearTimeout(this.show);
  };

  handleEditableClick = event => {
    event.preventDefault();
    event.stopPropagation();
    const { id, readOnlyStatus } = this.props;
    this.props.resaga.setValue({
      participantViewOpen: true,
      participantViewId: id,
      participantViewMode: readOnlyStatus ? 'me' : null, // HACK: Bad naming
    });
  };

  onMoveSuccess = () => {
    this.setState({
      dialogOpen: false,
      dialogUnlinkOpen: false,
      dialoglinkOpen: false,
    });
    this.props.resaga.setValue({ selectedFollowerId: 0 });
  };

  handleConfirmMove = () => {
    const { id, parentId, selectedFollowerId } = this.props; // { toBeMoved, from, to}
    const payload = {
      nodeId: id,
      id,
      node: {
        parentNodeId: selectedFollowerId,
        type: PARTICIPANT,
      },
      movedId: id,
      moveNode: true,
      keyPath: `${selectedFollowerId}.participants`,
      initialPath: `${parentId}.participants`,
    };
    const params = {
      payload,
      onSuccess: this.onMoveSuccess,
    };
    this.props.resaga.dispatchTo(NODE_API, UPDATE_NODE, params);
  };

  openMoveDialog = id => () => {
    this.props.resaga.setValue({ selectedFollowerId: id });
    this.setState({ dialogOpen: true });
  };

  openLinkDialog = id => () => {
    this.props.resaga.setValue({ selectedFollowerId: id });
    this.setState({ dialoglinkOpen: true });
  };

  openUnlinkDialog = id => () => {
    this.props.resaga.setValue({ selectedFollowerId: id });
    this.setState({ dialogUnlinkOpen: true });
  };

  closeMoveDialog = () => {
    this.setState({
      dialogOpen: false,
      dialogUnlinkOpen: false,
      dialoglinkOpen: false,
    });
    this.props.resaga.setValue({ selectedFollowerId: 0 });
  };

  onCheckboxClick = () => {
    const { showForms } = this.state;
    this.setState({
      showForms: !showForms,
    });
  };

  onToggleRoomingWith = () => {
    const { showRoomingWith } = this.state;
    this.setState({
      showRoomingWith: !showRoomingWith,
    });
  };

  findParticipant = s => s && s.role === PARTICIPANT;

  getFirstToken = shares => {
    const share = shares.find(this.findParticipant);
    return dotProp.get(share, 'notificationToken', null);
  };

  handleNodeUpdateSuccess = () => {
    this.setState({ loading: false });
  };

  handlePopperClickAway = () => {
    this.setState({ anchorEl: null });
  };

  handleFindUserSuccess = ({ email }) => ({ inviteeId, share }) => {
    const { id } = this.props;

    let model = {};
    model = dotProp.set(model, inputs.email.name, email);

    const shares = Object.values(share());
    const linkedUserToken = this.getFirstToken(shares);

    NODE_API_HELPERS.updateNode(
      {
        nodeId: id,
        onSuccess: this.handleNodeUpdateSuccess,
        onError: this.handleNodeUpdateSuccess,
        ...model,
      },
      this.props,
    );
    this.props.resaga.setValue({
      linkedUserEmail: email,
      linkedUserId: inviteeId,
      linkedUserToken,
    });
  };

  openPopper = target => {
    const { personEmail: email, templateId } = this.props;
    const { anchorEl } = this.state;

    this.setState({
      loading: true,
      anchorEl: anchorEl ? null : target,
    });

    this.props.resaga.dispatchTo(TEMPLATE_API, GET_PERSON, {
      payload: { id: templateId, email },
      onSuccess: this.handleFindUserSuccess({ email }),
    });
  };

  handleSetupPersonSuccess = target => ({ peopleById }) => {
    this.props.resaga.setValue({
      calculatedPeople: DATASTORE_UTILS.getObjectIds(peopleById()),
    });

    this.openPopper(target);
  };

  handleClick = ev => {
    const target = ev.currentTarget;
    const {
      id,
      personId,
      firstName,
      lastName,
      personEmail,
      dateOfBirth,
    } = this.props;

    if (!personId) {
      let data = {};
      data = dotProp.set(data, PERSON_PATHS.nodeId, id);
      data = dotProp.set(data, PERSON_PATHS.firstName, firstName);
      data = dotProp.set(data, PERSON_PATHS.lastName, lastName);
      data = dotProp.set(
        data,
        PERSON_PATHS.knownAs,
        makeName(firstName, lastName),
      );
      data = dotProp.set(data, PERSON_PATHS.email, personEmail);
      data = dotProp.set(data, PERSON_PATHS.birthDate, dateOfBirth);
      return PERSON_DETAIL_HELPER.createPerson(
        { data, onSuccess: this.handleSetupPersonSuccess(target) },
        this.props,
      );
    }

    return this.openPopper(target);
  };

  canExecuteParticipant = () => ability.can('execute', PARTICIPANT);

  renderPopperPaper = () => {
    const { classes } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);
    return (
      <React.Fragment>
        <Button
          size="extraSmall"
          variant={VARIANTS.INLINE}
          className={classes.inviteButton}
          onClick={this.handleClick}
        >
          invite them?
        </Button>
        <Popper
          className={classes.popper}
          open={open}
          anchorEl={anchorEl}
          placement="bottom-start"
          disablePortal
        >
          {this.renderPopperPaperContent()}
        </Popper>
      </React.Fragment>
    );
  };

  renderPopperPaperContent = () => {
    const { classes, id, templateId, personEmail, linkedUserId } = this.props;
    const { loading } = this.state;
    return (
      <ClickAwayListener
        onClickAway={this.handlePopperClickAway}
        mouseEvent="onMouseDown"
      >
        <Paper className={classes.popperContainer}>
          {loading ? (
            <div>Searching...</div>
          ) : (
            <InviteUser
              id={id}
              linkedUserId={linkedUserId}
              templateId={templateId}
              role={TOUR_PARTICIPANT}
              linkeeRole={PARTICIPANT_LINKEE}
              personEmail={personEmail}
              onBack={this.handlePopperClickAway}
            />
          )}
        </Paper>
      </ClickAwayListener>
    );
  };

  openSeeDetail = e => {
    e.stopPropagation();
    this.props.resaga.setValue({ seeDetail: this.props.shareToken });
  };

  renderStatus = () => {
    const { userConnected, invitationPending, classes } = this.props;

    if (userConnected) return null;

    if (invitationPending)
      // return <Badge color="yellow">Pending Invitation</Badge>;
      return (
        <GridItem>
          <Button
            size="extraSmall"
            variant={VARIANTS.OUTLINE}
            color="base"
            onClick={this.openSeeDetail}
            className={classes.pending}
            verySquare
          >
            Pending
          </Button>
        </GridItem>
      );

    /* return <Badge color="translucent">Not Yet Connected</Badge>; */
    return <h5 className={classes.notConnected}>Not Yet Connected</h5>;
  };

  renderPart = (Component, variant, props = {}) => {
    const { accessLevel } = this.props;
    const prop = omit(this.props, ['classes']);

    return (
      <Component
        {...prop}
        readOnly={accessLevel !== PARTICIPANT_ACCESS_LEVELS.full}
        variant={variant}
        {...props}
      />
    );
  };

  renderPersonPart = (Component, variant, props = {}) => {
    const { personId } = this.props;
    return this.renderPart(Component, variant, {
      id: personId,
      dataStore: PERSON_DATA_STORE,
      isMatchToName: true,
      ...props,
    });
  };

  isRequired = () => {
    // The purpose of this is to check if the drop down field in RYI is required
    const { isEmptyInterestLevel, isEmptySelfTravel } = this.props;

    let showFLNameRequired = false;

    if (isEmptyInterestLevel && isEmptySelfTravel) {
      showFLNameRequired = false;
    }

    if (isEmptyInterestLevel === false && isEmptySelfTravel === false) {
      showFLNameRequired = true;
    }

    return showFLNameRequired;
  };

  renderForm = (variant = VARIANTS.TEXT_FIELD) => () => {
    const {
      noName,
      isPublic,
      readOnlyStatus,
      withRelationshipField,
      isRequired: required,
      isEmptyParticipantStatus,
      currentEmailValue,
      isRYI,
    } = this.props;

    let isRequired = this.isRequired() ? isPublic : false;

    if (!isRYI) {
      isRequired = true;
    }

    return (
      <GridContainer direction="column">
        {withRelationshipField && this.renderPart(Relationship)}
        {!noName && (
          <GridItem>
            <GridContainer>
              {this.renderPart(FirstName, variant, {
                required: isRequired,
                autoFocus: !isPublic,
              })}
              {this.renderPart(LastName, variant, {
                required: isRequired,
              })}
            </GridContainer>
          </GridItem>
        )}
        {this.renderPart(Email, variant, {
          required: isRequired,
          currentValue: currentEmailValue,
        })}
        {!isPublic && this.renderPart(DateOfBirth, variant)}
        {!isPublic &&
          this.renderPart(Status, variant, {
            type: PARTICIPANT,
            readOnly: readOnlyStatus,
            required,
            isEmptyParticipantStatus,
          })}
        {!isPublic && this.renderPart(AgeType, variant)}
        {!isPublic && this.renderPart(Comment, variant)}
      </GridContainer>
    );
  };

  renderPersonNameEditables = variant => {
    const {
      noName,
      userConnected,
      id,
      templateId,
      invitationPending,
      nodeType,
      classes,
      participantEmail,
      personEmail,
      accessLevel,
      userId,
    } = this.props;

    let knownAs = null;

    if (noName && userId) {
      knownAs = (
        <GridItem>
          {this.renderPersonPart(PersonKnownAs, variant, {
            id: userId,
            dataStore: USER_DATA_STORE,
            readOnly: true,
          })}
        </GridItem>
      );
    } else if (!noName) {
      knownAs = !noName && (
        <GridItem>{this.renderPersonPart(PersonKnownAs, variant)}</GridItem>
      );
    }

    const nodeEmail = personEmail || participantEmail;
    const canInvite =
      nodeEmail &&
      !userConnected &&
      nodeType === PARTICIPANT &&
      !invitationPending;
    const email = (
      <React.Fragment>
        <GridItem>
          {this.renderPersonPart(PersonEmail, variant, {
            userConnected,
            nodeId: id,
            templateId,
            role: PARTICIPANT,
            linkeeRole: PARTICIPANT_LINKEE,
            invitationPending,
            readOnly: !!noName || !this.canExecuteParticipant(),
          })}
        </GridItem>
        {canInvite && (
          <GridItem>
            <GridContainer>
              <GridItem className={classes.inviteContainer}>
                <H6 fontStyle="italic">
                  This person isn&#39;t connected to this tour yet. Want to
                </H6>
              </GridItem>
              <GridItem className={classes.inviteContainer}>
                {this.renderPopperPaper()}
              </GridItem>
            </GridContainer>
          </GridItem>
        )}
      </React.Fragment>
    );
    return (
      <React.Fragment>
        <GridItem>{this.renderPart(Name, variant)}</GridItem>
        {this.canExecuteParticipant() && knownAs}
        {accessLevel === PARTICIPANT_ACCESS_LEVELS.full &&
          this.renderPart(PersonType, variant, {
            nodeId: templateId,
          })}
        {this.renderPart(Phone, variant, {
          readOnly: accessLevel !== PARTICIPANT_ACCESS_LEVELS.full,
        })}
        {email}
      </React.Fragment>
    );
  };

  renderEditable = (variant = VARIANTS.EDITABLE) => () => {
    const {
      readOnlyStatus,
      accessLevel,
      status,
      /* templateId,
      me,
      userId, */
    } = this.props;
    return (
      <GridContainer>
        <GridItem xs={12} md={6}>
          <GridContainer direction="column">
            <GridItem>
              <GridContainer direction="column" card>
                {this.renderPersonNameEditables(variant)}
                <GridItem>{this.renderPart(Gender, variant)}</GridItem>
                {accessLevel === PARTICIPANT_ACCESS_LEVELS.full &&
                  this.renderPart(DateOfBirth, variant)}
                {accessLevel === PARTICIPANT_ACCESS_LEVELS.full &&
                  this.renderPart(AgeType, variant)}
                {accessLevel === PARTICIPANT_ACCESS_LEVELS.full &&
                  this.renderPart(HonorificTitle, variant)}
              </GridContainer>
            </GridItem>
            <GridItem>
              <GridContainer direction="column" card>
                {accessLevel === PARTICIPANT_ACCESS_LEVELS.full &&
                  this.renderPart(Passport, variant)}
                {accessLevel === PARTICIPANT_ACCESS_LEVELS.full &&
                  this.renderPart(Insurance, variant)}
                {accessLevel === PARTICIPANT_ACCESS_LEVELS.full &&
                  this.renderPart(Comment, variant)}
                {readOnlyStatus &&
                  this.canExecuteParticipant() &&
                  this.renderPart(Status, variant, {
                    readOnly: readOnlyStatus,
                  })}
              </GridContainer>
            </GridItem>
          </GridContainer>
        </GridItem>
        {accessLevel === PARTICIPANT_ACCESS_LEVELS.full && (
          <GridItem xs={12} md={6}>
            <GridContainer direction="column">
              <GridItem>
                <GridContainer direction="column" card>
                  {this.renderPart(Medicals, variant)}
                </GridContainer>
              </GridItem>
              <GridItem>
                <GridContainer direction="column" card>
                  {this.renderPart(Dietaries, variant)}
                </GridContainer>
              </GridItem>
              <GridItem>
                <GridContainer direction="column" card>
                  {accessLevel === PARTICIPANT_ACCESS_LEVELS.full &&
                    status === CONFIRMED &&
                    this.renderPart(PaxRoom, variant)}
                  {accessLevel === PARTICIPANT_ACCESS_LEVELS.full && (
                    <GridItem>
                      {this.renderPart(TravelingWith, variant)}
                    </GridItem>
                  )}
                </GridContainer>
              </GridItem>
              <GridItem>
                <GridContainer direction="column" card>
                  {this.renderPart(Followers, variant, {
                    showUnlink: true,
                  })}
                </GridContainer>
              </GridItem>
              <GridItem>
                <GridContainer direction="column" card>
                  {this.renderPart(Forms, variant, { simple: false })}
                </GridContainer>
              </GridItem>
            </GridContainer>
          </GridItem>
        )}
      </GridContainer>
    );
  };

  renderRoomComponent = (variant, props) => {
    if (this.props.RoomComponent) {
      return this.props.RoomComponent;
    }
    return this.renderPart(PaxRoom, variant, props);
  };

  renderTravelWith = (variant, props) => {
    if (this.props.TravelGroupComponent) {
      return this.props.TravelGroupComponent;
    }
    return this.renderPart(TravelingWith, variant, props);
  };

  renderViewOnly = (variant = VARIANTS.EDITABLE) => () => {
    const { accessLevel, id, status, orgType } = this.props;
    return (
      <GridContainer>
        <GridItem xs={12} md={6}>
          <GridContainer direction="column">
            <GridItem>
              <GridContainer direction="column" card>
                <GridItem>
                  {this.renderPart(Name, variant, {
                    readOnly: true,
                  })}
                </GridItem>
                <GridItem>
                  {this.renderPart(PersonType, variant, {
                    nodeId: this.props.templateId,
                    readOnly: true,
                    oType: orgType,
                  })}
                </GridItem>
                <GridItem>
                  {this.renderPersonPart(PersonKnownAs, variant, {
                    readOnly: true,
                    nodeId: id,
                  })}
                </GridItem>
                <GridItem>
                  {this.renderPart(Gender, variant, {
                    readOnly: true,
                  })}
                </GridItem>
                <GridItem>
                  {this.renderPart(Phone, variant, {
                    readOnly: true,
                  })}
                </GridItem>
                <GridItem>
                  {this.renderPersonPart(PersonEmail, variant, {
                    nodeId: id,
                    readOnly: true,
                  })}
                </GridItem>
                {accessLevel === PARTICIPANT_ACCESS_LEVELS.full &&
                  this.renderPart(DateOfBirth, variant, {
                    readOnly: true,
                  })}
                {accessLevel === PARTICIPANT_ACCESS_LEVELS.full &&
                  this.renderPart(AgeType, variant, {
                    readOnly: true,
                  })}
                {accessLevel === PARTICIPANT_ACCESS_LEVELS.full &&
                  this.renderPart(HonorificTitle, variant, {
                    readOnly: true,
                  })}
              </GridContainer>
            </GridItem>
            <GridItem>
              <GridContainer direction="column" card>
                {accessLevel === PARTICIPANT_ACCESS_LEVELS.full &&
                  this.renderPart(Passport, variant, {
                    readOnly: true,
                  })}
                {accessLevel === PARTICIPANT_ACCESS_LEVELS.full &&
                  this.renderPart(Insurance, variant, {
                    readOnly: true,
                  })}
                {this.canExecuteParticipant() &&
                  this.renderPart(Status, variant, {
                    readOnly: true,
                  })}
              </GridContainer>
            </GridItem>
          </GridContainer>
        </GridItem>
        {accessLevel === PARTICIPANT_ACCESS_LEVELS.full && (
          <GridItem xs={12} md={6}>
            <GridContainer direction="column">
              <GridItem>
                <GridContainer direction="column" card>
                  {this.renderPart(Medicals, variant, {
                    readOnly: true,
                  })}
                </GridContainer>
              </GridItem>
              <GridItem>
                <GridContainer direction="column" card>
                  {this.renderPart(Dietaries, variant, {
                    readOnly: true,
                  })}
                </GridContainer>
              </GridItem>
              <GridItem>
                <GridContainer direction="column" card>
                  {accessLevel === PARTICIPANT_ACCESS_LEVELS.full &&
                    status === CONFIRMED &&
                    this.renderRoomComponent(variant, {
                      readOnly: true,
                    })}
                  {accessLevel === PARTICIPANT_ACCESS_LEVELS.full &&
                    this.renderTravelWith(variant, {
                      readOnly: true,
                    })}
                </GridContainer>
              </GridItem>
              <GridItem>
                <GridContainer direction="column" card>
                  {this.renderPart(Forms, variant, { readOnly: true })}
                </GridContainer>
              </GridItem>
            </GridContainer>
          </GridItem>
        )}
      </GridContainer>
    );
  };

  renderLastAccess = ({ userId }) => {
    const { userConnected } = this.props;

    if (!userConnected) return null;

    return (
      <GridItem>
        <GridContainer alignItems="center">
          <Hidden xsDown>
            <GridItem>
              <H6 dense>{THE_BIG_DOT}</H6>
            </GridItem>
          </Hidden>
          <GridItem>
            <H6 dense>
              {this.renderPart(LastAccessAt, TEXT_WITH_LABEL, {
                id: userId,
                showNoAccessPlaceHolder: true,
              })}
            </H6>
          </GridItem>
        </GridContainer>
      </GridItem>
    );
  };

  renderRowTitle = (value, userId) => {
    const { heading } = this.props;

    const Typography = heading ? H4 : P;
    const weight = 'bold';
    const title = userId
      ? undefined
      : 'This participant is not yet connected to someone registered on uGroop.';
    return (
      <Typography dense weight={weight} title={title} color="primary">
        {value}
      </Typography>
    );
  };

  renderRowSubtitle = value => <H6 dense>{value}</H6>;

  isFromRyi = () => !this.props.createdBy;

  renderCreatedAt = () => (
    <GridItem>
      <H6 dense>
        {
          <M
            {...LOGIC_HELPERS.ifElse(
              this.isFromRyi(),
              m.subheadingPrefix,
              m.subheadingPrefixFromTour,
            )}
            values={{
              date: this.renderPart(CreatedAt, DEFAULT, { showFromNow: true }),
            }}
          />
        }
      </H6>
    </GridItem>
  );

  renderSubtitle = variant => {
    const { onRenderRowSubtitle } = this.props;
    if (onRenderRowSubtitle) return onRenderRowSubtitle();
    return this.renderPart(PersonType, variant, {
      renderValue: this.renderRowSubtitle,
      renderDot: true,
      typeOnly: true,
    });
  };

  renderAttachmentRowTail = () => {
    const { id, showUpload } = this.props;
    return (
      showUpload && (
        <GridItem>
          <UploadZone id={id} compact />
        </GridItem>
      )
    );
  };

  renderMoveButton = variant => {
    const {
      id,
      canMove,
      templateId,
      parentId,
      selectedFollowerId,
    } = this.props;
    const { dialogUnlinkOpen, dialogOpen } = this.state;
    const open = LOGIC_HELPERS.ifElse(
      variant === VARIANTS.UNLINK,
      dialogUnlinkOpen,
      dialogOpen,
    );
    const openFn = LOGIC_HELPERS.ifElse(
      variant === VARIANTS.UNLINK,
      this.openUnlinkDialog,
      this.openMoveDialog,
    );
    return (
      canMove && (
        <GridItem>
          <MoveButton
            openDialog={openFn}
            templateId={templateId}
            parentId={parentId}
            variant={variant}
          />
          <MoveDialog
            participantId={id}
            open={open}
            closeMoveDialog={this.closeMoveDialog}
            confirmMove={this.handleConfirmMove}
            fromId={parentId}
            toId={selectedFollowerId}
            variant={variant}
          />
        </GridItem>
      )
    );
  };

  renderLink = () => {
    const {
      id,
      templateId,
      parentId,
      selectedFollowerId,
      parentType,
    } = this.props;

    return (
      parentType !== INTERESTED_PERSON && (
        <GridItem>
          <MoveButton
            openDialog={this.openLinkDialog}
            templateId={templateId}
            parentId={parentId}
            variant={LINK}
          />
          <MoveDialog
            participantId={id}
            open={this.state.dialoglinkOpen}
            closeMoveDialog={this.closeMoveDialog}
            confirmMove={this.handleConfirmMove}
            fromId={parentId}
            toId={selectedFollowerId}
            variant={LINK}
          />
        </GridItem>
      )
    );
  };

  renderRowTail = () => {
    const { onRenderRowTail, readOnlyStatus, classes } = this.props;

    if (onRenderRowTail !== null) {
      return onRenderRowTail();
    }

    return this.renderPart(Status, VARIANTS.EDITABLE, {
      showLabel: false,
      readOnly: readOnlyStatus,
      customSelectClass: classes.trail,
    });
  };

  renderRowForms = () =>
    this.renderPart(Forms, VARIANTS.EDITABLE, {
      compact: true,
      iconPadding: true,
      separator: true,
    });

  renderRowConditions = () => {
    const { accessLevel } = this.props;
    return (
      accessLevel === PARTICIPANT_ACCESS_LEVELS.full && (
        <React.Fragment>
          {this.renderPart(Medicals, VARIANTS.ICON)}
          {this.renderPart(Dietaries, VARIANTS.ICON)}
          {this.renderPart(Passport, VARIANTS.ICON)}
        </React.Fragment>
      )
    );
  };

  renderRoomingWith = () => {
    const { rooms, templateId, id } = this.props;
    const roomId = first(rooms);
    if (!roomId)
      return (
        <JText md italic gray textCenter>
          No room allocated yet
        </JText>
      );
    return (
      <Room
        id={roomId}
        parentNodeId={templateId}
        participantId={id}
        variant={VARIANTS.CARD_ITEM}
        showFullPaxdetail
      />
    );
  };

  // HACK: Add nested function so it re-renders on role removal while list dialog is open
  renderRowAvatarWithClassName = () => className => {
    const { personEmail, tourName } = this.props;
    return this.renderPart(Name, VARIANTS.AVATAR, {
      className,
      PersonAvatarProps: {
        showAvatarDetails: this.state.anchorEl === null,
        personEmail,
        emailSubjectLink: tourName,
      },
      tooltipText: this.renderTextOnly(),
    });
  };

  renderRowAvatar = () => {
    const { id, accessLevel } = this.props;
    if (accessLevel === PARTICIPANT_ACCESS_LEVELS.full) {
      return (
        <ConditionsBorderStyle id={id}>
          {this.renderRowAvatarWithClassName()}
        </ConditionsBorderStyle>
      );
    }
    return this.renderRowAvatarWithClassName()();
  };

  renderPersonType = (renderDot = false) => value => {
    const { variant, templateId, classes } = this.props;

    return (
      value && (
        <GridItem className={classes.personType}>
          <H6 dense>
            <GridContainer>
              {this.canExecuteParticipant() &&
                this.renderPart(PersonType, variant, {
                  nodeId: templateId,
                  variant: VARIANTS.TEXT_ONLY,
                  renderDot,
                })}
            </GridContainer>
          </H6>
        </GridItem>
      )
    );
  };

  renderRowContent = variant => {
    const { templateId, invitationPending, classes } = this.props;

    return (
      <GridItem xs>
        <Editable onClick={this.handleEditableClick}>
          <GridContainer alignItems="center" wrap="nowrap">
            <GridItem xs>
              <GridContainer direction="column" spacing={0}>
                <GridItem>
                  <GridContainer alignItems="baseline" wrap="nowrap">
                    <GridItem className={classes.itemName}>
                      <GridContainer
                        direction="row"
                        alignItems="center"
                        nowrap
                        spacing={0}
                        wrap="nowrap"
                      >
                        <GridItem>
                          {this.renderPart(Name, DEFAULT, {
                            renderValue: this.renderRowTitle,
                            boldFromNode: false,
                          })}
                        </GridItem>
                        <GridItem className={classes.marginKnownAs}>
                          {this.renderPersonPart(PersonKnownAs, variant, {
                            isMatchToName: true,
                          })}
                        </GridItem>
                      </GridContainer>
                    </GridItem>
                    {this.renderRowConditions()}
                  </GridContainer>
                </GridItem>
                <GridItem>
                  <Hidden smUp>
                    <GridContainer direction="column" spacing={0}>
                      {this.renderPart(PersonType, VARIANTS.RENDER_PROP, {
                        children: this.renderPersonType(),
                        nodeId: templateId,
                      })}
                      {!invitationPending && this.renderCreatedAt(variant)}
                      {this.renderPart(Name, VARIANTS.RENDER_PROP, {
                        children: this.renderLastAccess,
                      })}
                    </GridContainer>
                  </Hidden>
                  <Hidden xsDown>
                    <GridContainer alignItems="center" spacing={0}>
                      {this.renderPart(PersonType, VARIANTS.RENDER_PROP, {
                        children: this.renderPersonType(true),
                        nodeId: templateId,
                      })}
                      {this.renderCreatedAt(variant)}
                      {this.renderPart(Name, VARIANTS.RENDER_PROP, {
                        children: this.renderLastAccess,
                      })}
                    </GridContainer>
                  </Hidden>
                </GridItem>
              </GridContainer>
            </GridItem>
          </GridContainer>
        </Editable>
      </GridItem>
    );
  };

  renderInviteButton = () => {
    const { userConnected, invitationPending } = this.props;

    if (!userConnected && !invitationPending)
      return (
        <Hidden xsDown>
          <GridItem>{this.renderPart(InviteButton)}</GridItem>
        </Hidden>
      );

    return this.renderStatus(); // this.renderStatus();
  };

  renderRowSimpleContent = () => {
    const {
      classes,
      followers,
      parentParticipants,
      readOnlyStatus,
      handleEditableClick,
      templateId,
      invitationPending,
      variant,
      showSubDetail,
    } = this.props;
    const link = intersection(followers, parentParticipants);
    const hasLink = link.length > 0;
    const linkId = link[0];

    const relationship = LOGIC_HELPERS.ifElse(
      hasLink,
      <GridItem>
        <P dense>
          Relationship towards participant:{' '}
          <Span transform="capitalize" fontStyle="italic">
            <Relationship id={linkId} variant={VARIANTS.TEXT_ONLY} />
          </Span>
        </P>
      </GridItem>,
    );

    const subDetail = (
      <GridItem>
        <Hidden smUp>
          <GridContainer direction="column" spacing={0}>
            {this.renderPart(PersonType, VARIANTS.RENDER_PROP, {
              children: this.renderPersonType(),
              nodeId: templateId,
            })}
            {!invitationPending && this.renderCreatedAt(variant)}
            {this.renderPart(Name, VARIANTS.RENDER_PROP, {
              children: this.renderLastAccess,
            })}
          </GridContainer>
        </Hidden>
        <Hidden xsDown>
          <GridContainer alignItems="center" spacing={0}>
            {this.renderPart(PersonType, VARIANTS.RENDER_PROP, {
              children: this.renderPersonType(true),
              nodeId: templateId,
            })}
            {this.renderCreatedAt(variant)}
            {this.renderPart(Name, VARIANTS.RENDER_PROP, {
              children: this.renderLastAccess,
            })}
          </GridContainer>
        </Hidden>
      </GridItem>
    );

    return (
      <GridItem xs>
        <Editable
          readOnly={readOnlyStatus}
          onClick={
            isFunction(handleEditableClick)
              ? handleEditableClick
              : this.handleEditableClick
          }
        >
          <GridContainer alignItems="center" wrap="nowrap">
            <GridItem xs>
              <GridContainer direction="column" spacing={0}>
                <GridItem>
                  <GridContainer alignItems="baseline" wrap="nowrap">
                    <GridItem className={classes.itemName}>
                      {this.renderPart(Name, DEFAULT, {
                        renderValue: this.renderRowTitle,
                        boldFromNode: false,
                      })}
                    </GridItem>
                    {this.renderRowConditions()}
                  </GridContainer>
                </GridItem>
                {showSubDetail && subDetail}
                {showSubDetail && relationship}
              </GridContainer>
            </GridItem>
          </GridContainer>
        </Editable>
      </GridItem>
    );
  };

  renderRowSimple = () => {
    const { showAvatar } = this.props;

    return (
      <GridItem>
        <PeopleListRow>
          <GridContainer alignItems="center" spacing={2}>
            {showAvatar && <GridItem>{this.renderRowAvatar()}</GridItem>}
            {this.renderRowSimpleContent(VARIANTS.TEXT_ONLY)}
          </GridContainer>
        </PeopleListRow>
      </GridItem>
    );
  };

  renderToolTipTitleFollower = () => {
    const { classes } = this.props;
    return (
      <div className={classes.toolTipTitle}>{ADD_FOLLOWER_TOOLTIP_MSG}</div>
    );
  };

  renderAddFollower = () => (
    <GridItem>
      <Button
        variant={VARIANTS.INLINE}
        color="primary"
        size="small"
        onClick={this.handleOpenFollowerDialog}
        tooltipProps={{
          title: this.renderToolTipTitleFollower(),
        }}
      >
        <H5 dense primary weight="bold">
          <M {...m.addFollower} />
        </H5>
      </Button>
    </GridItem>
  );

  handleOpenFollowerDialog = () => {
    const { id } = this.props;
    this.props.resaga.setValue({
      interestedPersonCreateOpen: true,
      interestedPersonCreateParticipantId: id,
    });
  };

  renderRow = (variant = VARIANTS.TEXT_ONLY) => () => {
    const {
      layout,
      id,
      showDetails,
      showAvatar,
      classes,
      hideRenderRowTail,
      accessLevel,
      hideInviteButton,
      templateId,
      followers,
      oldFollowerId,
      roomOccupants,
      rowClassName,
      userId,
      me,
      noanimate,
    } = this.props;

    const { showForms, showRoomingWith } = this.state;
    const detailed = layout === DETAILED_VIEW || showDetails;
    const roomCount = LOGIC_HELPERS.ifElse(
      !Array.isArray(roomOccupants) || !roomOccupants.length,
      0,
      roomOccupants.length - 1,
    );

    const tail = LOGIC_HELPERS.ifElse(
      hideRenderRowTail || accessLevel !== PARTICIPANT_ACCESS_LEVELS.full,
      null,
      <GridItem>
        <GridContainer direction="column" spacing={0}>
          {this.renderRowTail()}
        </GridContainer>
      </GridItem>,
    );
    const inviteButton = LOGIC_HELPERS.ifElse(
      hideInviteButton || accessLevel !== PARTICIPANT_ACCESS_LEVELS.full,
      null,
      this.renderInviteButton(),
    );

    const addFollower = LOGIC_HELPERS.ifElse(
      accessLevel !== PARTICIPANT_ACCESS_LEVELS.full,
      null,
      this.renderAddFollower(),
    );

    const linkedFollowers = LOGIC_HELPERS.ifElse(
      followers.length > 0 || oldFollowerId > 0,
      <GridItem>
        <GridContainer alignItems="flex-start" spacing={2}>
          <GridItem xs>
            {/* <HRWithText
              x2MarginTopBottom
              noFontSize
              content={
                <JText sm bold>
                  Followers
                </JText>
              }
              halfPadding
            /> */}
            <List
              id={id}
              indentLeft
              templateId={templateId}
              userId={me}
              participantUserId={userId}
            />
          </GridItem>
        </GridContainer>
      </GridItem>,
      null,
    );

    const renderDetails = LOGIC_HELPERS.ifElse(
      detailed,
      <>
        <GridItem>
          <GridContainer alignItems="flex-start" spacing={2}>
            <GridItem className={classes.blankSpace} />
            <GridItem xs>
              <GridContainer>
                <GridItem xs={12} md={6}>
                  {this.renderPart(Gender, VARIANTS.ROW)}
                </GridItem>
                <GridItem xs={12} md={6}>
                  {this.renderPart(Phone, VARIANTS.ROW)}
                </GridItem>
                <GridItem xs={12} md={6}>
                  {this.renderPersonPart(PersonEmail, VARIANTS.ROW, {
                    nodeId: id,
                    templateId,
                  })}
                </GridItem>
                <GridItem xs={12} md={6}>
                  {this.renderPart(Passport, VARIANTS.ROW)}
                </GridItem>
                <GridItem xs={12} md={6}>
                  {this.renderPart(DateOfBirth, VARIANTS.ROW, {
                    showAge: true,
                  })}
                </GridItem>
                <GridItem xs={12} md={6}>
                  {this.renderPart(Insurance, VARIANTS.ROW)}
                </GridItem>
              </GridContainer>
            </GridItem>
            <GridItem xs={2} />
          </GridContainer>
        </GridItem>
        {linkedFollowers}
        <GridItem>
          <GridContainer>
            <GridItem xs={12} md={6}>
              <Hr half />
              {this.renderPart(Medicals, VARIANTS.ROW)}
            </GridItem>
            <GridItem xs={12} md={6}>
              <Hr half />
              {this.renderPart(Dietaries, VARIANTS.ROW)}
            </GridItem>
          </GridContainer>
        </GridItem>
        <GridItem>
          <GridContainer>
            <GridItem xs={12} md={12}>
              <Hr half />
              <GridContainer direction="column">
                <GridItem>
                  <GridContainer
                    direction="row"
                    alignItems="center"
                    wrap="nowrap"
                    className={classes.noWrap}
                  >
                    <GridItem>
                      <GridContainer alignItems="center">
                        <GridItem>
                          <Forms id={id} renderProp>
                            {this.renderFormCount(showForms)}
                          </Forms>
                        </GridItem>
                      </GridContainer>
                    </GridItem>
                    {this.canExecuteParticipant() && (
                      <GridItem>{this.renderAttachmentRowTail()}</GridItem>
                    )}
                  </GridContainer>
                </GridItem>
                {showForms && this.renderRowForms()}
              </GridContainer>
            </GridItem>
          </GridContainer>
        </GridItem>
        <GridItem>
          <GridContainer direction="column">
            <GridItem className={classes.iconContainer}>
              <GridContainer onClick={this.onToggleRoomingWith}>
                <GridItem>
                  <JText bold spacing2 sm gray uppercase>
                    Rooming with ({roomCount})
                  </JText>
                </GridItem>
                <GridItem>
                  <NewIcon
                    icon={LOGIC_HELPERS.ifElse(
                      showRoomingWith,
                      'chevron-down',
                      'chevron-up',
                    )}
                    size="extraSmall"
                  />
                </GridItem>
              </GridContainer>
            </GridItem>
            <GridItem>{showRoomingWith && this.renderRoomingWith()}</GridItem>
          </GridContainer>
        </GridItem>
      </>,
      <>{linkedFollowers}</>,
    );

    const content = (
      <GridItem className={rowClassName}>
        <PeopleListRow>
          <GridContainer direction="column" wrap="nowrap" card cardPadding={1}>
            <GridItem>
              <GridContainer alignItems="center" spacing={2}>
                {showAvatar && <GridItem>{this.renderRowAvatar()}</GridItem>}
                {this.renderRowContent(variant)}
                {tail}
                {addFollower}
                {inviteButton}
              </GridContainer>
            </GridItem>
            {this.canExecuteParticipant() && renderDetails}
          </GridContainer>
        </PeopleListRow>
      </GridItem>
    );

    if (noanimate) return content;

    return (
      <Grow in={this.state.show} timeout={ANIMATION_TIMEOUT / 2}>
        {content}
      </Grow>
    );
  };

  renderFormCount = showForms => ({ values }) => {
    const { classes } = this.props;
    return (
      <GridItem className={classes.iconContainer}>
        <GridContainer
          onClick={this.onCheckboxClick}
          wrap="nowrap"
          className={classes.noWrap}
        >
          <GridItem>
            <JText bold spacing2 sm gray uppercase>
              Forms ({values.length})
            </JText>
          </GridItem>
          <GridItem>
            <NewIcon
              icon={LOGIC_HELPERS.ifElse(
                showForms,
                'chevron-down',
                'chevron-up',
              )}
              size="extraSmall"
            />
          </GridItem>
        </GridContainer>
      </GridItem>
    );
  };

  renderTextOnlyNameValue = value => (
    <H5 dense weight="bold">
      {value}
    </H5>
  );

  renderTextOnly = (variant = VARIANTS.TEXT_ONLY) => () => {
    const { accessLevel } = this.props;
    return (
      <GridContainer direction="column">
        <GridItem>
          {this.renderPart(Name, variant, {
            renderValue: this.renderTextOnlyNameValue,
          })}
        </GridItem>
        {accessLevel === PARTICIPANT_ACCESS_LEVELS.full && (
          <React.Fragment>
            {this.renderPart(Medicals, variant)}
            {this.renderPart(Dietaries, variant)}
          </React.Fragment>
        )}
      </GridContainer>
    );
  };

  renderTableRow = () => {
    const { classes, smDown } = this.props;

    // Is Mobile
    if (smDown) {
      return (
        <React.Fragment>
          <TableCell
            className={classnames(
              classes.tableCellPadding,
              classes.cellContent,
            )}
          >
            <GridContainer direction="column" spacing={0}>
              <GridItem>
                {this.renderPart(HonorificTitle, DEFAULT, {
                  variant: VARIANTS.TEXT_ONLY,
                })}
              </GridItem>
              <GridItem>
                {this.renderPart(Name, DEFAULT, {
                  boldFromNode: false,
                })}
              </GridItem>
              <GridItem>
                {this.renderPart(AgeType, DEFAULT, {
                  variant: VARIANTS.TEXT_ONLY,
                })}
              </GridItem>
            </GridContainer>
          </TableCell>
        </React.Fragment>
      );
    }
    return (
      <React.Fragment>
        <TableCell
          className={classnames(classes.tableCellPadding, classes.cellContent)}
        >
          {this.renderPart(HonorificTitle, DEFAULT, {
            variant: VARIANTS.TEXT_ONLY,
          })}
        </TableCell>
        <TableCell
          className={classnames(classes.tableCellPadding, classes.cellContent)}
        >
          {this.renderPart(Name, DEFAULT, {
            boldFromNode: false,
          })}
        </TableCell>
        <TableCell
          className={classnames(classes.tableCellPadding, classes.cellContent)}
        >
          {this.renderPart(AgeType, DEFAULT, {
            variant: VARIANTS.TEXT_ONLY,
          })}
        </TableCell>
      </React.Fragment>
    );
  };

  renderLogic = (variant = VARIANTS.LOGIC) => () => (
    <React.Fragment>
      {this.renderPart(Medicals, variant)}
      {this.renderPart(Dietaries, variant)}
    </React.Fragment>
  );

  render = () => {
    const { variant } = this.props;
    return LOGIC_HELPERS.switchCase(variant, {
      [VARIANTS.FORM]: this.renderForm(),
      [VARIANTS.EDITABLE]: this.renderEditable(),
      [VARIANTS.TEXT_ONLY]: this.renderTextOnly(),
      [VARIANTS.LOGIC]: this.renderLogic(),
      [VARIANTS.ROW_SIMPLE]: this.renderRowSimple,
      [VARIANTS.AVATAR_ONLY]: this.renderRowAvatar,
      [VARIANTS.TABLE]: this.renderTableRow,
      [VARIANTS.VIEW]: this.renderViewOnly(),
      [DEFAULT]: this.renderRow(),
    });
  };
}

Participant.propTypes = {
  // hoc
  resaga: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,

  // parent
  rowClassName: PropTypes.string,

  // resaga
  createdBy: PropTypes.number,
  linkedUserId: PropTypes.number,
  followers: PropTypes.array,
  parentParticipants: PropTypes.array,
  // parent
  id: PropTypes.number,
  templateId: PropTypes.number,
  variant: PropTypes.string,
  personEmail: PropTypes.string,
  nodeType: PropTypes.string,
  children: PropTypes.any,
  heading: PropTypes.bool,
  userConnected: PropTypes.bool,
  showAvatar: PropTypes.bool,
  showUpload: PropTypes.bool,
  invitationPending: PropTypes.bool,
  mode: PropTypes.string,
  noName: PropTypes.bool,
  onRenderRowSubtitle: PropTypes.func,
  onRenderRowTail: PropTypes.func,
  accessLevel: PropTypes.string,
  isPublic: PropTypes.bool,
  readOnlyStatus: PropTypes.bool,
  canMove: PropTypes.bool,
  parentId: PropTypes.number,
  selectedFollowerId: PropTypes.number,
  complexView: PropTypes.bool,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  dateOfBirth: PropTypes.string,
  hideRenderRowTail: PropTypes.bool,
  hasNoLink: PropTypes.bool,
  hideInviteButton: PropTypes.bool,
  withRelationshipField: PropTypes.bool,
  index: PropTypes.number,

  personId: PropTypes.number,
  personType: PropTypes.string,
  userId: PropTypes.number,
  layout: PropTypes.string,
  typeOnly: PropTypes.bool,
  showDetails: PropTypes.bool,
  parentType: PropTypes.string,
  participantEmail: PropTypes.string,
  shareToken: PropTypes.string,
  handleEditableClick: PropTypes.func,
  showSubDetail: PropTypes.bool,
  smDown: PropTypes.bool,
  status: PropTypes.string,
  groups: PropTypes.array,
  oldFollowerId: PropTypes.number,
  isEmptyInterestLevel: PropTypes.bool,
  isEmptySelfTravel: PropTypes.bool,
  isEmptyParticipantStatus: PropTypes.bool,
  isRequired: PropTypes.bool,
  travelWith: PropTypes.array,
  rooms: PropTypes.array,
  roomOccupants: PropTypes.array,
  travelWithContent: PropTypes.string,
  currentEmailValue: PropTypes.string,
  isRYI: PropTypes.bool,
  tourName: PropTypes.string,
  roles: PropTypes.string,
  me: PropTypes.number,
  noanimate: PropTypes.bool,
  RoomComponent: PropTypes.node,
  TravelGroupComponent: PropTypes.node,
  orgType: PropTypes.string,
};

Participant.defaultProps = {
  id: null,
  variant: null,
  children: null,
  heading: false,
  showAvatar: true,
  showUpload: true,
  mode: 'personType',
  noName: false,
  onRenderRowSubtitle: null,
  onRenderRowTail: null,
  accessLevel: PARTICIPANT_ACCESS_LEVELS.full,
  isPublic: false,
  readOnlyStatus: false,
  canMove: false,
  selectedFollowerId: 0,
  complexView: true,
  hideRenderRowTail: false,
  hasNoLink: false,
  hideInviteButton: false,
  index: 0,
  rowClassName: '',

  personId: null,
  personType: null,
  followers: [],
  parentParticipants: [],
  withRelationshipField: false,
  showSubDetail: true,
  groups: [],
  isEmptyInterestLevel: false,
  isEmptySelfTravel: false,
  isEmptyParticipantStatus: false,
  isRequired: false,
  travelWith: [],
  rooms: [],
  roomOccupants: [],
  currentEmailValue: null,
  isRYI: false,
  RoomComponent: null,
  TravelGroupComponent: null,
};

export default compose(
  withStyles(styles, { name: 'ParticipantNode' }),
  selectLinkedUserData({ nodeIdProp: 'id', roles: [PARTICIPANT_LINKEE] }), // TODO: Filter by role
  resaga(CONFIG_PARENT),
  resaga(CONFIG),
  resaga(CONFIG_3),
  withSMDown,
)(Participant);
