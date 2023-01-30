import { LOGS_HOOKS } from 'hooks/logs';
import React from 'react';
import '@testing-library/jest-dom';
import { cache } from 'swr';
import { screen, waitFor } from '@testing-library/react';
import { renderWithRedux } from 'utils/testUtility';
import { DevicesViewCard } from '../index';

describe('DevicesViewCard', () => {
  afterEach(() => {
    cache.clear();
  });
  it('should render properly by default', async () => {
    renderWithRedux(<DevicesViewCard hashkey="aaaa" />);

    await waitFor(() => {
      expect(screen.getByText(/Browsers/i)).toBeInTheDocument();
    });
  });

  it('should render browser stats properly', async () => {
    const temp = LOGS_HOOKS.useStandardFetchLogs;
    LOGS_HOOKS.useStandardFetchLogs = jest.fn(() => ({
      data: {
        items: [
          { browser: 'Chrome' },
          { browser: 'Chrome' },
          { browser: 'Firefox' },
        ],
      },
    }));

    renderWithRedux(<DevicesViewCard hashkey="aaaa" />);

    await waitFor(() => {
      expect(screen.getByText(/Browsers/i)).toBeInTheDocument();
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

    renderWithRedux(<DevicesViewCard hashkey="aaaa" />);

    await waitFor(() => {
      expect(screen.getByText(/No data available/i)).toBeInTheDocument();
    });

    LOGS_HOOKS.useStandardFetchLogs = temp;
  });
});
