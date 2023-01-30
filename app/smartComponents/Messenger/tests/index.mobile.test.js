import React from 'react';
import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import matchMediaPolyfill from 'mq-polyfill';
import { Messenger } from '../index';
import {
  dispatchRequestSuccessAction,
  renderWithRedux,
} from '../../../utils/testUtility';
import { MessengerProvider } from '../../../containers/StreamChat/messengerProvider';
import { useInjectReducer } from '../../../utils/injectReducer';
import { STREAM_CHAT_STORE_IMMER } from '../../../appConstants';
import streamChatReducer from '../../../datastore/streamChat/reducer';
import { sleep } from '../../../utils/timeUtility';
import User from '../../../apis/components/User';
import { ME, USER_API } from '../../../apis/constants';
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
jest.mock('../../../ugcomponents/Inputs/SimpleRTE', () => ({
  StyledSimpleRTE: props => <div data-testid="SimpleRTE" {...props} />,
}));
let onAddedToChannel;
let onRemovedFromChannel;
let onChannelDeleted;
let onMessageNew;
jest.mock('@ugr00p/stream-chat-react', () => {
  // eslint-disable-next-line global-require
  const r = require('react');
  return {
    ChannelList: props => {
      onAddedToChannel = props.onAddedToChannel;
      onRemovedFromChannel = props.onRemovedFromChannel;
      onChannelDeleted = props.onChannelDeleted;
      onMessageNew = props.onMessageNew;
      return <div data-testid="ChannelList" />;
    },
    // eslint-disable-next-line react/prop-types
    Channel: props => <div data-testid="Channel">{props.children}</div>,
    Chat: props => (
      <div data-testid={props['data-testid']}>{props.children}</div>
    ),
    MessageList: props => <div data-testid="messageList" />,
    MessageInput: props => <div data-testid="MessageInput" />,
    Thread: props => <div data-testid="Thread" />,
    MessageInputLarge: props => <div data-testid="MessageInputLarge" />,
    InfiniteScrollPaginator: props => (
      <div data-testid="InfiniteScrollPaginator" />
    ),
    ChannelContext: r.createContext({
      channel: {
        state: {
          watcher_count: 1,
          members: {
            memberId1: {
              id: 'memberId1',
              name: 'a',
            },
            memberId2: {
              id: 'memberId2',
              name: 'b',
            },
          },
        },
        data: {
          name: 'ChannelName',
          member_count: 1,
          created_by: {
            name: 'John',
            id: 'a@a.com_1',
          },
        },
        query: () => ({
          members: [
            {
              id: 'memberId1',
              name: 'a',
            },
            {
              id: 'memberId2',
              name: 'b',
            },
          ],
        }),
      },
    }),
  };
});

function MessengerWrapper(props) {
  useInjectReducer({
    key: STREAM_CHAT_STORE_IMMER,
    reducer: streamChatReducer,
  });
  return <Messenger {...props} />;
}

jest.mock('react-device-detect', () => ({
  isMobile: true,
}));

beforeAll(() => {
  matchMediaPolyfill(window);
  window.resizeTo = function resizeTo(width, height) {
    Object.assign(this, {
      innerWidth: width,
      innerHeight: height,
      outerWidth: width,
      outerHeight: height,
    }).dispatchEvent(new this.Event('resize'));
  };
});

test('Messenger', async () => {
  const { store, debug } = renderWithRedux(
    <MessengerProvider>
      <User />
      <MessengerWrapper height={1000} />
    </MessengerProvider>,
    {},
  );
  dispatchRequestSuccessAction(store, USER_API, ME, {
    user: {
      id: 1,
      email: 'a@a.com',
      rootnodeid: 5950,
      personSync: '2020-04-03T00:33:07.509668+00:00',
    },
    person: [
      {
        id: 817,
        name: 'dddddd',
        nameKey: 'org-dddddd-ddddd',
        typeId: 817,
        type: 'Club',
      },
    ],
    customerRelations: {
      users: {
        id: 1,
        email: 'a@a.com',
        rootnodeid: 5950,
        personSync: '2020-04-03T00:33:07.509668+00:00',
      },
      orgs: [
        {
          id: 817,
          name: 'dddddd',
          nameKey: 'org-dddddd-ddddd',
          typeId: 817,
          type: 'Club',
        },
      ],
      subscriptions: [],
      subscriptionItems: [],
    },
  });
  expect(screen.getByTestId('Chat')).toBeInTheDocument();
  expect(screen.getByTestId('ChannelList')).toBeInTheDocument();
  expect(
    screen.getByRole('heading', { name: /ChannelName/i }),
  ).toBeInTheDocument();
  expect(screen.getByTestId('memberCount').textContent).toBe('1');
  await sleep(30);
  // wait the setMember
  expect(screen.getByTestId('memberCount').textContent).toBe('2');
  // press the member icon button
  userEvent.click(screen.getByTestId('memberIcon'));
  // check if the detail is open
  expect(
    store.getState().get(STREAM_CHAT_STORE_IMMER).openChannelDetail,
  ).toBeTruthy();
  const detailHeadings = screen.getByRole('heading', { name: /details/i });
  expect(detailHeadings).toBeInTheDocument();
});
