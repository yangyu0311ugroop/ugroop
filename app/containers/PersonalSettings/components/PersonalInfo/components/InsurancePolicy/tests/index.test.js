import React from 'react';
import '@testing-library/jest-dom';
import { renderWithRedux } from 'utils/testUtility';
import { screen } from '@testing-library/react';
import { InsurancePolicy } from '../index';

describe('EditableTravelingWith', () => {
  it('should properly display traveling with participant in editable', () => {
    renderWithRedux(<InsurancePolicy personId={1} classes={{}} />);
  });

  it('should properly open and close dialog', () => {
    renderWithRedux(<InsurancePolicy personId={1} classes={{}} />);
    expect(
      screen.getByText(
        /Some info may be visible to other people using uGroop./i,
      ),
    ).toBeInTheDocument();
  });
});
