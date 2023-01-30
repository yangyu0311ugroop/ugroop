import { renderWithReduxWithRouter } from 'utils/testUtility';
import React from 'react';
import { screen } from '@testing-library/react';
import { useImmer } from 'use-immer';
import { renderHook } from '@testing-library/react-hooks';
import { GlobalProvider } from '../../../containers/App/globalContext';
import RenderLiveSupport from '../content';
jest.mock('react-intercom', () => ({
  __esModule: true,
  default: props => <div data-testid="intercomContent" {...props} />,
}));
test('IntercomContent shall not render content', async () => {
  const { result } = renderHook(() => {
    const [state, dispatch] = useImmer({
      IntercomContext: {
        hideIntercomButton: true,
      },
    });
    return { state, dispatch };
  });
  renderWithReduxWithRouter(
    <GlobalProvider
      store={{
        state: result.current.state,
        dispatch: result.current.dispatch,
      }}
    >
      <RenderLiveSupport lastTimestamp="aa" appId="aa" />
    </GlobalProvider>,
    {},
  );
  expect(screen.queryByTestId('intercomContent')).toBeNull();
});
test('IntercomContent shall render content', async () => {
  const { result } = renderHook(() => {
    const [state, dispatch] = useImmer({
      IntercomContext: {
        hideIntercomButton: false,
      },
    });
    return { state, dispatch };
  });
  const { rerenderWithReduxWithRouter } = renderWithReduxWithRouter(
    <GlobalProvider
      store={{
        state: result.current.state,
        dispatch: result.current.dispatch,
      }}
    >
      <RenderLiveSupport lastTimestamp="aa" appId="aa" />
    </GlobalProvider>,
    {},
  );
  expect(screen.queryByTestId('intercomContent')).not.toBeNull();
  expect(
    screen.queryByTestId('intercomContent').getAttribute('email'),
  ).toBeNull();
  rerenderWithReduxWithRouter(
    <GlobalProvider
      store={{
        state: result.current.state,
        dispatch: result.current.dispatch,
      }}
    >
      <RenderLiveSupport lastTimestamp="aa" appId="aa" email="aa@a.com" />
    </GlobalProvider>,
  );
  const secondTimeIntercom = screen.queryAllByTestId('intercomContent')[1];
  expect(secondTimeIntercom.getAttribute('email')).not.toBeNull();
});
