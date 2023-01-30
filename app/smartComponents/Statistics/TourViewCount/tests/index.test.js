import React from 'react';
import '@testing-library/jest-dom';
import { cache } from 'swr';
import userEvent from '@testing-library/user-event';
import { screen, waitFor } from '@testing-library/react';
import { renderWithRedux } from 'utils/testUtility';
import { TourViewCount } from '../index';

describe('TourViewCount', () => {
  afterEach(() => {
    cache.clear();
    jest.clearAllMocks();
  });
  const history = {
    push: jest.fn(),
  };

  const props = {
    classes: {},
  };

  it('should render properly by default', async () => {
    renderWithRedux(<TourViewCount id={1} history={history} {...props} />);

    await waitFor(() => {
      expect(screen.getByText(/0/i)).toBeInTheDocument();
    });
  });

  it('should call history push when button was clicked', async () => {
    renderWithRedux(<TourViewCount id={1} history={history} {...props} />);
    await waitFor(() => {
      expect(screen.getByText(/0/i)).toBeInTheDocument();
    });
    userEvent.click(screen.getByText(/0/i));
    expect(history.push).toBeCalled();
  });
});
