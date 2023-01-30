import React, { useContext } from 'react';
import { ChatContext } from '@ugr00p/stream-chat-react';
import { act, renderHook } from '@testing-library/react-hooks';
import EmptyStateIndicator from '../emptyStateIndicator';
import { renderWithRedux } from '../../../../../utils/testUtility';

jest.mock('@ugr00p/stream-chat-react', () => {
  // eslint-disable-next-line global-require
  const r = require('react');
  return {
    ChatContext: r.createContext({
      setActiveChannel: jest.fn(),
    }),
  };
});

test('EmptyStateIndicator', async () => {
  const { result } = renderHook(() => {
    // eslint-disable-next-line no-unused-vars
    const { setActiveChannel } = useContext(ChatContext);
    return setActiveChannel;
  });
  act(() => {
    renderWithRedux(<EmptyStateIndicator />);
    expect(result.current).toBeCalled();
  });
});
