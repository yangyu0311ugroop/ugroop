import React from 'react';
import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import { renderWithRedux } from 'utils/testUtility';
import { Swipeable } from '../index';

describe('Swipeable', () => {
  it('should render properly by default', () => {
    renderWithRedux(<Swipeable />);
  });

  it('should display properly the children', () => {
    renderWithRedux(
      <Swipeable id={1} isSwipeDisable>
        Some content
      </Swipeable>,
    );
    expect(screen.getByText(/Some content/i)).toBeInTheDocument();
  });
});
