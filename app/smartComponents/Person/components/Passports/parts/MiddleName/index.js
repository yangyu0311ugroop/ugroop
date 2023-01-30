import { PERSON_DETAIL_HELPER } from 'apis/components/PersonDetail/helpers';
import { DEFAULT } from 'appConstants';
import { USER_PASSPORTS_FIELDS } from 'datastore/userStore/selectors';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import { LOGIC_HELPERS } from 'utils/helpers/logic';

import { EditableTextForm } from 'smartComponents/Editables';

import TextField from 'ugcomponents/Inputs/ValidationTextField';
import { VARIANTS } from 'variantsConstants';

import { CONFIG } from './config';
import styles from './styles';

const label = 'Middle Name';
export class MiddleName extends PureComponent {
  renderDefault = () => this.renderTextWithLabel();

  renderTextWithLabel = () => (
    <React.Fragment>
      <EditableTextForm
        label={label}
        value={this.props.middleName}
        name={USER_PASSPORTS_FIELDS.middleName}
        onSubmit={PERSON_DETAIL_HELPER.updatePassport(this.props)}
        placeholder="Click to specify middle name"
      />
    </React.Fragment>
  );

  renderTextOnly = () => {
    const { middleName } = this.props;
    return <span>{middleName}</span>;
  };

  renderTextField = () => (
    <TextField
      label={label}
      value={this.props.middleName}
      name={USER_PASSPORTS_FIELDS.middleName}
    />
  );

  render = () => {
    const { variant } = this.props;

    return LOGIC_HELPERS.switchCase(variant, {
      [VARIANTS.TEXT_WITH_LABEL]: this.renderTextWithLabel,
      [VARIANTS.TEXT_FIELD]: this.renderTextField,
      [VARIANTS.TEXT_ONLY]: this.renderTextOnly,
      [DEFAULT]: this.renderDefault,
    });
  };
}

MiddleName.propTypes = {
  // hoc props

  // parent props
  variant: PropTypes.string,

  // resaga props
  middleName: PropTypes.string,
};

MiddleName.defaultProps = {
  middleName: '',
  variant: '',
};

export default compose(
  withStyles(styles, { name: 'MiddleName' }),
  resaga(CONFIG),
)(MiddleName);
