/**
 * Created by edil on 7/3/17.
 */
import React from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';
import 'react-select/dist/react-select.css';

const UGSelect = ({ ...props }) => {
  const { name, value, options, onChange, ...rest } = props;
  return (
    <Select
      name={name}
      value={value}
      options={options}
      onChange={onChange}
      {...rest}
    />
  );
};

UGSelect.propTypes = {
  name: PropTypes.string,
  value: PropTypes.string,
  options: PropTypes.array,
  onChange: PropTypes.func,
};

export default UGSelect;
