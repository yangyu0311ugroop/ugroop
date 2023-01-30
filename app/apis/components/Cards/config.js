import {
  CARDS_API,
  CREATE_CUSTOMER_CARD,
  UPDATE_CUSTOMER_CARD,
  DELETE_CUSTOMER_CARD,
  GET_CUSTOMER_CARDS,
} from 'apis/constants';
import { CARD_NORMALISER } from 'apis/components/Cards/helpers';
import { requests } from 'utils/request';

export const CONFIG = {
  name: CARDS_API,
  requests: {
    [GET_CUSTOMER_CARDS]: ({ id }) =>
      requests.fetchWithAuthorisation('get', `/${CARDS_API}/${id}/sources`),
    [CREATE_CUSTOMER_CARD]: ({ id, data }) =>
      requests.fetchWithAuthorisation('post', `/${CARDS_API}/${id}`, data),
    [UPDATE_CUSTOMER_CARD]: ({ id, cardId, data }) =>
      requests.fetchWithAuthorisation(
        'patch',
        `/${CARDS_API}/${id}/source/${cardId}`,
        data,
      ),
    [DELETE_CUSTOMER_CARD]: ({ id, cardId }) =>
      requests.fetchWithAuthorisation(
        'delete',
        `/${CARDS_API}/${id}/source/${cardId}`,
      ),
  },
  processResult: {
    [CREATE_CUSTOMER_CARD]: CARD_NORMALISER.normaliseCreateCard,
    [DELETE_CUSTOMER_CARD]: CARD_NORMALISER.normaliseDeleteCard,
    [UPDATE_CUSTOMER_CARD]: CARD_NORMALISER.normaliseUpdateCard,
    [GET_CUSTOMER_CARDS]: CARD_NORMALISER.normaliseGetCard,
  },
  onSuccess: {},
  value: {},
  setValue: {},
};
