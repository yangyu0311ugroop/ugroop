import {
  COMPLETED,
  COMPLETED_MESSAGE,
  DEFAULT,
  ICON,
  OUTSTANDING,
  PERCENTAGE,
  PROGRESS_BAR,
  REMAINING,
  SUMMARY,
  TEXT,
  OUTSTANDING_SHORT,
  UP_NEXT,
  TOTAL,
  ICON_BUTTON,
} from 'appConstants';
import classnames from 'classnames';
import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import { Hidden, LinearProgress } from 'components/material-ui/index';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import { InlineButton } from 'ugcomponents/Buttons/index';
import Icon from 'ugcomponents/Icon/index';
import IconVw from 'viewComponents/Icon';
import Button from 'viewComponents/Button';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import styles from './styles';
import { NODE_STATUS_HELPERS } from '../../../Status/helpers';

export class BadgeProgress extends PureComponent {
  done = () => {
    const { percentage } = this.props;

    return percentage === 100;
  };

  icon = () => {
    const { percentage, icon } = this.props;

    // customisable prop
    if (icon) {
      return icon;
    }

    // empty list
    if (!percentage) {
      return 'square';
    }

    return 'check-square';
  };

  color = () => LOGIC_HELPERS.ifElse(this.done(), 'success', 'default');

  text = remaining => LOGIC_HELPERS.ifElse(remaining > 1, 'tasks', 'task');

  progressBarPrimaryColor = () => {
    const { classes, percentage, primaryClassName } = this.props;

    return classnames(
      LOGIC_HELPERS.ifElse(
        percentage === 100,
        classes.progressCompleted,
        classes.progressOutstanding,
      ),
      primaryClassName,
    );
  };

  renderIcon = () => {
    const { classes } = this.props;

    return (
      <span className={classnames(classes.icon)}>
        <Icon
          size="small"
          icon={this.icon()}
          color={this.color()}
          paddingRight
        />
      </span>
    );
  };

  renderText = () => {
    const { classes, completed, total } = this.props;

    return (
      <span className={classnames(classes.text)}>
        {completed}/{total}
      </span>
    );
  };

  renderUpNext = () => {
    const { completed, total } = this.props;

    const title = this.renderTitle();

    const text = total ? (
      <span>
        {completed} of {total}
      </span>
    ) : (
      '0 tasks'
    );

    return (
      <GridContainer alignItems="center" spacing={0} title={title}>
        <GridItem>
          <Icon icon="lnr-list3" size="xsmall" />
        </GridItem>
        <GridItem>
          &nbsp;
          {text}
          &nbsp;
        </GridItem>
        {total > 0 && (
          <Hidden smDown>
            <GridItem>{this.renderProgressBar()}</GridItem>
          </Hidden>
        )}
      </GridContainer>
    );
  };

  renderDefault = () => {
    const { classes } = this.props;

    return (
      <GridContainer className={classnames(classes.root)} spacing={0}>
        <GridItem>{this.renderIcon()}</GridItem>
        <GridItem>{this.renderText()}</GridItem>
      </GridContainer>
    );
  };

  renderPercentage = () => {
    const { classes, percentage } = this.props;

    return <span className={classes.percentage}>{percentage}%</span>;
  };

  renderTitle = () => {
    const { percentage, remaining, completed } = this.props;

    return `${completed +
      remaining} tasks: ${completed}/${percentage}% completed, ${remaining} remaining`;
  };

  renderProgressBar = () => {
    const { classes, size, percentage, className } = this.props;

    const title = this.renderTitle();

    return (
      <span title={title}>
        <LinearProgress
          variant="determinate"
          value={percentage}
          className={classnames(classes.progress, classes[size], className)}
          classes={{
            colorPrimary: classes.progressBackground,
            barColorPrimary: this.progressBarPrimaryColor(),
          }}
        />
      </span>
    );
  };

  renderCompletedMessage = () => {
    const { classes, className, percentage, completedMessage } = this.props;

    if (percentage < 100) {
      return null;
    }

    return (
      <span className={classnames(classes.completedMessage, className)}>
        {completedMessage}
      </span>
    );
  };

  renderButton = (func, button, className) => {
    if (typeof func !== 'function') {
      return button;
    }

    // only render button if func is given
    return (
      <InlineButton onClick={func} className={classnames(className)}>
        {button}
      </InlineButton>
    );
  };

  renderSummary = () => {
    const {
      classes,
      percentage,
      remaining,
      completed,
      className,
      completedText,
      outstandingText,
      toggleShowCompleted,
      toggleShowOutstanding,
      showCompleted,
      showOutstanding,
    } = this.props;

    const outstanding = (
      <span>
        <b>{remaining}</b> {outstandingText}
      </span>
    );
    const complete = (
      <span>
        <b>{completed}</b> {completedText}
      </span>
    );

    const renderOutstanding = this.renderButton(
      toggleShowOutstanding,
      outstanding,
      LOGIC_HELPERS.ifElse(!showOutstanding, classes.fade),
    );
    const renderCompleted = this.renderButton(
      toggleShowCompleted,
      complete,
      LOGIC_HELPERS.ifElse(!showCompleted, classes.fade),
    );

    return (
      <GridContainer alignItems="center" className={className}>
        <GridItem className={classes.summaryItem}>{renderOutstanding}</GridItem>
        <GridItem className={classnames(classes.grow, classes.summaryItem)}>
          {renderCompleted}
        </GridItem>
        {LOGIC_HELPERS.ifElse(
          [toggleShowOutstanding, toggleShowCompleted],
          <Hidden xsDown>
            <GridItem className={classes.summaryItem}>
              {percentage}% complete
            </GridItem>
          </Hidden>,
        )}
      </GridContainer>
    );
  };

