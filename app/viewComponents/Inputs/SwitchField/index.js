import React from 'react';
import PropTypes from 'prop-types';
import omit from 'lodash/omit';
import { withStyles, FormControlLabel, Switch } from 'components/material-ui';
import style from './style';

export class SwitchField extends React.PureComponent {
  getRestProps = () =>
    omit(this.props, ['classes', 'label', 'value', 'onChange']);

  handleChange = (_, checked) => {
    const { onChange } = this.props;
    onChange(checked);
  };

  renderControl = () => {
    const { value } = this.props;
    return (
      <Switch
        checked={value}
        onChange={this.handleChange}
        {...this.getRestProps()}
      />
    );
  };

  renderLabelAndControl = () => {
    const { classes, label } = this.props;
    return (
      <FormControlLabel
        label={label}
        labelPlacement="start"
        className={classes.formControlLabel}
        control={this.renderControl()}
      />
    );
  };

  render = () => {
    const { label } = this.props;
    return label ? this.renderLabelAndControl() : this.renderControl();
  };
}

SwitchField.propTypes = {
  // hoc
  classes: PropTypes.object.isRequired,

  // parent
  label: PropTypes.any,
  value: PropTypes.bool,
  onChange: PropTypes.func,
  color: PropTypes.string,
};

SwitchField.defaultProps = {
  label: null,
  value: false,
  onChange: () => {},
  color: 'primary',
};

export default withStyles(style, { name: 'viewComponents/Inputs/SwitchField' })(
  SwitchField,
);
