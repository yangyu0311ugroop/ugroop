import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MessengerProvider } from 'containers/StreamChat/messengerProvider';
import ChannelList from '../index';
import ChatDown from '../../ChatDown';
import {
  renderWithRedux,
  renderWithReduxWithRouter,
} from '../../../../../utils/testUtility';
import ChannelListPreview from '../channelListPreview';
import { PORTAL_HELPERS } from '../../../../../containers/Portal/helpers';
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

describe('online Context', () => {
  test('Loading', async () => {
    const LoadingIndicator = () => <div data-testid="LoadingIndicator" />;
    renderWithRedux(
      <MessengerProvider>
        <ChannelList LoadingIndicator={LoadingIndicator} loading />
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
        <ChannelList LoadingErrorIndicator={LoadingErrorIndicator} error />
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
                templateId: 1,
              },
            }}
          />
        </ChannelList>
      </MessengerProvider>,
      {},
    );
    expect(
      screen.getAllByTestId('badgeTestId')[0].classList.contains('primary'),
    );
    expect(screen.getByText('YY')).toBeInTheDocument();
    expect(screen.getByText('# abcd')).toBeInTheDocument();
    PORTAL_HELPERS.openCreateChatChannel = jest.fn();
    userEvent.click(screen.getByTestId('addChannelButton'));
    expect(PORTAL_HELPERS.openCreateChatChannel).toHaveBeenCalled();
  });
});
