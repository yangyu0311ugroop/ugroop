import produce from 'immer';
import dotProps from 'dot-prop';
import {
  GET_INVOICE_INVOICE_LINE_ITEMS_SUCCESS,
  GET_INVOICE_SUCCESS,
  GET_UPCOMING_INVOICE_LINE_ITEMS_SUCCESS,
  GET_UPCOMING_INVOICE_SUCCESS,
} from './constants';

// The initial state of the App
export const initialState = {
  currentInvoice: {},
  currentInvoiceLineItem: {},
  upcomingInvoice: {},
  upcomingInvoiceLineItem: {},
};

/* eslint-disable default-case, no-param-reassign */
const invoiceDataReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_INVOICE_SUCCESS: {
        draft.currentInvoice = action.result.currentInvoice;
        draft.currentInvoiceLineItem = action.result.currentInvoiceLineItem;
        break;
      }
      case GET_INVOICE_INVOICE_LINE_ITEMS_SUCCESS: {
        draft.currentInvoiceLineItem = action.result.currentInvoiceLineItem;
        const customerId = action.result.query.customer;
        dotProps.set(
          draft.currentInvoice,
          `${customerId}_currentInvoice.${customerId}.lines.data`,
          action.result.lineItemIds,
        );
        break;
      }
      case GET_UPCOMING_INVOICE_SUCCESS: {
        draft.upcomingInvoice = action.result.invoice;
        draft.upcomingInvoiceLineItem = action.result.invoiceLineItem;
        break;
      }
      case GET_UPCOMING_INVOICE_LINE_ITEMS_SUCCESS: {
        draft.upcomingInvoiceLineItem = action.result.invoiceLineItem;
        const customerId = action.result.query.customer;
        dotProps.set(
          draft.upcomingInvoice,
          `${customerId}_upcomingInvoice.${customerId}.lines.data`,
          action.result.lineItemIds,
        );
        break;
      }
    }
  });

export default invoiceDataReducer;
