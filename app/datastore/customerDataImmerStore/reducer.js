import produce from 'immer';
import dotProp from 'dot-prop';
import _ from 'lodash';
import {
  GET_USER_ME_SUCCESS,
  GET_CUSTOMER_SUBSCRIPTION_SUCCESS,
  UPDATE_SUBSCRIPTION_SUCCESS,
  UPDATE_CUSTOMER_SUCCESS,
  LIST_SUBSCRIPTION_SCHEDULE_SUCCESS,
  RELEASE_SUBSCRIPTION_SCHEDULE_SUCCESS,
  UPDATE_SUBSCRIPTION_SCHEDULE_SUCCESS,
  CREATE_CUSTOMER_CARD_SUCCESS,
  UPDATE_CUSTOMER_CARD_SUCCESS,
  DELETE_CUSTOMER_CARD_SUCCESS,
  GET_CUSTOMER_CARDS_SUCCESS,
  GET_CUSTOMER_CHARGES_SUCCESS,
  UPDATE_PAYMENT_METHOD,
} from './constants';
// The initial state of the App
export const initialState = {
  subscriptions: {},
  subscriptionItems: {},
  customers: {},
  paymentSources: {},
};

/* eslint-disable default-case, no-param-reassign */
const customerDataReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_USER_ME_SUCCESS: {
        draft.users = action.result.customerRelations.users;
        draft.orgs = action.result.customerRelations.orgs;
        draft.subscriptions = action.result.subscriptions;
        draft.subscriptionItems = action.result.subscriptionItems;
        draft.customers = action.result.customers;
        if (action.result.paymentSources) {
          draft.paymentSources = action.result.paymentSources;
        }
        break;
      }
      case GET_CUSTOMER_SUBSCRIPTION_SUCCESS: {
        const customerId = action.result.raw.id;
        const payLoad = action.result.payload;
        if (customerId && action.result.raw.subscriptions.data.length > 0) {
          const subscriptionId = action.result.raw.subscriptions.data[0].id;
          const subscriptionItems =
            action.result.raw.subscriptions.data[0].items.data;
          dotProp.set(
            draft.customers,
            `${customerId}.subscriptions.data`,
            action.result.normalised.customers[customerId].subscriptions.data,
          );
          dotProp.set(
            draft.subscriptions,
            subscriptionId,
            action.result.normalised.subscriptions[subscriptionId],
          );
          subscriptionItems.forEach(o => {
            dotProp.set(
              draft.subscriptionItems,
              o.id,
              action.result.normalised.subscriptionItems[o.id],
            );
          });
          dotProp.set(
            draft.customers,
            `${customerId}.subscriptions.data`,
            action.result.normalised.customers[customerId].subscriptions.data,
          );
        }
        if (customerId) {
          dotProp.set(draft.customers, `${customerId}.id`, customerId);
          if (payLoad.type === 'org') {
            dotProp.set(draft.orgs, `${payLoad.id}`, customerId);
          } else {
            dotProp.set(draft.users, `${payLoad.id}`, customerId);
          }
        }
        break;
      }
      case UPDATE_SUBSCRIPTION_SUCCESS: {
        const subscriptionId = action.result.raw.id;
        const subscriptionItemId = action.result.raw.items.data[0].id;
        draft.subscriptions[subscriptionId] =
          action.result.normalised.subscriptions[subscriptionId];
        draft.subscriptionItems[subscriptionItemId] =
          action.result.normalised.subscriptionItems[subscriptionItemId];
        break;
      }
      case UPDATE_CUSTOMER_SUCCESS: {
        const customerId = action.result.raw.id;
        dotProp.set(
          draft.customers,
          `${customerId}`,
          action.result.normalised[customerId],
        );
        // dotProp.set(draft.customerLastUpdate, `${customerId}`, Date.now());
        break;
      }
      case LIST_SUBSCRIPTION_SCHEDULE_SUCCESS: {
        const query = JSON.parse(action.result.payload.query);
        const customerId = query.customer;
        if (customerId && action.result.normalised.customers) {
          dotProp.set(
            draft.customers,
            `${customerId}.scheduleIds`,
            action.result.normalised.customers[customerId].scheduleIds,
          );
          draft.schedulePlans = action.result.normalised.schedulePlans;
          draft.schedules = action.result.normalised.schedules;
          draft.schedulePhases = action.result.normalised.schedulePhases;
          draft.lastPhasePlans = action.result.normalised.lastPhasePlans;
        }
        break;
      }
      case RELEASE_SUBSCRIPTION_SCHEDULE_SUCCESS: {
        const customerId = action.result.raw.customer;
        if (customerId) {
          dotProp.set(draft.customers, `${customerId}.scheduleIds`, []);
        }
        break;
      }
      case UPDATE_SUBSCRIPTION_SCHEDULE_SUCCESS: {
        if (action.result.normalised.schedulePhases) {
          draft.schedulePhases = action.result.normalised.schedulePhases;
        }
        if (action.result.normalised.schedules) {
          draft.schedules = action.result.normalised.schedules;
        }
        if (action.result.normalised.schedulePlans) {
          draft.schedulePlans = action.result.normalised.schedulePlans;
        }
        break;
      }
      case GET_CUSTOMER_CARDS_SUCCESS: {
        const customerId = action.result.payload.id;
        if (customerId) {
          if (action.result.normalised.customers[customerId].cards.length > 0) {
            const cardId =
              action.result.normalised.customers[customerId].cards[0];
            dotProp.set(
              draft.customers,
              `${customerId}.default_source`,
              cardId,
            );
            dotProp.set(draft.paymentSources, `${cardId}`, {
              ...action.result.normalised.cards[cardId],
            });
          }
        }
        break;
      }
      case CREATE_CUSTOMER_CARD_SUCCESS: {
        const customerId = action.result.payload.id;
        if (customerId) {
          const cardId = action.result.raw.id;
          dotProp.set(draft.customers, `${customerId}.default_source`, cardId);
          dotProp.set(draft.paymentSources, `${cardId}`, action.result.raw);
        }
        break;
      }
      case DELETE_CUSTOMER_CARD_SUCCESS: {
        const payload = action.result.payload;
        if (payload) {
          const cid = payload.id;
          dotProp.set(draft.customers, `${cid}.default_source`, null);
        }
        break;
      }
      case UPDATE_CUSTOMER_CARD_SUCCESS: {
        break;
      }
      case UPDATE_PAYMENT_METHOD: {
        const cardId = action.result.raw.id;
        if (cardId) {
          _.forEach(action.result.address, function(value, key) {
            dotProp.set(draft.paymentSources, `${cardId}.${key}`, value);
          });
          _.forEach(action.result.card, function(value, key) {
            dotProp.set(draft.paymentSources, `${cardId}.${key}`, value);
          });
        }
        break;
      }
      case GET_CUSTOMER_CHARGES_SUCCESS: {
        const customerId = action.result.payload.data.customer;
        if (customerId) {
          dotProp.set(
            draft.customers,
            `${customerId}.charges`,
            action.result.normalised.customers[customerId].charges,
          );
          dotProp.set(
            draft.customers,
            `${customerId}.listChargesHasMore`,
            action.result.normalised.customers[customerId].listChargesHasMore,
          );
          dotProp.set(
            draft.customers,
            `${customerId}.lastFetchId`,
            action.result.normalised.customers[customerId].lastFetchId,
          );
          _.forEach(action.result.normalised.charges, function(value, key) {
            dotProp.set(draft, `charges.${key}`, value);
          });
        }
        break;
      }
    }
  });

export default customerDataReducer;
