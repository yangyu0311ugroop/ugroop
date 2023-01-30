import { withStyles } from '@material-ui/core/styles';
import { NODE_API, UPDATE_NODE } from 'apis/constants';
import {
  AVATAR,
  BUTTON,
  BUTTON_TEXT,
  DEFAULT,
  ICON,
  SUMMARY,
  TEXT,
  PERSONAL,
  CHECK_INPUT,
  CANCELLED,
  SMALL_BADGE,
  MENU_TEXT,
} from 'appConstants';
import classnames from 'classnames';
import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import { CHECKLIST_HELPERS } from 'smartComponents/Node/components/Checklists/utils';
import { NODE_STATUS_HELPERS } from 'smartComponents/Node/parts/Status/helpers';
import Button from 'ugcomponents/Buttons/Button';
import ViewButton from 'viewComponents/Button';
import Icon from 'ugcomponents/Icon/index';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import {
  CHECKITEM,
  CHECKLIST,
  INTERESTED_PERSON,
  PARTICIPANT,
  TEMPLATE,
} from 'utils/modelConstants';
import { Checkbox } from 'components/material-ui/index';
import { PORTAL_HELPERS } from 'containers/Portal/helpers';
import CompletedBy from '../CompletedBy';
import InterestedPerson from './components/InterestedPerson';
import Participant from './components/Participant';
import { CONFIG } from './config';
import styles from './styles';
import { NODE_API_HELPERS } from '../../../../apis/components/Node/helpers';
import { VARIANTS } from '../../../../variantsConstants';
import JText from '../../../../components/JText';

// TODO: this component is current only support Checkitem Status, refactor when we need to serve other types
export class Status extends PureComponent {
  state = {
    isFetching: false,
    confirmDialogId: null,
  };

  componentWillMount = () => {
    this.greyButtons = { outline: 'outLineGrey', size: 'small' };
    this.greenButtons = { color: 'green', size: 'small' };
    this.greenButtonsCustom = {
      size: 'xsmall',
      color: 'green',
      outline: 'outLineGreen',
    };
  };

  className = variantClassName => {
    const { classes, className } = this.props;

    return classnames(classes.default, variantClassName, className);
  };

  isCompleted = () => {
    const { status } = this.props;

    return NODE_STATUS_HELPERS.isCompleted(status);
  };

  isClosed = () => {
    const { status } = this.props;

    return NODE_STATUS_HELPERS.isClosed(status);
  };

  isCancelled = () => {
    const { status } = this.props;

    return NODE_STATUS_HELPERS.isCancelled(status);
  };

  toggleStatus = () => {
    const { me, id, status, type } = this.props;

    const node = CHECKLIST_HELPERS.toggleStatus({ status, type }, { me });

    this.props.resaga.dispatchTo(NODE_API, UPDATE_NODE, {
      payload: {
        nodeId: id,
        node,
      },
    });
  };

  setFetching = val => () => this.setState({ isFetching: val });

  templateStatusUpdate = ({ node, onSuccess, onError }) => () => {
    const { id } = this.props;
    this.setFetching(true);
    NODE_API_HELPERS.updateNode(
      {
        nodeId: id,
        node,
        onSuccess,
        onError,
      },
      this.props,
    );
  };

  renderText = () =>
    LOGIC_HELPERS.ifElse(
      this.isCompleted(),
      'This task is complete.',
      'This task is outstanding.',
    );

  renderValue = () => this.props.status;

  renderChecklistText = () =>
    LOGIC_HELPERS.ifElse(this.isClosed(), 'Completed', 'Open');

  renderPersonIcon = () => {
    const { status, className } = this.props;
    if (status === PERSONAL) {
      return <Icon icon="user" size="normal" className={className} />;
    }
    return <Icon icon="folder" size="normal" className={className} />;
  };

  renderDefault = () => {
    const { classes } = this.props;

    const completed = this.isCompleted();

    const statusClassName = LOGIC_HELPERS.ifElse(
      completed,
      classes.completed,
      classes.outstanding,
    );
    const statusIcon = this.renderIcon();
    const statusLabel = LOGIC_HELPERS.ifElse(
      completed,
      'Completed',
      'Outstanding',
    );

    return (
      <span className={this.className(statusClassName)}>
        {statusIcon} {statusLabel}
      </span>
    );
  };

