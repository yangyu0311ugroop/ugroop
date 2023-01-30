import {
  INVOICE_API,
  GET_UPCOMING_INVOICE,
  CREATE_INVOICE,
  GET_INVOICE,
  GET_UPCOMING_INVOICE_LINE_ITEMS,
  GET_INVOICE_INVOICE_LINE_ITEMS,
} from 'apis/constants';
import { requests } from 'utils/request';
import { INVOICE_NORMALISERS } from './normaliser';
import { SUBSCRIPTION_VIEW_STORE } from '../../../appConstants';

export const CONFIG = {
  name: INVOICE_API,

  requests: {
    [GET_UPCOMING_INVOICE]: ({ query }) =>
      requests.fetchWithAuthorisation(
        'get',
        `/${INVOICE_API}?options=${query}`,
      ),
    [GET_UPCOMING_INVOICE_LINE_ITEMS]: ({ query }) =>
      requests.fetchWithAuthorisation(
        'get',
        `/${INVOICE_API}/lines?options=${query}`,
      ),
    [GET_INVOICE]: ({ query }) =>
      requests.fetchWithAuthorisation(
        'get',
        `/${INVOICE_API}?options=${query}`,
      ),
    [GET_INVOICE_INVOICE_LINE_ITEMS]: ({ query }) =>
      requests.fetchWithAuthorisation(
        'get',
        `/${INVOICE_API}/lines?options=${query}`,
      ),
    [CREATE_INVOICE]: data =>
      requests.fetchWithAuthorisation('post', `/${INVOICE_API}`, data),
  },
  processResult: {
    [GET_UPCOMING_INVOICE]: INVOICE_NORMALISERS.addUpComingInvoice,
    [GET_INVOICE]: INVOICE_NORMALISERS.addCurrentInvoice,
    [GET_INVOICE_INVOICE_LINE_ITEMS]:
      INVOICE_NORMALISERS.addCurrentInvoiceLineItems,
    [GET_UPCOMING_INVOICE_LINE_ITEMS]:
      INVOICE_NORMALISERS.addUpComingInvoiceLineItems,
  },
  setValue: {
    previewInvoiceLoading: [SUBSCRIPTION_VIEW_STORE, 'previewInvoiceLoading'],
  },
};
