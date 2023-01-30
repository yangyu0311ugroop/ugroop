import { withStyles } from '@material-ui/core/styles';
import { DEFAULT } from 'appConstants';
import PropTypes from 'prop-types';
import { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import MOMENT_HELPERS from 'utils/helpers/moment';
import { CONFIG } from './config';
import styles from './styles';

export class CountDown extends PureComponent {
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

  timeToGo = () => {
    const { startTime } = this.props;

    return MOMENT_HELPERS.timeToGo(startTime);
  };

  timeLeft = () => {
    const { endTime } = this.props;

    return MOMENT_HELPERS.timeToGo(endTime);
  };

  renderDefault = () => {
    const { children, startTime, endTime } = this.props;
    const timeToGo = this.timeToGo();
    const timeLeft = this.timeLeft();

    if (typeof children === 'function') {
      return children({ timeToGo, timeLeft, startTime, endTime });
    }

    return timeToGo;
  };

  render = () => {
    const { variant } = this.props;

    return LOGIC_HELPERS.switchCase(variant, {
      [DEFAULT]: this.renderDefault,
    });
  };
}

CountDown.propTypes = {
  // hoc props
  // classes: PropTypes.object.isRequired,
  // resaga: PropTypes.object.isRequired,

  // parent
  children: PropTypes.func,
  variant: PropTypes.string,
  startTime: PropTypes.string,
  endTime: PropTypes.string,
  intervalMs: PropTypes.number,

  // resaga
};

CountDown.defaultProps = {
  intervalMs: 30 * 1000,
};

export default compose(
  withStyles(styles, { name: 'CountDown' }),
  resaga(CONFIG),
)(CountDown);
