import { LOGS_HOOKS } from 'hooks/logs';
import React from 'react';
import '@testing-library/jest-dom';
import { cache } from 'swr';
import { screen, waitFor } from '@testing-library/react';
import { renderWithRedux } from 'utils/testUtility';
import { CountryViewCard } from '../index';

describe('CountryViewCard', () => {
  afterEach(() => {
    cache.clear();
    jest.clearAllMocks();
  });
  it('should render properly by default', async () => {
    renderWithRedux(<CountryViewCard hashkey="aaaa" />);

    await waitFor(() => {
      expect(screen.getByText(/Country/i)).toBeInTheDocument();
    });
  });

  it('should properly display result', () => {
    const temp = LOGS_HOOKS.useStandardFetchLogs;

    LOGS_HOOKS.useStandardFetchLogs = jest.fn(() => ({
      data: {
        items: [
          { country_name: 'P' },
          { country_name: 'P' },
          { country_name: 'A' },
          { country_name: null },
        ],
      },
    }));
    renderWithRedux(<CountryViewCard hashkey="aaaa" />);

    expect(screen.getByText(/Country/i)).toBeInTheDocument();
    expect(screen.getByText(/P/i)).toBeInTheDocument();
    expect(screen.getByText(/Other/i)).toBeInTheDocument();

    LOGS_HOOKS.useStandardFetchLogs = temp;
  });

  it('should display no data available', () => {
    const temp = LOGS_HOOKS.useStandardFetchLogs;

    LOGS_HOOKS.useStandardFetchLogs = jest.fn(() => ({
      data: {
        items: [],
      },
    }));
    renderWithRedux(<CountryViewCard hashkey="aaaa" />);

    expect(screen.getByText(/No data available/i)).toBeInTheDocument();

    LOGS_HOOKS.useStandardFetchLogs = temp;
  });
});
