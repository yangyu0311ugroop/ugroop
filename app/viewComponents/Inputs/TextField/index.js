import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import MuiTextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import styles from './styles';

export class TextField extends PureComponent {
  render() {
    const { classes, className, error, ...props } = this.props;

    return (
      <MuiTextField
        className={classNames(classes.root, error && classes.error, className)}
        error={error}
        {...props}
      />
    );
  }
}

TextField.propTypes = {
  classes: PropTypes.object.isRequired,
  /** Append to existing */
  className: PropTypes.string,
  disabled: PropTypes.bool,
  error: PropTypes.bool,
  helperText: PropTypes.string,
  label: PropTypes.any,
};

TextField.defaultProps = {};

export default withStyles(styles, { name: 'viewComponents/TextField' })(
  TextField,
);
