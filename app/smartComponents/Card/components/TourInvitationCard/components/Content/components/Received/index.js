import {
  CONFIRM_INVITATION,
  DECLINE_INVITATION,
  NODE_SHARE_API,
  NODE_API,
  PATCH_TRANSFER_NODE,
  ACCEPT_TOUR_OWNERSHIP,
  TEMPLATE_API,
  ABILITY_API,
  FIND_MY_ABILITIES,
} from 'apis/constants';
import {
  URL_HELPERS,
  TOUR_INVITATION_TYPE,
  DO_NOTHING,
  PERSONAL,
  ORGANISATION,
  TOUR_INVITATION_VIEW,
} from 'appConstants';
import classnames from 'classnames';
import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import {
  CANCELED,
  CONFIRMED,
  DECLINED,
  PENDING,
} from 'datastore/invitationStore/constants';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import { FormattedMessage as M } from 'react-intl';
import Form from 'ugcomponents/Form';
import { RESAGA_HELPERS } from 'utils/helpers/resaga';
import { P } from 'viewComponents/Typography';
import Button from 'ugcomponents/Buttons/Button/index';
import UGLink from 'components/Link';
import UIKitButton from 'viewComponents/Button';
import { Avatar, Name, Organisation, TourRoleByKey } from 'ugcomponents/Person';
import Org from 'smartComponents/Organisation';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import Popper from 'components/Popper';
import MenuItem from 'components/Popper/components/MenuItem';
import Icon from 'ugcomponents/Icon';
import Person from 'smartComponents/Person';
import NodeContent from '../NodeContent';
import PersonalMessage from '../PersonalMessage';
import ResponseMessage from '../ResponseMessage';
import m from './messages';
import { CONFIG } from './config';
import styles from './styles';

export class Received extends PureComponent {
  state = {
    accepting: false,
    loading: false,
    selectedOrgId: {
      id: null,
    },
  };

  getDefaultOption = () => {
    const { transferOrgId, orgUserIds, userId, parentNodeId } = this.props;

    if (orgUserIds.includes(transferOrgId)) {
      return {
        id: transferOrgId,
        orgType: ORGANISATION,
        rootNodeId: parentNodeId,
      };
    }
    return {
      id: userId,
      orgType: PERSONAL,
      rootNodeId: parentNodeId,
    };
  };

  response = (ACTION, token) => () => {
    const { nodeId, role, type } = this.props;
    if (type === TOUR_INVITATION_TYPE.TRANSFER) {
      if (ACTION === CONFIRM_INVITATION) {
        return this.onTransferAccept();
      }
      if (ACTION === DECLINE_INVITATION) {
        return this.onConfirmCancelTransfer();
      }
      return DO_NOTHING;
    }

    return this.props.resaga.dispatchTo(NODE_SHARE_API, ACTION, {
      data: { token, nodeId, role },
      onSuccess: this.excludeToken,
    });
  };

  onConfirmCancelTransfer = () => {
    const { nodeId } = this.props;
    this.props.resaga.dispatchTo(NODE_API, PATCH_TRANSFER_NODE, {
      payload: {
        id: nodeId,
        data: {
          nodeId,
          status: DECLINED,
        },
      },
      onError: this.onFailureAccepTransfer,
    });
  };

  onSuccessAccepTransfer = () => {
    const { view } = this.props;
    this.setState({ loading: false });
    this.props.resaga.dispatchTo(ABILITY_API, FIND_MY_ABILITIES, {});
    if (view === TOUR_INVITATION_VIEW.TEMPLATE) {
      this.props.resaga.setValue({ refresh: Date.now() });
    }
  };

  onFailureAccepTransfer = () => {
    this.setState({ loading: false });
  };

  onConfirmTransferAccept = () => {
    const { nodeId, userId } = this.props;
    const { selectedOrgId } = this.state;
    const defaultOrg = this.getDefaultOption();
    const { id, orgType, rootNodeId } = LOGIC_HELPERS.ifElse(
      selectedOrgId.id,
      selectedOrgId,
      defaultOrg,
    );
    // TOD: PUT ACCEPT API HERE
    this.setState({ loading: true });
    this.props.resaga.dispatchTo(TEMPLATE_API, ACCEPT_TOUR_OWNERSHIP, {
      payload: {
        id: nodeId,
        data: {
          newRootNodeId: rootNodeId,
          newUserId: userId,
          nodeId,
          orgId: LOGIC_HELPERS.ifElse(orgType === PERSONAL, null, id),
          status: CONFIRMED,
        },
      },
      onSuccess: this.onSuccessAccepTransfer,
      onError: this.onFailureAccepTransfer,
    });
  };

  onTransferAccept = () => this.setState({ accepting: true });

  renderTransferOrShare = (transfer, share) =>
    LOGIC_HELPERS.ifElse(
      TOUR_INVITATION_TYPE.TRANSFER === this.props.type,
      transfer,
      share,
    );

