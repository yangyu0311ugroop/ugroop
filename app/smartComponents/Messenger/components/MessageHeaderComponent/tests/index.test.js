import userEvent from '@testing-library/user-event';
import React from 'react';
import { screen } from '@testing-library/dom';
import {
  dispatchRequestSuccessAction,
  renderWithRedux,
} from '../../../../../utils/testUtility';
import { MessengerProvider } from '../../../../../containers/StreamChat/messengerProvider';
import User from '../../../../../apis/components/User';
import { ME, USER_API } from '../../../../../apis/constants';
import { sleep } from '../../../../../utils/timeUtility';
import { PORTAL_HELPERS } from '../../../../../containers/Portal/helpers';
test('MessageHeaderComponent', async () => {
  jest.mock('@ugr00p/stream-chat-react', () => {
    // eslint-disable-next-line global-require
    const r = require('react');
    return {
      ChannelContext: r.createContext({
        channel: {
          data: {
            name: 'channelname',
            created_by: {
              id: 'a@a.com_1',
              name: 'userA',
            },
            description: 'channel description',
          },
          state: {
            members: {
              'a@a.com_1': {
                id: 'a@a.com_1',
                name: 'a',
              },
              'b@b.com_1': {
                id: 'b@b.com_1',
                name: 'b',
              },
            },
          },
        },
      }),
    };
  });
  // eslint-disable-next-line global-require
  const MessageHeaderComponent = require('../index').default;
  const { store, rerenderWithRedux } = renderWithRedux(
    <MessengerProvider>
      <User />
      <MessageHeaderComponent loading />
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
  // in Loading State
  expect(
    screen.queryByRole('heading', { name: /userA/i }),
  ).not.toBeInTheDocument();
  rerenderWithRedux(
    <MessengerProvider>
      <User />
      <MessageHeaderComponent />
    </MessengerProvider>,
  );
  await sleep(30);
  expect(screen.getByRole('heading', { name: /You/i })).toBeInTheDocument();
  expect(
    screen.getByRole('heading', { name: /# channelname/i }),
  ).toBeInTheDocument();
  expect(screen.getByText('Add People')).toBeInTheDocument();
  expect(screen.getByText('Edit Description')).toBeInTheDocument();
  PORTAL_HELPERS.openEditChatChannel = jest.fn();
  userEvent.click(screen.getByRole('button', { name: /Edit Description/i }));
  expect(PORTAL_HELPERS.openEditChatChannel).toHaveBeenCalled();
});
test('MessageHeaderComponent different context', async () => {
  jest.mock('@ugr00p/stream-chat-react', () => {
    // eslint-disable-next-line global-require
    const r = require('react');
    return {
      ChannelContext: r.createContext({
        channel: {
          data: {
            name: 'channelname',
            created_by: {
              id: 'b@b.com_22',
              name: 'userA',
            },
          },
          state: {
            members: {
              'a@a.com_1': {
                id: 'a@a.com_1',
                name: 'a',
              },
              'b@b.com_1': {
                id: 'b@b.com_1',
                name: 'b',
              },
            },
          },
        },
      }),
    };
  });
  // eslint-disable-next-line global-require
  const MessageHeaderComponent = require('../index').default;
  renderWithRedux(
    <MessengerProvider>
      <User />
      <MessageHeaderComponent />
    </MessengerProvider>,
  );
  await sleep(10);
  expect(screen.getByRole('heading', { name: /userA/i })).toBeInTheDocument();
});
