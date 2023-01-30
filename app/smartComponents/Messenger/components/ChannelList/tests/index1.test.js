import { screen } from '@testing-library/react';
import React from 'react';
import _ from 'lodash';
import { renderWithReduxWithRouter } from '../../../../../utils/testUtility';
import { MessengerProvider } from '../../../../../containers/StreamChat/messengerProvider';
import ChannelList from '../index';
import ChannelListPreview from '../channelListPreview';

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

describe('offline context', () => {
  test('Channel List differentContext', () => {
    const mockedResaga = {
      setValue: jest.fn(),
    };
    renderWithReduxWithRouter(
      <MessengerProvider>
        <ChannelList resaga={mockedResaga}>
          <ChannelListPreview
            channel={{
              data: {
                name: 'abcd',
                id: 'clientId',
              },
            }}
          />
        </ChannelList>
      </MessengerProvider>,
      {},
    );
    expect(
      _.values(screen.getAllByTestId('badgeTestId')[0].classList).find(
        o => o.indexOf('Badge-gray') >= 0,
      ),
    ).not.toBeNull();
    expect(screen.getByText('clientId')).not.toBeNull();
  });
});
