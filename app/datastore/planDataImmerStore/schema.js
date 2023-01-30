import { schema } from 'normalizr';
import _ from 'lodash';
const product = new schema.Entity('product');
const plan = new schema.Entity(
  'plans',
  { product },
  {
    idAttribute: 'product',
    processStrategy: (value, parent) => {
      const plans = _.filter(parent, e => e.product === value.product);
      const planIds = plans.map(o => o.id);
      const normlised = _.keyBy(plans, 'id');
      return {
        planIds,
        plans: normlised,
      };
    },
  },
);
const plans = [plan];

export default {
  plans,
  plan,
};
