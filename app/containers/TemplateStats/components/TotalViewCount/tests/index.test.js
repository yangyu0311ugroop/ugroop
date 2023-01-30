import { LOGS_HOOKS } from 'hooks/logs';
import React from 'react';
import '@testing-library/jest-dom';
import { cache } from 'swr';
import { screen, waitFor } from '@testing-library/react';
import { renderWithRedux } from 'utils/testUtility';
import { TotalViewCount } from '../index';

describe('TotalViewCount', () => {
  afterEach(() => {
    cache.clear();
  });
  it('should render properly by default', async () => {
    renderWithRedux(<TotalViewCount />);

    await waitFor(() => {
      expect(screen.getByText(/Total Views/i)).toBeInTheDocument();
      expect(screen.getByText(/0/i)).toBeInTheDocument();
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
    renderWithRedux(<TotalViewCount />);

    await waitFor(() => {
      expect(screen.getByText(/Total Views/i)).toBeInTheDocument();
    });

    LOGS_HOOKS.useStandardFetchLogs = temp;
  });

  it('should render things properly without items', async () => {
    const temp = LOGS_HOOKS.useStandardFetchLogs;
    LOGS_HOOKS.useStandardFetchLogs = jest.fn(() => ({
      data: {},
    }));
    renderWithRedux(<TotalViewCount />);

    await waitFor(() => {
      expect(screen.getByText(/Total Views/i)).toBeInTheDocument();
    });

    LOGS_HOOKS.useStandardFetchLogs = temp;
  });
});
