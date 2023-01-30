import React from 'react';
import '@testing-library/jest-dom';
import { cache } from 'swr';
import { screen, waitFor } from '@testing-library/react';
import { renderWithRedux } from 'utils/testUtility';
import { ViewsThisDayCount } from '../index';

describe('ViewsThisDayCount', () => {
  afterEach(() => {
    cache.clear();
  });
  it('should render properly by default', async () => {
    renderWithRedux(<ViewsThisDayCount />);

    await waitFor(() => {
      expect(screen.getByText(/Visits last 24 hours/i)).toBeInTheDocument();
    });
  });
});
