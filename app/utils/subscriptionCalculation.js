import { isNumber } from './numberAdditions';
import {
  COUPON_MODE,
  FREE_ORG_SEATS_THRESHOLD,
  SUBSCRIPTION_PLAN_TYPE,
} from '../appConstants';
import { isEmptyString } from './stringAdditions';

function getBasePrice({
  excludeTax,
  amount,
  firstTier,
  secondTier,
  quantity,
  tax,
}) {
  const q = isNumber(quantity) ? quantity : 1;
  if (excludeTax) {
    if (isNumber(amount)) {
      return amount * q;
    }
    if (isNumber(firstTier) && isNumber(secondTier)) {
      return firstTier + secondTier * q;
    }
    if (isNumber(firstTier)) {
      return firstTier * q;
    }
  } else {
    if (isNumber(amount)) {
      return amount * q * ((tax + 100) / 100);
    }
    if (isNumber(firstTier) && isNumber(secondTier)) {
      return (firstTier + secondTier * q) * ((tax + 100) / 100);
    }
    if (isNumber(firstTier)) {
      return firstTier * q * ((tax + 100) / 100);
    }
  }
  return 0;
}

function totalPriceCalculation({
  excludeTax,
  amount,
  firstTier,
  secondTier,
  quantity,
  tax,
  prorateAmount = 0,
}) {
  const basePrice = getBasePrice({
    excludeTax,
    amount,
    firstTier,
    secondTier,
    quantity,
    tax,
  });
  return basePrice + prorateAmount;
}

function isAllowedToRemoveSeat(orgSeat, quantity, currentPlanFirstPurchase) {
  if (
    quantity > currentPlanFirstPurchase &&
    orgSeat < quantity + FREE_ORG_SEATS_THRESHOLD
  ) {
    return true;
  }
  return false;
}

function isAllowedToAddSeat(quantity) {
  if (quantity > 1) {
    return true;
  }
  return false;
}

function quantityExtractFirstPurchase(quantity, currentPlanFirstPurchase) {
  let q = quantity;
  if (isNumber(currentPlanFirstPurchase)) {
    if (q !== 1 && currentPlanFirstPurchase !== 1) {
      q -= currentPlanFirstPurchase;
    }
  }
  return q;
}

function quantityOrFirstPurchase(quantity, currentPlanFirstPurchase) {
  const q = quantity;
  if (isNumber(currentPlanFirstPurchase)) {
    if (q >= currentPlanFirstPurchase) {
      return q;
    }
  }
  return currentPlanFirstPurchase;
}

// This function pre-suppose the pre knowledge of how quantity divided based on the Tour Plan.
function convertQuantityIntoTierIndex(quantity) {
  let index = Math.trunc(quantity / 20) - 1;
  if (index > 5) {
    index = 5;
  }
  return index < 0 ? 0 : index;
}

function upgradeTierIndexArray(quantity) {
  let q = quantity;
  if (q < 20) {
    q = 20;
  }
  const index = Math.trunc(q / 20);
  let i;
  const result = [];
  for (i = index; i <= 4; i += 1) {
    // 5 MAX TOUR SEAT TIER
    result.push(i);
  }
  return result;
}

function downgradeTierIndexArray(quantity) {
  const index = Math.trunc(quantity / 20) - 2;
  let i;
  const result = [];
  for (i = index; i >= 0; i -= 1) {
    // 5 MAX TOUR SEAT TIER
    result.push(i);
  }
  return result;
}

function currencyLabelConversion(currency) {
  if (isEmptyString(currency)) return '';
  if (currency === 'aud') {
    return 'AUD';
  }
  return currency.toUpperCase();
}

function convertIndexToQuantity(index) {
  if (isNumber(index)) {
    return (index + 1) * 20;
  }
  return (parseInt(index, 10) + 1) * 20;
}

function convertIndexToAmount(index, interval = 'month') {
  let i = 0;
  if (isNumber(index)) {
    i = index;
  } else {
    i = parseInt(index, 10);
  }
  switch (i) {
    case 0:
      return 0;
    case 1:
      return interval === 'month' ? 200 : 2000;
    case 2:
      return interval === 'month' ? 290 : 2900;
    case 3:
      return interval === 'month' ? 375 : 3600;
    case 4:
      return interval === 'month' ? 450 : 4400;
    case 5:
      return interval === 'month' ? 999 : 9999;
    default:
      return -1;
  }
}

function convertPersonPlanToQuantity(name) {
  if (['Monthly Free', 'Yearly Free'].includes(name)) {
    return 1.5;
  }
  if (['Partner', 'Partner-Yearly'].includes(name)) {
    return 2;
  }
  if (['Family', 'Family-Yearly'].includes(name)) {
    return 5;
  }
  if (['Family & Friends', 'Family & Friends-Yearly'].includes(name)) {
    return 10;
  }
  return 0;
}

function appliedCoupon(
  total,
  baseAmount,
  couponMode,
  couponPercentOff,
  couponEnd,
  planStart,
) {
  let start = Date.now() / 1000;
  if (planStart) {
    start = planStart;
  }
  let t = total;
  if (couponMode === COUPON_MODE.FOREVER) {
    t -= baseAmount * (couponPercentOff / 100);
  } else if (couponMode === COUPON_MODE.REPEATING) {
    if (start <= couponEnd) {
      t -= baseAmount * (couponPercentOff / 100);
    }
  } else if (couponMode === COUPON_MODE.ONCE) {
    t -= baseAmount * (couponPercentOff / 100);
  }
  return t;
}

function appliedAccountBalance(
  total,
  startingBalance,
  planType,
  tax,
  otherSubscriptionTotalAmount,
) {
  let t = total;
  if (isNumber(startingBalance)) {
    const stripeTax = startingBalance / ((100 + tax) / 100);
    if (
      planType === SUBSCRIPTION_PLAN_TYPE.ORG_SEAT ||
      planType === SUBSCRIPTION_PLAN_TYPE.INDIVIDUAL_SEAT ||
      planType === SUBSCRIPTION_PLAN_TYPE.CHANGE_DURATION
    ) {
      t += stripeTax / 100;
    } else {
      const leftOver = (stripeTax + otherSubscriptionTotalAmount) / 100;
      if (leftOver < 0) t += leftOver;
    }
  }
  return t;
}

export const SubscriptionCalculationUtility = {
  getBasePrice,
  totalPriceCalculation,
  isAllowedToRemoveSeat,
  isAllowedToAddSeat,
  quantityExtractFirstPurchase,
  quantityOrFirstPurchase,
  convertQuantityIntoTierIndex,
  upgradeTierIndexArray,
  downgradeTierIndexArray,
  currencyLabelConversion,
  convertIndexToQuantity,
  convertIndexToAmount,
  convertPersonPlanToQuantity,
  appliedCoupon,
  appliedAccountBalance,
};
