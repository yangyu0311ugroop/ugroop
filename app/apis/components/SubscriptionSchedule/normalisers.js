import CUSTOMER_SCHEMA from 'datastore/customerDataImmerStore/schema';
import { normalize } from 'normalizr';
import dotProps from 'dot-prop-immutable';

const upsertSchedules = (result, query) => {
  const data = normalize(result.data, CUSTOMER_SCHEMA.schedules);
  const data2 = normalize(result.data, CUSTOMER_SCHEMA.customerSchedules);
  let lastPhasePlans = {};
  if (result.data && result.data.length > 0) {
    const phases = result.data[0].phases;
    if (phases && phases.length > 0) {
      const lastPhases = phases[phases.length - 1];
      const lastPhasePlanIds = lastPhases.plans.map(o => o.plan);
      lastPhasePlans = {
        [result.data[0].id]: {
          plans: lastPhasePlanIds,
        },
      };
    }
  }
  return {
    rawData: result,
    normalised: {
      customers: data2.entities.customerSchedules,
      schedules: data.entities.schedules,
      schedulePhases: data.entities.phases,
      schedulePlans: data.entities.plans,
      lastPhasePlans,
    },
    payload: query,
  };
};

const upsertSchedule = (result, payload) => {
  const data = normalize(result, CUSTOMER_SCHEMA.schedule);
  return {
    normalised: {
      schedules: data.entities.schedules,
      schedulePhases: data.entities.phases,
      schedulePlans: data.entities.schedulePlans,
    },
    payload,
  };
};

const removeSchedule = (result, payload) => {
  const { customer } = result;
  return {
    customers: customers => {
      const newCustomers = dotProps.set(
        customers,
        `${customer}.scheduleIds`,
        [],
      );
      return newCustomers;
    },
    raw: result,
    payload,
  };
};

export const SUBSCRIPTION_SCHEDULE_NORMALISERS = {
  upsertSchedules,
  upsertSchedule,
  removeSchedule,
};
