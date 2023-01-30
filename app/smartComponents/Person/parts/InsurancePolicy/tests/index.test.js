import React from 'react';
import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import { dispatchSetValue, renderWithRedux } from 'utils/testUtility';
import { InsurancePolicy } from '../index';
import { PERSON_DATA_STORE } from '../../../../../appConstants';

describe('InsurancePolicies', () => {
  afterEach(() => jest.clearAllMocks());
  const props = {
    classes: {},
    resaga: { setValue: jest.fn(), dispatchTo: jest.fn() },
  };
  it('should render properly by default', () => {
    const { store } = renderWithRedux(
      <InsurancePolicy {...props} insurancePolicy="some insurance policy" />,
    );
    dispatchSetValue(store, PERSON_DATA_STORE, 'insurancePolicies', {
      1: {
        id: 1,
        expiryDate: '2020-06-01',
        insuranceNumber: 'ugropp company',
      },
    });
    expect(screen.getByText(/some insurance policy/i)).toBeInTheDocument();
  });
});
