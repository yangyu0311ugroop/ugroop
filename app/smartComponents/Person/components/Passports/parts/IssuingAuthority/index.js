import { PERSON_DETAIL_HELPER } from 'apis/components/PersonDetail/helpers';
import { DEFAULT } from 'appConstants';
import { withStyles } from '@material-ui/core/styles';
import { USER_PASSPORTS_FIELDS } from 'datastore/userStore/selectors';
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

const label = 'Issuing Authority';
export class IssuingAuthority extends PureComponent {
  getOnSubmit = () => {
    const { onSubmit } = this.props;
    return LOGIC_HELPERS.ifElse(
      onSubmit,
      onSubmit,
      PERSON_DETAIL_HELPER.updatePassport(this.props),
    );
  };

  renderDefault = () => this.renderTextWithLabel();

  renderTextOnly = () => {
    const { issuingAuthority } = this.props;
    return <span>{issuingAuthority}</span>;
  };

  renderTextWithLabel = () => {
    const { readOnly, issuingAuthority } = this.props;
    return (
      <EditableTextForm
        value={issuingAuthority}
        label={label}
        readOnly={readOnly}
        placeholder="Click to specify issuing authority"
        readOnlyPlaceholder="No issuing authority"
        onSubmit={this.getOnSubmit()}
        name={USER_PASSPORTS_FIELDS.issuingAuthority}
      />
    );
  };

  renderTextField = () => (
    <TextField
      name="issuingAuthority"
      label={label}
      value={this.props.issuingAuthority}
    />
  );

  render = () => {
    const { variant } = this.props;

    return LOGIC_HELPERS.switchCase(variant, {
      [VARIANTS.TEXT_FIELD]: this.renderTextField,
      [VARIANTS.TEXT_WITH_LABEL]: this.renderTextWithLabel,
      [VARIANTS.TEXT_ONLY]: this.renderTextOnly,
      [DEFAULT]: this.renderDefault,
    });
  };
}

IssuingAuthority.propTypes = {
  // hoc props

  // parent props
  variant: PropTypes.string,
  readOnly: PropTypes.bool,
  onSubmit: PropTypes.func,

  // resaga props
  issuingAuthority: PropTypes.string,
};

IssuingAuthority.defaultProps = {
  variant: '',
  readOnly: false,

  issuingAuthority: '',
};

export default compose(
  withStyles(styles, { name: 'IssuingAuthority' }),
  resaga(CONFIG),
)(IssuingAuthority);
