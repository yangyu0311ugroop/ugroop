import { PERSON_DETAIL_HELPER } from 'apis/components/PersonDetail/helpers';
import { DEFAULT } from 'appConstants';
import { withStyles } from '@material-ui/core/styles';
import { USER_PASSPORTS_FIELDS } from 'datastore/userStore/selectors';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { VARIANTS } from 'variantsConstants';
import TextField from 'ugcomponents/Inputs/ValidationTextField';
import { EditableTextForm } from 'smartComponents/Editables';

import { CONFIG } from './config';
import styles from './styles';

const label = 'First Name';
export class FirstName extends PureComponent {
  renderDefault = () => this.renderTextWithLabel();

  renderTextWithLabel = () => (
    <React.Fragment>
      <EditableTextForm
        label={label}
        value={this.props.firstName}
        onSubmit={PERSON_DETAIL_HELPER.updatePassport(this.props)}
        name={USER_PASSPORTS_FIELDS.firstName}
        placeholder="Click to specify first name"
      />
    </React.Fragment>
  );

  renderTextOnly = () => {
    const { firstName } = this.props;
    return <span>{firstName}</span>;
  };

  renderTextField = () => (
    <TextField
      name={USER_PASSPORTS_FIELDS.firstName}
      value={this.props.firstName}
      label={label}
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

FirstName.propTypes = {
  // hoc props

  // parent props
  variant: PropTypes.string,

  // resaga props
  firstName: PropTypes.string,
};

FirstName.defaultProps = {
  firstName: '',
  variant: '',
};

export default compose(
  withStyles(styles, { name: 'FirstName' }),
  resaga(CONFIG),
)(FirstName);
