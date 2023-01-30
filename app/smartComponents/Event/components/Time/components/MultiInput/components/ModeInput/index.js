import React from 'react';
import PropTypes from 'prop-types';
import { SIZE_CONSTANTS } from 'sizeConstants';
import { NODE_CONSTANTS } from 'utils/constants/nodes';
import { withStyles } from 'components/material-ui';
import GridItem from 'components/GridItem';
import { ForEachEventVariant } from 'smartComponents/Event/logics';
import { Checkbox } from 'ugcomponents/Inputs';
import style from './style';

export class MultiModeInput extends React.PureComponent {
  getCheckboxValue = () =>
    this.props.mode === NODE_CONSTANTS.TIME_MODES.relativeStart;

  handleModeChange = (_, checked) => {
    const mode = checked
      ? NODE_CONSTANTS.TIME_MODES.relativeStart
      : NODE_CONSTANTS.TIME_MODES.relative;
    this.props.onChange(mode);
  };

  renderDefault = () => {
    const { classes, inputs, multiInputLabel } = this.props;
    return (
      <GridItem classes={classes}>
        <Checkbox
          label={multiInputLabel}
          value={this.getCheckboxValue()}
          onChange={this.handleModeChange}
          compact
          size={SIZE_CONSTANTS.SM}
          {...inputs.tempMode}
        />
      </GridItem>
    );
  };

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

MultiModeInput.propTypes = {
  // hoc
  classes: PropTypes.object.isRequired,

  // parent
  variant: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  inputs: PropTypes.object,
  multiInputLabel: PropTypes.node,
  mode: PropTypes.string,
  onChange: PropTypes.func,
};

MultiModeInput.defaultProps = {
  variant: null,
  value: false,
  inputs: {},
  multiInputLabel: 'Specify as duration?',
  mode: null,
  onChange: () => {},
};

export default withStyles(style, { name: 'Event/Time/MultiInput/ModeInput' })(
  MultiModeInput,
);
