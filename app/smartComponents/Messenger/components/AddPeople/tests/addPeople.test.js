import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/dom';
import React from 'react';
import {
  dispatchRequestSuccessAction,
  dispatchSetValue,
  renderWithReduxWithRouter,
} from '../../../../../utils/testUtility';
import {
  COGNITO_ACCOUNTSTORE,
  INVITATION_STORE,
  STREAM_CHAT_STORE_IMMER,
  USER_DATA_STORE,
} from '../../../../../appConstants';
import { templateNodes } from '../../../../../containers/MarketPlace/tests/nodeDataStoreFeed';
import { sleep } from '../../../../../utils/timeUtility';
import AddPeople from '../index';
import { data } from './invitationTestsFeed';
import { useInjectReducer } from '../../../../../utils/injectReducer';
import streamChatReducer from '../../../../../datastore/streamChat/reducer';
import { Messenger } from '../../../index';
import { GET_PEOPLE, TEMPLATE_API } from '../../../../../apis/constants';
import Template from '../../../../../apis/components/Template';
import { MessengerProvider } from '../../../../../containers/StreamChat/messengerProvider';
import { userData } from './userDataFeed';
import { PORTAL_HELPERS } from '../../../../../containers/Portal/helpers';
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
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

test('AddPeople', async () => {
  const openAddPeople = jest.fn();
  PORTAL_HELPERS.openAddPeopleInChannel = openAddPeople;
  const mockedResaga = {};
  const { store } = renderWithReduxWithRouter(
    <MessengerProvider>
      <Template />
      <AddPeople
        colors="darkgray"
        text="Add"
        templateId={22627}
        channelId="cid_111"
        members={[21, 22]}
        resaga={mockedResaga}
      />
      <MessengerWrapper />
    </MessengerProvider>,
    {},
  );
  dispatchRequestSuccessAction(store, TEMPLATE_API, GET_PEOPLE, {
    templateId: '22627',
    userNodeIdsPerTour: [119, 199],
    userNodeUserIdsPerTour: [47, 12],
  });
  dispatchSetValue(store, 'nodeStore', 'nodes', templateNodes);
  dispatchSetValue(store, COGNITO_ACCOUNTSTORE, 'account', {
    id: 12,
  });
  dispatchSetValue(store, INVITATION_STORE, 'userNodes', data);
  dispatchSetValue(store, USER_DATA_STORE, 'people', userData.people);
  await sleep(20);
  userEvent.click(
    screen.getByRole('button', {
      name: /Add/i,
    }),
  );
  expect(openAddPeople).toBeCalled();
});
