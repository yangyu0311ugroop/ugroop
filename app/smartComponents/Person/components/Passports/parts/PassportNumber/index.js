import { PERSON_DETAIL_HELPER } from 'apis/components/PersonDetail/helpers';
import { DEFAULT } from 'appConstants';
import { USER_PASSPORTS_FIELDS } from 'datastore/userStore/selectors';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import TextField from 'ugcomponents/Inputs/ValidationTextField';
import { VARIANTS } from 'variantsConstants';
import { EditableTextForm } from 'smartComponents/Editables';

import { CONFIG } from './config';
import styles from './styles';

const label = 'Passport Number';
export class PassportNumber extends PureComponent {
  getOnSubmit = () => {
    const { onSubmit } = this.props;
    return LOGIC_HELPERS.ifElse(
      onSubmit,
      onSubmit,
      PERSON_DETAIL_HELPER.updatePassport(this.props),
    );
  };

  renderTextOnly = () => {
    const { passportNumber } = this.props;
    return passportNumber;
  };

  renderTextWithLabel = () => {
    const { readOnly } = this.props;
    return (
      <EditableTextForm
        label={label}
        onSubmit={this.getOnSubmit()}
        name={USER_PASSPORTS_FIELDS.passportNumber}
        value={this.props.passportNumber}
        readOnly={readOnly}
        placeholder="Click to specify passport number"
        readOnlyPlaceholder="No passport number"
      />
    );
  };

  renderTextField = () => {
    const { autoFocus } = this.props;
    return (
      <TextField
        name={USER_PASSPORTS_FIELDS.passportNumber}
        value={this.props.passportNumber}
        label={label}
        autoFocus={autoFocus}
      />
    );
  };

  renderProp = () => {
    const { children } = this.props;
    return LOGIC_HELPERS.ifFunction(children, [this.renderTextOnly()]);
  };

  render = () => {
    const { variant } = this.props;

    return LOGIC_HELPERS.switchCase(variant, {
      [VARIANTS.TEXT_FIELD]: this.renderTextField,
      [VARIANTS.TEXT_ONLY]: this.renderTextOnly,
      [VARIANTS.RENDER_PROP]: this.renderProp,
      [DEFAULT]: this.renderTextWithLabel,
    });
  };
}

PassportNumber.propTypes = {
  // hoc props

  // parent props
  variant: PropTypes.string,
  children: PropTypes.func,
  readOnly: PropTypes.bool,
  onSubmit: PropTypes.func,
  autoFocus: PropTypes.bool,

  // resaga props
  passportNumber: PropTypes.string,
};

PassportNumber.defaultProps = {
  variant: '',
  readOnly: false,
  autoFocus: false,

  passportNumber: '',
};

export default compose(
  withStyles(styles, { name: 'PassportNumber' }),
  resaga(CONFIG),
)(PassportNumber);
