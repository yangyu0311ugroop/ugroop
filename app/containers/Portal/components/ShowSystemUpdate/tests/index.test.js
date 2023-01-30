import React from 'react';
import '@testing-library/jest-dom';
import { act, screen } from '@testing-library/react';
import { renderWithReduxWithRouter } from 'utils/testUtility';
import userEvent from '@testing-library/user-event';
import { renderHook } from '@testing-library/react-hooks';
import { useImmer } from 'use-immer';
import ShowSystemUpdate from '../index';
import { GlobalProvider } from '../../../../App/globalContext';

describe('ShowSystemUpdate', () => {
  it('should render properly by default', () => {
    const { result } = renderHook(() => {
      const [state, dispatch] = useImmer({
        WhatsNewContext: {
          ugroopUpdates: [],
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
        <ShowSystemUpdate resaga={{ setValue: jest.fn() }} open smDown>
          Something!
        </ShowSystemUpdate>
      </GlobalProvider>,
      {},
    );
  });

  it('should display properly', () => {
    // const { store } = renderWithRedux(<ShowSystemUpdate id={1} />);
    // dispatchSetValue(store, NOTIFICATION_DATASTORE, 'whatsNew', [1]);
    const { result } = renderHook(() => {
      const [state, dispatch] = useImmer({
        WhatsNewContext: {
          ugroopUpdates: [
            { id: 1, updateDate: '2021/09/01', link: '1', title: 'some title' },
          ],
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
        <ShowSystemUpdate resaga={{ setValue: jest.fn() }} open smDown>
          Something!
        </ShowSystemUpdate>
      </GlobalProvider>,
      {},
    );
    expect(screen.getByText(/Name and Information link/i)).toBeInTheDocument();
    expect(screen.getByTestId('onClickButtonLinkSu')).toBeInTheDocument();
    act(() => {
      userEvent.click(screen.getByTestId('onClickButtonLinkSu'));
    });
    expect(screen.getByTestId('JDialogCloseButton')).toBeInTheDocument();
    act(() => {
      userEvent.click(screen.getByTestId('JDialogCloseButton'));
    });
  });
});
