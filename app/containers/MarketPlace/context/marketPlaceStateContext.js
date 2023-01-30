import { useContext } from 'react';

import { StateContext, DispatchContext } from './marketplaceProvider';

const useMarketplaceStateContext = () => {
  const state = useContext(StateContext);

  if (state === undefined) {
    throw new Error('Ut oh, where is my state?');
  }

  return state;
};

const useMarketplaceDispatchContext = () => {
  const dispatch = useContext(DispatchContext);

  if (dispatch === undefined) {
    throw new Error('Ut oh, where is my dispatch?');
  }

  const toggleTemplateCollapseValue = value => {
    dispatch(draft => {
      // eslint-disable-next-line no-param-reassign
      draft.templateCollapseValue = value;
    });
  };

  const setNewlyAppliedTemplateRedirectUrl = value => {
    dispatch(draft => {
      // eslint-disable-next-line no-param-reassign
      draft.newlyAppliedTemplateRedirectUrl = value;
    });
  };

  const setDetectTabCardHeight = value => {
    dispatch(draft => {
      // eslint-disable-next-line no-param-reassign
      draft.tabCardViewDetectHeight = value;
    });
  };

  return {
    dispatch,
    toggleTemplateCollapseValue,
    setNewlyAppliedTemplateRedirectUrl,
    setDetectTabCardHeight,
  };
};

export const useMarketplaceContext = () => [
  useMarketplaceStateContext(),
  useMarketplaceDispatchContext(),
];
