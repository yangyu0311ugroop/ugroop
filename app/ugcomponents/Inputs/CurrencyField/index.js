/**
 * Created by stephenkarpinskyj on 26/4/18.
 */

import React from 'react';
import Select from 'ugcomponents/Inputs/SelectField';

export class CurrencyField extends React.PureComponent {
  constructor(props) {
    super(props);

    // TODO: Create from a static list via npm/currency-codes or similar
    this.currencies = [
      this.makeCurrencyOption(),
      this.makeCurrencyOption('USD', 'United States Dollar'),
      this.makeCurrencyOption('EUR', 'European Euro'),
      this.makeCurrencyOption('JPY', 'Japanese Yen'),
      this.makeCurrencyOption('GBP', 'British Pound'),
      this.makeCurrencyOption('CHF', 'Swiss Franc'),
      this.makeCurrencyOption('CAD', 'Canadian Dollar'),
      this.makeCurrencyOption('AUD', 'Australian Dollar'),
      this.makeCurrencyOption('NZD', 'New Zealand Dollar'),
      this.makeCurrencyOption('ZAR', 'South African Rand'),
    ];
  }

  makeCurrencyOption = (code = '', name = 'None') => ({
    value: code,
    children: name,
  });

  render = () => <Select options={this.currencies} {...this.props} />;
}

CurrencyField.propTypes = {};

CurrencyField.defaultProps = {};

export default CurrencyField;
