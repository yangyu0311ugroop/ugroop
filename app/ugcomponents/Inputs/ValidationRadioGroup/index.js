/**
 * Created by quando on 7/8/17.
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { withFormsy } from 'formsy-react';
import Radio from '@material-ui/core/Radio';
import UGRadioGroup from 'components/Inputs/RadioGroup';
import { FormControl, FormLabel, FormControlLabel } from '@material-ui/core';
import classnames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import withValidation from 'utils/hoc/withValidation/index';

const styles = {
  label: {
    height: '30px',
    fontWeight: '300',
  },
  noMargin: {
    margin: 0,
  },
  margin: {
    marginTop: '32px',
    marginBottom: '0',
  },
  radio: {
    color: '#7097EB !important',
  },
};

export class ValidationRadioGroup extends Component {
  componentDidMount = () => {};

  render = () => {
    const {
      row,
      label,
      styleLabel,
      name,
      options,
      value,
      onChange,
      noMargin,
      required,
      isValid,
      radioClass,
      helperText,
      error,
      formLabelClassName,
      classes, // eslint-disable-line no-unused-vars
      children,
      formError,
      showIndicator,
      ...props
    } = this.props;
    let margin = styles.margin;
    if (noMargin) {
      margin = styles.noMargin;
    }
    const radioButton = (
      <Radio classes={{ checked: classnames(classes.radio, radioClass) }} />
    );
    let radioChildren = children;
    if (!radioChildren) {
      radioChildren = Object.keys(options).map(key => (
        <FormControlLabel
          className={styleLabel}
          style={styles.label}
          key={key}
          value={key}
          control={radioButton}
          label={options[key]}
        />
      ));
    }

    return (
      <FormControl
        style={margin}
        margin="normal"
        required={required}
        error={formError}
      >
        {label && (
          <FormLabel
            className={formLabelClassName}
            required={required && showIndicator}
          >
            {label}
          </FormLabel>
        )}
        <UGRadioGroup
          name={name}
          value={value}
          onChange={onChange}
          row={row}
          {...props}
        >
          {radioChildren}
        </UGRadioGroup>
      </FormControl>
    );
  };
}

ValidationRadioGroup.propTypes = {
  classes: PropTypes.object.isRequired,
  helperText: PropTypes.node,
  error: PropTypes.node,
  value: PropTypes.node,
  label: PropTypes.node,
  row: PropTypes.bool,
  noMargin: PropTypes.bool,
  required: PropTypes.bool,
  name: PropTypes.string,
  options: PropTypes.object,
  isValid: PropTypes.func,
  styleLabel: PropTypes.string,
  formLabelClassName: PropTypes.string,
  onChange: PropTypes.func, // injected by Validation HOC
  radioClass: PropTypes.string,
  children: PropTypes.object,
  formError: PropTypes.bool,
  showIndicator: PropTypes.bool,
};
ValidationRadioGroup.defaultProps = {
  showIndicator: true,
};

export default compose(
  withFormsy,
  withValidation,
  withStyles(styles, { name: 'RadioGroup' }),
)(ValidationRadioGroup);
