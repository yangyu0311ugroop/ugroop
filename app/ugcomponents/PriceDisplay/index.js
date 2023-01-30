import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { H6, H4, H2 } from '../../viewComponents/Typography';
import { isNumber } from '../../utils/numberAdditions';
import { SubscriptionCalculationUtility } from '../../utils/subscriptionCalculation';
import { isEmptyString } from '../../utils/stringAdditions';
import GridContainer from '../../components/GridContainer';
import GridItem from '../../components/GridItem';

export const PriceDisplay = ({
  amount,
  tierPrice,
  secondTierPrice,
  interval,
  currency,
  headerSize,
  quantity,
  tax,
  Component,
  showTax,
  textAlign,
  textOnly,
  excludeTax,
  componentProps,
}) => {
  let displayPrice;
  const upperCaseCurr = _.toUpper(currency);
  let intervalDisplay = '';
  if (!isEmptyString(interval)) {
    intervalDisplay = `/ ${interval}`;
  }
  let priceTag;
  if (isNumber(amount)) {
    priceTag = amount;
    const p = Number(
      _.round(
        SubscriptionCalculationUtility.totalPriceCalculation({
          amount,
          excludeTax,
          quantity,
          tax,
        }),
        2,
      ),
    ).toFixed(2);
    displayPrice = `${upperCaseCurr} ${p < 0 ? '-' : ''}$${
      p < 0 ? -p : p
    } ${intervalDisplay}`;
  } else if (isNumber(tierPrice)) {
    priceTag = tierPrice;
    const p = Number(
      _.round(
        SubscriptionCalculationUtility.totalPriceCalculation({
          firstTier: tierPrice,
          secondTier: secondTierPrice,
          excludeTax,
          quantity,
          tax,
        }),
        2,
      ),
    ).toFixed(2);
    displayPrice = `${upperCaseCurr} ${p < 0 ? '-' : ''}$${
      p < 0 ? -p : p
    } ${intervalDisplay}`;
  }
  let priceHead;

  if (textOnly) {
    return displayPrice || 0;
  }
  if (Component) {
    priceHead = (
      <Component dense textAlign={textAlign} {...componentProps}>
        {displayPrice}
      </Component>
    );
  } else if (headerSize === 2) {
    priceHead = (
      <H2 dense textAlign={textAlign}>
        {displayPrice}
      </H2>
    );
  } else if (headerSize === 4) {
    priceHead = (
      <H4 dense textAlign={textAlign}>
        {displayPrice}
      </H4>
    );
  } else {
    priceHead = (
      <H6 dense textAlign={textAlign}>
        {displayPrice}
      </H6>
    );
  }
  let secondItem;
  if (showTax && isNumber(priceTag) && priceTag > 0) {
    secondItem = (
      <GridItem>
        <H6 textAlign={textAlign}>
          (GST included @ {tax}
          %)
        </H6>
      </GridItem>
    );
  }
  return (
    <GridContainer direction="column" spacing={0}>
      <GridItem>{priceHead}</GridItem>
      {secondItem}
    </GridContainer>
  );
};

PriceDisplay.propTypes = {
  amount: PropTypes.number,
  tierPrice: PropTypes.number,
  secondTierPrice: PropTypes.number,
  interval: PropTypes.string,
  currency: PropTypes.string,
  headerSize: PropTypes.number,
  quantity: PropTypes.number,
  tax: PropTypes.number,
  Component: PropTypes.any,
  showTax: PropTypes.bool,
  textAlign: PropTypes.string,
  textOnly: PropTypes.bool,
  excludeTax: PropTypes.bool,
  componentProps: PropTypes.object,
};

PriceDisplay.defaultProps = {
  textAlign: '',
  componentProps: {},
  excludeTax: false,
};

export default PriceDisplay;
