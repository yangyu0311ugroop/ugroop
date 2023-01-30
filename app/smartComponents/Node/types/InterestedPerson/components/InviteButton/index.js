import { NODE_API_HELPERS } from 'apis/components/Node/helpers';
import { GET_PERSON, TEMPLATE_API } from 'apis/constants';
import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import { withStyles } from '@material-ui/core/styles';
import { ClickAwayListener, Paper, Popper } from 'components/material-ui';
import InviteUser from 'containers/Templates/Modals/Participant/View/components/LinkedUser/components/InviteUser';
import FindUser from 'containers/Templates/Modals/Participant/View/components/LinkedUser/components/FindUser';
import { DATASTORE_UTILS } from 'datastore';
import dotProp from 'dot-prop-immutable';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { FormattedMessage as M } from 'react-intl';
import { selectLinkedUserData } from 'smartComponents/Node/hoc';
import inputs from 'smartComponents/Node/types/Participant/inputs';
import {
  INTERESTED_PEOPLE,
  INTERESTED_LINKEE,
  TOUR_INTERESTED,
} from 'utils/modelConstants';
import Button from 'viewComponents/Button';
import { compose } from 'redux';
import resaga from 'resaga';
import { INVITE_TOOLTIP_MSG } from 'appConstants';
import Tooltip from 'viewComponents/Tooltip';
import classnames from 'classnames';
import { CONFIG, CONFIG_2 } from './config';
import m from './messages';
import styles from './styles';

export class InviteButton extends PureComponent {
  state = {
    anchorEl: null,
    loading: false,
  };

  findFollower = s => s && s.role === INTERESTED_PEOPLE;

  getFirstToken = shares => {
    const share = shares.find(this.findFollower);
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
        anchorEl: anchorEl ? null : target,
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
    const target = ev.currentTarget;
    return this.openPopper(target);
  };

  closePopper = () => {
    this.popperClose = this.setState({ anchorEl: null });
  };

  handlePopperClickAway = () => {
    this.setState({ anchorEl: null });
  };

  renderInviteUser = () => {
    const { id, templateId, linkedUserId, personEmail } = this.props;

    if (personEmail) {
      return (
        <InviteUser
          id={id}
          linkedUserId={linkedUserId}
          templateId={templateId}
          role={TOUR_INTERESTED}
          linkeeRole={INTERESTED_LINKEE}
          personEmail={personEmail}
          onBack={this.handlePopperClickAway}
        />
      );
    }
    return (
      <FindUser
        id={id}
        linkedUserId={linkedUserId}
        templateId={templateId}
        role={TOUR_INTERESTED}
        linkeeRole={INTERESTED_LINKEE}
        personEmail={personEmail}
        onBack={this.handlePopperClickAway}
      />
    );
  };

  renderPopperPaperContent = () => {
    const { classes } = this.props;
    const { loading } = this.state;
    return (
      <ClickAwayListener
        onClickAway={this.handlePopperClickAway}
        mouseEvent="onMouseDown"
      >
        <Paper className={classes.popperContainer}>
          {loading ? <div>Searching...</div> : this.renderInviteUser()}
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

    // if (!followerEmail && !personEmail) return null;
    // if ((invitationPending || userConnected) && !renderEmpty) return null;

    let btnLabel = <M {...m.label} />;
    if (userConnected) btnLabel = 'Connected';
    if (invitationPending) btnLabel = 'Pending';

    const handler =
      userConnected || invitationPending ? null : this.handleClick;

    const toolTipTitle = this.renderToolTipTitle();

    return (
      <GridContainer
        className={classnames(classes.root, classes.noWrap)}
        wrap="nowrap"
      >
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
          placement="left-start"
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
  followerEmail: PropTypes.string,
};

InviteButton.defaultProps = {};

export default compose(
  withStyles(styles, { name: 'InviteButton' }),
  selectLinkedUserData({ nodeIdProp: 'id', roles: [INTERESTED_LINKEE] }),
  resaga(CONFIG),
  resaga(CONFIG_2),
)(InviteButton);
