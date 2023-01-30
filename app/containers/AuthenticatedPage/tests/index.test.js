import React from 'react';
import { MessengerProvider } from 'containers/StreamChat/messengerProvider';
import { compose } from 'redux';
import {
  renderWithReduxWithRouter,
  dispatchRequestSuccessAction,
} from 'utils/testUtility';
import { renderHook } from '@testing-library/react-hooks';
import resaga from 'resaga';
import { useImmer } from 'use-immer';
import { AuthenticatedPage } from '../index';
import { ABILITY_DATA_STORE } from '../../../appConstants';
import Firebase, { FirebaseContext } from '../../../lib/firebase';
import User from '../../../apis/components/User';
import Template from '../../../apis/components/Template';
import { sleep } from '../../../utils/timeUtility';
import { GlobalProvider } from '../../App/globalContext';
import { ABILITY_API, FIND_MY_ABILITIES } from '../../../apis/constants';

jest.mock('@firebase/app', () => ({
  messaging: {
    isSupported: () => false,
  },
  apps: [
    {
      firestore: () => 'store',
    },
  ],
}));

jest.mock('@firebase/messaging', () => ({
  messaging: {
    isSupported: () => false,
  },
  apps: [
    {
      firestore: () => 'store',
    },
  ],
}));

jest.mock('@firebase/firestore', () => ({
  messaging: {
    isSupported: () => false,
  },
  apps: [
    {
      firestore: () => 'store',
    },
  ],
}));
function TestComponent(props) {
  return <AuthenticatedPage {...props} />;
}

const WrappedTestComponent = compose(
  resaga({
    value: {
      fetched: [ABILITY_DATA_STORE, 'fetched'],
    },
  }),
)(React.memo(TestComponent));

afterEach(() => {
  jest.resetAllMocks();
  jest.restoreAllMocks();
});
const fireBaseInstance = new Firebase();

test('with loading content', () => {
  const { getByText } = renderWithReduxWithRouter(
    <MessengerProvider>
      <Template />
      <WrappedTestComponent />
    </MessengerProvider>,
    {
      initialState: {},
    },
  );
  expect(getByText('Loading content')).not.toBeNull();
});

test('pass loading content with existed fetched value', () => {
  const { getByTestId } = renderWithReduxWithRouter(
    <FirebaseContext.Provider value={fireBaseInstance}>
      <MessengerProvider>
        <GlobalProvider>
          <User />
          <Template />
          <WrappedTestComponent />
        </GlobalProvider>
      </MessengerProvider>
    </FirebaseContext.Provider>,
    {
      initialState: {
        abilityDataStore: {
          fetched: 1589887648160,
        },
        cognitoAcctStore: {
          account: {
            id: 56,
            email: 'yuy0311+02042020@gmail.com',
            rootnodeid: 5950,
            createdat: '2020-04-02T03:24:51.067+00:00',
            updatedat: '2020-05-19T12:06:26.036705+00:00',
            personSync: '2020-04-03T00:33:07.509668+00:00',
          },
        },
      },
    },
  );
  expect(getByTestId('homeDataTest')).not.toBeNull();
});

test('pass loading content with ability fetch', async () => {
  const { result } = renderHook(() => {
    const [state, dispatch] = useImmer({
      hasStreamUser: true,
      WhatsNewContext: {
        ugroopUpdates: [],
      },
      IntercomContext: {
        hideIntercomButton: false,
      },
    });
    return { state, dispatch };
  });
  const { getByTestId, store } = renderWithReduxWithRouter(
    <FirebaseContext.Provider value={fireBaseInstance}>
      <MessengerProvider
        store={{
          state: result.current.state,
          dispatch: result.current.dispatch,
        }}
      >
        <GlobalProvider
          store={{
            state: result.current.state,
            dispatch: result.current.dispatch,
          }}
        >
          <Template />
          <User />
          <WrappedTestComponent />
        </GlobalProvider>
      </MessengerProvider>
    </FirebaseContext.Provider>,
    {
      initialState: {
        cognitoAcctStore: {
          account: {
            id: 56,
            email: 'yuy0311+02042020@gmail.com',
            rootnodeid: 5950,
            createdat: '2020-04-02T03:24:51.067+00:00',
            updatedat: '2020-05-19T12:06:26.036705+00:00',
            personSync: '2020-04-03T00:33:07.509668+00:00',
          },
        },
      },
    },
  );
  dispatchRequestSuccessAction(store, ABILITY_API, FIND_MY_ABILITIES, {
    testResult: 'good',
  });
  await sleep(50);
  expect(getByTestId('homeDataTest')).not.toBeNull();
});

test('pass loading content with ability fetch in production', async () => {
  const { result } = renderHook(() => {
    const [state, dispatch] = useImmer({
      hasStreamUser: true,
      WhatsNewContext: {
        ugroopUpdates: [],
      },
      IntercomContext: {
        hideIntercomButton: false,
      },
    });
    return { state, dispatch };
  });
  process.env.ENV = 'production';
  const { getByTestId, store } = renderWithReduxWithRouter(
    <FirebaseContext.Provider value={fireBaseInstance}>
      <MessengerProvider
        store={{
          state: result.current.state,
          dispatch: result.current.dispatch,
        }}
      >
        <GlobalProvider
          store={{
            state: result.current.state,
            dispatch: result.current.dispatch,
          }}
        >
          <Template />
          <User />
          <WrappedTestComponent location={{ search: '?messenger=true' }} />
        </GlobalProvider>
      </MessengerProvider>
    </FirebaseContext.Provider>,
    {
      initialState: {
        cognitoAcctStore: {
          account: {
            id: 56,
            email: 'yuy0311+02042020@gmail.com',
            rootnodeid: 5950,
            createdat: '2020-04-02T03:24:51.067+00:00',
            updatedat: '2020-05-19T12:06:26.036705+00:00',
            personSync: '2020-04-03T00:33:07.509668+00:00',
          },
        },
      },
    },
  );
  dispatchRequestSuccessAction(store, ABILITY_API, FIND_MY_ABILITIES, {
    testResult: 'good',
  });
  await sleep(50);
  expect(getByTestId('homeDataTest')).not.toBeNull();
  process.env.ENV = 'development';
});
