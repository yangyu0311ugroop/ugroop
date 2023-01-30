import { LOGS_HOOKS } from 'hooks/logs';
import React from 'react';
import '@testing-library/jest-dom';
import { cache } from 'swr';
import { screen, waitFor } from '@testing-library/react';
import { renderWithRedux } from 'utils/testUtility';
import { PlatformsViewCard } from '../index';

describe('PlatformsViewCard', () => {
  afterEach(() => {
    cache.clear();
  });
  it('should render properly by default', async () => {
    renderWithRedux(<PlatformsViewCard />);

    await waitFor(() => {
      expect(screen.getByText(/Platforms/i)).toBeInTheDocument();
    });
  });

  it('should render things properly with data', async () => {
    const temp = LOGS_HOOKS.useStandardFetchLogs;
    LOGS_HOOKS.useStandardFetchLogs = jest.fn(() => ({
      data: {
        items: [{ os: 'Linux' }, { os: 'Linux' }, { os: 'Mac OS X' }],
      },
    }));
    renderWithRedux(<PlatformsViewCard />);

    await waitFor(() => {
      expect(screen.getByText(/Platforms/i)).toBeInTheDocument();
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
    renderWithRedux(<PlatformsViewCard />);

    await waitFor(() => {
      expect(screen.getByText(/No data available/i)).toBeInTheDocument();
    });

    LOGS_HOOKS.useStandardFetchLogs = temp;
  });
});
