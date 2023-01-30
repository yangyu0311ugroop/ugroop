import React from 'react';
import '@testing-library/jest-dom';
import { cache } from 'swr';
import { screen, waitFor } from '@testing-library/react';
import { renderWithRedux } from 'utils/testUtility';
import { ViewsThisWeekCount } from '../index';

describe('ViewsThisWeekCount', () => {
  afterEach(() => {
    cache.clear();
  });
  it('should render properly by default', async () => {
    renderWithRedux(<ViewsThisWeekCount />);

    await waitFor(() => {
      expect(screen.getByText(/Visits this week/i)).toBeInTheDocument();
    });
  });
});
