import React from 'react';
import PropTypes from 'prop-types';
import resaga from 'resaga';
import { DEFAULT } from 'appConstants';
import { VARIANTS } from 'variantsConstants';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { MEDICAL_SEVERITIES } from 'utils/constants/people';
import { MEDICAL_SEVERITY_HELPERS } from 'utils/helpers/people';
import { MedicalIcon } from 'viewComponents/People';
import { Select } from 'ugcomponents/Inputs';
import inputs from './inputs';
import { CONFIG } from './config';

export class MedicalSeverity extends React.PureComponent {
  getValue = () => {
    const { value } = this.props;
    return value || MEDICAL_SEVERITIES.mild;
  };

  renderIcon = () => <MedicalIcon severity={this.getValue()} />;

  renderOptions = () => {
    if (!this.options) {
      this.options = Object.values(MEDICAL_SEVERITIES).map(mode => ({
        value: mode,
        children: MEDICAL_SEVERITY_HELPERS.renderSeverity(mode),
      }));
    }
    return this.options;
  };

  renderTextField = () => (
    <Select
      value={this.getValue()}
      options={this.renderOptions()}
      {...inputs.textField}
    />
  );

  render = () => {
    const { variant } = this.props;

    return LOGIC_HELPERS.switchCase(variant, {
      [VARIANTS.TEXT_FIELD]: this.renderTextField,
      [DEFAULT]: this.renderIcon,
    });
  };
}

MedicalSeverity.propTypes = {
  // parent
  variant: PropTypes.string,

  // resaga value
  value: PropTypes.string,
};

MedicalSeverity.defaultProps = {
  variant: '',

  value: '',
};

export default resaga(CONFIG)(MedicalSeverity);
