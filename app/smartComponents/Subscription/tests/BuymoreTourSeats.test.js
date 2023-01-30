import React from 'react';
import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import { renderHook } from '@testing-library/react-hooks';
import { useImmer } from 'use-immer';
import { BuymoreTourSeats } from '../BuymoreTourSeats';
import {
  dispatchSetValue,
  renderWithRedux,
  renderWithReduxWithRouter,
} from '../../../utils/testUtility';
import { MessengerProvider } from '../../../containers/StreamChat/messengerProvider';
import {
  COGNITO_ACCOUNTSTORE,
  NODE_STORE,
  STREAM_CHAT_STORE_IMMER,
  URL_HELPERS,
} from '../../../appConstants';
import { sleep } from '../../../utils/timeUtility';
import { useInjectReducer } from '../../../utils/injectReducer';
import streamChatReducer from '../../../datastore/streamChat/reducer';
import { GET_TEMPLATE_PEOPLE_SUCCESS } from '../../../containers/StreamChat/constants';
import { GlobalProvider } from '../../../containers/App/globalContext';

function BuymoreTourSeatsWrapper(props) {
  useInjectReducer({
    key: STREAM_CHAT_STORE_IMMER,
    reducer: streamChatReducer,
  });
  return <BuymoreTourSeats {...props} />;
}

test('BuymoreTourSeat shall not be accessed without any data', async () => {
  renderWithRedux(
    <GlobalProvider>
      <MessengerProvider>
        <BuymoreTourSeats templateId={1} />
      </MessengerProvider>
    </GlobalProvider>,
    {},
  );
  expect(screen.getByTestId('no-access-buy-more')).toBeInTheDocument();
});
test('BuymoreTourSeat shall not be accessed if not part of the tour', async () => {
  const { store } = renderWithRedux(
    <GlobalProvider>
      <MessengerProvider>
        <BuymoreTourSeatsWrapper templateId={1} />
      </MessengerProvider>
    </GlobalProvider>,
    {},
  );
  dispatchSetValue(store, COGNITO_ACCOUNTSTORE, 'account', {
    id: 1,
  });
  store.dispatch({
    type: GET_TEMPLATE_PEOPLE_SUCCESS,
    result: {
      templateId: 1,
      userNodeUserIdsPerTour: [2, 3, 4],
    },
  });
  await sleep(10);
  expect(screen.getByTestId('no-access-buy-more')).toBeInTheDocument();
});
test('BuymoreTourSeat shall not be accessed if personal tour but not owner', async () => {
  const { store } = renderWithRedux(
    <GlobalProvider>
      <MessengerProvider>
        <BuymoreTourSeatsWrapper templateId={1} />
      </MessengerProvider>
    </GlobalProvider>,
    {},
  );
  dispatchSetValue(store, COGNITO_ACCOUNTSTORE, 'account', {
    id: 1,
  });
  dispatchSetValue(store, NODE_STORE, 'nodes', {
    // templateId is from personal tour
    1: {
      id: 1,
      customData: {
        organisationId: null,
      },
    },
  });
  // login user is part of the tour
  store.dispatch({
    type: GET_TEMPLATE_PEOPLE_SUCCESS,
    result: {
      templateId: 1,
      userNodeIdsPerTour: [2, 3, 4, 1],
    },
  });
  await sleep(10);
  expect(screen.getByTestId('no-access-buy-more')).toBeInTheDocument();
});

