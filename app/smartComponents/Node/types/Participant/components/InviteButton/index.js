import { NODE_API_HELPERS } from 'apis/components/Node/helpers';
import { PERSON_DETAIL_HELPER } from 'apis/components/PersonDetail/helpers';
import { GET_PERSON, TEMPLATE_API } from 'apis/constants';
import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import { withStyles } from '@material-ui/core/styles';
import { ClickAwayListener, Paper, Popper } from 'components/material-ui';
import InviteUser from 'containers/Templates/Modals/Participant/View/components/LinkedUser/components/InviteUser';
import FindUser from 'containers/Templates/Modals/Participant/View/components/LinkedUser/components/FindUser';
import { DATASTORE_UTILS } from 'datastore';
import { PERSON_PATHS } from 'datastore/personDataStore/constants';
import dotProp from 'dot-prop-immutable';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { FormattedMessage as M } from 'react-intl';
import { selectLinkedUserData } from 'smartComponents/Node/hoc';
import inputs from 'smartComponents/Node/types/Participant/inputs';
import { makeName } from 'utils/helpers/makeName';
import {
  PARTICIPANT,
  PARTICIPANT_LINKEE,
  TOUR_PARTICIPANT,
} from 'utils/modelConstants';
import Button from 'viewComponents/Button';
import { compose } from 'redux';
import resaga from 'resaga';
import { INVITE_TOOLTIP_MSG } from 'appConstants';
import Tooltip from 'viewComponents/Tooltip';
import { CONFIG, CONFIG_2 } from './config';
import m from './messages';
import styles from './styles';

export class InviteButton extends PureComponent {
  state = {
    anchorEl: null,
    loading: false,
  };

  findParticipant = s => s && s.role === PARTICIPANT;

  getFirstToken = shares => {
    const share = shares.find(this.findParticipant);
    return dotProp.get(share, 'notificationToken', null);
  };

  handleNodeUpdateSuccess = () => {
    this.setState({ loading: false });
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
    if (!email) {
      return this.setState({
        loading: false,
        anchorEl: target, // anchorEl ? null : target,
      });
    }
    this.setState({
      loading: true,
      anchorEl: anchorEl ? null : target,
    });

    return this.props.resaga.dispatchTo(TEMPLATE_API, GET_PERSON, {
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
    ev.stopPropagation();
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

  closePopper = () => {
    this.popperClose = this.setState({ anchorEl: null });
  };

  handlePopperClickAway = () => {
    this.setState({ anchorEl: null });
    this.props.resaga.setValue({
      linkedUserEmail: null,
    });
  };

  renderInviteUser = () => {
    const {
      id,
      templateId,
      participantEmail,
      linkedUserId,
      personId,
    } = this.props;

    if (participantEmail) {
      return (
        <InviteUser
          id={id}
          linkedUserId={linkedUserId}
          templateId={templateId}
          role={TOUR_PARTICIPANT}
          linkeeRole={PARTICIPANT_LINKEE}
          personEmail={participantEmail}
          onBack={this.handlePopperClickAway}
        />
      );
    }
    return (
      <FindUser
        id={id}
        linkedUserId={linkedUserId}
        templateId={templateId}
        role={TOUR_PARTICIPANT}
        linkeeRole={PARTICIPANT_LINKEE}
        personEmail={participantEmail}
        onBack={this.handlePopperClickAway}
        updatePerson
        personId={personId}
      />
    );
  };

  renderPopperPaperContent = () => {
    const { classes, isFetchPersonLoading } = this.props;
    const { loading } = this.state;
    return (
      <ClickAwayListener
        onClickAway={this.handlePopperClickAway}
        mouseEvent="onMouseDown"
      >
        <Paper className={classes.popperContainer}>
          {loading || isFetchPersonLoading ? (
            <div>Searching...</div>
          ) : (
            this.renderInviteUser()
          )}
        </Paper>
      </ClickAwayListener>
    );
  };

  renderToolTipTitle = () => {
    const { classes } = this.props;
    return <div className={classes.toolTipTitle}>{INVITE_TOOLTIP_MSG}</div>;
  };

  render = () => {
    const { classes, userConnected, invitationPending } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    const toolTipTitle = this.renderToolTipTitle();

    let btnLabel = <M {...m.label} />;
    if (userConnected) btnLabel = 'Connected';
    if (invitationPending) btnLabel = 'Pending';

    const handler =
      userConnected || invitationPending ? null : this.handleClick;

    return (
      <GridContainer className={classes.root}>
        <GridItem>
          <Tooltip title={toolTipTitle} isLight>
            <Button
              className={classes.btn}
              size="extraSmall"
              onClick={handler}
              disabled={userConnected || invitationPending}
              color="primary"
            >
              {btnLabel}
            </Button>
          </Tooltip>
        </GridItem>
        <Popper
          className={classes.popper}
          open={open}
          anchorEl={anchorEl}
          // placement="left-start"
          // placement="top-start"
          disablePortal
        >
          {this.renderPopperPaperContent()}
        </Popper>
      </GridContainer>
    );
  };
}

InviteButton.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,
  resaga: PropTypes.object.isRequired,

  // parent props
  id: PropTypes.number,
  templateId: PropTypes.number,

  // resaga props
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  email: PropTypes.string,
  dateOfBirth: PropTypes.string,
  personType: PropTypes.string,
  userConnected: PropTypes.bool,
  invitationPending: PropTypes.bool,
  userId: PropTypes.number,
  personEmail: PropTypes.string,
  personId: PropTypes.number,
  linkedUserId: PropTypes.number,
  participantEmail: PropTypes.string,
  isFetchPersonLoading: PropTypes.bool,
};

InviteButton.defaultProps = {};

export default compose(
  withStyles(styles, { name: 'InviteButton' }),
  selectLinkedUserData({ nodeIdProp: 'id', roles: [PARTICIPANT_LINKEE] }),
  resaga(CONFIG),
  resaga(CONFIG_2),
)(InviteButton);
