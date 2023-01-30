import React from 'react';
import { useInjectReducer } from '../../utils/injectReducer';
import { PRODUCT_STORE_IMMER } from '../../appConstants';
import productDataReducer from './reducer';

function ProductDataImmerStore() {
  useInjectReducer({ key: PRODUCT_STORE_IMMER, reducer: productDataReducer });
  return <React.Fragment />;
}

export default ProductDataImmerStore;
