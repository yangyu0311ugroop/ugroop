import React from 'react';
import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import { renderHook, act } from '@testing-library/react-hooks';
import { useImmer } from 'use-immer';
import {
  Category,
  MARKET_PLACE_STORE,
  URL_HELPERS,
} from '../../../appConstants';
import { useInjectReducer } from '../../../utils/injectReducer';
import marketplaceReducer from '../dataStore/reducer';
import { MarketplaceContentDetail } from '../marketplaceContentDetail';
import {
  dispatchSetValue,
  renderWithReduxWithRouter,
} from '../../../utils/testUtility';
import { MarketplaceProvider } from '../context/marketplaceProvider';
import Node from '../../../apis/components/Node';
import Template from '../../../apis/components/Template';
import { sleep } from '../../../utils/timeUtility';
import { PORTAL_HELPERS } from '../../Portal/helpers';
import { templateNodes } from './nodeDataStoreFeed';
import { checklistData } from './checklistData';
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

jest.mock('../../../ugcomponents/Inputs/SimpleRTE', () => ({
  StyledSimpleRTE: props => <div data-testid="SimpleRTE" {...props} />,
}));

function TestMarketplaceContentDetail(passProps) {
  useInjectReducer({ key: MARKET_PLACE_STORE, reducer: marketplaceReducer });
  return <MarketplaceContentDetail match={passProps.match} />;
}

test('MarketplaceContentDetail checklist', async () => {
  const orgId = 2;
  const fakeFn = jest.fn(({ cb }) => {
    cb({ category: Category.CheckList, orgId })();
  });
  const fakeFn2 = jest.fn(({ cb }) => {
    cb({ category: Category.CheckList, orgId: 0 })();
  });
  const { result } = renderHook(() => {
    // eslint-disable-next-line no-unused-vars
    const [state, dispatch] = useImmer({
      templateCollapseValue: false,
      newlyAppliedTemplateRedirectUrl: '',
      tabCardViewDetectHeight: 0,
    });
    return { state, dispatch };
  });
  PORTAL_HELPERS.openCloneMarketTemplate = fakeFn;
  let myStore;
  act(() => {
    const { store } = renderWithReduxWithRouter(
      <MarketplaceProvider
        store={{
          state: result.current.state,
          dispatch: result.current.dispatch,
        }}
      >
        <Node />
        <TestMarketplaceContentDetail
          match={{ params: { category: Category.CheckList, id: '6310' } }}
        />
      </MarketplaceProvider>,
      {},
    );
    myStore = store;
  });

  dispatchSetValue(myStore, 'nodeStore', 'nodes', checklistData);
  dispatchSetValue(
    myStore,
    'organisationDataStore',
    'organisations',
    organisationData,
  );
  await sleep(10);
  expect(screen.getByRole('link', { name: /Templates/i })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /Checklists/i })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /sd/i })).toBeInTheDocument();
  expect(
    screen.getByRole('heading', { name: /About this template/i }),
  ).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: /Preview/i })).toBeInTheDocument();
  expect(
    screen.getByRole('button', { name: /mychecklist/i }),
  ).toBeInTheDocument();

  expect(screen.getByRole('separator')).toBeInTheDocument();
  const useTemplateButton = screen.getByRole('button', {
    name: /use template/i,
  });
  expect(useTemplateButton).toBeInTheDocument();
  act(() => {
    userEvent.click(useTemplateButton);
  });
  expect(fakeFn).toBeCalled();
  expect(result.current.state.newlyAppliedTemplateRedirectUrl).toEqual(
    URL_HELPERS.orgChecklists(orgId),
  );
  PORTAL_HELPERS.openCloneMarketTemplate = fakeFn2;
  act(() => {
    userEvent.click(useTemplateButton);
  });
  expect(fakeFn2).toBeCalled();
  expect(result.current.state.newlyAppliedTemplateRedirectUrl).toEqual(
    URL_HELPERS.checklists(),
  );
});
test('MarketplaceContentDetail Tour Page Loading with mocked store', async () => {
  const cloneId = 2;
  const fakeFn = jest.fn(({ cb }) => {
    cb({ category: Category.FeaturedTours })({ cloneId });
  });
  const { result } = renderHook(() => {
    // eslint-disable-next-line no-unused-vars
    const [state, dispatch] = useImmer({
      templateCollapseValue: false,
      newlyAppliedTemplateRedirectUrl: '',
      tabCardViewDetectHeight: 0,
    });
    return { state, dispatch };
  });
  PORTAL_HELPERS.openCloneMarketTemplate = fakeFn;
  const { store } = renderWithReduxWithRouter(
    <MarketplaceProvider
      store={{
        state: result.current.state,
        dispatch: result.current.dispatch,
      }}
    >
      <Template />
      <Node />
      <TestMarketplaceContentDetail
        match={{ params: { category: Category.FeaturedTours, id: '6024' } }}
      />
    </MarketplaceProvider>,
    {},
  );
  dispatchSetValue(store, 'nodeStore', 'nodes', templateNodes);
  dispatchSetValue(
    store,
    'organisationDataStore',
    'organisations',
    organisationData,
  );
  await sleep(10);
  expect(screen.getByRole('link', { name: /Templates/i })).toBeInTheDocument();
  expect(
    screen.getByRole('link', { name: /Featured Tours and Trips/i }),
  ).toBeInTheDocument();
  expect(
    screen.getByRole('link', { name: /new chat tour22/i }),
  ).toBeInTheDocument();
  expect(
    screen.getByRole('heading', { name: /About this template/i }),
  ).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: /Preview/i })).toBeInTheDocument();

  expect(screen.getByRole('separator')).toBeInTheDocument();
  const useTemplateButton = screen.getByRole('button', {
    name: /use template/i,
  });
  expect(useTemplateButton).toBeInTheDocument();
  act(() => {
    userEvent.click(useTemplateButton);
  });
  expect(fakeFn).toBeCalled();
  expect(result.current.state.newlyAppliedTemplateRedirectUrl).toEqual(
    URL_HELPERS.tours(cloneId),
  );
});

