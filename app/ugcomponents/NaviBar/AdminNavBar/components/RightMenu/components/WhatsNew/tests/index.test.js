import React from 'react';
import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import { renderWithReduxWithRouter } from 'utils/testUtility';
import { renderHook } from '@testing-library/react-hooks';
import { useImmer } from 'use-immer';
import WhatsNew from '../index';
import { GlobalProvider } from '../../../../../../../../containers/App/globalContext';

describe('WhatsNew', () => {
  window.fetch = jest.fn(() => Promise.resolve(1));
  it('should render properly by default', () => {
    const { result } = renderHook(() => {
      const [state, dispatch] = useImmer({
        WhatsNewContext: {
          ugroopUpdates: [{ id: 1 }],
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
        <WhatsNew resaga={{ setValue: jest.fn() }} open smDown>
          Something!
        </WhatsNew>
      </GlobalProvider>,
      {},
    );
    expect(screen.getByText(/New/i)).toBeInTheDocument();
  });

  /* it('should display properly', () => {
    const { store } = renderWithRedux(<WhatsNew id={1} />);
    dispatchSetValue(store, NOTIFICATION_DATASTORE, 'whatsNew', [1]);
    expect(screen.getByText(/New/i)).toBeInTheDocument();
  }); */
});
