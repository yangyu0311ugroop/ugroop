import React from 'react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { act, screen } from '@testing-library/react';
import { renderWithRedux } from 'utils/testUtility';
import { HelpDialog } from '../index';

describe('HelpDialog', () => {
  afterEach(() => jest.clearAllMocks());
  const props = {
    onClose: jest.fn(),
    onButtonClose: jest.fn(),
    open: true,
    classes: {},
    data: {
      message: 'this is a message',
      linkUrl: 'some link',
    },
  };
  it('should render properly by default', () => {
    renderWithRedux(<HelpDialog {...props} />);
  });

  it('should display traveling with people when displaying dialog', () => {
    renderWithRedux(<HelpDialog {...props} isLoading processId={2} />);
    expect(screen.getByText(/this is a message/i)).toBeInTheDocument();
    expect(screen.getByTestId('jdialog-learnMore')).toBeInTheDocument();
    act(() => {
      userEvent.click(screen.getByTestId('jdialog-learnMore'));
    });
  });
});
