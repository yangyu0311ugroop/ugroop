import React from 'react';
import { RecentChannelList } from '../recentChannelList';
import { renderWithReduxWithRouter } from '../../../../../utils/testUtility';
import { MessengerProvider } from '../../../../StreamChat/messengerProvider';
/* eslint-disable react/prop-types */

jest.mock('@ugr00p/stream-chat-react', () => ({
  ChannelList: props => (
    <div
      data-testid="ChannelList"
      filters={JSON.stringify(props.filters)}
      sort={JSON.stringify(props.sort)}
    />
  ),
  Chat: props => <div data-testid="Chat" {...props} />,
  withChatContext: View => props => <View {...props} />,
}));
jest.mock('../channelList', () => ({
  ChannelList: {
    __esModule: true,
    default: props => <div data-testid="ChannelListDraw" {...props} />,
  },
}));

test('Test RecentChannelList Pass Props', () => {
  const { getByTestId } = renderWithReduxWithRouter(
    <MessengerProvider>
      <RecentChannelList streamChat={{}} sort={{ id: 1 }} filters={{ id: 2 }} />
    </MessengerProvider>,
    {},
  );
  expect(getByTestId('ChannelList').getAttribute('filters')).toEqual(
    JSON.stringify({ id: 2 }),
  );
  expect(getByTestId('ChannelList').getAttribute('sort')).toEqual(
    JSON.stringify({ id: 1 }),
  );
});
