import React from 'react';
import '@testing-library/jest-dom';
import { cache } from 'swr';
import { screen, waitFor } from '@testing-library/react';
import { renderWithRedux } from 'utils/testUtility';
import { VARIANTS } from 'variantsConstants';
import { ViewsSinceCreationCount } from '../index';

describe('ViewsSinceCreationCount', () => {
  afterEach(() => {
    cache.clear();
  });

  it('should render properly by default', async () => {
    renderWithRedux(<ViewsSinceCreationCount />);

    await waitFor(() => {
      expect(screen.getByText(/0/i)).toBeInTheDocument();
    });
  });

  it('should value only if variant is value only', async () => {
    renderWithRedux(<ViewsSinceCreationCount variant={VARIANTS.VALUE_ONLY} />);

    await waitFor(() => {
      expect(screen.getByText(/0/i)).toBeInTheDocument();
    });
  });
});
