import produce from 'immer';
import { Category } from '../../../appConstants';
import { getMarketMockedValue } from './mockedData';

// The initial state of the App
const mockedData = getMarketMockedValue();
export const initialState = {
  category: [Category.CheckList, Category.FeaturedTours],
  publishProducts: {
    Checklist: {
      productsList: mockedData.Checklist.productsList,
    },
    'Featured Tours': {
      productsList: mockedData['Featured Tours'].productsList,
    },
  },
  publishedBy: mockedData.publishedBy,
};

/* eslint-disable default-case, no-param-reassign */
const marketplaceReducer = (state = initialState, action) =>
  // eslint-disable-next-line no-unused-vars
  produce(state, draft => {
    // eslint-disable-next-line no-empty
    switch (action.type) {
    }
  });

export default marketplaceReducer;
