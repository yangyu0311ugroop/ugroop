import { PAYMENT_METHOD_API, UPDATE_PAYMENT_METHOD } from 'apis/constants';
import { DATASTORE_UTILS } from 'datastore';
import { LOGIC_HELPERS } from 'utils/helpers/logic';

const updatePaymentMethod = (obj, props) => {
  const { id, data, onSuccess, onError } = obj;
  props.resaga.dispatchTo(PAYMENT_METHOD_API, UPDATE_PAYMENT_METHOD, {
    payload: { id, data },
    onSuccess,
    onError,
  });
};

const normaliseUpdate = ({ paymentMethod: data }, payload) => {
  const { billing_details: billingAddress, card, ...rest } = data;

  const { address } = billingAddress;

  const addressReduced = Object.keys(address).reduce(
    (acc, key) => ({
      ...acc,
      ...{
        [`address_${LOGIC_HELPERS.ifElse(
          key === 'postal_code',
          'zip',
          key,
        )}`]: address[key],
      },
    }),
    {},
  );

  return {
    paymentSources: DATASTORE_UTILS.upsertObject({
      [rest.id]: { ...card, ...rest, ...addressReduced },
    }),
    raw: data,
    payload,
    card: { ...card },
    rest: { ...rest },
    address: { ...addressReduced },
  };
};

export const PAYMENT_METHOD_API_HELPERS = {
  updatePaymentMethod,
};

export const PAYMENT_METHOD_NORMALISER = {
  normaliseUpdate,
};
