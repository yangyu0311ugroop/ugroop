import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import resaga from 'resaga';
import { injectIntl } from 'react-intl';
import { VARIANTS } from 'variantsConstants';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { DEFAULT } from 'appConstants';
import { CONFIG } from './config';
import styles from './styles';

export function InsurancePolicy(props) {
  const { variant, insurancePolicy } = props;

  const renderTextOnly = () => insurancePolicy;

  return LOGIC_HELPERS.switchCase(variant, {
    [VARIANTS.TEXT_ONLY]: renderTextOnly,
    [DEFAULT]: renderTextOnly,
  });
}

InsurancePolicy.propTypes = {
  // parent props
  variant: PropTypes.string,
  insurancePolicy: PropTypes.string,
};

InsurancePolicy.defaultProps = {
  variant: VARIANTS.TITLE,
  insurancePolicy: '',
};

export default compose(
  injectIntl,
  withStyles(styles, { name: 'InsurancePolicy' }),
  resaga(CONFIG),
)(InsurancePolicy);
