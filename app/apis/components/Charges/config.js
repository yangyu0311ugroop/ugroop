import { CHARGES_API, GET_CUSTOMER_CHARGES } from 'apis/constants';
import { CHARGES_NORMALISER } from 'apis/components/Charges/helpers';
import { requests } from 'utils/request';

export const CONFIG = {
  name: CHARGES_API,
  requests: {
    [GET_CUSTOMER_CHARGES]: ({ data }) =>
      requests.fetchWithAuthorisation(
        'get',
        `/${CHARGES_API}/?listOptions=${JSON.stringify(data)}`,
      ),
  },
  processResult: {
    [GET_CUSTOMER_CHARGES]: CHARGES_NORMALISER.normaliseListCharges,
  },
  onSuccess: {},
  value: {},
  setValue: {},
};
