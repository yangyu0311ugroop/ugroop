import React from 'react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { act, screen } from '@testing-library/react';
import { dispatchSetValue, renderWithRedux } from 'utils/testUtility';
import { VARIANTS } from 'variantsConstants';
import MomentUtils from '@date-io/moment';
import { MuiPickersUtilsProvider } from 'material-ui-pickers';
import { InsurancePolicy } from '../index';
import { PERSON_DATA_STORE } from '../../../../../appConstants';

describe('InsurancePolicy', () => {
  afterEach(() => jest.clearAllMocks());
  const props = {
    classes: {},
    resaga: { setValue: jest.fn(), dispatchTo: jest.fn() },
  };
  it('should render properly by text only', () => {
    const { store } = renderWithRedux(
      <InsurancePolicy id={1} {...props} variant={VARIANTS.TEXT_ONLY} />,
    );
    dispatchSetValue(store, PERSON_DATA_STORE, 'insurancePolicies', {
      1: {
        id: 1,
        insuranceNumber: '100001',
      },
    });
    expect(screen.getByText(/100001/i)).toBeInTheDocument();
  });
  it('should render properly by card ', () => {
    const { store } = renderWithRedux(
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <InsurancePolicy id={1} {...props} variant={VARIANTS.CARD} />
      </MuiPickersUtilsProvider>,
    );
    dispatchSetValue(store, PERSON_DATA_STORE, 'insurancePolicies', {
      1: {
        id: 1,
        insuranceNumber: '100001',
      },
    });
    act(() => {
      userEvent.click(screen.getByTestId('btn-action-insurance-save'));
    });
    act(() => {
      userEvent.click(screen.getByTestId('btn-action-insurance-delete'));
    });
  });
  it('should render properly by row ', () => {
    const { store } = renderWithRedux(
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <InsurancePolicy id={1} {...props} variant={VARIANTS.ROW} />
      </MuiPickersUtilsProvider>,
    );
    dispatchSetValue(store, PERSON_DATA_STORE, 'insurancePolicies', {
      1: {
        id: 1,
        insuranceNumber: '100001',
        companyName: 'ugroop',
      },
    });
    expect(screen.getByText(/ugroop/i)).toBeInTheDocument();
  });
  it('should render properly by default ', () => {
    const { store } = renderWithRedux(
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <InsurancePolicy id={1} {...props} />
      </MuiPickersUtilsProvider>,
    );
    dispatchSetValue(store, PERSON_DATA_STORE, 'insurancePolicies', {
      1: {
        id: 1,
        insuranceNumber: '100001',
        companyName: 'ugroop',
      },
    });
  });
  it('should render properly by fields ', () => {
    const { store } = renderWithRedux(
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <InsurancePolicy id={1} {...props} variant={VARIANTS.FIELDS_ONLY} />
      </MuiPickersUtilsProvider>,
    );
    dispatchSetValue(store, PERSON_DATA_STORE, 'insurancePolicies', {
      1: {
        id: 1,
        insuranceNumber: '100001',
      },
    });
    // expect(screen.getByText(/Insurance Policy Number/i)).toBeInTheDocument();
  });
});
