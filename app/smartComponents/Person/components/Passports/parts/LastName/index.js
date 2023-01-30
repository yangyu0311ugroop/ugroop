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

const label = 'Last Name';
export class LastName extends PureComponent {
  renderDefault = () => this.renderTextWithLabel();

  renderTextWithLabel = () => (
    <React.Fragment>
      <EditableTextForm
        label={label}
        onSubmit={PERSON_DETAIL_HELPER.updatePassport(this.props)}
        value={this.props.lastName}
        name={USER_PASSPORTS_FIELDS.lastName}
        placeholder="Click to specify last name"
      />
    </React.Fragment>
  );

  renderTextOnly = () => {
    const { lastName } = this.props;
    return <span>{lastName}</span>;
  };

  renderTextField = () => (
    <TextField
      name={USER_PASSPORTS_FIELDS.lastName}
      label={label}
      value={this.props.lastName}
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

LastName.propTypes = {
  // hoc props

  // parent props
  variant: PropTypes.string,

  // resaga props
  lastName: PropTypes.string,
};

LastName.defaultProps = {
  lastName: '',
  variant: '',
};

export default compose(
  withStyles(styles, { name: 'LastName' }),
  resaga(CONFIG),
)(LastName);
