import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import _ from 'lodash';
import ChannelListPreview from '../channelListPreview';
import {
  renderWithReduxWithRouter,
  dispatchRequestSuccessAction,
} from '../../../../../utils/testUtility';
import { MessengerProvider } from '../../../../StreamChat/messengerProvider';
import {
  GET_TEMPLATE_DETAIL,
  TEMPLATE_API,
} from '../../../../../apis/constants';
import { sleep } from '../../../../../utils/timeUtility';
import Template from '../../../../../apis/components/Template';

test('ChannelList Preview shall display content correctly', async () => {
  const { store, rerenderWithReduxWithRouter } = renderWithReduxWithRouter(
    <MessengerProvider>
      <Template />
      <ChannelListPreview
        channel={{
          data: {
            name: 'abcd',
            templateId: 1,
          },
        }}
      />
    </MessengerProvider>,
    {},
  );
  dispatchRequestSuccessAction(store, TEMPLATE_API, GET_TEMPLATE_DETAIL, {
    nodes: {
      1: {
        content: 'aaa',
      },
    },
  });
  await sleep(30);
  expect(screen.getByRole('link', { name: /aaa/i })).not.toBeNull();
  expect(screen.getByText('# abcd')).not.toBeNull();
  rerenderWithReduxWithRouter(
    <MessengerProvider>
      <Template />
      <ChannelListPreview
        channel={{
          data: {
            name: 'abcd',
            templateId: 1,
          },
          state: {
            messages: [
              {
                user: {
                  image: 'image',
                  name: 'username',
                },
              },
            ],
          },
        }}
        latestMessage="this is last message"
      />
    </MessengerProvider>,
  );
  expect(
    screen.getByRole('img', { name: /profile-avatar/i }).getAttribute('src'),
  ).toEqual('image');
  expect(screen.getByText('this is last message')).not.toBeNull();
});

test('ChannelList Preview Mouse Interact', async () => {
  const setActiveChannel = jest.fn();
  const channel = {
    data: {
      name: 'abcd',
      templateId: 1,
    },
    cid: 'cid_1',
  };
  renderWithReduxWithRouter(
    <MessengerProvider>
      <Template />
      <ChannelListPreview
        channel={channel}
        setActiveChannel={setActiveChannel}
      />
    </MessengerProvider>,
    {},
  );
  userEvent.click(screen.getByRole('link'));
  expect(setActiveChannel).toHaveBeenCalledWith(channel);
  userEvent.hover(screen.getByTestId('channelListPreview'));
  expect(
    _.values(screen.getByTestId('channelListPreview').classList).find(
      o => o.indexOf('hoverOver') >= 0,
    ),
  ).not.toBeNull();

  await sleep(30);
  userEvent.unhover(screen.getByTestId('channelListPreview'));
  const data = _.values(
    screen.getByTestId('channelListPreview').classList,
  ).find(o => o.indexOf('hoverOver') >= 0);
  expect(data).toEqual(undefined);
});

test('ChannelList Preview Active Bold', async () => {
  const channel = {
    data: {
      name: 'abcd',
      templateId: 1,
    },
    cid: 'cid_1',
  };
  renderWithReduxWithRouter(
    <MessengerProvider>
      <Template />
      <ChannelListPreview channel={channel} active unread={2} />
    </MessengerProvider>,
    {},
  );
  expect(
    _.values(screen.getByTestId('channelListPreview').classList).find(
      o => o.indexOf('active') >= 0,
    ),
  ).not.toBeNull();
  expect(
    _.values(screen.getByTestId('channelListPreview').classList).find(
      o => o.indexOf('black') >= 0,
    ),
  ).not.toBeNull();
});
