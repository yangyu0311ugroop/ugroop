import dotProp from 'dot-prop';
import _ from 'lodash';
import createCachedSelector from 're-reselect';
import { CUSTOMER_STORE_IMMER } from '../../appConstants';
import { selectPlanStore } from '../planDataImmerStore/selectors';
const selectCustomerStore = state => state.get(CUSTOMER_STORE_IMMER);
const selectUserCustomerId = (state, props) => {
  const customerStore = selectCustomerStore(state);
  return dotProp.get(customerStore, `users.${props.userId}`);
};

const selectOrgCustomerId = (state, props) => {
  const customerStore = selectCustomerStore(state);
  return dotProp.get(customerStore, `orgs.${props.orgId}`);
};

const selectCurrentSubscriptionId = (state, props) => {
  const customerStore = selectCustomerStore(state);
  return dotProp.get(
    customerStore,
    `customers.${props.customerId}.subscriptions.data.0`,
  );
};

const selectCustomerAttribute = (state, props) => {
  const customerStore = selectCustomerStore(state);
  return dotProp.get(
    customerStore,
    `customers.${props.customerId}.${props.attribute}`,
  );
};

const selectCurrentSubscriptionAttribute = (state, props) => {
  const customerStore = selectCustomerStore(state);
  return dotProp.get(
    customerStore,
    `subscriptions.${props.subscriptionId}.${props.attribute}`,
  );
};

const selectCurrentSubscriptionItem = (state, props) => {
  const customerStore = selectCustomerStore(state);
  return dotProp.get(
    customerStore,
    `subscriptions.${props.subscriptionId}.items.data.${
      props.subscriptionItemIndex
    }`,
  );
};

const selectScheduleAttribute = (state, props) => {
  const customerStore = selectCustomerStore(state);
  return dotProp.get(
    customerStore,
    `schedules.${props.scheduleId}.${props.attribute}`,
  );
};

const selectSubscriptionItemAttribute = (state, props) => {
  const customerStore = selectCustomerStore(state);
  return dotProp.get(
    customerStore,
    `subscriptionItems.${props.subscriptionItemId}.${props.attribute}`,
  );
};

const selectSchedulePhasesAttribute = (state, props) => {
  const customerStore = selectCustomerStore(state);
  return dotProp.get(
    customerStore,
    `schedulePhases.${props.schedulePhaseKey}.${props.attribute}`,
  );
};

const makeSelectCustomerId = createCachedSelector(
  [selectUserCustomerId, selectOrgCustomerId, (state, props) => props],
  (userCustomerId, orgCustomerId, props) => {
    if (props.orgId) {
      if (orgCustomerId) {
        return orgCustomerId;
      }
      return null;
    }
    return userCustomerId;
  },
)((state, props) => {
  if (props.orgId) {
    return `makeSelectCustomerId${props.orgId}`;
  }
  return `makeSelectCustomerId${props.userId}`;
});

const makeSelectActiveScheduleId = createCachedSelector(
  [
    selectCustomerAttribute,
    state => {
      const customerStore = selectCustomerStore(state);
      return dotProp.get(customerStore, 'schedules');
    },
  ],
  (scheduleIds, collection) => {
    if (scheduleIds && scheduleIds.length > 0) {
      const status = scheduleIds.map(id => {
        if (collection[id]) {
          const c = collection[id].status;
          return {
            status: c,
            id,
          };
        }
        return {
          status: null,
          id,
        };
      });
      const res = status.find(o => o.status === 'active');
      if (res) {
        return res.id;
      }
    }
    return null;
  },
)((state, props) => `makeSelectActiveScheduleId.${props.customerId}`);

const makeSelectSubscriptionItems = createCachedSelector(
  [
    selectCurrentSubscriptionAttribute,
    state => {
      const customerStore = selectCustomerStore(state);
      return dotProp.get(customerStore, `subscriptionItems`);
    },
  ],
  (subscriptionItems, items) => {
    if (subscriptionItems && subscriptionItems.length > 0 && items) {
      const data = subscriptionItems.map(o => {
        if (items[o]) {
          return {
            id: o,
            quantity: items[o].quantity,
            plan: items[o].plan,
          };
        }
        return null;
      });
      const filter = data.filter(o => o != null);
      return JSON.stringify(filter);
    }
    return JSON.stringify([]);
  },
)((state, props) => `makeSelectSubscriptionItems.${props.subscriptionId}`);

const makeSelectSubscriptionPlans = createCachedSelector(
  [
    selectCurrentSubscriptionAttribute,
    state => {
      const customerStore = selectCustomerStore(state);
      return dotProp.get(customerStore, `subscriptionItems`);
    },
    state => {
      const planStore = selectPlanStore(state);
      return dotProp.get(planStore, `plans`);
    },
  ],
  (subscriptionItems, items, plans) => {
    if (subscriptionItems && subscriptionItems.length > 0 && items && plans) {
      const data = subscriptionItems.map(o => {
        if (items[o]) {
          const planId = items[o].plan;
          if (planId) {
            const equalPlan = plans[planId].metadata.EqualPlan;
            const result = _.find(plans, p => p.nickname === equalPlan);
            return {
              id: planId,
              name: plans[planId].nickname,
              interval: plans[planId].interval,
              equalPlan,
              equalPlanId: result ? result.id : null,
              quantity: items[o].quantity,
              type: plans[planId].metadata.type,
            };
          }
        }
        return null;
      });
      const filter = data.filter(o => o != null);
      return JSON.stringify(filter);
    }
    return JSON.stringify([]);
  },
)((state, props) => `makeSelectSubscriptionItems.${props.subscriptionId}`);

const makeSelectFuturePlans = createCachedSelector(
  [
    selectSchedulePhasesAttribute,
    state => {
      const customerStore = selectCustomerStore(state);
      return dotProp.get(customerStore, 'schedulePlans');
    },
    state => {
      const planStore = selectPlanStore(state);
      return dotProp.get(planStore, `plans`);
    },
  ],
  (plans, collection, planCollection) => {
    if (plans && plans.length > 0 && planCollection) {
      const data = plans.map(o => {
        if (collection[o]) {
          return {
            id: o,
            quantity: collection[o].quantity,
            plan: collection[o].plan,
            name: planCollection[collection[o].plan].nickname,
            interval: planCollection[collection[o].plan].interval,
          };
        }
        return null;
      });
      const filter = data.filter(o => o != null);
      return JSON.stringify(filter);
    }
    return JSON.stringify([]);
  },
)((state, props) => `makeSelectFuturePlans.${props.schedulePhaseKey}`);

const selectPaymentSourceAttribute = (state, props) => {
  const customerStore = selectCustomerStore(state);
  return dotProp.get(
    customerStore,
    `paymentSources.${props.cardId}.${props.attribute}`,
  );
};

const selectChargeAttribute = (state, props) => {
  const customerStore = selectCustomerStore(state);
  return dotProp.get(
    customerStore,
    `charges.${props.chargeId}.${props.attribute}`,
  );
};

export const CUSTOMER_RESELECTOR = {
  makeSelectCustomerId,
  makeSelectActiveScheduleId,
  makeSelectSubscriptionItems,
  makeSelectFuturePlans,
  makeSelectSubscriptionPlans,
  selectCurrentSubscriptionId,
  selectCurrentSubscriptionAttribute,
  selectCurrentSubscriptionItem,
  selectSubscriptionItemAttribute,
  selectCustomerAttribute,
  selectScheduleAttribute,
  selectSchedulePhasesAttribute,
  selectPaymentSourceAttribute,
  selectChargeAttribute,
};
