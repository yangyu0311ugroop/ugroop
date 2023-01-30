import { normalize } from 'normalizr';
import schema from 'datastore/invoiceImmerStore/schema';

const addUpComingInvoice = result => {
  const normalizedData = normalize(result, schema.invoice);
  return {
    invoice: normalizedData.entities.invoice,
    invoiceLineItem: normalizedData.entities.lineItem,
  };
};

const addUpComingInvoiceLineItems = (result, payload) => {
  const normalizedData = normalize(result.data, schema.listLineItem);
  const query = JSON.parse(decodeURIComponent(payload.query));
  return {
    invoiceLineItem: normalizedData.entities.lineItem,
    lineItemIds: normalizedData.result,
    query,
  };
};

const addCurrentInvoice = result => {
  const normalizedData = normalize(result, schema.currentInvoice);
  return {
    currentInvoice: normalizedData.entities.invoice,
    currentInvoiceLineItem: normalizedData.entities.lineItem,
  };
};

const addCurrentInvoiceLineItems = (result, payload) => {
  const normalizedData = normalize(result.data, schema.currentListLineItem);
  const query = JSON.parse(decodeURIComponent(payload.query));
  return {
    currentInvoiceLineItem: normalizedData.entities.lineItem,
    lineItemIds: normalizedData.result,
    query,
  };
};

export const INVOICE_NORMALISERS = {
  addUpComingInvoice,
  addUpComingInvoiceLineItems,
  addCurrentInvoice,
  addCurrentInvoiceLineItems,
};
