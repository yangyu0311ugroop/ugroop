import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import { withStyles } from 'components/material-ui';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import {
  CANCELLED,
  DEFAULT,
  PENDING,
  TOUR_INVITATION_TYPE,
  TOUR_INVITATION_VIEW,
} from 'appConstants';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { VARIANTS } from 'variantsConstants';
import { NODE_API, PATCH_TRANSFER_NODE } from 'apis/constants';
import classnames from 'classnames';

import Button from 'viewComponents/Button';
import Icon from 'ugcomponents/Icon';
import Popper from 'components/Popper';
import MenuItem from 'components/Popper/components/MenuItem';
import { PORTAL_HELPERS } from 'containers/Portal/helpers';
import Received from 'smartComponents/Card/components/TourInvitationCard/components/Content/components/Received';

import { CONFIG, CONFIG2 } from './config';
import styles from './styles';

export class TransferStatus extends PureComponent {
  state = {
    loading: false,
    confirmCancelTransferDialogId: 0,
  };

  isOwner = () => this.props.me === this.props.createdBy;

  handleCancelTransfer = () => {
    const confirmCancelTransferDialogId = PORTAL_HELPERS.confirmCancelTransfer(
      {
        onConfirm: this.onConfirmCancelTransfer,
        count: 1,
      },
      this.props,
    );
    this.setState({ confirmCancelTransferDialogId });
  };

  onConfirmCancelTransfer = () => {
    const { id } = this.props;
    this.setState({ loading: true });
    this.props.resaga.dispatchTo(NODE_API, PATCH_TRANSFER_NODE, {
      payload: {
        id,
        data: {
          nodeId: id,
          status: CANCELLED,
        },
      },
      onSuccess: this.handleCancelSuccess,
      onError: this.handleTransferError,
    });
  };

  handleCancelSuccess = () => {
    const { confirmCancelTransferDialogId } = this.state;
    const { onSuccess } = this.props;
    this.setState({ loading: false });
    PORTAL_HELPERS.closePortal(confirmCancelTransferDialogId, this.props);
    if (onSuccess && typeof onSuccess === 'function') onSuccess();
  };

  handleTransferError = () => {
    const { confirmCancelTransferDialogId } = this.state;
    const { onError } = this.props;
    this.setState({ loading: false });
    PORTAL_HELPERS.closePortal(confirmCancelTransferDialogId, this.props);
    if (onError && typeof onError === 'function') onError();
  };

  openTransferTour = () => this.props.resaga.setValue({ transferDialog: true });

  renderMoreButton = ({ openMenu }) => {
    const { classes } = this.props;
    if (this.isMyInvite()) {
      return (
        <Button
          color="primary"
          size="xs"
          className={classes.smallText}
          onClick={openMenu}
        >
          <GridContainer alignItems="center">
            <GridItem>Confirm Ownership</GridItem>
          </GridContainer>
        </Button>
      );
    }
    return (
      <Button
        dense
        noPadding
        size="extraSmall"
        color="black"
        className={classes.actionButton}
        onClick={openMenu}
        loading={this.state.loading}
      >
        <Icon icon="lnr-ellipsis" size="extraSmall" className={classes.icon} />
      </Button>
    );
  };

  renderMore = () => (
    <Popper placement="bottom-end" renderButton={this.renderMoreButton}>
      {this.renderViewPopper}
    </Popper>
  );

  renderInvitationToMe = closeMenu => {
    const { me, nodeTransferToken, orgUserIds, classes } = this.props;
    return (
      <MenuItem icon="lnr-sync-crossed" closeMenu={closeMenu}>
        <GridContainer direction="column" spacing={0}>
          <GridItem className={classes.invitationWidth}>
            <Received
              token={nodeTransferToken}
              type={TOUR_INVITATION_TYPE.TRANSFER}
              userId={me}
              orgUserIds={orgUserIds}
              view={TOUR_INVITATION_VIEW.TEMPLATE}
            />
          </GridItem>
        </GridContainer>
      </MenuItem>
    );
  };