  renderRemaining = () => {
    const {
      classes,
      remaining,
      total,
      showCompletedMessage,
      outstandingText,
    } = this.props;

    if (total === 0) {
      return (
        <span className={classnames(classes.remainingNone)}>No tasks</span>
      );
    }

    if (remaining === 0) {
      if (!showCompletedMessage) {
        return null;
      }

      return (
        <span className={classnames(classes.remainingNone)}>
          All tasks completed
        </span>
      );
    }

    return (
      <span className={classnames(classes.remainingSome)}>
        <Hidden xsDown>
          {remaining} {outstandingText} {this.text(remaining)}{' '}
        </Hidden>
        <Hidden smUp>
          {remaining} {this.text(remaining)}{' '}
        </Hidden>
      </span>
    );
  };

  renderTotal = () => {
    const { classes, total } = this.props;

    if (total === 0) {
      return (
        <span className={classnames(classes.remainingNone)}>No tasks</span>
      );
    }
    return (
      <span className={classnames(classes.remainingSome)}>
        <b>
          {total} {this.text(total)}
        </b>{' '}
      </span>
    );
  };

  renderOutstandingShort = () => {
    const { remaining, total } = this.props;
    if (remaining > 99) {
      return '99+';
    }

    // no tasks
    if (total === 0) {
      return 0;
    }

    // all tasks completed
    if (remaining === 0) {
      return <Icon icon="lnr-check" color="success" size="normal" bold />;
    }

    return remaining;
  };

  renderIconButton = () => {
    const {
      classes,
      onClick,
      iconLabel,
      icon,
      isSelected,
      status,
    } = this.props;
    const isPreComplete = NODE_STATUS_HELPERS.isClosed(status); // && !!remaining;
    return (
      <Button
        color="inline"
        size="xs"
        onClick={onClick}
        buttonTitle={iconLabel}
        className={classes.asIconButton}
      >
        <GridContainer alignItems="center" spacing={0}>
          <GridItem
            className={classnames(
              classes.iconGrid,
              isSelected && classes.selected,
              isPreComplete && classes.preComplete,
            )}
          >
            {this.renderOutstandingShort()}
          </GridItem>
          <IconVw
            icon={icon}
            bold
            size="small"
            className={classnames(
              classes.pinIcon,
              isPreComplete && classes.pinIconPreComplete,
            )}
          />
        </GridContainer>
      </Button>
    );
  };

  render = () => {
    const { variant, remaining, completed } = this.props;

    // pass in your custom variant if you need a different UI rendering
    return LOGIC_HELPERS.switchCase(variant, {
      [REMAINING]: this.renderRemaining,
      [COMPLETED_MESSAGE]: this.renderCompletedMessage,
      [PERCENTAGE]: this.renderPercentage,
      [PROGRESS_BAR]: this.renderProgressBar,
      [ICON]: this.renderIcon,
      [TEXT]: this.renderText,
      [UP_NEXT]: this.renderUpNext,
      [OUTSTANDING]: remaining,
      [COMPLETED]: completed,
      [SUMMARY]: this.renderSummary,
      [OUTSTANDING_SHORT]: this.renderOutstandingShort,
      [TOTAL]: this.renderTotal,
      [ICON_BUTTON]: this.renderIconButton,
      [DEFAULT]: this.renderDefault,
    });
  };
}

BadgeProgress.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,

  // parent props
  variant: PropTypes.string,
  completedMessage: PropTypes.string,
  icon: PropTypes.string,
  iconLabel: PropTypes.string,
  isSelected: PropTypes.bool,

  // resaga props
  completed: PropTypes.number,
  remaining: PropTypes.number,
  total: PropTypes.number,
  percentage: PropTypes.number,
  status: PropTypes.string,

  // customisable props
  className: PropTypes.string,
  primaryClassName: PropTypes.string,
  size: PropTypes.string,
  outstandingText: PropTypes.string,
  completedText: PropTypes.string,
  showCompletedMessage: PropTypes.bool,
  showCompleted: PropTypes.bool,
  showOutstanding: PropTypes.bool,
  toggleShowCompleted: PropTypes.func,
  toggleShowOutstanding: PropTypes.func,
  onClick: PropTypes.func,
};

BadgeProgress.defaultProps = {
  variant: '',
  completedMessage: 'Everything in this list is complete!',
  icon: '',
  className: '',
  primaryClassName: '',
  outstandingText: 'remaining',
  completedText: 'completed',
  size: 'md',
  showCompletedMessage: true,
  showCompleted: false,
  showOutstanding: false,

  completed: 0,
  remaining: 0,
  total: 0,
  percentage: 0,
};

export default compose(withStyles(styles, { name: 'BadgeProgress' }))(
  BadgeProgress,
);
