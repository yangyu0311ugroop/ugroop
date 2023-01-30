import React from 'react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import { renderWithRedux } from 'utils/testUtility';
import { act } from '@testing-library/react-hooks';
import { Roles } from '../index';

describe('Roles', () => {
  const resaga = {
    dispatchTo: jest.fn(),
    setValue: jest.fn(),
  };
  afterEach(() => jest.clearAllMocks());
  const props = {
    id: 1,
    resaga,
  };
  it('should render properly by default', () => {
    renderWithRedux(<Roles {...props} />);
  });

  it('should display traveling with people when displaying dialog', () => {
    const otherProps = {
      role: 'owner',
      roleMemberPendingIds: [1],
      showInactive: true,
      peopleIds: [1],
      peopleIdsWithActivated: [1],
      showHeader: true,
    };
    renderWithRedux(<Roles {...props} {...otherProps} />);
    expect(screen.getByText(/Organisation Roles/i)).toBeInTheDocument();
    expect(screen.getByTestId('role-help-btn')).toBeInTheDocument();
    act(() => {
      userEvent.click(screen.getByTestId('role-help-btn'));
    });
  });
});
