import { NODE_STORE } from 'appConstants';
import React from 'react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import { dispatchSetValue, renderWithRedux } from 'utils/testUtility';
import { TravelingWithDialog } from '../index';

describe('TravelingWithDialog', () => {
  const resaga = {
    dispatchTo: jest.fn(),
  };
  afterEach(() => jest.clearAllMocks());
  const props = {
    onClose: jest.fn(),
    onButtonClose: jest.fn(),
    open: true,
    id: 1,
    resaga,
    templateId: 999,
    hasGroup: true,
  };
  it('should render properly by default', () => {
    renderWithRedux(<TravelingWithDialog {...props} />);
  });

  it('should display traveling with people when displaying dialog', () => {
    const { store } = renderWithRedux(
      <TravelingWithDialog {...props} isLoading processId={2} />,
    );
    dispatchSetValue(store, NODE_STORE, 'nodes', {
      1: {
        id: 1,
        groups: [1],
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
      999: {
        id: 999,
        participants: [2],
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
    expect(screen.getByText(/Second User/i)).toBeInTheDocument();
    expect(screen.getByText(/Leave group/i)).toBeInTheDocument();
    expect(screen.getByText(/Delete group/i)).toBeInTheDocument();
    userEvent.click(screen.getByText(/Delete group/i));
    // expect(screen.getByTestId('editable-2')).toBeInTheDocument();
    // userEvent.click(screen.getByTestId('editable-2'));
  });
  it('should display traveling with people when without travelling with', () => {
    const { store } = renderWithRedux(<TravelingWithDialog {...props} />);
    dispatchSetValue(store, NODE_STORE, 'nodes', {
      1: {
        id: 1,
        groups: [2],
      },
      2: {
        id: 2,
        content: 'First Group',
        participants: [2],
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
      2: {
        id: 2,
        nextNodeId: 2,
        prevNodeId: 3,
      },
      3: {
        id: 3,
        nextNodeId: 2,
        prevNodeId: 4,
      },
    });
    expect(screen.getByText(/Leave group/i)).toBeInTheDocument();
    expect(screen.getByText(/Delete group/i)).toBeInTheDocument();
    expect(screen.getByText(/Remove Participant/i)).toBeInTheDocument();
    expect(screen.getByText(/Close Dialog/i)).toBeInTheDocument();
    expect(screen.getByText(/Close Button Dialog/i)).toBeInTheDocument();
    userEvent.click(screen.getByText(/Delete group/i));
    userEvent.click(screen.getByText(/Remove Participant/i));
    userEvent.click(screen.getByText(/Close Dialog/i));
    userEvent.click(screen.getByText(/Close Button Dialog/i));
  });
  it('should display traveling with people and show empty placeholder', () => {
    const { store } = renderWithRedux(<TravelingWithDialog {...props} />);
    dispatchSetValue(store, NODE_STORE, 'nodes', {
      2: {
        id: 2,
        groups: [],
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
      999: {
        id: 999,
        participants: [2],
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

    expect(screen.getByText(/Create Group/i)).toBeInTheDocument();
    userEvent.click(screen.getByText(/Create Group/i));
    // expect(screen.getByText(/Join Group/i)).toBeInTheDocument();
    // userEvent.click(screen.getByText(/Join Group/i));
  });
  it('should display traveling with people when displaying dialog by group and not participant', () => {
    const propsGrp = {
      onClose: jest.fn(),
      onButtonClose: jest.fn(),
      open: true,
      id: null,
      resaga,
      templateId: 999,
      hasGroup: true,
      currentGroupId: 1,
      renderDeleteGroup: jest.fn(),
    };
    const { store } = renderWithRedux(
      <TravelingWithDialog {...propsGrp} isLoading processId={2} />,
    );
    dispatchSetValue(store, NODE_STORE, 'nodes', {
      1: {
        id: 1,
        groups: [1],
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
      999: {
        id: 999,
        participants: [2],
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
    expect(screen.getByText(/Delete group/i)).toBeInTheDocument();
    userEvent.click(screen.getByText(/Delete group/i));
  });
});
