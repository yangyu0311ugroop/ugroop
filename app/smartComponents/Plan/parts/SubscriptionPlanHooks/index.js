import React, { forwardRef, useEffect } from 'react';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import Plans from './planWrapper';
import { makeSelectProductIdFilterByName } from '../../../../datastore/productDataImmerStore/selectors';
import {
  makeSelectBundlePlanId,
  makeSelectDowngradePlanIds,
  makeSelectEqualPlanId,
  makeSelectFreePlanId,
  makeSelectUpgradePlanIds,
} from '../../../../datastore/planDataImmerStore/selectors';
import { usePlanContext } from '../../context/planStateContext';
import { usePrevious } from '../../../../hooks/usePrevious';
import { isEmptyString } from '../../../../utils/stringAdditions';
import { useSelectorCurrentSubscriptionData } from '../../hooks/useSelectorCurrentSubscriptionData';
import { CHANGE_DURATION, DOWNGRADE, UPGRADE } from '../../../../appConstants';
/* eslint-disable no-param-reassign */
function SubscriptionPlan(props) {
  const { myForwardedRef, interval, type } = props;
  const [planState, setPlanState] = usePlanContext();
  const productId = useSelector(state =>
    makeSelectProductIdFilterByName(state, {
      name: props.type,
    }),
  );

  const bundleProductId = useSelector(state =>
    makeSelectProductIdFilterByName(state, {
      name: props.planBundle,
    }),
  );

  const freePlan = useSelector(state =>
    makeSelectFreePlanId(state, {
      id: productId,
      interval: props.interval,
      isChangeDuration:
        planState.subscriptionProcessLabel === 'Change Duration',
    }),
  );

  const bundlePlanId = useSelector(state =>
    makeSelectBundlePlanId(state, {
      bundleProductId,
      selectPlanBundleName: planState && planState.selectPlanBundleName,
    }),
  );
  const data = useSelectorCurrentSubscriptionData({
    userId: props.userId,
    orgId: props.orgId,
    subscriptionItemIndex: props.subscriptionItemIndex,
  });
  const {
    currentPlanTierAmount,
    currentPlanAmount,
    customerId,
    currentPaymentSource,
    subscriptionItems,
    currentPlanId,
    currentSubscriptionQuantity,
  } = data;
  const upgradeIds = useSelector(state =>
    makeSelectUpgradePlanIds(state, {
      id: productId,
      interval: props.interval,
      orgSeats: props.orgSeats,
      currentPlanTierAmount,
      currentPlanAmount,
    }),
  );
  const equalPlan = useSelector(state =>
    makeSelectEqualPlanId(state, {
      productId,
      selectPlanId: currentPlanId,
    }),
  );

  const downgradePlanIds = useSelector(state =>
    makeSelectDowngradePlanIds(state, {
      id: productId,
      interval: props.interval,
      orgSeats: props.orgSeats,
      currentPlanTierAmount,
      currentPlanAmount,
    }),
  );
  const [, dispatch] = usePlanContext();
  useEffect(() => {
    if (freePlan) {
      dispatch.setFreePlanId(freePlan);
    }
  }, [freePlan]);

  const prevInterval = usePrevious(props.interval);
  useEffect(() => {
    if (!isEmptyString(prevInterval) && prevInterval !== props.interval) {
      if (
        !isEmptyString(equalPlan) &&
        planState.subscriptionProcessLabel === CHANGE_DURATION
      ) {
        dispatch.setSelectPlanId(equalPlan);
      }
    }
  }, [props.interval]);

  // useVigilante('SubscriptionPlanHooks', {
  //   productId,
  //   bundleProductId,
  //   freePlan,
  //   upgradeIds,
  //   equalPlan,
  //   currentPlanAmount,
  //   currentPlanTierAmount,
  //   downgradePlanIds,
  // });
  let calculatedIds = [];
  if (planState.subscriptionProcessLabel === UPGRADE) {
    calculatedIds = LOGIC_HELPERS.ifElse(
      upgradeIds,
      JSON.parse(upgradeIds),
      [],
    );
  }
  if (planState.subscriptionProcessLabel === DOWNGRADE) {
    calculatedIds = LOGIC_HELPERS.ifElse(
      downgradePlanIds,
      JSON.parse(downgradePlanIds),
      [],
    );
  }
  if (planState.subscriptionProcessLabel === CHANGE_DURATION) {
    calculatedIds = [equalPlan];
  }
  useEffect(() => {
    if (planState.subscriptionProcessLabel === DOWNGRADE) {
      if (
        downgradePlanIds === null ||
        (downgradePlanIds && downgradePlanIds.length === 0)
      ) {
        setPlanState.dispatch(draft => {
          draft.calculatePlanLists = [];
        });
      } else {
        setPlanState.dispatch(draft => {
          draft.calculatePlanLists = downgradePlanIds;
        });
      }
    }
  }, [downgradePlanIds, planState.subscriptionProcessLabel]);
  // eslint-disable-next-line no-unused-vars
  const { ...filterProps } = props;
  return (
    <>
      <Plans
        {...filterProps}
        bundlePlanId={bundlePlanId}
        calculatedPlanIds={calculatedIds}
        ref={myForwardedRef}
        freePlanId={freePlan}
        interval={interval}
        type={type}
        customerId={customerId}
        currentPaymentSource={currentPaymentSource}
        currentSubscriptionQuantity={currentSubscriptionQuantity}
        subscriptionItems={subscriptionItems}
      />
    </>
  );
}

SubscriptionPlan.propTypes = {
  orgId: PropTypes.number,
  userId: PropTypes.number,
  subscriptionItemIndex: PropTypes.number,
  myForwardedRef: PropTypes.object,
  type: PropTypes.string,
  planBundle: PropTypes.string,
  interval: PropTypes.string,
  orgSeats: PropTypes.number,
  handleLineAmount: PropTypes.func,
  handleSelectPlanId: PropTypes.func,
};

SubscriptionPlan.defaultProps = {};

const ComposeSubscriptionPlans = React.memo(SubscriptionPlan);

// eslint-disable-next-line react/no-multi-comp
export default forwardRef((props, ref) => (
  <ComposeSubscriptionPlans {...props} myForwardedRef={ref} />
));
