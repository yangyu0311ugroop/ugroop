import React from 'react';
import { useInjectReducer } from '../../utils/injectReducer';
import { INVOICE_STORE_IMMER } from '../../appConstants';
import invoiceDataReducer from './reducer';

function InvoiceDataImmerStore() {
  useInjectReducer({ key: INVOICE_STORE_IMMER, reducer: invoiceDataReducer });
  return <React.Fragment />;
}

export default InvoiceDataImmerStore;