test('BuymoreTourSeat shall display remaining seats from personal with owner access', async () => {
  const { result } = renderHook(() => {
    const [state, dispatch] = useImmer({
      BillingContext: {
        person: {
          tourSeats: 20,
          connectedPeople: 8,
        },
        tourConnectedPeople: [],
      },
    });
    return { state, dispatch };
  });

  const { store, rerenderWithReduxWithRouter } = renderWithReduxWithRouter(
    <GlobalProvider
      store={{
        state: result.current.state,
        dispatch: result.current.dispatch,
      }}
    >
      <MessengerProvider>
        <BuymoreTourSeatsWrapper templateId={1} />
      </MessengerProvider>
    </GlobalProvider>,
    {},
  );
  dispatchSetValue(store, COGNITO_ACCOUNTSTORE, 'account', {
    id: 1,
  });
  dispatchSetValue(store, NODE_STORE, 'nodes', {
    1: {
      id: 1,
      customData: {
        organisationId: null,
      },
      createdBy: 1,
    },
  });
  // login user is part of the tour
  store.dispatch({
    type: GET_TEMPLATE_PEOPLE_SUCCESS,
    result: {
      templateId: 1,
      userNodeUserIdsPerTour: [2, 3, 4, 1],
    },
  });
  await sleep(10);
  expect(screen.getByText('12 tour seats left')).toBeInTheDocument();
  expect(
    screen.queryByRole('link', { name: /Buy more/i }),
  ).not.toBeInTheDocument();
  const { result: result2 } = renderHook(() => {
    const [state, dispatch] = useImmer({
      BillingContext: {
        person: {
          tourSeats: 20,
          connectedPeople: 20,
        },
        tourConnectedPeople: [],
      },
    });
    return { state, dispatch };
  });
  rerenderWithReduxWithRouter(
    <GlobalProvider
      store={{
        state: result2.current.state,
        dispatch: result2.current.dispatch,
      }}
    >
      <BuymoreTourSeatsWrapper templateId={1} />
    </GlobalProvider>,
  );
  userEvent.click(screen.queryByRole('link', { name: /Buy more/i }));
  expect(
    store
      .getState()
      .get('router')
      .get('location')
      .get('pathname'),
  ).toEqual(URL_HELPERS.personalSettingBilling());
});

test('BuymoreTourSeat shall display remaining seats and buy more if they are part of the tour', async () => {
  const { result } = renderHook(() => {
    const [state, dispatch] = useImmer({
      BillingContext: {
        org: {
          tourSeats: 20,
          connectedPax: 20,
        },
        person: {
          tourSeats: -1,
          connectedPeople: -1,
        },
        tourConnectedPeople: [],
      },
    });
    return { state, dispatch };
  });
  const { store } = renderWithReduxWithRouter(
    <GlobalProvider
      store={{
        state: result.current.state,
        dispatch: result.current.dispatch,
      }}
    >
      <MessengerProvider>
        <BuymoreTourSeatsWrapper templateId={1} />
      </MessengerProvider>
    </GlobalProvider>,
    {},
  );
  dispatchSetValue(store, COGNITO_ACCOUNTSTORE, 'account', {
    id: 1,
  });
  dispatchSetValue(store, NODE_STORE, 'nodes', {
    1: {
      id: 1,
      customData: {
        organisationId: 1,
      },
      createdBy: 1,
    },
  });
  // login user is part of the tour
  store.dispatch({
    type: GET_TEMPLATE_PEOPLE_SUCCESS,
    result: {
      templateId: 1,
      userNodeUserIdsPerTour: [2, 3, 4, 1],
    },
  });
  await sleep(10);
  expect(screen.getByText('0 tour seats left')).toBeInTheDocument();
  expect(screen.queryByRole('link', { name: /Buy more/i })).toBeInTheDocument();
  userEvent.click(screen.queryByRole('link', { name: /Buy more/i }));
  expect(
    store
      .getState()
      .get('router')
      .get('location')
      .get('pathname'),
  ).toEqual(URL_HELPERS.orgSubscriptionUpgrade(1));
});
test('BuyremoreTourseat Shall display correct if it is free plan', async () => {
  const { result } = renderHook(() => {
    const [state, dispatch] = useImmer({
      BillingContext: {
        person: {
          tourSeats: 2,
          connectedPeople: 1.5,
        },
        tourConnectedPeople: [],
      },
    });
    return { state, dispatch };
  });

  const { store } = renderWithReduxWithRouter(
    <GlobalProvider
      store={{
        state: result.current.state,
        dispatch: result.current.dispatch,
      }}
    >
      <MessengerProvider>
        <BuymoreTourSeatsWrapper templateId={1} />
      </MessengerProvider>
    </GlobalProvider>,
    {},
  );
  dispatchSetValue(store, COGNITO_ACCOUNTSTORE, 'account', {
    id: 1,
  });
  dispatchSetValue(store, NODE_STORE, 'nodes', {
    1: {
      id: 1,
      customData: {
        organisationId: null,
      },
      createdBy: 1,
    },
  });
  // login user is part of the tour
  store.dispatch({
    type: GET_TEMPLATE_PEOPLE_SUCCESS,
    result: {
      templateId: 1,
      userNodeUserIdsPerTour: [2, 3, 4, 1],
    },
  });
  await sleep(10);
  expect(screen.getByText('1 tour seat left')).toBeInTheDocument();
  expect(screen.queryByRole('link', { name: /Buy more/i })).toBeInTheDocument();
});
