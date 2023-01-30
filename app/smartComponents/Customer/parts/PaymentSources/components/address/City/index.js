import { DEFAULT } from 'appConstants';
import PropTypes from 'prop-types';
import React from 'react';
import { compose } from 'redux';
import { injectIntl } from 'react-intl';
import omit from 'lodash/omit';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { H1, P } from 'viewComponents/Typography';
import TextField from 'ugcomponents/Inputs/ValidationTextField';
import { FIELD_VARIANTS } from 'smartComponents/Customer/constants';
import m from './messages';
import styles from './styles';
import { FORM_NAME } from './constants';
import { makeStyles } from '../../../../../../../components/material-ui';
import useSelectorCardData from '../../../../../../Plan/hooks/useSelectorCardData';
const useStyles = makeStyles(styles);
function City(props) {
  const classes = useStyles();
  const { intl, variant, id } = props;
  const { city } = useSelectorCardData({
    cardId: id,
  });

  const getStrippedOwnProps = () =>
    omit(props, ['resaga', 'city', 'id', 'classes', 'variant']);

  const renderTextField = () => (
    <TextField
      name={FORM_NAME}
      value={city}
      label={intl.formatMessage(m.label)}
      {...getStrippedOwnProps()}
    />
  );

  const renderTextOnly = () => <P {...getStrippedOwnProps()}>{city}</P>;

  const renderDefault = () => (
    <React.Fragment>
      <div className={classes.lineIndicator} />
      <H1 className={classes.name} noMargin {...getStrippedOwnProps()}>
        {city}
      </H1>
    </React.Fragment>
  );

  return LOGIC_HELPERS.switchCase(variant, {
    [FIELD_VARIANTS.TEXT_ONLY]: renderTextOnly,
    [FIELD_VARIANTS.TEXT_FIELD]: renderTextField,
    [DEFAULT]: renderDefault,
  });
}

City.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,
  intl: PropTypes.object.isRequired,

  // parent props
  variant: PropTypes.string,

  // resaga props
  city: PropTypes.string,
};

City.defaultProps = {
  variant: FIELD_VARIANTS.TEXT_ONLY,
  city: '',
};

export default compose(injectIntl)(City);
