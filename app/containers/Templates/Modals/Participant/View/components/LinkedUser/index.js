import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import classNames from 'classnames';
import resaga from 'resaga';
import { FormattedMessage as M } from 'react-intl';
import { SIZE_CONSTANTS } from 'sizeConstants';
import { VARIANTS } from 'variantsConstants';
import { TOUR_CONNECTION_MODES } from 'datastore/templateManagementStore/selectors';
import {
  withStyles,
  Chip,
  Paper,
  Popper,
  ClickAwayListener,
} from 'components/material-ui';
import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import Icon from 'viewComponents/Icon';
import P from 'viewComponents/Typography';
import { Name } from 'smartComponents/Node/parts';
import FindUser from './components/FindUser';
import InviteUser from './components/InviteUser';
import m from './messages';
import style from './style';
import { CONFIG } from './config';

export class ParticipantViewLinkedUser extends React.PureComponent {
  state = {
    anchorEl: null,
    clickAway: true,
  };

  componentWillUnmount = () => {
    clearTimeout(this.popperClose);
  };

  getPopperContentComponent = () => {
    const { linkedUserPage } = this.props;
    switch (linkedUserPage) {
      case 'invite':
        return InviteUser;
      default:
        return FindUser;
    }
  };

  getAvatarProps = () => {
    if (!this.AvatarProps) {
      const { classes } = this.props;
      this.AvatarProps = {
        AvatarProps: {
          noTooltip: true,
          className: classes.avatar,
        },
      };
    }
    return this.AvatarProps;
  };

  closePopper = () => {
    // HACK: Delay so handleChipClick will act as a toggle
    this.popperClose = setTimeout(() => this.setState({ anchorEl: null }), 0);
  };

  openInvitationDetailDialog = () => {
    const { shareToken } = this.props;
    this.props.resaga.setValue({ invitationDetailOpen: shareToken });
  };

  openTourConnectionDialog = () => {
    const {
      templateId,
      userNodeUserId,
      userNodeUserNodeId,
      ownerId,
    } = this.props;
    const isOwner = userNodeUserId === ownerId;
    this.props.resaga.setValue({
      tourConnectionOpen: true,
      tourConnectionId: isOwner ? templateId : userNodeUserNodeId,
      tourConnectionMode: isOwner
        ? TOUR_CONNECTION_MODES.owner
        : TOUR_CONNECTION_MODES.userNode,
    });
  };

  handlePopperClickAway = () => {
    const { clickAway } = this.state;
    if (clickAway) {
      this.closePopper();
    }
  };

  handleChipClick = event => {
    const { invitationPending, userConnected } = this.props;
    const { anchorEl } = this.state;
    if (invitationPending) {
      this.openInvitationDetailDialog();
    } else if (userConnected) {
      this.openTourConnectionDialog();
    } else {
      this.setState({ anchorEl: anchorEl ? null : event.currentTarget });
    }
  };

  handleBack = Component => () => {
    switch (Component) {
      case InviteUser:
        return this.props.resaga.setValue({ linkedUserPage: null });
      default:
        return null;
    }
  };

  handleNext = Component => () => {
    const { onLink, linkedUserId } = this.props;
    switch (Component) {
      case FindUser:
        return this.props.resaga.setValue({ linkedUserPage: 'invite' });
      case InviteUser: {
        this.props.resaga.setValue({ linkedUser: {} });
        this.closePopper();
        return onLink(linkedUserId);
      }
      default:
        return null;
    }
  };

  handleSetClickAway = clickAway => {
    this.setState({ clickAway });
  };

  renderNodePart = (Component, variant, props = {}) => {
    const { id, userId, personId } = this.props;
    return (
      <Component
        id={id}
        userId={userId}
        personId={personId}
        variant={variant}
        {...props}
      />
    );
  };

  renderPopperContent = () => {
    const { classes, ...rest } = this.props;
    const Component = this.getPopperContentComponent();
    return (
      <ClickAwayListener
        onClickAway={this.handlePopperClickAway}
        mouseEvent="onMouseDown"
      >
        <Paper className={classes.popperContainer}>
          <Component
            onBack={this.handleBack(Component)}
            onNext={this.handleNext(Component)}
            onSetClickAway={this.handleSetClickAway}
            {...rest}
          />
        </Paper>
      </ClickAwayListener>
    );
  };

