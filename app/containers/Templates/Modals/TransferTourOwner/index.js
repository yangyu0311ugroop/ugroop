import { CONTENT, DO_NOTHING, PENDING } from 'appConstants';
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
import { H5 } from 'viewComponents/Typography';
import NodeProp from 'smartComponents/Node/components/NodeProp';
import Popper from 'components/Popper';
import MenuItem from 'components/Popper/components/MenuItem';
import Icon from 'ugcomponents/Icon';
import Hr from 'components/Hr';
import Button from 'viewComponents/Button';
import {
  TRANSFER_TOUR_VIEW,
  TRANSFER_TOUR_TYPE,
  VARIANTS,
} from 'variantsConstants';
import { TRANSFER_NODE, NODE_API } from 'apis/constants';
import { SimpleRTE } from 'ugcomponents/Inputs';
import Form from 'ugcomponents/Form';
import omit from 'lodash/omit';
import m from './messages';
import TransferByEmail from './Components/TransferByEmail';
import TransferStatus from './Components/TransferStatus';
import Content from './Components/TransferContent';
import { CONFIG, CONFIG_2 } from './config';
import styles from './styles';

export class TransferTourOwner extends PureComponent {
  state = {
    emailSent: false,
    loading: false,
  };

  componentWillMount = () => {
    const { classes } = this.props;

    this.dialogClasses = { paper: classes.paper };
  };

  handleValid = () => DO_NOTHING;

  handleInvalidSubmit = () => DO_NOTHING;

  isTransferAwaiting = () => this.props.transferStatus === PENDING;

  handleTransfer = formData => {
    const {
      id,
      transferToEmail,
      transferToUserId,
      me,
      memberEmail,
      orgId,
    } = this.props;

    const transferTo = transferToEmail || memberEmail;
    this.setState({ loading: true });
    this.props.resaga.dispatchTo(NODE_API, TRANSFER_NODE, {
      payload: {
        id,
        data: {
          transferTo,
          transferToUserId,
          transferFrom: me,
          nodeId: id,
          content: formData.pm,
          orgId,
        },
      },
      onSuccess: this.handleTransferSuccess,
      onError: this.handleTransferError,
    });
  };

  handleTransferSuccess = () => {
    this.setState({ loading: false, emailSent: true });
  };

  handleCancelSuccess = () => {
    this.setState({ loading: false, emailSent: false });
    this.handleReset();
  };

  handleTransferError = () => {
    this.setState({ loading: false });
  };

  handleClose = () => {
    const { onClose } = this.props;
    this.handleFilterSelect(null);
    this.handleReset();

    if (onClose) return onClose();

    return DO_NOTHING;
  };

  handleFilterSelect = filter => () => {
    this.handleReset();
    this.props.resaga.setValue({
      transferByType: filter,
    });
  };

  handleReset = () => {
    if (!this.isTransferAwaiting()) {
      this.props.resaga.setValue({
        transferToUserId: null,
        transferToEmail: null,
      });
    }
    this.setState({ emailSent: false });
  };

  renderAddPersonalMessage = () => {
    const { classes } = this.props;

    if (this.isTransferAwaiting() || !this.isTransferReady()) return '';

    return (
      <GridItem className={classes.personalMsg}>
        <SimpleRTE name="pm" />
      </GridItem>
    );
  };

  byEmail = () => this.props.transferByType === TRANSFER_TOUR_TYPE.EMAIL;

  isTransferReady = () => {
    const { transferToUserId, transferToEmail } = this.props;
    return !!transferToUserId || !!transferToEmail || this.isTransferAwaiting();
  };

  renderResetButton = () => {
    if (!this.isTransferReady() || this.isTransferAwaiting()) return null;
    return (
      <GridItem>
        <Button dense size="small" variant="outline" onClick={this.handleReset}>
          <M {...m.btnLabelCancel} />
        </Button>
      </GridItem>
    );
  };

  renderSubmitButton = () => {
    if (!this.isTransferReady()) return null;
    if (this.isTransferAwaiting()) return null;
    return (
      <GridItem>
        <Button
          dense
          size="small"
          color="gray"
          loading={this.state.loading}
          type="submit"
        >
          <M {...m.btnLabelContinue} />
        </Button>
      </GridItem>
    );
  };

  renderCancelButton = () => {
    if (!this.isTransferReady()) return null;
    if (!this.isTransferAwaiting()) return null;
    return (
      <TransferStatus
        id={this.props.id}
        variant={VARIANTS.BUTTON}
        onSuccess={this.handleCancelSuccess}
        onError={this.handleTransferError}
      />
    );
  };

  renderPopperButton = ({ openMenu }) => {
    const { classes, transferByType } = this.props;
    return (
      <Button
        variant={VARIANTS.BORDERLESS}
        dense
        size="extraSmall"
        onClick={openMenu}
        className={classes.popperButton}
        weight="bold"
      >
        <GridContainer alignItems="baseline" wrap="nowrap" spacing={0}>
          <GridItem>{TRANSFER_TOUR_VIEW[transferByType]}</GridItem>
          <GridItem>
            <Icon icon="lnr-chevron-down" size="xsmall" paddingLeft />
          </GridItem>
        </GridContainer>
      </Button>
    );
  };