  renderButton = () => {
    const { label, revertLabel } = this.props;

    const completed = this.isCompleted();

    const nextStatus = LOGIC_HELPERS.ifElse(completed, revertLabel, label);
    const buttonProps = this.greenButtons;

    return (
      <Button
        type="submit"
        noMargin
        first
        {...buttonProps}
        onClick={this.toggleStatus}
      >
        {nextStatus}
      </Button>
    );
  };

  renderChecklistButtonText = () =>
    LOGIC_HELPERS.ifElse(this.isClosed(), 'Reopen', 'Complete');

  renderChecklistMenuText = () =>
    LOGIC_HELPERS.ifElse(this.isClosed(), 'Reopen', 'Mark as Completed ');

  renderIcon = () => {
    const { size } = this.props;

    const icon = LOGIC_HELPERS.ifElse(
      this.isCompleted(),
      'lnr-check',
      'lnr-clock3',
    );

    return <Icon icon={icon} size={size} />;
  };

  renderChecklistIcon = () => {
    const { size, paddingRight, paddingLeft } = this.props;

    const icon = LOGIC_HELPERS.ifElse(
      this.isClosed(),
      'lnr-outbox',
      'lnr-archive2',
    );

    return (
      <Icon
        icon={icon}
        size={size}
        paddingLeft={paddingLeft}
        paddingRight={paddingRight}
      />
    );
  };

  renderChecklistCheckInput = () => {
    const { classes, onClick, disabled } = this.props;
    return (
      <Checkbox
        disabled={disabled}
        onClick={onClick}
        checked={this.isClosed()}
        title={`${this.renderChecklistButtonText()} checklist`}
        color="default"
        checkedIcon={
          <Icon
            size="small"
            icon="lnr-check-square"
            className={classnames(
              LOGIC_HELPERS.ifElse(this.isClosed(), classes.checkDone),
            )}
          />
        }
        icon={<Icon size="small" icon="lnr-square" />}
        className={classnames(
          classes.checkBoxRoot,
          LOGIC_HELPERS.ifElse(this.isClosed(), classes.checkDone),
        )}
      />
    );
  };

  renderSummary = () => {
    const { classes, id } = this.props;

    const completed = this.isCompleted();

    const text = LOGIC_HELPERS.ifElse(
      completed,
      <CompletedBy id={id} />,
      this.renderText(),
    );
    const renderIcon = LOGIC_HELPERS.ifElse(
      completed,
      <CompletedBy id={id} variant={AVATAR} />,
      this.renderIcon(),
    );

    return (
      <GridContainer alignItems="center">
        <GridItem>{renderIcon}</GridItem>
        <GridItem className={classes.grow}>{text}</GridItem>
        <GridItem>{this.renderButton()}</GridItem>
      </GridContainer>
    );
  };

  // TODO: move this to its own component once this grows big
  renderCheckitem = () => {
    const { variant } = this.props;

    // pass in your custom variant if you need a different UI rendering
    return LOGIC_HELPERS.switchCase(variant, {
      [SUMMARY]: this.renderSummary,
      [BUTTON]: this.renderButton,
      [TEXT]: this.renderText,
      [ICON]: this.renderIcon,
      [DEFAULT]: this.renderDefault, // default as checkitem status badge
    });
  };

  // TODO: move this to its own component once this grows big
  renderChecklist = () => {
    const { variant } = this.props;

    // pass in your custom variant if you need a different UI rendering
    return LOGIC_HELPERS.switchCase(variant, {
      [BUTTON_TEXT]: this.renderChecklistButtonText,
      [MENU_TEXT]: this.renderChecklistMenuText,
      [ICON]: this.renderChecklistIcon,
      [DEFAULT]: this.renderChecklistText,
      [CHECK_INPUT]: this.renderChecklistCheckInput,
    });
  };

  renderInterestedPerson = () => <InterestedPerson {...this.props} />;

  renderParticipant = () => <Participant {...this.props} />;

  onSuccess = () => {
    const { confirmDialogId } = this.state;
    PORTAL_HELPERS.closePortal(confirmDialogId, this.props);
    this.setFetching(false);
  };

