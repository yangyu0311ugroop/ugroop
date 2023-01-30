import { ICON, DEFAULT } from 'appConstants';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { H5 } from 'viewComponents/Typography';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import Icon from 'viewComponents/Icon';
import styles from './styles';
import { makeStyles } from '../../../../../components/material-ui';
import useSelectorChargeData from '../../../../Plan/hooks/useSelectorChargeData';
import { isEmptyString } from '../../../../../utils/stringAdditions';
const useStyles = makeStyles(styles);
function ChargePaymentMethod(props) {
  const classes = useStyles();
  const { className, variant, id } = props;
  const { last4, brand } = useSelectorChargeData({
    chargeId: id,
  });
  const contentClassName = () => classnames(classes.default, className);

  const renderLabel = () => <H5>ending in &nbsp;</H5>;

  const renderDefault = () => {
    if (isEmptyString(last4) && isEmptyString(brand)) {
      return null;
    }
    return (
      <span className={contentClassName()}>
        <Icon icon="lnr-credit-card" size="small" className={classes.icon} />
        &nbsp;
        <H5 className={classes.card}>{brand}</H5>
        &nbsp;
        {renderLabel()}
        <H5 className={classes.card}>{last4}</H5>
      </span>
    );
  };

  return LOGIC_HELPERS.switchCase(variant, {
    [ICON]: renderDefault,
    [DEFAULT]: renderDefault,
  });
}

ChargePaymentMethod.propTypes = {
  variant: PropTypes.node,
  className: PropTypes.string,
};

ChargePaymentMethod.defaultProps = {
  variant: '',
  className: '',
};

export default React.memo(ChargePaymentMethod);