test('MarketplaceContentDetail Tour Page Loading with own store', async () => {
  jest.useFakeTimers();
  jest.setTimeout(10000);
  const cloneId = 2;
  const fakeFn = jest.fn(({ cb }) => {
    cb({ category: Category.FeaturedTours })({ cloneId });
  });

  PORTAL_HELPERS.openCloneMarketTemplate = fakeFn;
  const { store } = renderWithReduxWithRouter(
    <MarketplaceProvider>
      <Template />
      <Node />
      <TestMarketplaceContentDetail
        match={{ params: { category: Category.FeaturedTours, id: '6024' } }}
      />
    </MarketplaceProvider>,
    {},
  );
  dispatchSetValue(store, 'nodeStore', 'nodes', templateNodes);
  dispatchSetValue(
    store,
    'organisationDataStore',
    'organisations',
    organisationData,
  );
  expect(screen.getByRole('link', { name: /Templates/i })).toBeInTheDocument();
  expect(
    screen.getByRole('link', { name: /Featured Tours and Trips/i }),
  ).toBeInTheDocument();
  expect(
    screen.getByRole('link', { name: /new chat tour22/i }),
  ).toBeInTheDocument();
  expect(
    screen.getByRole('heading', { name: /About this template/i }),
  ).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: /Preview/i })).toBeInTheDocument();

  expect(screen.getByRole('separator')).toBeInTheDocument();
  const useTemplateButton = screen.getByRole('button', {
    name: /use template/i,
  });
  expect(useTemplateButton).toBeInTheDocument();
  act(() => {
    userEvent.click(useTemplateButton);
  });
  expect(fakeFn).toBeCalled();
  const redirectButton = screen.getByRole('button', {
    name: /redirecting/i,
  });
  expect(redirectButton).toBeInTheDocument();
  expect(redirectButton).toBeTruthy();
  jest.runAllTimers();
});

test('with url pending the button shall display creating', () => {
  const { result } = renderHook(() => {
    // eslint-disable-next-line no-unused-vars
    const [state, dispatch] = useImmer({
      templateCollapseValue: false,
      newlyAppliedTemplateRedirectUrl: 'pending',
      tabCardViewDetectHeight: 0,
    });
    return { state, dispatch };
  });
  renderWithReduxWithRouter(
    <MarketplaceProvider
      store={{
        state: result.current.state,
        dispatch: result.current.dispatch,
      }}
    >
      <Template />
      <Node />
      <TestMarketplaceContentDetail
        match={{ params: { category: Category.FeaturedTours, id: '6024' } }}
      />
    </MarketplaceProvider>,
    {},
  );
  const creatingButton = screen.getByRole('button', { name: /creating/i });
  expect(creatingButton).toBeInTheDocument();
  expect(creatingButton.hasAttribute('disabled')).toBeTruthy();
});
