import CUSTOMER_SCHEMA from 'datastore/customerDataImmerStore/schema';
import { normalize } from 'normalizr';

const upsertCustomer = (result, payLoad) => {
  const data = normalize(result, CUSTOMER_SCHEMA.customer);
  return {
    raw: result,
    normalised: data.entities,
    payload: payLoad,
  };
};

const upsertSubscription = result => {
  const data = normalize(result, CUSTOMER_SCHEMA.subscription);
  return {
    normalised: data.entities,
    raw: result,
  };
};

const updateCustomerSource = result => {
  const data = normalize(result, CUSTOMER_SCHEMA.customer);
  return {
    raw: result,
    normalised: data.entities.customers,
  };
};

export const CUSTOMER_NORMALISERS = {
  upsertCustomer,
  upsertSubscription,
  updateCustomerSource,
};
