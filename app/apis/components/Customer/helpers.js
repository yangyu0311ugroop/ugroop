import { CUSTOMER_API, UPDATE_CUSTOMER } from 'apis/constants';

const updateCustomer = (obj, props) => {
  const { id, data, onSuccess, onError } = obj;
  props.resaga.dispatchTo(CUSTOMER_API, UPDATE_CUSTOMER, {
    payload: { id, data },
    onSuccess,
    onError,
  });
};

export const CUSTOMER_API_HELPERS = {
  updateCustomer,
};
