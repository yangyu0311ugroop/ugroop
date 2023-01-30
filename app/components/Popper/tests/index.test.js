import React from 'react';
import { act, renderHook } from '@testing-library/react-hooks';
import { useImmer } from 'use-immer';
import { screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PopperDefault, { Popper } from '../index';
import { renderWithReduxWithRouter } from '../../../utils/testUtility';
import { GlobalProvider } from '../../../containers/App/globalContext';
import { sleep } from '../../../utils/timeUtility';

const popChildren = props => {
  // eslint-disable-next-line react/prop-types
  const { children, ...rest } = props;
  return <div data-testid="popperChildren" {...rest} />;
};
const popButton = props => {
  // eslint-disable-next-line react/prop-types
  const { children, ...rest } = props;
  return (
    <button
      type="button"
      data-testid="popButton"
      {...rest}
      // eslint-disable-next-line react/prop-types,react/button-has-type
      onClick={props.openMenu}
    />
  );
};

const menuHeader = props => {
  // eslint-disable-next-line react/prop-types
  const { children, ...rest } = props;
  return <div data-testid="menuHeader" {...rest} />;
};

test('<PopperDefault />', async () => {
  const { result } = renderHook(() => {
    const [state, dispatch] = useImmer({
      IntercomContext: {
        hideIntercomButton: true,
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
      <PopperDefault
        placement="bottom-end"
        noPadding
        renderButton={popButton}
        stopPropagation
      >
        {popChildren({
          a: 'a',
        })}
      </PopperDefault>
    </GlobalProvider>,
    {},
  );
  expect(screen.getByTestId('popButton')).not.toBeNull();
  act(() => {
    userEvent.click(screen.getByTestId('popButton'));
  });
  expect(result.current.state.IntercomContext.hideIntercomButton).toBe(false);
  expect(screen.queryByTestId('popperChildren')).toBeInTheDocument();
  act(() => {
    fireEvent.mouseDown(document);
  });
  rerenderWithReduxWithRouter(
    <GlobalProvider
      store={{
        state: result.current.state,
        dispatch: result.current.dispatch,
      }}
    >
      <PopperDefault
        placement="bottom-end"
        noPadding
        renderButton={popButton}
        stopPropagation
        menuHeader={menuHeader}
      >
        {popChildren({
          a: 'a',
        })}
      </PopperDefault>
    </GlobalProvider>,
  );
  act(() => {
    fireEvent.mouseDown(document);
  });
  expect(result.current.state.IntercomContext.hideIntercomButton).toBe(false);
  await sleep(600);
});
test('<Popper />', async () => {
  const mockedResaga = {
    setValue: jest.fn(),
  };
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
      <Popper
        placement="bottom-end"
        noPadding
        renderButton={popButton}
        stopPropagation
        smDown
        disableFullScreen={false}
        resaga={mockedResaga}
      >
        {popChildren({
          a: 'a',
        })}
      </Popper>
    </GlobalProvider>,
    {},
  );
  act(() => {
    userEvent.click(screen.getByTestId('popButton'));
    expect(result.current.state.IntercomContext.hideIntercomButton).toBe(true);
  });
  act(() => {
    fireEvent.mouseDown(document);
  });
  expect(result.current.state.IntercomContext.hideIntercomButton).toBe(false);
});
