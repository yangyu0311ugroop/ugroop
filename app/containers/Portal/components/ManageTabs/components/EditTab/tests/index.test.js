import React from 'react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import { renderWithRedux } from 'utils/testUtility';
import FText from 'components/Inputs/TextField/components/FilledInputs/components/FText';
import { act } from '@testing-library/react-hooks';
import EditTab from '../index';

describe('EditTab', () => {
  const resaga = {
    dispatchTo: jest.fn(),
  };
  afterEach(() => jest.clearAllMocks());
  const props = {
    id: 1,
    rteComponent: FText,
    resaga,
  };
  it('should render properly by default', () => {
    renderWithRedux(<EditTab {...props} />);
  });

  it('should display edit tab', () => {
    renderWithRedux(<EditTab {...props} isLoading processId={2} />);
    expect(screen.getByTestId('editTab-TestId')).toBeInTheDocument();
    const buttons = screen.queryAllByTestId('editTab-TestId');
    act(() => {
      userEvent.click(buttons[0]);
    });
    expect(screen.getByText(/Cancel/i)).toBeInTheDocument();
    expect(screen.getByText(/Update/i)).toBeInTheDocument();
    userEvent.click(screen.getByTestId('submitEdit-TestId'));
    act(() => {
      userEvent.click(buttons[0]);
    });
    userEvent.click(screen.getByTestId('cancelEdit-TestId'));
  });
});
