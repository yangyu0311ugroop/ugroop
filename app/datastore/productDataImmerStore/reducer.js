import produce from 'immer';
import { GET_PRODUCT_LIST_SUCCESS } from 'datastore/planDataImmerStore/constants';

// The initial state of the App
export const initialState = {
  ids: {},
  products: {},
};

/* eslint-disable default-case, no-param-reassign */
const productDataReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_PRODUCT_LIST_SUCCESS: {
        draft.ids = action.result.ids;
        draft.products = action.result.productsData;
        break;
      }
    }
  });

export default productDataReducer;