  renderPopper = () => (
    <Popper
      stopPropagation
      placement="top"
      renderButton={this.renderPopperButton}
    >
      {this.renderPopperOptions}
    </Popper>
  );

  renderMenu = (title, variant, closeMenu) => {
    const { transferByType } = this.props;
    return (
      <GridItem>
        {variant && (
          <MenuItem
            closeMenu={closeMenu}
            selected={transferByType === variant}
            onClick={this.handleFilterSelect(variant)}
          >
            {title}
          </MenuItem>
        )}
        {!variant && (
          <MenuItem>
            <b>{title}</b>
            <Hr halfMarginBottom halfMarginTop />
          </MenuItem>
        )}
      </GridItem>
    );
  };

  renderPopperOptions = ({ closeMenu }) => (
    <GridContainer direction="column" spacing={0}>
      {this.renderMenu(<M {...m.optionLabel} />)}
      {this.renderMenu(
        <M {...m.option1} />,
        TRANSFER_TOUR_TYPE.TOUR_CONNECTION,
        closeMenu,
      )}
      {this.props.orgId &&
        this.renderMenu(
          <M {...m.option2} />,
          TRANSFER_TOUR_TYPE.ORG_CONNECTION,
          closeMenu,
        )}
      {this.renderMenu(
        <M {...m.option3} />,
        TRANSFER_TOUR_TYPE.EMAIL,
        closeMenu,
      )}
    </GridContainer>
  );

  renderTitle = () => (
    <React.Fragment>
      <Title
        heading={<M {...m.header} />}
        headingBackground={<M {...m.headerBackground} />}
      />
      <CloseButton onClick={this.handleClose} />
    </React.Fragment>
  );

  renderSubtitle = () => {
    const { id } = this.props;
    return (
      <GridContainer spacing={0}>
        <GridItem>
          <H5>
            <M {...m.transferText} />
            &nbsp;
          </H5>
        </GridItem>
        <GridItem>
          <H5>
            <NodeProp
              id={id}
              valueKey={CONTENT}
              bold
              showEmpty
              required
              isCustomData={false}
            />
          </H5>
        </GridItem>
        <GridItem>
          <H5>
            <M {...m.subTitle} />
          </H5>
        </GridItem>
      </GridContainer>
    );
  };

  renderSubmitActions = () => (
    <React.Fragment>
      <Form
        onValid={this.handleValid}
        onValidSubmit={this.handleTransfer}
        onInvalidSubmit={this.handleInvalidSubmit}
      >
        {this.renderAddPersonalMessage()}
        <GridItem>
          <GridContainer direction="row">
            {this.renderSubmitButton()}
            {this.renderCancelButton()}
            {this.renderResetButton()}
          </GridContainer>
        </GridItem>
      </Form>
    </React.Fragment>
  );

  renderActions = () => {
    const { id, classes } = this.props;
    return (
      <GridContainer direction="column">
        <GridItem>
          <GridContainer direction="column" className={classes.root}>
            {this.byEmail() && !this.isTransferReady() && (
              <GridItem>
                <TransferByEmail id={id} />
              </GridItem>
            )}
            {this.renderSubmitActions()}
          </GridContainer>
        </GridItem>
      </GridContainer>
    );
  };

  renderContent = () => {
    const { id } = this.props;
    const { emailSent } = this.state;
    const props = omit(this.props, ['classes', 'resaga']);
    return (
      <GridContainer direction="column">
        <Content
          id={id}
          isPending={!this.isTransferReady()}
          isAwaiting={this.isTransferAwaiting()}
          emailSent={emailSent}
          {...props}
        />
      </GridContainer>
    );
  };

  dialogContent = () => {
    const { classes } = this.props;
    if (this.byEmail() && !this.isTransferReady()) return null;
    return (
      <DialogContent className={classes.content}>
        {this.renderContent()}
      </DialogContent>
    );
  };

  dialogActions = () => (
    <DialogActions disableActionSpacing>{this.renderActions()}</DialogActions>
  );

  render = () => {
    const { open } = this.props;
    return (
      <Dialog
        open={open}
        onClose={this.handleClose}
        classes={this.dialogClasses}
      >
        <DialogTitle noPaddingBottom>
          {this.renderTitle()}
          {this.renderSubtitle()}
          {!this.isTransferReady() && this.renderPopper()}
        </DialogTitle>
        {this.dialogContent()}
        {this.dialogActions()}
      </Dialog>
    );
  };
}

TransferTourOwner.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,
  resaga: PropTypes.object.isRequired,

  // parent props
  id: PropTypes.number.isRequired, // template id
  open: PropTypes.bool,
  onClose: PropTypes.func,

  // resaga props
  transferByType: PropTypes.string,
  transferToUserId: PropTypes.number,
  transferToEmail: PropTypes.string,
  orgId: PropTypes.number,
  me: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  memberEmail: PropTypes.string,

  // Awaiting Transfer
  transferStatus: PropTypes.string,
};

TransferTourOwner.defaultProps = {
  transferByType: TRANSFER_TOUR_TYPE.TOUR_CONNECTION,
};

export default compose(
  withStyles(styles, { name: 'TransferTourOwner' }),
  resaga(CONFIG),
  resaga(CONFIG_2),
)(TransferTourOwner);
