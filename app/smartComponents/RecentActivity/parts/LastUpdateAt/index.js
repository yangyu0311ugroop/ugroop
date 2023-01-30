import React, { PureComponent } from 'react';
import { withStyles } from '@material-ui/core/styles';
import resaga from 'resaga';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { compose } from 'redux';
import { MOMENT_HELPERS } from 'utils/helpers/moment';
import { CONFIG } from './config';
import styles from './styles';
import { LOGIC_HELPERS } from '../../../../utils/helpers/logic';

export class LastUpdateAt extends PureComponent {
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
    const { classes, className, indent } = this.props;

    return classnames(
      classes.default,
      LOGIC_HELPERS.ifElse(indent, classes.indent),
      className,
    );
  };

  renderDefault = () => {
    const { lastUpdate } = this.props;
    if (!lastUpdate) {
      return null;
    }

    return (
      <span className={this.contentClassName()}>
        {MOMENT_HELPERS.timeSince(lastUpdate)}
      </span>
    );
  };

  renderProp = () => {
    const { lastUpdate, children } = this.props;

    if (!lastUpdate) return null;

    if (typeof children === 'function') {
      return children({
        timeSince: MOMENT_HELPERS.timeSince(lastUpdate),
        time: MOMENT_HELPERS.renderDayDateTime(lastUpdate),
      });
    }

    return this.renderDefault();
  };

  render = () => {
    const { children } = this.props;

    if (typeof children === 'function') {
      return this.renderProp();
    }

    return this.renderDefault();
  };
}

LastUpdateAt.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,
  // parent props
  indent: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.func,

  // resaga props
  lastUpdate: PropTypes.string,

  // customisable props
  intervalMs: PropTypes.number,
};

LastUpdateAt.defaultProps = {
  className: '',
  lastUpdate: '',
  indent: false,
  intervalMs: 60 * 1000,
};

export default compose(
  withStyles(styles, { name: 'Time' }),
  resaga(CONFIG),
)(LastUpdateAt);
