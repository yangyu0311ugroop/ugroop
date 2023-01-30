import { DO_NOTHING, MENU_ITEM } from 'appConstants';
import Dialog from 'components/Dialog';
import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import { FormattedMessage as M } from 'react-intl';
import DialogContent from 'components/Dialog/UGDialogContent';
import DialogTitle from 'components/Dialog/UGDialogTitle';
import DialogActions from 'components/Dialog/UGDialogAction';
import { Title, CloseButton } from 'ugcomponents/DialogForm/Complex';
import { Can } from 'apis/components/Ability/components/Can';
import { NODE_SHARE } from 'utils/modelConstants';
import { ORG_MEMBER } from 'datastore/invitationStore/constants';
import Button from 'viewComponents/Button';
import Icon from 'viewComponents/Icon';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { Hidden } from 'components/material-ui/index';
import OrgMenu from 'smartComponents/Person/components/OrgRoles';
import m from './messages';
import InviteByEmail from './components/InviteByEmail';
import Tabs from './components/Tabs';
import People from './components/People';
import { CONFIG, USER_ID_CONFIG } from './config';
import styles from './styles';

export class ShareList extends PureComponent {
  state = {
    inviteFromOrg: false,
    inviting: false,
  };

  componentWillMount = () => {
    const { classes } = this.props;

    this.dialogClasses = { paper: classes.paper };
  };

  handleClose = () => {
    const { onClose } = this.props;

    this.props.resaga.setValue({ showOrgInvite: false, selectedOrgId: null });
    this.setState({ inviteFromOrg: false });

    if (onClose) return onClose();

    return DO_NOTHING;
  };

  orgMenuClick = id => () => this.props.resaga.setValue({ selectedOrgId: id });

  inviteFromOrg = value => () => {
    // const { inviteFromOrg } = this.state;
    this.setState({ inviteFromOrg: !value, inviting: true });
    this.props.resaga.setValue({
      inviteeId: null,
      inviteeToken: '',
      inviteeEmail: null,
      currentProcessId: null,
    });
  };

  renderTitle = () => (
    <React.Fragment>
      <Title
        heading={<M {...m.header} />}
        headingBackground={<M {...m.headerBackground} />}
      />
      <CloseButton onClick={this.handleClose} />
    </React.Fragment>
  );

  renderInvite = () => {
    const { id } = this.props;
    const { inviteFromOrg } = this.state;
    return (
      <GridItem>
        {!inviteFromOrg && <InviteByEmail id={id} />}
        {inviteFromOrg && this.renderContent('orgMember', false)}
      </GridItem>
    );
  };

  renderInviteTypeButton = inviteFromOrg => {
    const { classes } = this.props;
    return (
      <GridItem>
        <Button
          dense
          size="xs"
          variant="inline"
          onClick={this.inviteFromOrg(inviteFromOrg)}
          noPadding
          noMargin
          className={classes.button}
        >
          <Icon
            color="blue"
            icon={LOGIC_HELPERS.ifElse(
              inviteFromOrg,
              'lnr-inbox',
              'lnr-users-plus',
            )}
            className={classes.icon}
          />
          {LOGIC_HELPERS.ifElse(
            inviteFromOrg,
            'Invite someone by email',
            'Invite someone already in your organisation',
          )}
        </Button>
      </GridItem>
    );
  };

  getSelectedOrgId = () => this.props.selectedOrgId || this.props.orgId;

  renderMobile = () => {
    const { inviting, inviteFromOrg } = this.state;
    const { orgUserIds } = this.props;
    if (!orgUserIds.length && !inviting)
      return this.renderInviteTypeButton(true);
    if (!orgUserIds.length) return null;
    if (!inviting) {
      return (
        <React.Fragment>
          {this.renderInviteTypeButton(true)}
          {this.renderInviteTypeButton(false)}
        </React.Fragment>
      );
    }
    return (
      <React.Fragment>
        {this.renderInviteTypeButton(inviteFromOrg)}
      </React.Fragment>
    );
  };

  hideActions = () => this.props.shareListFilter === ORG_MEMBER;

  renderActions = () => {
    const { inviting } = this.state;
    if (this.hideActions()) return null;
    return (
      <GridContainer direction="column">
        <Can do="create" on={NODE_SHARE}>
          <React.Fragment>
            <Hidden xsDown>{this.renderInvite()}</Hidden>
            <Hidden smUp>{inviting && this.renderInvite()}</Hidden>
          </React.Fragment>
        </Can>
      </GridContainer>
    );
  };

  renderActionHeader = () => {
    const { classes, orgUserIds } = this.props;
    const { inviteFromOrg } = this.state;
    if (this.hideActions()) return null;
    return (
      <Can do="create" on={NODE_SHARE}>
        <DialogActions disableActionSpacing className={classes.typeBtn}>
          <GridContainer direction="column">
            <React.Fragment>
              <Hidden xsDown>
                {orgUserIds.length &&
                  this.renderInviteTypeButton(inviteFromOrg)}
              </Hidden>
              <Hidden smUp>{this.renderMobile()}</Hidden>
            </React.Fragment>
          </GridContainer>
        </DialogActions>
      </Can>
    );
  };

  renderOrgMenu = (hasBorder = false) => {
    const { orgUserIds, classes } = this.props;
    return (
      <GridContainer
        direction="column"
        spacing={0}
        className={hasBorder && classes.hasBorder}
      >
        <Can do="create" on={NODE_SHARE}>
          <GridItem>
            <OrgMenu
              ids={orgUserIds}
              variant={MENU_ITEM}
              onClickMenu={this.orgMenuClick}
              orgId={this.getSelectedOrgId()}
            />
          </GridItem>
        </Can>
      </GridContainer>
    );
  };

  renderContent = (variant, showConnected = true) => {
    const { id, orgId, orgUserIds, shareListFilter } = this.props;
    return (
      <React.Fragment>
        {shareListFilter === ORG_MEMBER && this.renderOrgMenu(true)}
        <People
          id={id}
          orgId={orgId}
          orgUserIds={orgUserIds}
          variant={variant}
          showConnected={showConnected}
        />
      </React.Fragment>
    );
  };

  render = () => {
    const { classes, id, open, orgId } = this.props;
    const { inviteFromOrg } = this.state;
    return (
      <Dialog
        open={open}
        onClose={this.handleClose}
        classes={this.dialogClasses}
      >
        <DialogTitle noPaddingBottom>
          {this.renderTitle()}
          <Tabs id={id} orgId={orgId} />
        </DialogTitle>
        <DialogContent className={classes.content}>
          {this.renderContent()}
        </DialogContent>
        {this.renderActionHeader()}
        {!this.hideActions() && inviteFromOrg && (
          <DialogActions
            disableActionSpacing
            className={classes.orgMenu}
            noPaddingTop
          >
            {this.renderOrgMenu()}
          </DialogActions>
        )}
        <DialogActions disableActionSpacing>
          {this.renderActions()}
        </DialogActions>
      </Dialog>
    );
  };
}

ShareList.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,
  resaga: PropTypes.object.isRequired,

  // parent props
  id: PropTypes.number.isRequired, // template id
  open: PropTypes.bool,
  onClose: PropTypes.func,
  orgId: PropTypes.number,

  // resaga props
  shareListFilter: PropTypes.string,
  orgUserIds: PropTypes.array,
  selectedOrgId: PropTypes.number,
};

ShareList.defaultProps = {
  orgUserIds: [],
};

export default compose(
  withStyles(styles, { name: 'ShareList' }),
  resaga(USER_ID_CONFIG),
  resaga(CONFIG),
)(ShareList);
