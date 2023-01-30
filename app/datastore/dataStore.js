/* to init data store */
import React from 'react';
import PlanDataImmerStore from './planDataImmerStore/planDataImmerStore';
import ProductDataImmerStore from './productDataImmerStore/productDataImmerStore';
import CustomerDataImmerStore from './customerDataImmerStore/customerDataImmerStore';
import InvoiceDataImmerStore from './invoiceImmerStore/invoiceDataImmerStore';
import StreamChatDataImmerStore from './streamChat/streamChatDataImmerStore';
function InitDataStore() {
  return (
    <>
      <PlanDataImmerStore />
      <ProductDataImmerStore />
      <CustomerDataImmerStore />
      <InvoiceDataImmerStore />
      <StreamChatDataImmerStore />
    </>
  );
}

export default InitDataStore;
