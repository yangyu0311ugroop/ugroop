import { LOGS_HOOKS } from 'hooks/logs';
import React from 'react';
import '@testing-library/jest-dom';
import { cache } from 'swr';
import { screen, waitFor } from '@testing-library/react';
import { renderWithRedux } from 'utils/testUtility';
import { ViewPerDayCard } from '../index';

describe('ViewPerDayCard', () => {
  afterEach(() => {
    cache.clear();
  });
  it('should render properly by default', async () => {
    renderWithRedux(<ViewPerDayCard />);

    await waitFor(() => {
      expect(screen.getByText(/Per day of week/i)).toBeInTheDocument();
    });
  });

  it('should properly render the barchart', async () => {
    const temp = LOGS_HOOKS.useFetchLogs;
    LOGS_HOOKS.useFetchLogs = jest.fn(() => ({
      data: {
        items: [
          { date: '2020-10-13T04:35:28Z' },
          { date: '2020-10-13T04:35:28Z' },
          { date: '2020-10-13T04:35:28Z' },
        ],
      },
    }));

    renderWithRedux(<ViewPerDayCard />);

    await waitFor(() => {
      expect(screen.getByText(/Per day of week/i)).toBeInTheDocument();
    });
    LOGS_HOOKS.useFetchLogs = temp;
  });
});
