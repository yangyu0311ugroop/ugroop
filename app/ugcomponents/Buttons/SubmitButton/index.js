/**
 *
 * SubmitButton
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import LaddaButton, { EXPAND_RIGHT, S } from 'react-ladda';

class SubmitButton extends React.PureComponent {
  state = {
    loading: false,
  };

  /**
   * clean up before leaving
   */
  componentWillUnmount = () => {
    this.stop();
  };

  setInterval = () => {
    const { tick, maximumTick: max } = this.props;
    this.increaseProgress(this.state.progress, tick, max);
  };

  clearInterval = () => {
    clearInterval(this.progressing);
    this.progressing = null;
  };

  isLoading = () => this.state.loading;

  /**
   * start progress only when button type is submit and not disabled
   */
  start = () => {
    if (!this.isLoading()) {
      this.setState({ progress: 0 });
      this.resume();
    }
  };

  pause = () => {
    if (this.isLoading()) {
      this.setState({ loading: false });
      this.clearInterval();
    }
  };

  resume = () => {
    if (!this.isLoading()) {
      this.clearInterval();
      this.setState({ loading: true });
      this.progressing = setInterval(this.setInterval, this.props.tickDelayMs);
    }
  };

  /**
   * simulating increasing progress bar
   */
  increaseProgress = (progress, tick, maximumTick) => {
    if (this.isLoading()) {
      const nextProgress = progress + tick;
      this.setState({
        progress: nextProgress > maximumTick ? maximumTick : nextProgress,
      });
    }
  };

  /**
   * stop progress, clean interval and reset progress
   */
  stop = () => {
    if (this.isLoading()) {
      this.pause();
      this.setState({ progress: 0 });
    }
  };

  render() {
    const {
      spinnerSize,
      spinnerLines,
      type,
      children,
      style,
      size,
      onClick,
      disabled,
    } = this.props;
    return (
      <LaddaButton
        loading={this.state.loading}
        progress={this.state.progress}
        data-size={size}
        data-style={style}
        data-spinner-size={spinnerSize}
        data-spinner-lines={spinnerLines}
        type={type}
        onClick={onClick}
        disabled={disabled}
      >
        {children}
      </LaddaButton>
    );
  }
}
SubmitButton.propTypes = {
  children: PropTypes.node.isRequired,
  tick: PropTypes.number,
  maximumTick: PropTypes.number,
  tickDelayMs: PropTypes.number,
  spinnerSize: PropTypes.number,
  spinnerLines: PropTypes.number,
  style: PropTypes.any,
  size: PropTypes.any,
  type: PropTypes.any,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
};

SubmitButton.defaultProps = {
  type: 'button',
  disabled: false,
  tick: 0.015,
  maximumTick: 0.95,
  tickDelayMs: 150,
  spinnerSize: 20,
  spinnerLines: 10,
  style: EXPAND_RIGHT,
  size: S,
};

export default SubmitButton;
