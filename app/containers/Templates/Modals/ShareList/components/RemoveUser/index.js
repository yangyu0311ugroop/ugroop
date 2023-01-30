import { ability } from 'apis/components/Ability/ability';
import { TOUR_ROLE_TYPES } from 'apis/components/Ability/roles';
import {
  TEMPLATE_API,
  REMOVE_USER_FROM_TOUR,
  ABILITY_API,
  FIND_MY_ABILITIES,
} from 'apis/constants';
import { URL_HELPERS, DEFAULT, DO_NOTHING } from 'appConstants';
import { DeleteConfirmationDialog } from 'ugcomponents/DialogPopup';
import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import Button from 'viewComponents/Button';
import { Name } from 'ugcomponents/Person';
import {
  NODE_SHARE,
  TOUR_PARTICIPANT,
  TOUR_INTERESTED,
} from 'utils/modelConstants';
import { FormattedMessage as M } from 'react-intl';
import { withRouter } from 'react-router-dom';
import { VARIANTS } from 'variantsConstants';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { TOUR_ROLES } from 'datastore/invitationStore/constants';
import { DATASTORE_UTILS } from 'datastore';
import KnownAs from 'smartComponents/Person/parts/KnownAs';
import { INVITATION_STORE_HOC } from 'datastore/invitationStore/hoc';

import { CONFIG, CONFIG2 } from './config';
import styles from './styles';
import m from './messages';

export class RemoveUser extends PureComponent {
  state = {
    openDialogOpen: false,
  };

  isOwner = () => this.props.me === this.props.createdBy;

  canDelete = () => ability.can('delete', NODE_SHARE) || this.iAm();

  removeUser = () => {
    const { nodeId, shareToUserId: userId, removeAll, role } = this.props;
    return this.props.resaga.dispatchTo(TEMPLATE_API, REMOVE_USER_FROM_TOUR, {
      payload: {
        id: nodeId,
        userId,
        data: {
          roleToRemove: role,
          removeAll,
        },
      },
      onSuccess: this.removeUserSuccess,
    });
  };

  updateAbility = () =>
    this.props.resaga.dispatchTo(ABILITY_API, FIND_MY_ABILITIES, {
      onSuccess: this.abilityUpdateSuccess,
    });

  abilityUpdateSuccess = () => {
    // make sure dialog are close
    this.hadleParentDialog();

    // Update ability
    this.props.resaga.setValue({ executeAbilityUpdate: true });
  };

  handCloseDialog = props => this.props.resaga.setValue(props);

  hadleParentDialog = () => {
    const {
      participantDialog,
      interestedDialog,
      role,
      closeDetailDlg,
    } = this.props;

    this.handCloseDialog({
      interestedDialog: LOGIC_HELPERS.ifElse(
        interestedDialog && role === TOUR_INTERESTED,
        ability.can('execute', TOUR_INTERESTED),
        interestedDialog,
      ),
      participantDialog: LOGIC_HELPERS.ifElse(
        participantDialog && role === TOUR_PARTICIPANT,
        ability.can('execute', TOUR_PARTICIPANT),
        participantDialog,
      ),
      closeRoleDialog: LOGIC_HELPERS.ifElse(
        closeDetailDlg,
        false,
        closeDetailDlg,
      ),
      shareDialog: false,
    });
  };

  removeUserConfirm = () => this.setState({ openDialogOpen: true });

  removeNode = () =>
    this.props.resaga.setValue({
      nodes: DATASTORE_UTILS.removeObjectById(this.props.nodeId),
    });

  removeUserSuccess = ({ hadRemovedInvite }) => {
    const {
      history,
      handleParentSuccess,
      closeDetailDlg,
      participantDialog,
      interestedDialog,
      role,
    } = this.props;

    this.props.resaga.setValue({
      removeUser: this.props.shareToUserId,
    });
    this.handCloseRemove();
    if (handleParentSuccess) handleParentSuccess();

    if (this.iAm() && !this.isOwner()) {
      if (!hadRemovedInvite) {
        this.updateAbility();
      } else {
        this.hadleParentDialog();
        DATASTORE_UTILS.removeObjectById(this.props.nodeId);

        this.removeNode();

        this.props.resaga.setValue({
          closeRoleDialog: false,
          participantDialog: false,
          interestedDialog: false,
        });
        this.handCloseDialog({
          closeRoleDialog: false,
          participantDialog: false,
          interestedDialog: false,
        });

        return history.push(URL_HELPERS.myTours(-1));
      }
    }

    if (closeDetailDlg) {
      this.props.resaga.setValue({
        closeRoleDialog: !closeDetailDlg,
      });
    }

    if (
      (participantDialog && role === TOUR_PARTICIPANT) ||
      (interestedDialog && role === TOUR_INTERESTED)
    ) {
      this.handCloseDialog({
        tourConnectionOpen: false,
        tourConnectionId: null,
      });
    }
    return DO_NOTHING;
  };

  iAm = () => this.props.shareToUserId === this.props.me;

  handCloseRemove = () => this.setState({ openDialogOpen: false });

  renderDeleteTitle = () =>
    this.iAm() ? (
      <M
        {...LOGIC_HELPERS.ifElse(
          this.isLastRole() || this.props.removeAll,
          m.titleMe,
          m.removedRoletitleMe,
        )}
        values={{
          role: TOUR_ROLES[this.props.role],
        }}
      />
    ) : (
      <M
        {...LOGIC_HELPERS.ifElse(
          this.isLastRole() || this.props.removeAll,
          m.title,
          m.removeRoletitle,
        )}
        values={{
          role: TOUR_ROLES[this.props.role],
        }}
      />
    );