  excludeToken = (result, payload) => {
    const { token } = payload;

    this.props.resaga.setValue({
      exclusion: RESAGA_HELPERS.concat(token),
    });
  };

  renderConfirmedButtons = () => {
    const { classes, nodeId, target, view } = this.props;

    return (
      <GridItem>
        <GridContainer
          alignItems="center"
          spacing={0}
          className={classes.buttons}
        >
          <GridItem>
            <Button outline="outLineGreen" dense size="small" disabled>
              {this.renderTransferOrShare(
                `Congratulations!, your are now the new owner of this tour.`,
                'Invitation accepted',
              )}
            </Button>
          </GridItem>
          {view !== TOUR_INVITATION_VIEW.TEMPLATE && (
            <GridItem>
              <UGLink
                className={classes.viewTourLnk}
                to={URL_HELPERS.tours(nodeId)}
                target={target}
              >
                <UIKitButton
                  color="primary"
                  size="extraSmall"
                  noMargin
                  className={classes.viewTourBtn}
                >
                  View Tour
                </UIKitButton>
              </UGLink>
            </GridItem>
          )}
        </GridContainer>
      </GridItem>
    );
  };

  renderRedButtons = button => {
    const { classes } = this.props;

    return (
      <GridItem className={classes.buttons}>
        <Button outline="outLineRed" dense size="small" disabled>
          {button}
        </Button>
      </GridItem>
    );
  };

  cancelOptionTransfer = () => this.setState({ accepting: false });

