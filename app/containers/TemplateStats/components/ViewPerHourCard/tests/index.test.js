import { LOGS_HOOKS } from 'hooks/logs';
import React from 'react';
import '@testing-library/jest-dom';
import { cache } from 'swr';
import { screen, waitFor } from '@testing-library/react';
import { renderWithRedux } from 'utils/testUtility';
import { ViewsPerHourCard } from '../index';

describe('ViewsPerHourCard', () => {
  afterEach(() => {
    cache.clear();
  });
  it('should render properly by default', async () => {
    renderWithRedux(<ViewsPerHourCard />);

    await waitFor(() => {
      expect(screen.getByText(/Per hour of day/i)).toBeInTheDocument();
    });
  });

  it('should properly display the views per count', async () => {
    const temp = LOGS_HOOKS.useStandardFetchLogs;
    LOGS_HOOKS.useStandardFetchLogs = jest.fn(() => ({
      data: {
        items: [
          { date: '2020-10-13T04:35:28Z' },
          { date: '2020-10-13T04:35:28Z' },
          { date: '2020-10-13T04:35:28Z' },
        ],
      },
    }));

    renderWithRedux(<ViewsPerHourCard />);

    await waitFor(() => {
      expect(screen.getByText(/Per hour of day/i)).toBeInTheDocument();
    });

    LOGS_HOOKS.useStandardFetchLogs = temp;
  });
});
