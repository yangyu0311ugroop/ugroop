/**
 * Created by stephenkarpinskyj on 5/7/18.
 */

import React from 'react';
import PropTypes from 'prop-types';
import TextField from 'viewComponents/Inputs/TextField';
import { MenuItem } from '@material-ui/core';

/**
 * Text field with input configured as a select.
 */
export class SelectField extends React.Component {
  renderOptions = options => {
    const { SelectProps } = this.props;
    const Component = SelectProps.native ? 'option' : MenuItem;
    return options.map(({ value, children, ...rest }) => (
      <Component key={value} value={value} {...rest}>
        {children}
      </Component>
    ));
  };

  render = () => {
    const { options, component: Component, ...props } = this.props;
    return (
      <Component select {...props}>
        {this.renderOptions(options)}
      </Component>
    );
  };
}

SelectField.propTypes = {
  // parent
  /** Option structure: { value: string, children: string, ...rest } */
  options: PropTypes.array.isRequired,
  SelectProps: PropTypes.object,
  component: PropTypes.any,
};

SelectField.defaultProps = {
  SelectProps: {
    displayEmpty: true,
  },
  component: TextField,
};

export default SelectField;
