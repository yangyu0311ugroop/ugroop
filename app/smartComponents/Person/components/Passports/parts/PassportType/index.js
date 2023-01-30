import { PERSON_DETAIL_HELPER } from 'apis/components/PersonDetail/helpers';
import { DEFAULT } from 'appConstants';
import { withStyles } from '@material-ui/core/styles';
import { USER_PASSPORTS_FIELDS } from 'datastore/userStore/selectors';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import { PASSPORT_TYPES } from 'smartComponents/Person/components/Passports/constants';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import TextField from 'ugcomponents/Inputs/ValidationTextField';
import SelectField from 'smartComponents/Inputs/SelectField';
import { VARIANTS } from 'variantsConstants';
import memoize from 'memoize-one';
import Form from 'smartComponents/Editables/Form';
import get from 'lodash/get';

import { CONFIG } from './config';
import styles from './styles';

const label = 'Passport Type';
export class PassportType extends PureComponent {
  state = {
    showTextField: false,
  };

  componentDidMount = () => {
    this.setState({
      showTextField:
        this.getPassportFiltered(this.props.passportType)[0] === undefined,
    });
  };

  getOnSubmit = () => {
    const { onSubmit } = this.props;
    return LOGIC_HELPERS.ifElse(
      onSubmit,
      onSubmit,
      PERSON_DETAIL_HELPER.updatePassport(this.props),
    );
  };

  onChange = value => {
    if (value === PASSPORT_TYPES[PASSPORT_TYPES.length - 1].value) {
      this.setState({
        showTextField: true,
      });
    } else if (this.state.showTextField) {
      this.setState({
        showTextField: false,
      });
    }
  };

  onClose = () => {
    const passport = this.getPassportFiltered(this.props.passportType);
    const isPassportTypeOther = passport.length === 0;

    if (isPassportTypeOther) {
      this.setState({ showTextField: true });
    } else {
      this.setState({ showTextField: false });
    }
  };

  getPassportFiltered = memoize(currPassportType =>
    PASSPORT_TYPES.filter(type => type.value === currPassportType).filter(
      type => type.value !== PASSPORT_TYPES[PASSPORT_TYPES.length - 1].value,
    ),
  );

  getValue = () => {
    const passportType = this.getPassportFiltered(this.props.passportType);

    return passportType[0] ? passportType[0].children : this.props.passportType;
  };

  renderTextOnly = () => <span>{this.getValue()}</span>;

  renderTextWithLabel = () => {
    const { readOnly } = this.props;
    return (
      <React.Fragment>
        <Form
          label={label}
          placeholder="Click to specify passport type"
          name={USER_PASSPORTS_FIELDS.passportType}
          value={this.getValue()}
          readOnly={readOnly}
          readOnlyPlaceholder="No passport type"
          onSubmit={this.getOnSubmit()}
          onClose={this.onClose}
        >
          {this.renderTextField()}
        </Form>
      </React.Fragment>
    );
  };

  renderOtherTextField = passport =>
    this.state.showTextField ? (
      <GridItem xs={6}>
        <TextField
          name={USER_PASSPORTS_FIELDS.passportOtherType}
          placeholder="Specify type"
          value={LOGIC_HELPERS.ifElse(passport[0], '', this.props.passportType)}
        />
      </GridItem>
    ) : null;

  renderTextField = () => {
    const passport = this.getPassportFiltered(this.props.passportType);
    const otherTypeValue = PASSPORT_TYPES[PASSPORT_TYPES.length - 1].value;

    return (
      <GridContainer alignItems="flex-end">
        <GridItem xs={LOGIC_HELPERS.ifElse(this.state.showTextField, 6, 12)}>
          <SelectField
            options={PASSPORT_TYPES}
            name={USER_PASSPORTS_FIELDS.passportType}
            label={label}
            onChange={this.onChange}
            value={get(passport[0], 'value', otherTypeValue)}
          />
        </GridItem>
        {this.renderOtherTextField(passport)}
      </GridContainer>
    );
  };

  render = () => {
    const { variant } = this.props;

    return LOGIC_HELPERS.switchCase(variant, {
      [VARIANTS.TEXT_FIELD]: this.renderTextField,
      [VARIANTS.TEXT_ONLY]: this.renderTextOnly,
      [DEFAULT]: this.renderTextWithLabel,
    });
  };
}

PassportType.propTypes = {
  // hoc props

  // parent props
  variant: PropTypes.string,
  readOnly: PropTypes.bool,
  onSubmit: PropTypes.func,

  // resaga props
  passportType: PropTypes.string,
};

PassportType.defaultProps = {
  variant: '',
  readOnly: false,

  passportType: PASSPORT_TYPES[0].value,
};

export default compose(
  withStyles(styles, { name: 'PassportType' }),
  resaga(CONFIG),
)(PassportType);
