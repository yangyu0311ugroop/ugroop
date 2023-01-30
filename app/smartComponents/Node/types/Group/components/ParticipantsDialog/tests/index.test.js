import { NODE_STORE, TEMPLATE_MANAGEMENT_DATASTORE } from 'appConstants';
import React from 'react';
import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import { dispatchSetValue, renderWithRedux } from 'utils/testUtility';
import { ParticipantsDialog } from '../index';

describe('ParticipantsDialog', () => {
  const props = {
    id: 2,
    open: true,
    onClose: jest.fn(),
  };
  it('should render no participants in group and no assignable participants', () => {
    const { store } = renderWithRedux(<ParticipantsDialog {...props} />);
    dispatchSetValue(store, TEMPLATE_MANAGEMENT_DATASTORE, 'id', 1);
    dispatchSetValue(store, NODE_STORE, 'links', {
      1: {
        prevNodeId: 3,
      },
      2: {
        prevNodeId: 4,
      },
    });
    dispatchSetValue(store, NODE_STORE, 'nodes', {
      1: {
        groups: [2],
      },
      2: {
        participants: [],
      },
      3: {
        customData: {
          firstName: 'First',
          lastName: 'User',
        },
        groups: [5],
      },
      4: {
        customData: {
          firstName: 'Second',
          lastName: 'User',
        },
        groups: [5],
      },
    });

    expect(
      screen.getByText(/No participants in this group/i),
    ).toBeInTheDocument();
    expect(screen.getByText(/No assignable participants/i)).toBeInTheDocument();
  });

  it('should render participant in group and assignable participants', () => {
    const { store } = renderWithRedux(<ParticipantsDialog {...props} />);
    dispatchSetValue(store, TEMPLATE_MANAGEMENT_DATASTORE, 'id', 1);
    dispatchSetValue(store, NODE_STORE, 'links', {
      1: {
        prevNodeId: 3,
      },
      2: {
        prevNodeId: 4,
      },
    });
    dispatchSetValue(store, NODE_STORE, 'nodes', {
      1: {
        groups: [2],
        participants: [3, 4],
      },
      2: {
        participants: [1],
      },
      3: {
        customData: {
          firstName: 'First',
          lastName: 'User',
        },
        groups: [1],
      },
      4: {
        customData: {
          firstName: 'Second',
          lastName: 'User',
        },
        groups: [],
      },
    });

    expect(screen.getByText(/First User/i)).toBeInTheDocument();
    expect(screen.getByText(/Second User/i)).toBeInTheDocument();
  });

  // it('should show dialog when the button was clicked', async () => {
  //   const { store } = renderWithRedux(<ParticipantsDialog {...props} />);
  //   dispatchSetValue(store, TEMPLATE_MANAGEMENT_DATASTORE, 'id', 1);
  //
  //   userEvent.click(screen.getByRole('button'));
  //   expect(screen.getByText(/Participants in the group/i)).toBeInTheDocument();
  //
  //   userEvent.click(screen.getByTestId('JDialogCloseButton'));
  //   await waitFor(() => {
  //     expect(
  //       screen.queryByText(/Participants in the group/i),
  //     ).not.toBeInTheDocument();
  //   });
  // });
});
