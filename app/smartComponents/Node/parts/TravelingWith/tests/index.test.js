import { NODE_STORE } from 'appConstants';
import React from 'react';
import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import { dispatchSetValue, renderWithRedux } from 'utils/testUtility';
import { VARIANTS } from 'variantsConstants';
import { TravelingWith } from '../index';

describe('TravelingWith', () => {
  it('should render properly by default', () => {
    const { store } = renderWithRedux(<TravelingWith id={1} />);
    dispatchSetValue(store, NODE_STORE, 'nodes', {
      1: {
        id: 1,
        groups: [2],
      },
      2: {
        id: 2,
        participants: [1, 2],
        content: 'test',
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

    expect(screen.getByText(/First User and 1 other/i)).toBeInTheDocument();
  });

  it('should render properly by traveling with list', () => {
    const { store } = renderWithRedux(
      <TravelingWith id={1} variant={VARIANTS.LIST_ONLY} />,
    );
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
    expect(screen.getByText(/Second User/i)).toBeInTheDocument();
  });
});