  renderPersonName = () => this.renderNodePart(Name, VARIANTS.TEXT_ONLY);

  renderChipLabelContent = () => {
    const {
      classes,
      invitationPending,
      userConnected,
      isCustomMaxWidth,
    } = this.props;
    const to = this.renderPersonName();
    if (invitationPending) {
      return (
        <React.Fragment>
          <GridItem>
            <P dense>
              <M {...m.invitePendingLabel} />
            </P>
          </GridItem>
          <GridItem />
          <GridItem>
            <Icon icon="lnr-ellipsis" size="extraSmall" />
          </GridItem>
        </React.Fragment>
      );
    }
    if (userConnected) {
      return (
        <React.Fragment>
          <GridItem className={isCustomMaxWidth && classes.customMaxWidth}>
            <P dense weight="bold">
              {to}
            </P>
          </GridItem>
          <GridItem />
          <GridItem>
            <Icon icon="lnr-ellipsis" size="extraSmall" />
          </GridItem>
        </React.Fragment>
      );
    }
    return (
      <React.Fragment>
        <GridItem className="j-text-ellipsis">
          <P dense fontStyle="italic">
            {to ? (
              <M {...m.inviteLabelWithName} values={{ to }} />
            ) : (
              <M {...m.inviteLabel} />
            )}
          </P>
        </GridItem>
        <GridItem>
          <Icon icon="lnr-chevron-down" size={SIZE_CONSTANTS.XXS} />
        </GridItem>
      </React.Fragment>
    );
  };

  renderChipLabel = () => (
    <GridContainer alignItems="flex-end" wrap="nowrap">
      {this.renderChipLabelContent()}
    </GridContainer>
  );

  renderChipAvatar = () =>
    this.renderNodePart(Name, VARIANTS.AVATAR, this.getAvatarProps());

  render = () => {
    const { classes, placement } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);
    return (
      <React.Fragment>
        <Chip
          className={classNames(classes.chip, open && classes.chipOpen)}
          avatar={this.renderChipAvatar()}
          label={this.renderChipLabel()}
          onClick={this.handleChipClick}
          placement="bottom-start"
        />
        <Popper
          className={classes.popper}
          open={open}
          anchorEl={anchorEl}
          placement={placement}
          disablePortal
        >
          {this.renderPopperContent()}
        </Popper>
      </React.Fragment>
    );
  };
}

ParticipantViewLinkedUser.propTypes = {
  // hoc
  classes: PropTypes.object.isRequired,
  resaga: PropTypes.object.isRequired,

  // parent
  id: PropTypes.number,
  templateId: PropTypes.number,
  role: PropTypes.string,
  linkeeRole: PropTypes.string,
  userId: PropTypes.number,
  personId: PropTypes.number,
  shareToken: PropTypes.string,
  userNodeId: PropTypes.number,
  invitationPending: PropTypes.bool,
  userConnected: PropTypes.bool,
  placement: PropTypes.string,
  onLink: PropTypes.func,

  // resaga value
  linkedUserPage: PropTypes.string,
  linkedUserId: PropTypes.number,
  linkedUserToken: PropTypes.string,
  userNodeUserId: PropTypes.number,
  userNodeUserNodeId: PropTypes.number,
  ownerId: PropTypes.number,
  isCustomMaxWidth: PropTypes.bool,
};

ParticipantViewLinkedUser.defaultProps = {
  id: null,
  templateId: null,
  role: null,
  linkeeRole: null,
  userId: null,
  personId: null,
  shareToken: null,
  userNodeId: null,
  invitationPending: false,
  userConnected: false,
  placement: 'bottom-end',
  onLink: () => {},

  linkedUserPage: null,
  linkedUserId: null,
  linkedUserToken: null,
  userNodeUserId: null,
  userNodeUserNodeId: null,
  ownerId: null,
  isCustomMaxWidth: false,
};

export default compose(
  withStyles(style, { name: 'Templates/Modals/Participant/View/LinkedUser' }),
  resaga(CONFIG),
)(ParticipantViewLinkedUser);
