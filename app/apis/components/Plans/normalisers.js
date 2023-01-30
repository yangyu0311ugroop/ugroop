import { normalize } from 'normalizr';
import schema from 'datastore/planDataImmerStore/schema';
import _ from 'lodash';

const addPlans = result => {
  const normalizedData = normalize(result.data, schema.plans);
  const products = _.mapValues(normalizedData.entities.plans, o => o.planIds);
  const plans = _.reduce(
    _.mapValues(normalizedData.entities.plans, o => o.plans),
    (all, value) => _.merge(all, value),
    {},
  );
  return {
    plans,
    products,
  };
};

export const PLANS_NORMALISERS = {
  addPlans,
};
