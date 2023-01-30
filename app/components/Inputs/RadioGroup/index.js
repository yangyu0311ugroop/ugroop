/**
 * Created by Yang on 7/8/17.
 */
import { omit } from 'lodash';
import React from 'react';
import RadioGroup from '@material-ui/core/RadioGroup';

function UGRadioGroup(props) {
  const newProps = omit(props, 'innerRef');
  return <RadioGroup {...newProps} />;
}

UGRadioGroup.propTypes = {};

export default UGRadioGroup;
