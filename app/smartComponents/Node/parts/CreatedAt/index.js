import { DEFAULT } from 'appConstants';
import classnames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { MOMENT_HELPERS } from 'utils/helpers/moment';
import { moment } from 'utils/index';
import { VARIANTS } from 'variantsConstants';
import { CONFIG } from './config';
import styles from './styles';

export class CreatedAt extends PureComponent {
  componentDidMount = () => {
    const { intervalMs } = this.props;

    this.updateTime = setInterval(this.updateTimeHandler, intervalMs);
  };

  componentWillUnmount = () => {
    clearInterval(this.updateTime);
  };

  updateTimeHandler = () => {
    this.forceUpdate();
  };

  contentClassName = () => {
    const { classes, className, lowercase } = this.props;

    return classnames(
      classes.default,
      LOGIC_HELPERS.ifElse(lowercase, classes.lowercase),
      className,
    );
  };

  renderTitle = () => {
    const { createdAt } = this.props;

    return `${moment.renderDayDate(createdAt)} at ${moment.renderTime(
      createdAt,
    )}`;
  };

  renderDefault = () => {
    const { createdAt, showTime, showFromNow } = this.props;

    if (!createdAt) {
      return null;
    }
    const content = showFromNow
      ? MOMENT_HELPERS.renderFromNow(createdAt, showTime)
      : MOMENT_HELPERS.timeSinceAtLeast(createdAt, showTime, undefined, {
          postfix: ' ago',
          renderFn: MOMENT_HELPERS.renderCalendarWithTime,
        });

    return (
      <span title={this.renderTitle()} className={this.contentClassName()}>
        {content}
      </span>
    );
  };

  renderDate = () => {
    const { createdAt } = this.props;

    if (!createdAt) {
      return null;
    }

    return (
      <span title={this.renderTitle()} className={this.contentClassName()}>
        {MOMENT_HELPERS.renderDate(createdAt)}
      </span>
    );
  };

  renderSimpleTooltip = () => {
    const { children, wrapper: Component } = this.props;

    return <Component title={this.renderTitle()}>{children}</Component>;
  };

  render = () => {
    const { variant } = this.props;

    // pass in your custom variant if you need a different UI rendering
    return LOGIC_HELPERS.switchCase(variant, {
      [VARIANTS.SIMPLE_TOOLTIP]: this.renderSimpleTooltip,
      [VARIANTS.DATE]: this.renderDate,
      [DEFAULT]: this.renderDefault,
    });
  };
}

CreatedAt.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,

  // parent props
  variant: PropTypes.node,
  className: PropTypes.string,
  children: PropTypes.node,
  wrapper: PropTypes.node,

  // resaga props
  createdAt: PropTypes.string,

  // customisable props
  intervalMs: PropTypes.number,
  showTime: PropTypes.bool,
  showFromNow: PropTypes.bool,
  lowercase: PropTypes.bool,
};

CreatedAt.defaultProps = {
  variant: '',
  className: '',

  createdAt: '',
  wrapper: 'div',
  intervalMs: 60 * 1000,
  showFromNow: false,
};

export default compose(
  withStyles(styles, { name: 'CreatedAt' }),
  resaga(CONFIG),
)(CreatedAt);
