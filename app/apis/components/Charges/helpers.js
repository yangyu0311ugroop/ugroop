import { STRIPE_FETCH_THRESHOLD } from 'appConstants';
import { CHARGES_API, GET_CUSTOMER_CHARGES } from 'apis/constants';
import { DATASTORE_UTILS } from 'datastore';
import { get, last, set } from 'lodash';
import { normalize } from 'normalizr';
import { CHARGES_SCHEMA } from 'datastore/charges/schema';
import { LOGIC_HELPERS } from 'utils/helpers/logic';

const getCustomerCharges = (obj, props) => {
  const { data, onSuccess, onError } = obj;
  props.resaga.dispatchTo(CHARGES_API, GET_CUSTOMER_CHARGES, {
    payload: {
      data: { ...data, limit: STRIPE_FETCH_THRESHOLD.CHARGES_GET_LIMIT },
    },
    onSuccess,
    onError,
  });
};

const handleListCharges = (
  entityCustomer,
  customerData,
  payload,
) => storeData => {
  const id = get(payload, 'data.customer');
  const chargePath = `${id}.charges`;
  const newCharges = get(entityCustomer, chargePath);

  if (!newCharges && !id) return storeData;
  const newStore = DATASTORE_UTILS.upsertArray(chargePath, newCharges)(
    storeData,
  );
  set(newStore, `${id}.listChargesHasMore`, customerData.listChargesHasMore);
  set(newStore, `${id}.lastFetchId`, customerData.lastFetchId);
  return newStore;
};

const normaliseListCharges = (data, payload) => {
  const charges = get(data, 'charges.data');
  const hasMore = get(data, 'charges.has_more', false);
  const lastFetchCharges = LOGIC_HELPERS.ifElse(
    charges && charges.length > 0,
    last(charges),
  );
  const lastFetchId = get(lastFetchCharges, 'id');
  const customerData = {
    id: get(payload, 'data.customer'),
    listChargesHasMore: hasMore,
    lastFetchId,
    charges,
  };
  const { entities } = normalize(customerData, CHARGES_SCHEMA.customers);
  return {
    normalised: {
      customers: entities.customers,
      charges: entities.charges,
    },
    raw: data,
    payload,
  };
};

export const CHARGES_API_HELPERS = {
  getCustomerCharges,
  handleListCharges,
};

export const CHARGES_NORMALISER = {
  normaliseListCharges,
};