  renderHeadline = () => {
    const { shareToUserId, role, removeAll } = this.props;
    const roleText = TOUR_ROLES[role];
    const meNote = LOGIC_HELPERS.ifElse(
      removeAll,
      m.headlineDeleteMe,
      m.headlineDeleteMeRole,
    );
    const others = LOGIC_HELPERS.ifElse(
      removeAll,
      m.headlineDelete,
      m.headlineDeleteRole,
    );
    return (
      <GridContainer spacing={0} direction="column" alignItems="center">
        <GridItem>
          {this.iAm() ? (
            <M {...meNote} values={{ roleText }} />
          ) : (
            <M {...others} values={{ roleText }} />
          )}
        </GridItem>
        {!this.iAm() && (
          <GridItem>
            <Name id={shareToUserId} />
          </GridItem>
        )}
      </GridContainer>
    );
  };

  renderText = () =>
    this.iAm() ? (
      <M
        {...LOGIC_HELPERS.ifElse(
          this.isLastRole() || this.props.removeAll,
          m.removeUserWarning,
          m.textMe,
        )}
        values={{
          role: TOUR_ROLES[this.props.role],
          personName: 'yourself',
          person: 'you',
          adj: 'that',
          final: 'to leave from the tour',
          toJoin:
            'To re-join the tour, you may need someone connected to the tour to invite you again ',
        }}
      />
    ) : (
      <M
        {...LOGIC_HELPERS.ifElse(
          this.isLastRole() || this.props.removeAll,
          m.removeUserWarning,
          m.text,
        )}
        values={{
          personName: (
            <KnownAs
              id={this.props.shareToUserId}
              variant={VARIANTS.TEXT_ONLY}
              component="b"
            />
          ),
          role: TOUR_ROLES[this.props.role],
          person: 'person',
          adj: 'the',
          final: 'to remove this person from the tour',
          toJoin: 'You need to invite the person again to re-join the tour ',
        }}
      />
    );

  isLastRole = () => this.props.userNodeIds.length === 1;

  renderConfirmRemoveUser = () => {
    const { openDialogOpen, sending } = this.state;

    return (
      <DeleteConfirmationDialog
        dialogTitle={this.renderDeleteTitle()}
        headlineTitle={this.renderHeadline()}
        headlineText={this.renderText()}
        confirmButton={
          this.iAm() ? (
            <M {...m.leaveTourText} />
          ) : (
            <M {...m.confirmRemoveText} />
          )
        }
        open={openDialogOpen}
        onCancel={this.handCloseRemove}
        onConfirm={this.removeUser}
        disabled={sending}
      />
    );
  };

  renderRemoveUser = () => {
    const canDelete = this.canDelete();

    const content = canDelete && (
      <div>
        <GridItem>
          <Button
            dense
            color="alert"
            loading={this.props.sending}
            onClick={this.removeUserConfirm}
            size="small"
          >
            {this.iAm() ? (
              <M {...m.leaveTourText} />
            ) : (
              <M {...m.removeUserText} />
            )}
          </Button>
        </GridItem>
      </div>
    );
    return content;
  };

  rendericon = () => (
    <React.Fragment>
      <GridItem>
        <Button
          iconButton
          dense
          variant={VARIANTS.OUTLINE}
          title="Remove Role?"
          icon="lnr-trash2"
          color="alert"
          size="extraSmall"
          square={false}
          disabled={this.props.sending}
          onClick={this.removeUserConfirm}
        />
      </GridItem>
      {this.renderConfirmRemoveUser()}
    </React.Fragment>
  );

  renderButton = () => (
    <React.Fragment>
      {!this.iAm() && this.renderRemoveUser()}
      {this.renderConfirmRemoveUser()}
    </React.Fragment>
  );

  render = () => {
    const { variant } = this.props;

    return LOGIC_HELPERS.switchCase(variant, {
      [VARIANTS.BUTTON]: this.renderButton,
      [VARIANTS.ICON]: this.rendericon,
      [DEFAULT]: this.renderButton,
    });
  };
}

RemoveUser.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,
  resaga: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  // parent props
  variant: PropTypes.string,
  userNodeIds: PropTypes.array,
  nodeId: PropTypes.number,
  shareToUserId: PropTypes.number,
  role: PropTypes.string,
  removeAll: PropTypes.bool,
  handleParentSuccess: PropTypes.func,
  // resaga props
  me: PropTypes.number,
  sending: PropTypes.bool,
  closeDetailDlg: PropTypes.bool,
  participantDialog: PropTypes.bool,
  interestedDialog: PropTypes.bool,
  createdBy: PropTypes.number,
};

RemoveUser.defaultProps = {
  variant: null,
  userNodeIds: [],
  nodeId: 0,
  shareToUserId: 0,
  role: '',
  removeAll: false,

  me: 0,
  sending: false,
  closeDetailDlg: false,
  participantDialog: false,
  interestedDialog: false,
};
export default compose(
  withStyles(styles, { name: 'RemoveUser' }),
  resaga(CONFIG),
  INVITATION_STORE_HOC.selectUserNodeIds({
    userIds: 'shareToUserId',
    nodeIds: 'nodeId',
    roles: TOUR_ROLE_TYPES,
  }),
  resaga(CONFIG2),
  withRouter,
)(RemoveUser);
