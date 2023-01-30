/**
 * Created by quando on 7/8/17.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import { withFormsy } from 'formsy-react';
import classnames from 'classnames';
import withValidation from 'utils/hoc/withValidation';
import withFormsyInterceptor from 'utils/hoc/withFormsyInterceptor';
import StyleTextField from 'components/Inputs/TextField';
import PasswordHelpBlock from 'ugcomponents/Form/components/PasswordHelpBlock';

const style = {
  root: {
    height: '100%',
  },
  inputCentered: {
    textAlign: 'center',
  },
};

export class ValidationTextField extends React.PureComponent {
  state = {
    active: false,
  };

  getInputProps = () => {
    const {
      classes,
      centered,
      InputProps,
      startAdornment,
      endAdornment,
    } = this.props;
    const center = centered
      ? {
          classes: { input: classes.inputCentered },
          ...InputProps,
        }
      : InputProps;

    return {
      startAdornment,
      endAdornment,
      ...center,
    };
  };

  getInputLabelProps = disabled => {
    const { InputLabelProps, isLabelStatic } = this.props;
    return disabled || isLabelStatic
      ? {
          shrink: true,
          ...InputLabelProps,
        }
      : InputLabelProps;
  };

  handleFocus = e => {
    this.setState({ active: true });
    if (this.props.onFocus && e) this.props.onFocus(e);
  };

  handleBlur = e => {
    // Ignore adornment blur
    if (e.target.type === 'text') {
      this.setState({ active: false });
      if (this.props.onBlur && e) this.props.onBlur(e);
    }
  };

  render = () => {
    let helpBlock;
    const {
      classes,
      // eslint-disable-line no-unused-vars
      onBlur,
      onFocus,
      extraInfo,
      passwordHelpBlock,
      helperText,
      customHelpBlock,
      wrapperClassName,
      serverError,
      alwaysVisible,
      InputProps,
      InputLabelProps,
      disabled,
      fullWidth,
      centered,
      isLabelStatic,
      rules,
      startAdornment,
      endAdornment,
      ...props
    } = this.props;
    const { active } = this.state;
    const visibility = active || props.error || alwaysVisible;
    // Same effect on form as setting input.type=hidden but is a much easier way to remove all components/padding
    if (props.type === 'hidden') return null;
    if (customHelpBlock) {
      helpBlock = customHelpBlock(this.props, this.state);
    } else if (passwordHelpBlock) {
      helpBlock = (
        <PasswordHelpBlock
          serverError={serverError}
          visibility={visibility}
          inputValue={props.value}
          rules={rules}
          validationTxt={helperText}
        />
      );
    }
    const helpText = !passwordHelpBlock || !visibility ? helperText : null;
    return (
      <div className={classnames(classes.root, wrapperClassName)}>
        <StyleTextField
          onBlur={this.handleBlur}
          onFocus={this.handleFocus}
          fullWidth={fullWidth}
          helperText={helpText}
          disabled={disabled}
          InputProps={this.getInputProps()}
          InputLabelProps={this.getInputLabelProps(disabled)}
          {...props}
        />
        {helpBlock}
        {extraInfo}
      </div>
    );
  };
}

ValidationTextField.propTypes = {
  classes: PropTypes.object.isRequired,
  extraInfo: PropTypes.node,
  value: PropTypes.any,
  type: PropTypes.string,
  disabled: PropTypes.bool,
  fullWidth: PropTypes.bool,
  helperText: PropTypes.node,
  startAdornment: PropTypes.node,
  endAdornment: PropTypes.node,
  passwordHelpBlock: PropTypes.bool,
  error: PropTypes.bool,
  serverError: PropTypes.string,
  alwaysVisible: PropTypes.bool,
  centered: PropTypes.bool,
  InputProps: PropTypes.object,
  InputLabelProps: PropTypes.object,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  customHelpBlock: PropTypes.func,
  wrapperClassName: PropTypes.string,
  isLabelStatic: PropTypes.bool,
  rules: PropTypes.array,
};

ValidationTextField.defaultProps = {
  extraInfo: '',
  serverError: '',
  disabled: false,
  alwaysVisible: false,
  InputProps: {},
  InputLabelProps: {},
  isLabelStatic: false,
  fullWidth: true,
  rules: undefined,
};

export default compose(
  withFormsyInterceptor,
  withFormsy,
  withValidation,
  withStyles(style),
)(ValidationTextField);
