import { NODE_STORE } from 'appConstants';
import React from 'react';
import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { dispatchSetValue, renderWithRedux } from 'utils/testUtility';
import { ParticipantItem } from '../index';

describe('ParticipantItem', () => {
  const resaga = {
    dispatchTo: jest.fn(),
    setValue: jest.fn(),
  };
  const props = {
    id: 2,
    groupId: 1,
    resaga,
  };
  beforeEach(() => jest.clearAllMocks());
  it('should render properly by default', () => {
    const { store } = renderWithRedux(<ParticipantItem {...props} />);
    dispatchSetValue(store, NODE_STORE, 'nodes', {
      1: {
        id: 1,
        content: 'First Group',
        type: 'group',
      },
      2: {
        id: 2,
        status: 'going',
        type: 'participant',
        customData: {
          firstName: 'Sample',
          lastName: 'User',
        },
      },
    });

    expect(screen.getByText(/Sample User/i)).toBeInTheDocument();
  });

  it('should make request to api when clicking the add button', () => {
    const { store } = renderWithRedux(
      <ParticipantItem hideDeleteButton {...props} />,
    );
    dispatchSetValue(store, NODE_STORE, 'nodes', {
      1: {
        id: 1,
        content: 'First Group',
        type: 'group',
      },
      2: {
        id: 2,
        status: 'going',
        type: 'participant',
        customData: {
          firstName: 'Sample',
          lastName: 'User',
        },
      },
    });

    userEvent.click(screen.getByTestId('addParticipantToGroup'));

    expect(resaga.dispatchTo).toBeCalled();
  });

  it('should make delete request to api when clicking the delete button', () => {
    const { store } = renderWithRedux(
      <ParticipantItem hideAddButton {...props} />,
    );
    dispatchSetValue(store, NODE_STORE, 'nodes', {
      1: {
        id: 1,
        content: 'First Group',
        type: 'group',
      },
      2: {
        id: 2,
        status: 'going',
        type: 'participant',
        customData: {
          firstName: 'Sample',
          lastName: 'User',
        },
      },
    });

    userEvent.click(screen.getByTestId('removeParticipantToGroup'));

    expect(resaga.dispatchTo).toBeCalled();
  });
});
