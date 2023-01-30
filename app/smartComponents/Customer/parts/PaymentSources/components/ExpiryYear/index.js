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
import useSelectorCardData from '../../../../../Plan/hooks/useSelectorCardData';
import { makeStyles } from '../../../../../../components/material-ui';

const useStyles = makeStyles(styles);
function ExpiryYear(props) {
  const classes = useStyles();
  const { intl, id } = props;
  const { expYear: expiryYear } = useSelectorCardData({ cardId: id });
  const range = (start, stop, step) =>
    Array.from(
      { length: (stop - start) / step + 1 },
      (_, i) => start + i * step,
    );

  const getStrippedOwnProps = () =>
    omit(props, ['expiryYear', 'id', 'classes', 'variant']);

  const renderSelectField = () => {
    const currentYear = new Date().getFullYear();
    const years = range(currentYear, currentYear + 10, 1);

    const subTypesStrip = years.map(value => ({
      value,
      children: value,
    }));
    return (
      <Select
        name={FORM_NAME}
        label={intl.formatMessage(m.label)}
        value={expiryYear}
        options={subTypesStrip}
        {...getStrippedOwnProps()}
      />
    );
  };

  const renderTextOnly = () => <P {...getStrippedOwnProps()}>{expiryYear}</P>;

  const renderDefault = () => (
    <React.Fragment>
      <div className={classes.lineIndicator} />
      <H1 className={classes.name} noMargin {...getStrippedOwnProps()}>
        {expiryYear}
      </H1>
    </React.Fragment>
  );

  const { variant } = props;
  return LOGIC_HELPERS.switchCase(variant, {
    [FIELD_VARIANTS.TEXT_ONLY]: renderTextOnly,
    [FIELD_VARIANTS.TEXT_FIELD]: renderSelectField,
    [DEFAULT]: renderDefault,
  });
}

ExpiryYear.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,
  intl: PropTypes.object.isRequired,

  // parent props
  variant: PropTypes.string,

  // resaga props
  expiryYear: PropTypes.number,
};

ExpiryYear.defaultProps = {
  variant: FIELD_VARIANTS.TEXT_ONLY,
};

export default compose(injectIntl)(React.memo(ExpiryYear));
