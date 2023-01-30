import { NODE_STORE } from 'appConstants';
import React from 'react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { act, screen } from '@testing-library/react';
import { dispatchSetValue, renderWithRedux } from 'utils/testUtility';
import { EditableTravelingWith } from '../index';

describe('EditableTravelingWith', () => {
  it('should properly display traveling with participant in editable', () => {
    const { store } = renderWithRedux(<EditableTravelingWith id={1} />);
    dispatchSetValue(store, NODE_STORE, 'nodes', {
      1: {
        id: 1,
        groups: [2],
      },
      2: {
        id: 2,
        participants: [1],
        content: 'group name',
      },
      3: {
        id: 3,
        status: 'going',
        customData: {
          firstName: 'First',
          lastName: 'User',
        },
      },
      4: {
        id: 4,
        status: 'going',
        customData: {
          firstName: 'Second',
          lastName: 'User',
        },
      },
    });
    dispatchSetValue(store, NODE_STORE, 'links', {
      1: {
        id: 1,
        nextNodeId: 2,
        prevNodeId: 3,
      },
      2: {
        id: 2,
        nextNodeId: 2,
        prevNodeId: 4,
      },
    });

    expect(screen.getByText(/First User/i)).toBeInTheDocument();
  });

  it('should properly open and close dialog', () => {
    const { store } = renderWithRedux(<EditableTravelingWith id={1} />);
    dispatchSetValue(store, NODE_STORE, 'nodes', {
      1: {
        id: 1,
        groups: [2],
      },
      2: {
        id: 2,
        participants: [1, 2],
      },
      3: {
        id: 3,
        status: 'going',
        customData: {
          firstName: 'First',
          lastName: 'User',
        },
      },
      4: {
        id: 4,
        status: 'going',
        customData: {
          firstName: 'Second',
          lastName: 'User',
        },
      },
    });
    dispatchSetValue(store, NODE_STORE, 'links', {
      1: {
        id: 1,
        prevNodeId: 3,
      },
      2: {
        id: 2,
        prevNodeId: 4,
      },
    });

    act(() => {
      userEvent.click(screen.getByTestId(/editableInlineButton/i));
    });
    expect(screen.getByTestId('JDialogCloseButton')).toBeInTheDocument();
    act(() => {
      userEvent.click(screen.getByTestId('JDialogCloseButton'));
    });
  });
});
