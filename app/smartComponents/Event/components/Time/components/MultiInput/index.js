/**
 * Created by stephenkarpinskyj on 5/9/18.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { NODE_CONSTANTS } from 'utils/constants/nodes';
import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import { ForEachEventVariant } from 'smartComponents/Event/logics';
import { Data } from 'ugcomponents/Inputs';
import DurationInput from '../DurationInput';
import DayTimeInput from '../DayTimeInput';
import ModeInput from './components/ModeInput';

export class MultiInput extends React.PureComponent {
  state = {
    mode: null,
  };

  getModeValue = () => this.props.mode || NODE_CONSTANTS.TIME_MODES.relative;

  getCurrentModeValue = () => {
    const { mode } = this.state;
    return mode || this.getModeValue();
  };

  handleModeChange = mode => {
    this.setState({ mode });
  };

  renderModeData = () => {
    const { inputs } = this.props;
    return <Data {...inputs.mode} value={this.getCurrentModeValue()} />;
  };

  renderMode = () => (
    <React.Fragment>
      <ModeInput {...this.props} onChange={this.handleModeChange} />
      {this.renderModeData()}
    </React.Fragment>
  );

  renderInput = () => {
    const { singleColumn } = this.props;
    switch (this.getCurrentModeValue()) {
      case NODE_CONSTANTS.TIME_MODES.relativeStart:
        return (
          <GridItem xs={12} sm={singleColumn ? 12 : 8}>
            <DurationInput {...this.props} />
          </GridItem>
        );

      default:
        return (
          <GridItem>
            <DayTimeInput renderModeData={false} {...this.props} />
          </GridItem>
        );
    }
  };

  renderDefault = () => (
    <GridContainer direction="column">
      {this.renderMode()}
      {this.renderInput()}
    </GridContainer>
  );

  render = () => {
    const { variant } = this.props;
    return (
      <ForEachEventVariant
        variant={variant}
        renderDefault={this.renderDefault}
      />
    );
  };
}

MultiInput.propTypes = {
  // parent
  variant: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  inputs: PropTypes.object,
  mode: PropTypes.string,
  singleColumn: PropTypes.bool,
};

MultiInput.defaultProps = {
  variant: null,
  value: false,
  inputs: {},
  mode: null,
  singleColumn: false,
};

export default MultiInput;
