import React from 'react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { act, screen, waitFor } from '@testing-library/react';
import { renderWithRedux } from 'utils/testUtility';
import { RangeFilter } from '../index';
import { GlobalProvider } from '../../../../App/globalContext';

describe('RangeFilter', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  const resaga = {
    setValue: jest.fn(),
  };
  it('should render properly by default', () => {
    renderWithRedux(<RangeFilter resaga={resaga} />);

    expect(screen.getByText(/This Month/i)).toBeInTheDocument();
  });

  it('should change the filter based on the filter i clicked', async () => {
    renderWithRedux(
      <GlobalProvider>
        <RangeFilter resaga={resaga} />
      </GlobalProvider>,
    );

    act(() => {
      userEvent.click(
        screen.getByRole('button', {
          name: /This Month/i,
        }),
      );
    });

    await waitFor(async () => {
      expect(screen.getByText(/This Week/i)).toBeInTheDocument();
      expect(screen.getByText(/This Year/i)).toBeInTheDocument();
    });

    act(() => {
      userEvent.click(
        screen.getByRole('button', {
          name: /This Year/i,
        }),
      );
    });

    expect(resaga.setValue).toBeCalled();
  });
});
