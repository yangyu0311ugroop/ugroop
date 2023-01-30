import React from 'react';
import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import { renderWithRedux } from 'utils/testUtility';
import { NoParticipantPlaceholder } from '../index';

describe('NoParticipantPlaceholder', () => {
  const props = {
    id: 2,
  };
  it('should render properly by default', () => {
    renderWithRedux(<NoParticipantPlaceholder {...props} />);

    expect(
      screen.getByText(/No participants in this group/i),
    ).toBeInTheDocument();
  });
});
