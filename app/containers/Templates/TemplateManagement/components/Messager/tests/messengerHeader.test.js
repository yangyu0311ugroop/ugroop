import React from 'react';
import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import { act, renderHook } from '@testing-library/react-hooks';
import { useImmer } from 'use-immer';
import { MessengerHeader } from '../messengerHeader';
import { renderWithReduxWithRouter } from '../../../../../../utils/testUtility';
import { MessengerProvider } from '../../../../../StreamChat/messengerProvider';

jest.mock('react-device-detect', () => ({
  isMobile: true,
}));
test('MessengerHeader', () => {
  const historyMock = {
    push: jest.fn(),
  };
  renderWithReduxWithRouter(
    <MessengerProvider>
      <MessengerHeader
        tourName="my tour"
        history={historyMock}
        location={{ pathname: '/abcd' }}
      />
    </MessengerProvider>,
  );
  // click tourname
  userEvent.click(screen.getByTestId('tourNameLink'));
  expect(historyMock.push).toBeCalledWith('/abcd');
});

test('MessengerHeader Actions', async () => {
  const { result } = renderHook(() => {
    const [state, dispatch] = useImmer({
      tourChannelSlide: false,
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
        <MessengerHeader tourName="my tour" />
      </MessengerProvider>,
    );
    userEvent.click(screen.getByRole('button'));
  });
  expect(result.current.state.tourChannelSlide).toBe(true);
});
