import { LOGS_HOOKS } from 'hooks/logs';
import React from 'react';
import '@testing-library/jest-dom';
import { cache } from 'swr';
import { screen, waitFor } from '@testing-library/react';
import { renderWithRedux } from 'utils/testUtility';
import { ReferrerViewCard } from '../index';

describe('ReferrerViewCard', () => {
  afterEach(() => {
    cache.clear();
  });
  it('should render properly by default', async () => {
    renderWithRedux(<ReferrerViewCard />);

    await waitFor(() => {
      expect(screen.getByText(/Referrers/i)).toBeInTheDocument();
    });
  });

  it('should render things properly with data', async () => {
    const temp = LOGS_HOOKS.useStandardFetchLogs;
    LOGS_HOOKS.useStandardFetchLogs = jest.fn(() => ({
      data: {
        items: [
          { referer: 'direct' },
          { referer: 'direct' },
          { referer: null },
        ],
      },
    }));
    renderWithRedux(<ReferrerViewCard />);

    await waitFor(() => {
      expect(screen.getByText(/Referrers/i)).toBeInTheDocument();
    });

    LOGS_HOOKS.useStandardFetchLogs = temp;
  });

  it('should render no data available', async () => {
    const temp = LOGS_HOOKS.useStandardFetchLogs;
    LOGS_HOOKS.useStandardFetchLogs = jest.fn(() => ({
      data: {
        items: [],
      },
    }));
    renderWithRedux(<ReferrerViewCard />);

    await waitFor(() => {
      expect(screen.getByText(/No data available/i)).toBeInTheDocument();
    });

    LOGS_HOOKS.useStandardFetchLogs = temp;
  });
});
