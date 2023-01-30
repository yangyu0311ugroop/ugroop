/**
 * Created by Yang on 11/7/19.
 */

import React from 'react';
import moment from 'moment';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { COUPON_MODE, DOWNGRADE, ISO8601 } from '../../../../appConstants';
import { isEmptyString } from '../../../../utils/stringAdditions';
import { SubscriptionCalculationUtility } from '../../../../utils/subscriptionCalculation';
import MOMENT_HELPERS from '../../../../utils/helpers/moment';
const withApplyCouponLogic = WrappedComponent => {
  function ApplyCouponHoc(props) {
    function applyCouponLabel() {
      const {
        previewedCoupon,
        previewCouponEnd,
        previewCouponMode,
        previewCouponPercentOff,
      } = props;
      const now = Date.now() / 1000;
      if (
        previewCouponMode === COUPON_MODE.FOREVER ||
        previewCouponMode === COUPON_MODE.ONCE ||
        (previewCouponMode === COUPON_MODE.REPEATING && previewCouponEnd >= now)
      ) {
        return `${previewCouponPercentOff}% off ${previewedCoupon}`;
      }
      return '';
    }
    function applyCoupon(priceAmount) {
      let p = priceAmount;
      const {
        selectPlanAmount,
        previewCouponPercentOff,
        previewCouponEnd,
        previewCouponStart,
        previewCouponMode,
        nextPhaseCoupon,
        interval,
        currentPhaseCoupon,
        subscriptionProcess,
        name,
      } = props;
      if (
        previewCouponMode === COUPON_MODE.ONCE &&
        !isEmptyString(nextPhaseCoupon)
      ) {
        // this mean the once coupon was applied in future
        p = SubscriptionCalculationUtility.appliedCoupon(
          p,
          selectPlanAmount,
          previewCouponMode,
          previewCouponPercentOff,
          previewCouponEnd,
        );
      } else if (previewCouponMode === COUPON_MODE.FOREVER) {
        p = SubscriptionCalculationUtility.appliedCoupon(
          p,
          selectPlanAmount,
          previewCouponMode,
          previewCouponPercentOff,
          previewCouponEnd,
          nextPhaseCoupon,
        );
      } else if (previewCouponMode === COUPON_MODE.REPEATING) {
        // set up
        const start = previewCouponStart; // some random moment in time (in ms)
        const end = previewCouponEnd; // some random moment after start (in ms)
        const startDate = MOMENT_HELPERS.dateFromTimeStamp(start, ISO8601);
        const endDate = MOMENT_HELPERS.dateFromTimeStamp(end, ISO8601);
        const duration = moment(endDate, ISO8601).diff(
          moment(startDate, ISO8601),
          'months',
        );
        let d = 1;
        if (subscriptionProcess === DOWNGRADE) {
          d = 0;
        }
        if (name && name !== 'Free') {
          d = 0;
        }
        if (
          isEmptyString(currentPhaseCoupon) &&
          !isEmptyString(nextPhaseCoupon)
        ) {
          d = 0;
        }
        // if (
        //   isEmptyString(currentPhaseCoupon) &&
        //   isEmptyString(nextPhaseCoupon)
        // ) {
        //   d = 0;
        // }
        if (interval === 'month' && duration > d) {
          p = SubscriptionCalculationUtility.appliedCoupon(
            p,
            selectPlanAmount,
            previewCouponMode,
            previewCouponPercentOff,
            previewCouponEnd,
          );
        } else if (interval === 'year' && duration > d) {
          p = SubscriptionCalculationUtility.appliedCoupon(
            p,
            selectPlanAmount,
            previewCouponMode,
            previewCouponPercentOff,
            previewCouponEnd,
          );
        }
      }
      return p;
    }
    return (
      <>
        <WrappedComponent
          {...props}
          applyCoupon={applyCoupon}
          applyCouponLabel={applyCouponLabel}
        />
      </>
    );
  }

  ApplyCouponHoc.propTypes = {
    // hoc
    selectPlanAmount: PropTypes.number,
    previewedCoupon: PropTypes.string,
    previewCouponMode: PropTypes.string,
    previewCouponEnd: PropTypes.number,
    previewCouponPercentOff: PropTypes.number,
    nextPhaseCoupon: PropTypes.string,
    currentPhaseCoupon: PropTypes.string,
    previewCouponStart: PropTypes.number,
    name: PropTypes.string,
    interval: PropTypes.string,
    subscriptionProcess: PropTypes.string,
  };

  ApplyCouponHoc.defaultProps = {};

  return compose()(ApplyCouponHoc);
};

export default withApplyCouponLogic;
