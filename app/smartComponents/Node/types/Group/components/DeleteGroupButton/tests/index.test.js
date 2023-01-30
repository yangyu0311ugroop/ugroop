import { NODE_API_HELPERS } from 'apis/components/Node/helpers';
import { TEMPLATE_MANAGEMENT_DATASTORE } from 'appConstants';
import React from 'react';
import '@testing-library/jest-dom';
import { act, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { dispatchSetValue, renderWithRedux } from 'utils/testUtility';
import { DeleteGroupButton } from '../index';

describe('DeleteGroupButton', () => {
  const props = {
    id: 2,
  };
  it('should render properly by default', () => {
    renderWithRedux(<DeleteGroupButton {...props} />);

    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('should render link button', async () => {
    const { store } = renderWithRedux(
      <DeleteGroupButton
        {...{ ...props, variant: 'link', label: 'delete group' }}
      />,
    );
    dispatchSetValue(store, TEMPLATE_MANAGEMENT_DATASTORE, 'id', 1);
    NODE_API_HELPERS.deleteNode = jest.fn();
    expect(screen.getByText(/delete group/i)).toBeInTheDocument();
  });
  it('should make delete node api request', async () => {
    const { store } = renderWithRedux(<DeleteGroupButton {...props} />);
    dispatchSetValue(store, TEMPLATE_MANAGEMENT_DATASTORE, 'id', 1);
    NODE_API_HELPERS.deleteNode = jest.fn();

    act(() => userEvent.click(screen.getByRole('button')));
    act(() => userEvent.click(screen.getAllByRole('button')[2]));
    await waitFor(() => {
      expect(NODE_API_HELPERS.deleteNode).toBeCalled();
    });
  });
});
