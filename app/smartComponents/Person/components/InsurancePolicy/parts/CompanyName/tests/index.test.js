import React from 'react';
import '@testing-library/jest-dom';
import { PERSON_DATA_STORE } from 'appConstants';
import { screen } from '@testing-library/react';
import { dispatchSetValue, renderWithRedux } from 'utils/testUtility';
import Form from 'ugcomponents/Form';
import { CompanyName } from '../index';
import { VARIANTS } from '../../../../../../../variantsConstants';

describe('CompanyName', () => {
  afterEach(() => jest.clearAllMocks());
  const props = {
    id: 1,
    classes: {},
    resaga: { setValue: jest.fn(), dispatchTo: jest.fn() },
  };
  it('should render properly by default', () => {
    renderWithRedux(<CompanyName {...props} />);
  });
  it('should render properly by default', () => {
    const { store } = renderWithRedux(<CompanyName {...props} />);
    dispatchSetValue(store, PERSON_DATA_STORE, 'insurancePolicies', {
      1: {
        id: 1,
        companyName: 'ugroop',
      },
    });
    expect(screen.getByText(/ugroop/i)).toBeInTheDocument();
  });
  it('should render properly by text field', () => {
    const { store } = renderWithRedux(
      <Form>
        <CompanyName {...props} variant={VARIANTS.TEXT_FIELD} />
      </Form>,
    );
    dispatchSetValue(store, PERSON_DATA_STORE, 'insurancePolicies', {
      1: {
        id: 1,
        companyName: 'ugroop',
      },
    });
    expect(screen.getByText(/Company Name/i)).toBeInTheDocument();
  });
  it('should render properly by editable', () => {
    const { store } = renderWithRedux(
      <Form>
        <CompanyName {...props} variant={VARIANTS.EDITABLE} />
      </Form>,
    );
    dispatchSetValue(store, PERSON_DATA_STORE, 'insurancePolicies', {
      1: {
        id: 1,
        companyName: 'ugroop',
      },
    });
    expect(screen.getByText(/Company Name/i)).toBeInTheDocument();
  });
  it('should render properly by render props', () => {
    const children = value => <span>{value}</span>;
    const { store } = renderWithRedux(
      <CompanyName {...props} variant={VARIANTS.RENDER_PROP}>
        {children}
      </CompanyName>,
    );
    dispatchSetValue(store, PERSON_DATA_STORE, 'insurancePolicies', {
      1: {
        id: 1,
        companyName: 'ugroop',
      },
    });
    expect(screen.getByText(/ugroop/i)).toBeInTheDocument();
  });
});
