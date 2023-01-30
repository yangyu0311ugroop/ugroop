import { PAYMENT_METHOD_API, UPDATE_PAYMENT_METHOD } from 'apis/constants';
import { PAYMENT_METHOD_NORMALISER } from 'apis/components/PaymentMethod/helpers';
import { requests } from 'utils/request';
import { SET_VALUE } from 'ugcomponents/SnackBar/config';

export const CONFIG = {
  name: PAYMENT_METHOD_API,
  requests: {
    [UPDATE_PAYMENT_METHOD]: ({ id, data }) =>
      requests.fetchWithAuthorisation(
        'patch',
        `/${PAYMENT_METHOD_API}/${id}`,
        data,
      ),
  },
  processResult: {
    [UPDATE_PAYMENT_METHOD]: PAYMENT_METHOD_NORMALISER.normaliseUpdate,
  },
  onSuccess: {},
  value: {},
  setValue: {
    ...SET_VALUE,
  },
};
