import { schema } from 'normalizr';
import _ from 'lodash';

const plan = new schema.Entity('plans');
const schedulePlans = new schema.Entity(
  'plans',
  {},
  {
    idAttribute: (value, parent) =>
      `${parent.parentId}_${parent.start_date}_${value.plan}`,
  },
);
const phase = new schema.Entity(
  'phases',
  {
    plans: [schedulePlans],
  },
  {
    idAttribute: (value, parent) => `${value.start_date}${parent.id}`,
    processStrategy: (value, parent) => {
      const copyValue = Object.assign({}, value);
      copyValue.parentId = parent.id;
      return copyValue;
    },
  },
);

const customerSchedule = new schema.Entity(
  'customerSchedules',
  {},
  {
    idAttribute: 'customer',
    processStrategy: (value, parent) => {
      const schedules = _.filter(parent, e => e.customer === value.customer);
      const scheduleIds = schedules.map(o => o.id);
      return {
        scheduleIds,
      };
    },
  },
);

const schedule = new schema.Entity('schedules', {
  phases: [phase],
});

const schedules = [schedule];

const subscriptionItem = new schema.Entity('subscriptionItems', {
  plan,
});
const paymentsource = new schema.Entity('paymentSources');

const subscription = new schema.Entity('subscriptions', {
  plan,
  items: {
    data: [subscriptionItem],
  },
});
const customer = new schema.Entity('customers', {
  sources: {
    data: [paymentsource],
  },
  subscriptions: {
    data: [subscription],
  },
});
const customers = [customer];
const customerSchedules = [customerSchedule];
export default {
  customers,
  customer,
  schedules,
  schedule,
  subscription,
  customerSchedules,
};
