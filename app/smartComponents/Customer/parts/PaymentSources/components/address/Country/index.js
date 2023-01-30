import { DEFAULT } from 'appConstants';
import PropTypes from 'prop-types';
import React from 'react';
import { compose } from 'redux';
import { injectIntl } from 'react-intl';
import omit from 'lodash/omit';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { H1, P } from 'viewComponents/Typography';
import { Select } from 'ugcomponents/Inputs';
import { FIELD_VARIANTS } from 'smartComponents/Customer/constants';
import { COUNTRY_LIST } from 'countries';
import m from './messages';
import styles from './styles';
import { FORM_NAME } from './constants';
import { makeStyles } from '../../../../../../../components/material-ui';
import useSelectorCardData from '../../../../../../Plan/hooks/useSelectorCardData';
const useStyles = makeStyles(styles);
function Country(props) {
  const { intl, variant, id } = props;
  const { country } = useSelectorCardData({
    cardId: id,
  });

  const classes = useStyles();

  const getStrippedOwnProps = () =>
    omit(props, ['resaga', 'country', 'id', 'classes', 'variant']);

  const getCountryList = () =>
    COUNTRY_LIST.map(obj => ({
      value: obj.code,
      children: obj.name,
    }));

  const renderSelectField = () => {
    const subTypesStrip = getCountryList();
    return (
      <Select
        name={FORM_NAME}
        label={intl.formatMessage(m.label)}
        value={country || 'AU'}
        options={subTypesStrip}
        {...getStrippedOwnProps()}
      />
    );
  };

  const renderTextOnly = () => <P {...getStrippedOwnProps()}>{country}</P>;

  const renderDefault = () => (
    <React.Fragment>
      <div className={classes.lineIndicator} />
      <H1 className={classes.name} noMargin {...getStrippedOwnProps()}>
        {country}
      </H1>
    </React.Fragment>
  );

  return LOGIC_HELPERS.switchCase(variant, {
    [FIELD_VARIANTS.TEXT_ONLY]: renderTextOnly,
    [FIELD_VARIANTS.TEXT_FIELD]: renderSelectField,
    [DEFAULT]: renderDefault,
  });
}

Country.propTypes = {
  intl: PropTypes.object.isRequired,
  variant: PropTypes.string,
};

Country.defaultProps = {
  variant: FIELD_VARIANTS.TEXT_ONLY,
};

export default compose(injectIntl)(Country);
