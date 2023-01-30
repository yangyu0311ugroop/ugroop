/**
 * Created by Yang on 11/7/19.
 */

import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import {
  LIST_SUBSCRIPTION_SCHEDULE,
  RELEASE_SUBSCRIPTION_SCHEDULE,
  SUBSCRIPTION_SCHEDULE_API,
} from 'apis/constants';
import { compose } from 'redux';
import resagaHOC from 'resaga';
import { useSelector } from 'react-redux';
import { isEmptyString } from '../../../../utils/stringAdditions';
import { CUSTOMER_RESELECTOR } from '../../../../datastore/customerDataImmerStore/selectors';

/*
 * The Purpose of this HOC is to check if the Schedule Plan has turned into a normal Subscription Plan.
 * Once you started a schedule plan, for instance, a month later, your subscription is not turning to free.
 * Even the time is active, the schedule plan will not auto released. So this HOC is to make sure once the Schedule Plan
 * is now active, and current subscription and same as the current phrase of schedule plan, It shall call release plan to
 * release the active schedule.
 * */
const withScheduleSubscriptionPlanCheck = WrappedComponent => {
  function ScheduleSubscriptionCheck(props) {
    const { customerId, resaga, subscriptionId, ...rest } = props;

    const subscriptionItems = useSelector(state =>
      CUSTOMER_RESELECTOR.makeSelectSubscriptionItems(state, {
        subscriptionId,
        attribute: 'items.data',
      }),
    );
    const [isCheckFinished, setCheckFinished] = useState({
      isCheckFinished: false,
    });

    const finishChecking = () => {
      setCheckFinished(true);
    };

    const fetchSchedulePlan = cid => {
      resaga.dispatchTo(SUBSCRIPTION_SCHEDULE_API, LIST_SUBSCRIPTION_SCHEDULE, {
        payload: {
          query: JSON.stringify({ customer: cid }),
        },
        onSuccess: checkScheduleSubscription,
      });
    };

    const releaseActiveSchedulePlan = activeId => {
      resaga.dispatchTo(
        SUBSCRIPTION_SCHEDULE_API,
        RELEASE_SUBSCRIPTION_SCHEDULE,
        {
          payload: {
            scheduleId: activeId,
          },
          onSuccess: finishChecking,
        },
      );
    };

    const hasActiveSchedulePlan = data => _.find(data, { status: 'active' });

    const getCurrentPlanPhase = (phases, start, end) =>
      _.find(phases, { start_date: start, end_date: end });

    const getNextPlanPhase = (phases, start) =>
      _.find(phases, { start_date: start });

    useEffect(() => {
      if ((customerId && subscriptionId, subscriptionItems)) {
        // eslint-disable-next-line camelcase
        const subscription_Items = JSON.parse(subscriptionItems);
        const planList = subscription_Items.map(o => o.plan);
        const quantityList = subscription_Items.map(o => o.quantity);
        if (quantityList.length > 0 && planList.length > 0) {
          fetchSchedulePlan(customerId);
        } else if (isEmptyString(subscriptionId)) {
          setCheckFinished(true);
        }
      } else {
        setCheckFinished(true);
      }
    }, [customerId, subscriptionId, subscriptionItems]);

    const checkScheduleSubscription = response => {
      // eslint-disable-next-line camelcase
      const subscription_Items = JSON.parse(subscriptionItems);
      const planList = subscription_Items.map(o => o.plan);
      const quantityList = subscription_Items.map(o => o.quantity);
      if (response.rawData.data && response.rawData.data.length > 0) {
        if (subscriptionId && subscriptionId.length > 0) {
          const plan = hasActiveSchedulePlan(response.rawData.data);
          if (plan && plan.phases.length) {
            const start = plan.current_phase.start_date;
            const end = plan.current_phase.end_date;
            const currentPhase = getCurrentPlanPhase(plan.phases, start, end);
            const nextPlanPhase = getNextPlanPhase(plan.phases, end);
            let schedulePlans = [];
            let scheduleQuantity = [];
            if (currentPhase.plans.length > 0) {
              schedulePlans = currentPhase.plans.map(o => o.plan);
              scheduleQuantity = currentPhase.plans.map(o => o.quantity);
            }
            if (nextPlanPhase) {
              finishChecking();
            } else if (
              _.difference(schedulePlans, planList).length === 0 &&
              _.difference(scheduleQuantity, quantityList).length === 0
            ) {
              // The purpose of this check is to make sure the current phrase of schedule plan is same the the subscription plan
              // if it's same, we can know that the schedule plan is now active. We can just simply release the active schedule plan
              // and use the normal subscription plan
              releaseActiveSchedulePlan(plan.id);
            } else {
              finishChecking();
            }
          } else {
            finishChecking();
          }
        }
      } else {
        finishChecking();
      }
    };

    if (!isCheckFinished) {
      return <div />; // can have a loading here.
    }
    return (
      <Fragment>
        <WrappedComponent {...rest} resaga={resaga} />
      </Fragment>
    );
  }

  ScheduleSubscriptionCheck.propTypes = {
    resaga: PropTypes.object.isRequired,
    id: PropTypes.number,
    customerId: PropTypes.string,
    quantityList: PropTypes.array,
    planList: PropTypes.array,
    subscriptionId: PropTypes.string,
    orgId: PropTypes.any,
  };

  ScheduleSubscriptionCheck.defaultProps = {};

  return compose(resagaHOC())(ScheduleSubscriptionCheck);
};

export default withScheduleSubscriptionPlanCheck;
