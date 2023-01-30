import React from 'react';
import '@testing-library/jest-dom';
import { PERSON_DATA_STORE } from 'appConstants';
import { screen } from '@testing-library/react';
import { dispatchSetValue, renderWithRedux } from 'utils/testUtility';
import Form from 'ugcomponents/Form';
import { InsuranceNumber } from '../index';
import { VARIANTS } from '../../../../../../../variantsConstants';

describe('InsuranceNumber', () => {
  afterEach(() => jest.clearAllMocks());
  const props = {
    id: 1,
    classes: {},
    resaga: { setValue: jest.fn(), dispatchTo: jest.fn() },
  };
  it('should render properly by default', () => {
    renderWithRedux(<InsuranceNumber {...props} />);
  });
  it('should render properly by default', () => {
    const { store } = renderWithRedux(<InsuranceNumber {...props} />);
    dispatchSetValue(store, PERSON_DATA_STORE, 'insurancePolicies', {
      1: {
        id: 1,
        insuranceNumber: '100001',
      },
    });
    expect(screen.getByText(/100001/i)).toBeInTheDocument();
  });
  it('should render properly by text field', () => {
    const { store } = renderWithRedux(
      <Form>
        <InsuranceNumber {...props} variant={VARIANTS.TEXT_FIELD} />
      </Form>,
    );
    dispatchSetValue(store, PERSON_DATA_STORE, 'insurancePolicies', {
      1: {
        id: 1,
        insuranceNumber: '100001',
      },
    });
    expect(screen.getByText(/Insurance Policy Number/i)).toBeInTheDocument();
  });
  it('should render properly by editable', () => {
    const { store } = renderWithRedux(
      <Form>
        <InsuranceNumber {...props} variant={VARIANTS.EDITABLE} />
      </Form>,
    );
    dispatchSetValue(store, PERSON_DATA_STORE, 'insurancePolicies', {
      1: {
        id: 1,
        insuranceNumber: '100001',
      },
    });
    expect(screen.getByText(/Insurance Policy Number/i)).toBeInTheDocument();
  });
});
