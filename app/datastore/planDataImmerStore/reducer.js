import produce from 'immer';
import { GET_PLAN_LIST_SUCCESS } from 'datastore/planDataImmerStore/constants';

// The initial state of the App
export const initialState = {
  plans: {},
  products: {},
};

/* eslint-disable default-case, no-param-reassign */
const planDataReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_PLAN_LIST_SUCCESS: {
        draft.plans = action.result.plans;
        draft.products = action.result.products;
        break;
      }
    }
  });

export default planDataReducer;