  renderViewPopper = ({ closeMenu }) => {
    if (this.isMyInvite()) {
      return this.renderInvitationToMe(closeMenu);
    }
    return (
      <GridContainer direction="column" spacing={0}>
        <GridItem>
          <MenuItem
            icon="lnr-sync-crossed"
            closeMenu={closeMenu}
            onClick={this.handleCancelTransfer}
          >
            Cancel Transfer
          </MenuItem>
        </GridItem>
        <GridItem>
          <MenuItem
            icon="lnr-file-preview"
            closeMenu={closeMenu}
            onClick={this.openTransferTour}
          >
            View Transfer Details
          </MenuItem>
        </GridItem>
      </GridContainer>
    );
  };

  renderBadge = () => {
    const { transferStatus, classes, simple } = this.props;
    if (transferStatus === PENDING && (this.isOwner() || this.isMyInvite())) {
      if (simple) {
        return (
          <React.Fragment>
            {!this.isMyInvite() && (
              <GridItem
                className={classnames(classes.statusText, classes.simple)}
              >
                Pending Transfer
              </GridItem>
            )}
            {this.isMyInvite() && (
              <GridItem
                className={classnames(classes.statusText, classes.simple)}
              >
                Awaiting Ownership
              </GridItem>
            )}
          </React.Fragment>
        );
      }
      return (
        <GridItem>
          <GridContainer direction="row">
            <GridItem
              className={LOGIC_HELPERS.ifElse(
                this.isMyInvite(),
                classes.awaiting,
                classes.pending,
              )}
            >
              <GridContainer direction="row" spacing={0} alignItems="center">
                {!this.isMyInvite() && (
                  <GridItem className={classes.iconDisp}>
                    <Icon icon="lnr-share3" size="extraSmall" />
                  </GridItem>
                )}
                {!this.isMyInvite() && (
                  <GridItem className={classes.statusText}>
                    Pending Transfer
                  </GridItem>
                )}
                {this.isMyInvite() && (
                  <GridItem className={classes.statusTextAwaiting}>
                    Tour Ownership Transfer
                  </GridItem>
                )}
                <GridItem>{!this.isMyInvite() && this.renderMore()}</GridItem>
              </GridContainer>
            </GridItem>
            {this.isMyInvite() && <GridItem>{this.renderMore()}</GridItem>}
          </GridContainer>
        </GridItem>
      );
    }
    return null;
  };

  isMyInvite = () => this.props.me === this.props.tranferTo;

  renderButton = () => {
    const { transferStatus } = this.props;

    if (transferStatus === PENDING && this.isOwner()) {
      return (
        <GridItem>
          <Button
            dense
            size="small"
            color="alert"
            onClick={this.handleCancelTransfer}
            loading={this.state.loading}
          >
            Cancel Transfer
          </Button>
        </GridItem>
      );
    }
    return null;
  };

  render = () => {
    const { variant } = this.props;

    return LOGIC_HELPERS.switchCase(variant, {
      [VARIANTS.BADGE]: this.renderBadge,
      [VARIANTS.BUTTON]: this.renderButton,
      [DEFAULT]: this.renderBadge,
    });
  };
}

TransferStatus.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,
  resaga: PropTypes.object.isRequired,

  // parent props
  variant: PropTypes.string,
  id: PropTypes.number,
  onSuccess: PropTypes.func,
  onError: PropTypes.func,
  simple: PropTypes.bool,

  // resaga props
  createdBy: PropTypes.number,
  me: PropTypes.number,
  transferStatus: PropTypes.string,
  tranferTo: PropTypes.number,
  nodeTransferToken: PropTypes.string,
  orgUserIds: PropTypes.array,
};

TransferStatus.defaultProps = {
  orgUserIds: [],
};

export default compose(
  withStyles(styles, { name: 'TransferStatus' }),
  resaga(CONFIG),
  resaga(CONFIG2),
)(TransferStatus);
