/**
 * Created by Yang on 7/8/17.
 */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import MuiTextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import stylesheet from './style';

export class TextField extends PureComponent {
  render = () => {
    const {
      classes,
      isValid,
      capitalize,
      error,
      InputProps,
      className,
      InputLabelProps,
      attachmentTextField,
      ...props
    } = this.props;

    const mainInputLabelProps = {
      ...InputLabelProps,
    };
    return (
      <MuiTextField
        id={`${Date.now()}`}
        InputLabelProps={mainInputLabelProps}
        InputProps={InputProps}
        className={classNames(
          classes.root,
          isValid() && classes.valid,
          capitalize && classes.capitalize,
          error && classes.error,
          attachmentTextField && classes.attachmentTextField,
          className,
        )}
        error={error}
        {...props}
      />
    );
  };
}

TextField.propTypes = {
  classes: PropTypes.object.isRequired,
  name: PropTypes.string,
  isValid: PropTypes.func,
  InputProps: PropTypes.object,
  capitalize: PropTypes.bool,
  error: PropTypes.bool,
  className: PropTypes.string,
  InputLabelProps: PropTypes.object,
  attachmentTextField: PropTypes.bool,
};

TextField.defaultProps = {
  attachmentTextField: false,
  isValid: () => {},
  InputProps: { inputProps: {} },
  InputLabelProps: {},
};

export default withStyles(stylesheet, { name: 'TextField' })(TextField);
