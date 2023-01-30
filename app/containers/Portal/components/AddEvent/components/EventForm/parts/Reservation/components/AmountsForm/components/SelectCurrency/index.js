import { TEMPLATE_API_HELPERS } from 'apis/components/Template/helpers';
import { ADMIN_TOUR_SETTINGS, CURRENCY_OPTIONS } from 'appConstants';
import { FilledTextField } from 'components/Inputs/TextField/components/FilledInputs';
import { makeSingleSelect } from 'datastore/selectUtility';
import PropTypes from 'prop-types';
import React from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import get from 'lodash/get';
import { useSelector } from 'react-redux';
import { Select } from 'smartComponents/Inputs';
import {
  selectHomeCurrency,
  selectLastCurrencyAdded,
} from 'smartComponents/Node/types/Event/components/AmountsCard/selectors';
import { LOGIC_HELPERS } from 'utils/helpers/logic';

function SelectCurrency(props) {
  const { templateId, value, onChange, ...rest } = props;

  const homeCurrency = useSelector(state =>
    makeSingleSelect(selectHomeCurrency)(state, {
      templateId,
    }),
  );
  const lastCurrencyAdded = useSelector(state =>
    makeSingleSelect(selectLastCurrencyAdded)(state, {
      templateId,
    }),
  );

  const currency = value || get(lastCurrencyAdded, 'value') || homeCurrency;

  const setLastCurrency = val => {
    if (val === get(lastCurrencyAdded, 'value')) return null;

    TEMPLATE_API_HELPERS.upsertSetting(
      {
        id: templateId,
        settingId: get(lastCurrencyAdded, 'id', 0),
        key: ADMIN_TOUR_SETTINGS.LAST_CURRENCY_ADDED,
        value: val,
      },
      props,
    );

    return LOGIC_HELPERS.ifFunction(onChange, [val]);
  };

  return (
    <Select
      value={currency}
      label="Currency"
      options={CURRENCY_OPTIONS}
      component={FilledTextField}
      SelectProps={{ native: true }}
      onChange={setLastCurrency}
      {...rest}
    />
  );
}

SelectCurrency.propTypes = {
  templateId: PropTypes.number,
  data: PropTypes.object,
  value: PropTypes.string,
  onChange: PropTypes.func,
};
SelectCurrency.defaultProps = {};

export default compose(resaga({}))(SelectCurrency);
