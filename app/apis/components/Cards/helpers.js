import {
  CARDS_API,
  GET_CUSTOMER_CARDS,
  CREATE_CUSTOMER_CARD,
  UPDATE_CUSTOMER_CARD,
  DELETE_CUSTOMER_CARD,
} from 'apis/constants';
import { get } from 'lodash';
import { normalize, schema } from 'normalizr';

const cards = new schema.Entity('cards');

const customers = new schema.Entity('customers', {
  cards: [cards],
});

const createCustomerCard = (obj, props) => {
  const { id, data, onSuccess, onError } = obj;
  props.resaga.dispatchTo(CARDS_API, CREATE_CUSTOMER_CARD, {
    payload: { id, data },
    onSuccess,
    onError,
  });
};

const deleteCustomerCard = (obj, props) => {
  const { id, cardId, isDefault, onSuccess, onError } = obj;
  props.resaga.dispatchTo(CARDS_API, DELETE_CUSTOMER_CARD, {
    payload: { id, cardId, isDefault },
    onSuccess,
    onError,
  });
};

const updateCustomerCard = (obj, props) => {
  const { id, cardId, data, onSuccess, onError } = obj;
  props.resaga.dispatchTo(CARDS_API, UPDATE_CUSTOMER_CARD, {
    payload: { id, cardId, data },
    onSuccess,
    onError,
  });
};

const getCustomerCards = (obj, props) => {
  const { id, onSuccess, onError } = obj;
  props.resaga.dispatchTo(CARDS_API, GET_CUSTOMER_CARDS, {
    payload: { id },
    onSuccess,
    onError,
  });
};

const normaliseDeleteCard = (data, payload) => ({
  payload,
  raw: data,
});

const normaliseCreateCard = (data, payload) => ({
  raw: data,
  payload,
});
const normaliseUpdateCard = (data, payload) => ({
  raw: data,
  payload,
});

const normaliseGetCard = (result, payload) => {
  const { id } = payload;
  const customerData = {
    id,
    cards: get(result, 'data', []),
  };
  const { entities } = normalize(customerData, CARDS_SCHEMA.customers);

  return {
    resultCards: get(entities.customers, `${id}.cards`),
    normalised: {
      customers: entities.customers,
      cards: entities.cards,
    },
    payload,
  };
};

export const CARD_API_HELPERS = {
  createCustomerCard,
  updateCustomerCard,
  deleteCustomerCard,
  getCustomerCards,
};

export const CARD_NORMALISER = {
  normaliseCreateCard,
  normaliseDeleteCard,
  normaliseUpdateCard,
  normaliseGetCard,
};
export const CARDS_SCHEMA = {
  customers,
};
