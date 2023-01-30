import React from 'react';
import { useInjectReducer } from '../../utils/injectReducer';
import { CUSTOMER_STORE_IMMER } from '../../appConstants';
import customerDataReducer from './reducer';

function CustomerDataImmerStore() {
  useInjectReducer({ key: CUSTOMER_STORE_IMMER, reducer: customerDataReducer });
  return <React.Fragment />;
}

export default CustomerDataImmerStore;
