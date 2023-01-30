import { TEMPLATE_MANAGEMENT_DATASTORE } from 'appConstants';
import React from 'react';
import '@testing-library/jest-dom';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { dispatchSetValue, renderWithRedux } from 'utils/testUtility';
import { LinkPaxButton } from '../index';

describe('LinkPaxButton', () => {
  const props = {
    id: 2,
  };
  it('should render properly by default', () => {
    renderWithRedux(<LinkPaxButton {...props} />);

    expect(screen.getByText(/Add Existing PAX/i)).toBeInTheDocument();
  });

  it('should show dialog when the button was clicked', async () => {
    const { store } = renderWithRedux(<LinkPaxButton {...props} />);
    dispatchSetValue(store, TEMPLATE_MANAGEMENT_DATASTORE, 'id', 1);

    userEvent.click(screen.getByRole('button'));
    expect(screen.getByText(/Participants in the group/i)).toBeInTheDocument();

    userEvent.click(screen.getByTestId('JDialogCloseButton'));
    await waitFor(() => {
      expect(
        screen.queryByText(/Participants in the group/i),
      ).not.toBeInTheDocument();
    });
  });
});
