import React from 'react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { cache } from 'swr';
import { act, screen } from '@testing-library/react';
import { renderWithRedux } from 'utils/testUtility';
import { TemplateStats } from '../index';

describe('TemplateStats', () => {
  const resaga = {
    setValue: jest.fn(),
    dispatchTo: jest.fn(),
  };
  const history = {
    push: jest.fn(),
  };
  const match = {
    params: {
      id: 1,
    },
  };
  const props = {
    resaga,
    history,
    match,
  };
  afterEach(() => {
    cache.clear();
  });
  it('should render properly by default', () => {
    act(() => {
      renderWithRedux(<TemplateStats {...props} />);
    });

    expect(screen.getByText(/Statistics/i)).toBeInTheDocument();
  });

  it('should call history push when clicking the back to tour page button', () => {
    act(() => {
      renderWithRedux(<TemplateStats {...props} />);
      userEvent.click(screen.getByText(/Back to Tour Page/i));
    });

    expect(history.push).toBeCalledWith('/tours/1');
  });
});
