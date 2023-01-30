import React from 'react';
import '@testing-library/jest-dom';
import { PERSON_DATA_STORE } from 'appConstants';
import { screen } from '@testing-library/react';
import { dispatchSetValue, renderWithRedux } from 'utils/testUtility';
import Form from 'ugcomponents/Form';
import { EmergencyPhone } from '../index';
import { VARIANTS } from '../../../../../../../variantsConstants';

describe('EmergencyPhone', () => {
  afterEach(() => jest.clearAllMocks());
  const props = {
    id: 1,
    classes: {},
    resaga: { setValue: jest.fn(), dispatchTo: jest.fn() },
  };
  it('should render properly by default', () => {
    renderWithRedux(<EmergencyPhone {...props} />);
  });
  it('should render properly by default', () => {
    const { store } = renderWithRedux(<EmergencyPhone {...props} />);
    dispatchSetValue(store, PERSON_DATA_STORE, 'insurancePolicies', {
      1: {
        id: 1,
        emergencyPhone: '100001',
      },
    });
    expect(screen.getByText(/100001/i)).toBeInTheDocument();
  });
  it('should render properly by text field', () => {
    const { store } = renderWithRedux(
      <Form>
        <EmergencyPhone {...props} variant={VARIANTS.TEXT_FIELD} />
      </Form>,
    );
    dispatchSetValue(store, PERSON_DATA_STORE, 'insurancePolicies', {
      1: {
        id: 1,
        emergencyPhone: '100001',
      },
    });
    expect(screen.getByText(/Emergency Phone/i)).toBeInTheDocument();
  });
  it('should render properly by editable', () => {
    const { store } = renderWithRedux(
      <Form>
        <EmergencyPhone {...props} variant={VARIANTS.EDITABLE} />
      </Form>,
    );
    dispatchSetValue(store, PERSON_DATA_STORE, 'insurancePolicies', {
      1: {
        id: 1,
        emergencyPhone: '100001',
      },
    });
    expect(screen.getByText(/Emergency Phone/i)).toBeInTheDocument();
  });
});
