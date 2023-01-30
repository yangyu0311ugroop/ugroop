import { PERSON_DETAIL_HELPER } from 'apis/components/PersonDetail/helpers';
import { DEFAULT, NONE } from 'appConstants';
import { withStyles } from '@material-ui/core/styles';
import { USER_PASSPORTS_FIELDS } from 'datastore/userStore/selectors';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import { SIZE_CONSTANTS } from 'sizeConstants';
import { PASSPORT_DEFAULTS } from 'smartComponents/Person/components/Passports/constants';
import { H2 } from 'utils/constants/fontTypes';
import { COUNTRY_LIST_HELPERS } from 'utils/countrylist';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { VARIANTS } from 'variantsConstants';
import SelectField from 'smartComponents/Inputs/SelectField';
import InlineSelectForm from 'smartComponents/Editables/SelectForm';
import JText from 'components/JText';

import { CONFIG } from './config';
import styles from './styles';

const label = 'Code of Issuing State/Country Code';
const placeholder = 'Click to specify country code';
const readOnlyPlaceholder = 'No country code';

export class CountryCode extends PureComponent {
  getOnSubmit = () => {
    const { onSubmit } = this.props;
    return LOGIC_HELPERS.ifElse(
      onSubmit,
      onSubmit,
      PERSON_DETAIL_HELPER.updatePassport(this.props),
    );
  };

  renderTextOnly = () => {
    const { countryCode } = this.props;
    return countryCode && countryCode !== NONE
      ? `${COUNTRY_LIST_HELPERS.getCountryByCode(countryCode)} - ${countryCode}`
      : '';
  };

  clearValue = () => {
    const children = (
      <JText italic blue>
        Select none
      </JText>
    );
    return {
      value: null,
      children,
    };
  };

  renderTextWithLabel = () => {
    const { readOnly } = this.props;
    const countryList = [
      this.clearValue(),
      ...COUNTRY_LIST_HELPERS.getCountryList(),
    ];
    return (
      <InlineSelectForm
        label={label}
        options={countryList}
        onSubmit={this.getOnSubmit()}
        name={USER_PASSPORTS_FIELDS.countryCode}
        Typography={this.props.typography}
        value={this.renderTextOnly()}
        readOnly={readOnly}
        placeholder={placeholder}
        readOnlyPlaceholder={readOnlyPlaceholder}
      />
    );
  };

  renderInlineEditable = () => {
    const { readOnly } = this.props;
    return (
      <InlineSelectForm
        options={COUNTRY_LIST_HELPERS.getCountryList()}
        onSubmit={this.getOnSubmit()}
        name={USER_PASSPORTS_FIELDS.countryCode}
        Typography={this.props.typography}
        value={this.renderTextOnly()}
        readOnly={readOnly}
        placeholder={placeholder}
        readOnlyPlaceholder={readOnlyPlaceholder}
      />
    );
  };

  renderTextField = () => {
    const { autoFocus } = this.props;
    const data = [this.clearValue(), ...COUNTRY_LIST_HELPERS.getCountryList()];

    return (
      <SelectField
        name={USER_PASSPORTS_FIELDS.countryCode}
        label={label}
        value={
          this.props.countryCode === NONE
            ? PASSPORT_DEFAULTS.countryCode
            : this.props.countryCode
        }
        options={data}
        size={SIZE_CONSTANTS.MD}
        autoFocus={autoFocus}
      />
    );
  };

  renderProp = () => {
    const { children, countryCode } = this.props;
    return LOGIC_HELPERS.ifFunction(children, [countryCode]);
  };

  render = () => {
    const { variant } = this.props;

    return LOGIC_HELPERS.switchCase(variant, {
      [VARIANTS.TEXT_FIELD]: this.renderTextField,
      [VARIANTS.TEXT_ONLY]: this.renderTextOnly,
      [VARIANTS.INLINE]: this.renderInlineEditable,
      [VARIANTS.RENDER_PROP]: this.renderProp,
      [DEFAULT]: this.renderTextWithLabel,
    });
  };
}

CountryCode.propTypes = {
  // hoc props

  // parent props
  variant: PropTypes.string,
  children: PropTypes.func,
  readOnly: PropTypes.bool,
  typography: PropTypes.string,
  onSubmit: PropTypes.func,
  autoFocus: PropTypes.bool,

  // resaga props
  countryCode: PropTypes.string,
};

CountryCode.defaultProps = {
  variant: '',
  readOnly: false,
  typography: H2,
  autoFocus: false,

  countryCode: NONE,
};

export default compose(
  withStyles(styles, { name: 'CountryCode' }),
  resaga(CONFIG),
)(CountryCode);
