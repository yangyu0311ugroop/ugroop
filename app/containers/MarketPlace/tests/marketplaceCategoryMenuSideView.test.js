import { screen } from '@testing-library/dom';
import React from 'react';
import _ from 'lodash';
import userEvent from '@testing-library/user-event';
import MarketplaceCategoryMenuSideView from '../marketplaceCategoryMenuSideView';
import {
  dispatchSetValue,
  renderWithReduxWithRouter,
} from '../../../utils/testUtility';
import { MarketplaceProvider } from '../context/marketplaceProvider';
import { Category, MARKET_PLACE_STORE } from '../../../appConstants';
import { useInjectReducer } from '../../../utils/injectReducer';
import marketplaceReducer from '../dataStore/reducer';
import MarketplaceCategoryListContent from '../marketplaceCategoryListContent';
import Node from '../../../apis/components/Node';
import Market from '../../../apis/components/Market';
import { templateNodes } from './nodeDataStoreFeed';
import { checklistData } from './checklistData';
import { sleep } from '../../../utils/timeUtility';
import { convertCategoryName } from '../utils/categoryNameConvert';

const templateLabel = 'Template library';

const organisationData = {
  817: {
    name: 'dddddddddddddddddddddddddddddd',
    namekey: 'org-dddddd-ddddd',
    country: 'AUS',
    website: '',
    type: 'Club',
    createdBy: 56,
    lastModifiedBy: 56,
    id: 65,
    typeId: 817,
    photo:
      'FileContainers/com.ugroop.personContainer/download/c87c720e-52a8-4d3d-8dbb-1efe740beaeb.jpeg',
    userId: 56,
    orgId: 817,
    status: 'confirmed',
    role: 'owner',
    activated: true,
    rootNodeId: 0,
    createdAt: '2020-04-02T03:24:51.130Z',
    updatedAt: '2020-04-02T03:24:51.130Z',
  },
};
export const initialState = {
  category: [Category.CheckList, Category.FeaturedTours],
};

function TestMarketplaceCategoryMenuSideView() {
  useInjectReducer({ key: MARKET_PLACE_STORE, reducer: marketplaceReducer });
  return <MarketplaceCategoryMenuSideView />;
}

jest.mock('react-text-truncate', () => ({
  __esModule: true, // this property makes it work
  default: props => <span data-testid="react-text-truncate" {...props} />,
}));

test('MarketplaceCategoryMenuSideView', () => {
  const { store } = renderWithReduxWithRouter(
    <MarketplaceProvider>
      <TestMarketplaceCategoryMenuSideView />
    </MarketplaceProvider>,
    initialState,
  );
  expect(screen.getByText(templateLabel)).toBeInTheDocument();
  userEvent.hover(screen.getByText(templateLabel));
  const classLists = screen.getByTestId('marketplaceHeader').classList;
  expect(_.values(classLists).find(o => o.includes('hoverOver'))).toBeTruthy();
  userEvent.unhover(screen.getByText(templateLabel));
  expect(_.values(classLists).find(o => o.includes('hoverOver'))).toBeFalsy();
  userEvent.click(screen.getByText(templateLabel));
  expect(
    store
      .getState()
      .get('router')
      .get('location')
      .get('pathname'),
  ).toEqual('/marketplace');
  expect(_.values(classLists).find(o => o.includes('active'))).toBeTruthy();
  expect(
    screen.getByText(convertCategoryName(Category.CheckList)),
  ).toBeInTheDocument();
  expect(
    screen.getByText(convertCategoryName(Category.FeaturedTours)),
  ).toBeInTheDocument();
  userEvent.click(screen.getByText(convertCategoryName(Category.CheckList)));
  expect(
    store
      .getState()
      .get('router')
      .get('location')
      .get('search'),
  ).toEqual('?category=Checklist');
  const featureCategoryclassLists = screen.getByTestId(
    `category-${Category.FeaturedTours}`,
  ).classList;
  userEvent.hover(
    screen.getByText(convertCategoryName(Category.FeaturedTours)),
  );
  expect(
    _.values(featureCategoryclassLists).find(o => o.includes('hoverOver')),
  ).toBeTruthy();
  userEvent.unhover(
    screen.getByText(convertCategoryName(Category.FeaturedTours)),
  );
  expect(
    _.values(featureCategoryclassLists).find(o => o.includes('hoverOver')),
  ).toBeFalsy();
  expect(_.values(classLists).find(o => o.includes('active'))).toBeFalsy();
});

test('MarketplaceCategoryMenuSideView with Content List', async () => {
  const { store } = renderWithReduxWithRouter(
    <MarketplaceProvider>
      <Node />
      <Market />
      <TestMarketplaceCategoryMenuSideView />
      <MarketplaceCategoryListContent />
    </MarketplaceProvider>,
    {},
  );
  dispatchSetValue(store, 'nodeStore', 'nodes', {
    ...checklistData,
    ...templateNodes,
  });
  dispatchSetValue(
    store,
    'organisationDataStore',
    'organisations',
    organisationData,
  );
  await sleep(2);
  userEvent.click(screen.getByTestId('marketplaceHeader'));
  expect(
    store
      .getState()
      .get('router')
      .get('location')
      .get('pathname'),
  ).toEqual('/marketplace');
  /* click check list menu */
  userEvent.click(screen.getByTestId(`category-${Category.CheckList}`));
  expect(
    screen.getByRole('heading', { name: /Checklists/i }),
  ).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /Templates/i })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /Checklists/i })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /sd/i })).toBeInTheDocument();
  /* click feature tours menu */
  userEvent.click(screen.getByTestId(`category-${Category.FeaturedTours}`));
  expect(screen.getByRole('link', { name: /Templates/i })).toBeInTheDocument();
  expect(
    screen.getByRole('link', { name: /Featured Tours and Trips/i }),
  ).toBeInTheDocument();
  expect(
    screen.getByRole('link', { name: /new chat tour22/i }),
  ).toBeInTheDocument();
});
