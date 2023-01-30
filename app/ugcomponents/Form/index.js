/**
 * Created by quando on 1/3/17.
 */

import React from 'react';
import { addValidationRule } from 'formsy-react';
import withForm from 'utils/hoc/formsy/withForm';
import validators from './validators';
export Error from './components/Error';
export Information from './components/Information';
export SectionHeader from './components/SectionHeader';
export TextField from 'ugcomponents/Inputs/ValidationTextField';
export RadioGroup from 'ugcomponents/Inputs/ValidationRadioGroup';
export SelectInput from 'ugcomponents/Inputs/ValidationSelectInput';
export Button from 'ugcomponents/Buttons/Button';

Object.keys(validators).map(key => addValidationRule(key, validators[key]));

// eslint-disable-next-line react/prop-types
export const Wrapped = ({ children, className }) => (
  <div className={className}>{children}</div>
);
export default withForm()(Wrapped);
