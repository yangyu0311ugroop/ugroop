import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/dom';
import { ProductDetail } from '../productDetail';
import { useInjectReducer } from '../../../../utils/injectReducer';
import {
  Category,
  MARKET_PLACE_STORE,
  URL_HELPERS,
} from '../../../../appConstants';
import marketplaceReducer from '../../dataStore/reducer';
import {
  dispatchSetValue,
  renderWithReduxWithRouter,
} from '../../../../utils/testUtility';
import { MarketplaceProvider } from '../../context/marketplaceProvider';
import Node from '../../../../apis/components/Node';
import Template from '../../../../apis/components/Template';
import { templateNodes } from '../../tests/nodeDataStoreFeed';
import { sleep } from '../../../../utils/timeUtility';
const mockedResaga = {
  dispatchTo: jest.fn((api, fn, payload) => {
    if (payload.onSuccess) {
      payload.onSuccess({ node: 6024, eventNode: 1 });
    }
  }),
};

jest.mock('../../../../ugcomponents/Inputs/SimpleRTE', () => ({
  StyledSimpleRTE: props => <div data-testid="SimpleRTE" {...props} />,
}));

function TestProductDetail(passProps) {
  useInjectReducer({ key: MARKET_PLACE_STORE, reducer: marketplaceReducer });
  return (
    <ProductDetail
      resaga={mockedResaga}
      {...passProps}
      id={6024}
      tabId={6025}
    />
  );
}

test('ProductDetail', async () => {
  const history = {
    push: jest.fn(),
  };
  const { store } = renderWithReduxWithRouter(
    <MarketplaceProvider>
      <Node />
      <Template />
      <TestProductDetail
        match={{ params: { category: Category.FeaturedTours, id: '6310' } }}
        category={Category.FeaturedTours}
        history={history}
      />
    </MarketplaceProvider>,
    {},
  );
  dispatchSetValue(store, 'nodeStore', 'nodes', templateNodes);
  await sleep(20);
  userEvent.click(screen.getByTestId('previewContent'));
  expect(history.push).toBeCalledWith(URL_HELPERS.tours(6024));
});
