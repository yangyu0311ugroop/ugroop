import { ICON, DEFAULT, TEXT } from 'appConstants';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { H5, P } from 'viewComponents/Typography';
import PriceDisplay from 'ugcomponents/PriceDisplay';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { isNumber } from 'utils/numberAdditions';
import styles from './styles';
import { makeStyles } from '../../../../../components/material-ui';
import useSelectorChargeData from '../../../../Plan/hooks/useSelectorChargeData';
const useStyles = makeStyles(styles);
function ChargeAmount(props) {
  const classes = useStyles();
  const { className, variant, id, isEllipsis } = props;
  const { amount, currency } = useSelectorChargeData({
    chargeId: id,
  });
  const contentClassName = () => classnames(classes.default, className);

  const renderTextOnly = () => {
    if (!amount || !isNumber(amount)) {
      return null;
    }

    const renderTextComponent = (
      <PriceDisplay
        currency={currency}
        amount={amount / 100}
        excludeTax
        textOnly
      />
    );

    if (isEllipsis) {
      return (
        <>
          <div className={classnames('j-text-ellipsis', classes.noWordBreak)}>
            <span title={renderTextComponent}>{renderTextComponent}</span>
          </div>
        </>
      );
    }

    return (
      <P className={classes.noWordBreak}>
        <PriceDisplay
          currency={currency}
          amount={amount / 100}
          excludeTax
          textOnly
        />
      </P>
    );
  };

  const renderDefault = () => {
    if (!amount || !isNumber(amount)) {
      return null;
    }

    const componentProps = { className: classes.content };

    return (
      <span className={contentClassName()} data-testid="chargeAmount">
        <PriceDisplay
          currency={currency}
          amount={amount / 100}
          componentProps={componentProps}
          Component={H5}
          excludeTax
        />
      </span>
    );
  };

  // pass in your custom variant if you need a different UI rendering
  return LOGIC_HELPERS.switchCase(variant, {
    [ICON]: renderDefault,
    [TEXT]: renderTextOnly,
    [DEFAULT]: renderDefault,
  });
}

ChargeAmount.propTypes = {
  variant: PropTypes.node,
  className: PropTypes.string,
  amount: PropTypes.string,
  currency: PropTypes.string,
  isEllipsis: PropTypes.bool,
};

ChargeAmount.defaultProps = {
  variant: '',
  amount: '',
  currency: 'au',
  isEllipsis: false,
};

export default React.memo(ChargeAmount);