  renderAcceptingOptions = () => {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <GridItem>
          <div className={classes.pendingButtons}>
            {this.renderOrgMenu()}
            <UIKitButton
              color="primary"
              size="small"
              noMargin
              className={classes.declineConfirmBtn}
              onClick={this.onConfirmTransferAccept}
              loading={this.state.loading}
            >
              Continue
            </UIKitButton>
            <UIKitButton
              size="small"
              variant="outline"
              color="black"
              noMargin
              onClick={this.cancelOptionTransfer}
            >
              Go back
            </UIKitButton>
          </div>
        </GridItem>
      </React.Fragment>
    );
  };

  renderPendingButtons = () => {
    const { classes, token } = this.props;
    const { accepting } = this.state;
    if (accepting) return this.renderAcceptingOptions();

    return (
      <GridItem>
        <div className={classes.pendingButtons}>
          <UIKitButton
            color="primary"
            size="small"
            noMargin
            className={classes.declineConfirmBtn}
            onClick={this.response(CONFIRM_INVITATION, token)}
          >
            <M
              {...this.renderTransferOrShare(
                m.confirmTransfer,
                m.confirmInvite,
              )}
            />
          </UIKitButton>
          <UIKitButton
            size="small"
            variant="outline"
            color="black"
            noMargin
            onClick={this.response(DECLINE_INVITATION, token)}
          >
            <M
              {...this.renderTransferOrShare(
                m.declineTransfer,
                m.declineInvite,
              )}
            />
          </UIKitButton>
        </div>
      </GridItem>
    );
  };

  renderButtons = isPending => {
    const { status } = this.props;

    if (!isPending && status === PENDING) {
      return null;
    }

    if (isPending && status !== PENDING) {
      return null;
    }

    switch (status) {
      case CONFIRMED:
        return this.renderConfirmedButtons();
      case DECLINED:
        return this.renderRedButtons(
          this.renderTransferOrShare(
            'Ownership Transfer declined',
            'Invitation declined',
          ),
        );
      case CANCELED:
        return this.renderRedButtons(
          this.renderTransferOrShare(
            'Ownership Transfer cancelled',
            'Invitation cancelled',
          ),
        );
      case PENDING:
        return this.renderPendingButtons();
      default:
        return null;
    }
  };

  renderPersonalMessage = () => {
    const { personalMessage } = this.props;
    if (!personalMessage) {
      return '.'; // full stop
    }

    return ' with a personal message:';
  };

  renderResponseMessage = () => {
    const { content } = this.props;

    return <ResponseMessage content={content} />;
  };

  renderOrg = () => {
    const { organisationName, orgId } = this.props;

    if (organisationName) return `from ${organisationName}`;

    if (!orgId) return '';

    return (
      <React.Fragment>
        from <Organisation id={orgId} />
      </React.Fragment>
    );
  };

  renderShare = disabled => {
    const { classes, nodeId, shareFromUserId, role } = this.props;

    return (
      <GridItem className={classnames(classes.grow, classes.invitationTitle)}>
        <P>
          <Name id={shareFromUserId} /> {this.renderOrg()} invited you to
          connect with a tour named{' '}
          <NodeContent disabled={disabled} nodeId={nodeId} /> in the role of{' '}
          <TourRoleByKey role={role} />
          {this.renderPersonalMessage()}
        </P>
        {this.renderResponseMessage()}
      </GridItem>
    );
  };

  renderTransfer = disabled => {
    const { classes, nodeId, shareFromUserId } = this.props;

    return (
      <GridItem className={classnames(classes.grow, classes.invitationTitle)}>
        <P>
          <Name id={shareFromUserId} /> {this.renderOrg()} wants to transfer the
          ownership of the tour to you named{' '}
          <NodeContent disabled={disabled} nodeId={nodeId} />
          {this.renderPersonalMessage()}
        </P>
        {this.renderResponseMessage()}
      </GridItem>
    );
  };

  renderOrgButton = ({ openMenu }) => {
    const { classes } = this.props;
    const { selectedOrgId } = this.state;
    const defaultOrg = this.getDefaultOption();
    const { id, orgType } = LOGIC_HELPERS.ifElse(
      selectedOrgId.id,
      selectedOrgId,
      defaultOrg,
    );
    return (
      <UIKitButton
        size="extraSmall"
        variant="outline"
        color="black"
        noMargin
        onClick={openMenu}
      >
        <GridContainer
          direction="row"
          spacing={0}
          alignItems="center"
          className={classes.optionOrg}
          wrap="nowrap"
        >
          <GridItem>
            <GridContainer
              direction="column"
              spacing={0}
              alignItems="baseline"
              // wrap="nowrap"
            >
              <GridItem className={classes.optionTitle}>
                <M {...m.orgTitle} />
              </GridItem>
              <GridItem className={classes.shrinkGrid}>
                {id && orgType === ORGANISATION && (
                  <Org id={id} ellipsisClassName={classes.ellipsisClassName} />
                )}
                {id && orgType === PERSONAL && <Person id={id} />}
              </GridItem>
            </GridContainer>
          </GridItem>
          <GridItem className={classes.iconArrow}>
            <Icon
              icon="lnr-chevron-down"
              size="xsmall"
              style={{ bagroundColor: 'grey' }}
            />
          </GridItem>
        </GridContainer>
      </UIKitButton>
    );
  };

  onClickOrgMenu = obj => e => {
    e.stopPropagation();
    return this.setState({ selectedOrgId: obj });
  };

  renderOrgMenuItem = ({ closeMenu }) => {
    const { orgUserIds, userId, parentNodeId } = this.props;
    return (
      <GridContainer direction="column" spacing={0}>
        <GridItem>
          <MenuItem
            closeMenu={closeMenu}
            onClick={this.onClickOrgMenu({
              id: userId,
              orgType: PERSONAL,
              rootNodeId: parentNodeId,
            })}
          >
            <Person id={userId} hiddenSm /> (Personal)
          </MenuItem>
        </GridItem>
        {orgUserIds.map(id => (
          <GridItem key={id}>
            <MenuItem
              closeMenu={closeMenu}
              onClick={this.onClickOrgMenu({
                id,
                orgType: ORGANISATION,
              })}
            >
              <Org id={id} />
            </MenuItem>
          </GridItem>
        ))}
      </GridContainer>
    );
  };

  renderOrgMenu = () => (
    <GridItem>
      <Popper
        noPadding
        menuHeader="Organisations"
        renderButton={this.renderOrgButton}
      >
        {this.renderOrgMenuItem}
      </Popper>
    </GridItem>
  );

  render = () => {
    const { classes, shareFromUserId, status, personalMessage } = this.props;

    // only able to click the Tour Link when confirmed
    const disabled = status !== CONFIRMED;
    const share = this.renderShare(disabled);
    const transfer = this.renderTransfer(disabled);

    return (
      <Form>
        <GridContainer>
          <GridItem className={classes.avatarGrid}>
            <Avatar sm userId={shareFromUserId} />
          </GridItem>
          {this.renderTransferOrShare(transfer, share)}
        </GridContainer>
        <PersonalMessage content={personalMessage} />
        {this.renderButtons()}
        {this.renderButtons(true)}
      </Form>
    );
  };
}

Received.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,
  resaga: PropTypes.object.isRequired,

  // parent props
  token: PropTypes.string.isRequired,
  type: PropTypes.string,
  view: PropTypes.string,

  // resaga props
  shareFromUserId: PropTypes.number,
  nodeId: PropTypes.number,
  orgId: PropTypes.number,
  status: PropTypes.string,
  personalMessage: PropTypes.string,
  content: PropTypes.string,
  role: PropTypes.string,
  target: PropTypes.string,
  organisationName: PropTypes.string,
  orgUserIds: PropTypes.array,
  userId: PropTypes.number,
  parentNodeId: PropTypes.number,
  transferOrgId: PropTypes.number,
};

Received.defaultProps = {
  shareFromUserId: 0,
  nodeId: 0,
  orgId: 0,
  status: '',
  personalMessage: '',
  content: '',
  role: '',
  target: '',
  organisationName: '',
  type: TOUR_INVITATION_TYPE.SHARE,
  orgUserIds: [],
  view: '',
};

export default compose(
  withStyles(styles, { name: 'Received' }),
  resaga(CONFIG),
)(Received);
