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
import m from './messages';
import styles from './styles';
import { FORM_NAME } from './constants';
import { makeStyles } from '../../../../../../components/material-ui';
import useSelectorCardData from '../../../../../Plan/hooks/useSelectorCardData';
const useStyles = makeStyles(styles);
function ExpiryMonth(props) {
  const classes = useStyles();
  const { intl, variant, id } = props;
  const { expMonth: expiryMonth } = useSelectorCardData({ cardId: id });
  const range = (start, stop, step) =>
    Array.from(
      { length: (stop - start) / step + 1 },
      (_, i) => start + i * step,
    );

  const getStrippedOwnProps = () =>
    omit(props, ['resaga', 'expiryMonth', 'id', 'classes', 'variant']);

  const renderSelectField = () => {
    const months = range(1, 12, 1);
    const subTypesStrip = months.map(value => ({
      value,
      children: value,
    }));
    return (
      <Select
        name={FORM_NAME}
        label={intl.formatMessage(m.label)}
        value={expiryMonth}
        options={subTypesStrip}
        {...getStrippedOwnProps()}
      />
    );
  };

  const renderTextOnly = () => <P {...getStrippedOwnProps()}>{expiryMonth}</P>;

  const renderDefault = () => (
    <React.Fragment>
      <div className={classes.lineIndicator} />
      <H1 className={classes.name} noMargin {...getStrippedOwnProps()}>
        {expiryMonth}
      </H1>
    </React.Fragment>
  );

  return LOGIC_HELPERS.switchCase(variant, {
    [FIELD_VARIANTS.TEXT_ONLY]: renderTextOnly,
    [FIELD_VARIANTS.TEXT_FIELD]: renderSelectField,
    [DEFAULT]: renderDefault,
  });
}

ExpiryMonth.propTypes = {
  intl: PropTypes.object.isRequired,
  variant: PropTypes.string,
  expiryMonth: PropTypes.number,
};

ExpiryMonth.defaultProps = {
  variant: FIELD_VARIANTS.TEXT_ONLY,
};

export default compose(injectIntl)(React.memo(ExpiryMonth));
