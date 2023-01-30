import _ from 'lodash';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { MessengerProvider } from '../../../../StreamChat/messengerProvider';
import { ChannelListDraw } from '../channelList';
import { ChannelListPreview } from '../channelListPreview';
import { RESAGA_HELPERS } from '../../../../../utils/helpers/resaga';
import { renderWithReduxWithRouter } from '../../../../../utils/testUtility';

jest.mock('@ugr00p/stream-chat-react', () => {
  // eslint-disable-next-line global-require
  const r = require('react');
  return {
    ChatContext: r.createContext({
      client: {
        user: {
          online: false,
          id: 'clientId',
        },
      },
    }),
    ChannelContext: {},
  };
});
test('ChannelList', () => {
  const mockedSetActiveDraw = jest.fn();
  const mockedResaga = {
    setValue: jest.fn(),
  };
  renderWithReduxWithRouter(
    <MessengerProvider>
      <ChannelListDraw
        chatDrawerKeepOpen
        drawerKeepOpen
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
  );
  expect(
    _.values(screen.getAllByTestId('badgeTestId')[0].classList).find(
      o => o.indexOf('Badge-gray') >= 0,
    ),
  ).not.toBeNull();
  expect(screen.getByText('clientId')).not.toBeNull();
  expect(
    screen.getByRole('button', { name: /Don't keep this menu open/i }),
  ).not.toBeNull();

  // Test the user Action click
  userEvent.click(
    screen.getByRole('button', { name: /Don't keep this menu open/i }),
  );
  expect(mockedResaga.setValue).toBeCalledTimes(2);
  expect(mockedResaga.setValue).nthCalledWith(1, { drawerKeepOpen: false });
  expect(mockedResaga.setValue).nthCalledWith(2, {
    chatDrawerKeepOpen: RESAGA_HELPERS.toggleValue,
  });
});
