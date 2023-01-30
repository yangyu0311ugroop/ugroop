import { NODE_STORE } from 'appConstants';
import React from 'react';
import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import { dispatchSetValue, renderWithRedux } from 'utils/testUtility';
import { Group } from '../index';

describe('Group', () => {
  const resaga = {
    dispatchTo: jest.fn(),
    setValue: jest.fn(),
  };
  const props = {
    id: 1,
    resaga,
  };
  beforeEach(() => jest.clearAllMocks());
  it('should render properly by default', () => {
    const { store } = renderWithRedux(<Group {...props} />);
    dispatchSetValue(store, NODE_STORE, 'nodes', {
      1: {
        id: 1,
        content: 'First Group',
        type: 'group',
      },
    });

    expect(screen.getByText(/First Group/i)).toBeInTheDocument();
  });
});
