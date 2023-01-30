import React from 'react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import { renderWithReduxWithRouter } from 'utils/testUtility';
import { act } from '@testing-library/react-hooks';
import { Header } from '../index';

describe('Header', () => {
  const resaga = {
    dispatchTo: jest.fn(),
    setValue: jest.fn(),
  };
  afterEach(() => jest.clearAllMocks());
  const props = {
    onClose: jest.fn(),
    onButtonClose: jest.fn(),
    id: 1,
    resaga,
    classes: {},
    location: {},
    history: {},
  };
  it('should render properly by default', () => {
    renderWithReduxWithRouter(<Header {...props} />);
  });

  it('should render and do nothing on loading', () => {
    renderWithReduxWithRouter(<Header {...props} rootNodeId={0} />);
  });

  it('should display on screen', () => {
    renderWithReduxWithRouter(<Header {...props} isLoading processId={2} />);
    // screen.debug(null, 1000000000);
    expect(screen.getAllByText(/test/i)[0]).toBeInTheDocument();
    const groupButtons = screen.queryAllByTestId('test-GroupButton');
    act(() => {
      userEvent.click(groupButtons[0]);
    });
  });
});
