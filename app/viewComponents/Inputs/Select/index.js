/**
 * Created by stephenkarpinskyj on 5/7/18.
 */

import React from 'react';
import PropTypes from 'prop-types';
import MuiSelect from '@material-ui/core/Select';
import Input from 'viewComponents/Inputs/Input';
import { MenuItem } from '@material-ui/core';

/**
 * To be used inline with other text.
 */
export class Select extends React.Component {
  renderOptions = options => {
    const { native } = this.props;
    const Component = native ? 'option' : MenuItem;
    return options.map(({ value, children, ...rest }) => (
      <Component key={value} value={value} {...rest}>
        {children}
      </Component>
    ));
  };

  render = () => {
    const { options, inputStyle, ...props } = this.props;
    return (
      <MuiSelect input={<Input className={inputStyle} />} {...props}>
        {this.renderOptions(options)}
      </MuiSelect>
    );
  };
}

Select.propTypes = {
  // parent
  /** Option structure: { value: string, children: string, ...rest } */
  options: PropTypes.array,
  native: PropTypes.bool,
  inputStyle: PropTypes.string,
};

Select.defaultProps = {
  options: null,
  native: true,
};

export default Select;