  confirmAction = isBadge => () => {
    const { fetching } = this.state;
    const cancelled = this.isCancelled();
    const btnText = LOGIC_HELPERS.ifElse(cancelled, 'Re-activate', 'Cancel');
    const node = {
      type: TEMPLATE,
      status: LOGIC_HELPERS.ifElse(cancelled, '', CANCELLED),
    };

    const confirmDialogId = PORTAL_HELPERS.confirmCustom(
      {
        title: `${btnText} `,
        message: LOGIC_HELPERS.ifElse(
          isBadge,
          'This travel is cancelled.',
          `Are you sure you want to ${btnText} this travel?`,
        ),
        onConfirm: this.templateStatusUpdate({
          node,
          onSuccess: this.onSuccess,
          onError: this.setFetching(false),
        }),
        confirmButton: LOGIC_HELPERS.ifElse(isBadge, 'Re-activate', 'Continue'),
        loading: fetching,
        template: LOGIC_HELPERS.ifElse(!cancelled, 'delete', 'confirm'),
      },
      this.props,
    );

    this.setState({ confirmDialogId });
  };

  renderTourEditableStatus = () => {
    const { isLoading } = this.props;
    const { isFetching } = this.state;
    const loading = isFetching || isLoading;
    const cancelled = this.isCancelled();
    const btnText = LOGIC_HELPERS.ifElse(
      cancelled,
      'Re-activate tour',
      'Cancel Travel',
    );
    return (
      <ViewButton
        color={LOGIC_HELPERS.ifElse(cancelled, 'primary', 'alert')}
        dense
        size="xs"
        onClick={this.confirmAction()}
        loading={loading}
        disabled={loading}
      >
        {btnText}
      </ViewButton>
    );
  };

  tourStatusSmallBandge = () => {
    const { children, classes } = this.props;
    if (this.isCancelled()) {
      return <div className={classes.smallBadge}>CANCELLED</div>;
    }
    return children;
  };

  tourStatusBandge = () => {
    const { children, classes, disabled } = this.props;
    if (this.isCancelled()) {
      return (
        <JText
          uppercase
          bolder
          className={classes.cancelled}
          spacing2
          disable={disabled}
          onClick={!disabled ? this.confirmAction(true) : null}
          title="This travel is currenly cancelled, click to see options"
        >
          {CANCELLED}
        </JText>
      );
    }
    return children;
  };

  renderTourStatus = () => {
    const { variant } = this.props;

    // pass in your custom variant if you need a different UI rendering
    return LOGIC_HELPERS.switchCase(variant, {
      [VARIANTS.EDITABLE]: this.renderTourEditableStatus,
      [VARIANTS.BADGE]: this.tourStatusBandge,
      [SMALL_BADGE]: this.tourStatusSmallBandge,
      [VARIANTS.VALUE_ONLY]: this.renderValue,
      [DEFAULT]: null,
    });
  };

  render = () => {
    const { type } = this.props;

    // pass in your custom variant if you need to render status for other type
    return LOGIC_HELPERS.switchCase(type, {
      [CHECKITEM]: this.renderCheckitem,
      [CHECKLIST]: this.renderChecklist,
      [ICON]: this.renderPersonIcon,
      [INTERESTED_PERSON]: this.renderInterestedPerson,
      [PARTICIPANT]: this.renderParticipant,
      [TEMPLATE]: this.renderTourStatus,
      [DEFAULT]: null,
    });
  };
}

Status.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,
  resaga: PropTypes.object.isRequired,

  // parent props
  id: PropTypes.number,
  variant: PropTypes.node,
  className: PropTypes.string,
  onClick: PropTypes.func,
  isLoading: PropTypes.bool,
  disabled: PropTypes.bool,
  children: PropTypes.node,

  // resaga props
  type: PropTypes.string,
  status: PropTypes.string,
  me: PropTypes.number,

  // customisable props
  size: PropTypes.string,
  label: PropTypes.string,
  revertLabel: PropTypes.string,
  paddingLeft: PropTypes.bool,
  paddingRight: PropTypes.bool,
};

Status.defaultProps = {
  id: 0,
  variant: '',
  className: '',
  type: '',

  status: '',
  me: 0,

  // customisable props
  size: 'small',
  label: 'Complete this Task',
  revertLabel: 'Not Completed',
  paddingLeft: false,
  paddingRight: false,
  isLoading: false,
  disabled: false,
};

export default compose(
  withStyles(styles, { name: 'Status' }),
  resaga(CONFIG),
)(Status);
