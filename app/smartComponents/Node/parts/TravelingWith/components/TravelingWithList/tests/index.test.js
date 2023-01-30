import { NODE_STORE } from 'appConstants';
import React from 'react';
import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import { dispatchSetValue, renderWithRedux } from 'utils/testUtility';
import { TravelingWithList } from '../index';

describe('TravelingWithList', () => {
  it('should render properly by default', () => {
    renderWithRedux(<TravelingWithList />);
  });

  it('should display properly the traveling with list', () => {
    const { store } = renderWithRedux(<TravelingWithList id={1} />);
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
});
