import React from 'react';
import { screen } from '@testing-library/react';
import _ from 'lodash';
import { renderHook, act } from '@testing-library/react-hooks';
import { useImmer } from 'use-immer';
import { ChannelListDraw } from '../channelList';
import ChatDown from '../../../../../smartComponents/Messenger/components/ChatDown';
import {
  renderWithRedux,
  renderWithReduxWithRouter,
} from '../../../../../utils/testUtility';
import { MessengerProvider } from '../../../../StreamChat/messengerProvider';
import { ChannelListPreview } from '../channelListPreview';
import { sleep } from '../../../../../utils/timeUtility';
/* eslint-disable no-shadow */
jest.mock('@ugr00p/stream-chat-react', () => {
  // eslint-disable-next-line global-require
  const r = require('react');
  return {
    ChatContext: r.createContext({
      client: {
        user: {
          online: true,
          name: 'YY',
        },
      },
    }),
  };
});

test('Loading', async () => {
  const LoadingIndicator = () => <div data-testid="LoadingIndicator" />;
  renderWithRedux(
    <MessengerProvider>
      <ChannelListDraw LoadingIndicator={LoadingIndicator} loading />
    </MessengerProvider>,
    {},
  );
  expect(screen.getByTestId('LoadingIndicator')).not.toBeNull();
});

test('Error', async () => {
  const LoadingErrorIndicator = () => (
    <ChatDown text="error" type="connection error" />
  );
  renderWithRedux(
    <MessengerProvider>
      <ChannelListDraw LoadingErrorIndicator={LoadingErrorIndicator} error />
    </MessengerProvider>,
    {},
  );
  screen.getAllByRole('heading', { name: /error/i }).forEach((o, i) => {
    if (i === 0) {
      expect(o.textContent).toBe('connection error');
    } else {
      expect(o.textContent).toBe('error');
    }
  });
});

test('ChannelList', () => {
  const mockedSetActiveDraw = jest.fn();
  const mockedResaga = {
    setValue: jest.fn(),
  };
  renderWithReduxWithRouter(
    <MessengerProvider>
      <ChannelListDraw
        resaga={mockedResaga}
        setActiveDraw={mockedSetActiveDraw}
      >
        <ChannelListPreview
          channel={{
            data: {
              name: 'abcd',
              templateId: 1,
            },
          }}
        />
      </ChannelListDraw>
    </MessengerProvider>,
    {},
  );
  expect(
    screen.getByRole('button', { name: /Always keep this menu open/i }),
  ).not.toBeNull();
  expect(
    _.values(screen.getAllByTestId('badgeTestId')[0].classList).find(
      o => o.indexOf('primary') >= 0,
    ),
  ).not.toBeNull();
  expect(screen.getByText('YY')).not.toBeNull();
  expect(screen.getByText('# abcd')).not.toBeNull();
});

// jest.mock('containers/StreamChat/messageStateContext', () => {
//   const {
//     addInToChannelQueue,
//     removeFromWaitingListQueue,
//     // eslint-disable-next-line global-require
//   } = require('./messageStateContextTestUtility');
//   const fakeDispatch = {
//     addInToChannelQueue,
//     removeFromWaitingListQueue,
//   };
//   return {
//     // eslint-disable-next-line no-sparse-arrays
//     useMessengerContext: () => [, fakeDispatch],
//   };
// });

test('ChannelList UseEffect when draw is closed', async () => {
  const { result } = renderHook(() => {
    const [state, dispatch] = useImmer({
      channelRemoveWaitingQueue: {},
    });
    return { state, dispatch };
  });
  act(() => {
    renderWithReduxWithRouter(
      <MessengerProvider
        store={{
          state: result.current.state,
          dispatch: result.current.dispatch,
        }}
      >
        <ChannelListDraw
          isDrawActive={false}
          channels={[
            {
              data: {
                templateId: 999,
              },
              cid: 'c_999',
            },
          ]}
          match={{ path: '/tours/:id?', params: { id: 1 } }}
        />
      </MessengerProvider>,
      {},
    );
  });
  await sleep(50);
  expect(result.current.state.channelRemoveWaitingQueue).toEqual({
    c_999: {
      data: {
        templateId: 999,
      },
      cid: 'c_999',
    },
  });
});
test('ChannelList UseEffect when draw is opened', async () => {
  const { result } = renderHook(() => {
    const [state, dispatch] = useImmer({
      channelRemoveWaitingQueue: {
        c_999: {
          data: {
            templateId: 999,
          },
          cid: 'c_999',
        },
      },
      stoppedChannel: [],
    });
    return { state, dispatch };
  });
  renderWithReduxWithRouter(
    <MessengerProvider
      store={{ state: result.current.state, dispatch: result.current.dispatch }}
    >
      <ChannelListDraw
        client={{
          user: {
            online: true,
            name: 'YY',
          },
          activeChannels: [{}],
        }}
        isDrawActive
        channels={[
          {
            data: {
              templateId: 999,
            },
            cid: 'c_999',
          },
        ]}
        match={{ path: '/tours/:id?', params: { id: 1 } }}
      />
    </MessengerProvider>,
    {},
  );
  await sleep(50);
  expect(result.current.state.channelRemoveWaitingQueue).toEqual({});
});
