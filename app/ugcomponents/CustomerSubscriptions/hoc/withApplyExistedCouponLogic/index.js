/**
 * Created by Yang on 11/7/19.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { COUPON_MODE } from '../../../../appConstants';
import { isEmptyString } from '../../../../utils/stringAdditions';
import { SubscriptionCalculationUtility } from '../../../../utils/subscriptionCalculation';
import { isNumber } from '../../../../utils/numberAdditions';
const withApplyExistedCouponLogic = WrappedComponent => {
  function ApplyExistedCouponHoc(props) {
    function shouldShowSchedulePlan() {
      const {
        currentActiveScheduleId,
        planId,
        nextPhasePlan,
        quantity,
        nextPhaseQuantity,
      } = props;
      if (isEmptyString(currentActiveScheduleId)) return false;
      if (planId !== nextPhasePlan) {
        return true;
      }
      return quantity !== nextPhaseQuantity;
    }

    function useWhichCoupon() {
      const { currentPhaseCoupon, nextPhaseCoupon } = props;
      // if has schedule plan, then we shall use current phase Coupon, the future Coupon will handle by schedule.
      if (shouldShowSchedulePlan()) {
        return currentPhaseCoupon;
      }
      return nextPhaseCoupon;
    }
    function applyCoupon(total, selectAmount) {
      const {
        currentCouponMode,
        currentCouponPercentOff,
        currentDiscountEnd,
        nextPhaseSchedulePlanId,
        currentPhaseEndTime,
        currentDiscountStart,
      } = props;
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const whichCoupon = useWhichCoupon();
      let t = total;
      if (isEmptyString(nextPhaseSchedulePlanId)) {
        t = SubscriptionCalculationUtility.appliedCoupon(
          t,
          selectAmount,
          currentCouponMode,
          currentCouponPercentOff,
          currentDiscountEnd,
        );
      } else if (
        !isEmptyString(whichCoupon) &&
        currentCouponMode === COUPON_MODE.REPEATING &&
        isNumber(currentPhaseEndTime) &&
        currentPhaseEndTime >= currentDiscountStart
      ) {
        t = SubscriptionCalculationUtility.appliedCoupon(
          t,
          selectAmount,
          currentCouponMode,
          currentCouponPercentOff,
          currentDiscountEnd,
        );
      } else if (
        !isEmptyString(whichCoupon) &&
        (currentCouponMode === COUPON_MODE.FOREVER ||
          currentCouponMode === COUPON_MODE.ONCE)
      ) {
        t = SubscriptionCalculationUtility.appliedCoupon(
          t,
          selectAmount,
          currentCouponMode,
          currentCouponPercentOff,
          currentDiscountEnd,
        );
      }
      return t;
    }

    return (
      <>
        <WrappedComponent {...props} applyCoupon={applyCoupon} />
      </>
    );
  }

  ApplyExistedCouponHoc.propTypes = {
    // hoc
    currentPhaseEndTime: PropTypes.number,
    currentDiscountStart: PropTypes.number,
    nextPhaseSchedulePlanId: PropTypes.string,
    currentPhaseCoupon: PropTypes.string,
    nextPhasePlan: PropTypes.string,
    nextPhaseQuantity: PropTypes.number,
    nextPhaseCoupon: PropTypes.string,
    currentActiveScheduleId: PropTypes.string,
    planId: PropTypes.string,
    quantity: PropTypes.number,
    currentCouponMode: PropTypes.string,
    currentCouponPercentOff: PropTypes.number,
    currentDiscountEnd: PropTypes.number,
  };

  ApplyExistedCouponHoc.defaultProps = {};

  return ApplyExistedCouponHoc;
};

export default withApplyExistedCouponLogic;
