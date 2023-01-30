import React from 'react';
import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import { dispatchSetValue, renderWithRedux } from 'utils/testUtility';
import MomentUtils from '@date-io/moment';
import { MuiPickersUtilsProvider } from 'material-ui-pickers';
import { InsurancePolicies } from '../index';
import { VARIANTS } from '../../../../../variantsConstants';
import { PERSON_DATA_STORE } from '../../../../../appConstants';

describe('InsurancePolicies', () => {
  afterEach(() => jest.clearAllMocks());
  const props = {
    classes: {},
    resaga: { setValue: jest.fn(), dispatchTo: jest.fn() },
  };
  it('should render properly by placeholder', () => {
    renderWithRedux(
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <InsurancePolicies {...props} id={1} />
      </MuiPickersUtilsProvider>,
    );
    expect(screen.getByText(/test/i)).toBeInTheDocument();
  });
  it('should render properly by placeholder readOnly', () => {
    renderWithRedux(
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <InsurancePolicies {...props} id={1} readOnly />
      </MuiPickersUtilsProvider>,
    );
    expect(screen.getByText(/test/i)).toBeInTheDocument();
  });
  it('should render properly by default', () => {
    const { store } = renderWithRedux(
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <InsurancePolicies
          {...props}
          id={1}
          personInsurancePolicyValue={[]}
          userInsurancePolicyValue={[1]}
        />
      </MuiPickersUtilsProvider>,
    );
    dispatchSetValue(store, PERSON_DATA_STORE, 'insurancePolicies', {
      1: {
        id: 1,
        expiryDate: '2020-06-01',
        insuranceNumber: 'ugropp company',
      },
    });
    // expect(screen.getByText(/ugropp company/i)).toBeInTheDocument();
    /* act(() => {
      userEvent.click(screen.getByTestId('add-insurance-save'));
    }); */
  });

  it('should render properly text only', () => {
    const { store } = renderWithRedux(
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <InsurancePolicies
          {...props}
          id={1}
          personInsurancePolicyValue={[]}
          userInsurancePolicyValue={[1]}
          variant={VARIANTS.TEXT_ONLY}
          value={[1]}
        />
      </MuiPickersUtilsProvider>,
    );
    dispatchSetValue(store, PERSON_DATA_STORE, 'insurancePolicies', {
      1: {
        id: 1,
        expiryDate: '2020-06-01',
        insuranceNumber: 'ugropp company',
      },
    });
    expect(screen.getByText(/ugropp company/i)).toBeInTheDocument();
  });
  it('should render properly card', () => {
    const { store } = renderWithRedux(
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <InsurancePolicies
          {...props}
          id={1}
          personInsurancePolicyValue={[]}
          userInsurancePolicyValue={[1]}
          variant={VARIANTS.CARD}
          value={[1]}
        />
      </MuiPickersUtilsProvider>,
    );
    dispatchSetValue(store, PERSON_DATA_STORE, 'insurancePolicies', {
      1: {
        id: 1,
        expiryDate: '2020-06-01',
        insuranceNumber: 'ugropp company',
      },
    });
    expect(
      screen.getByText(
        /Some info may be visible to other people using uGroop/i,
      ),
    ).toBeInTheDocument();
  });
  it('should render properly card with no value', () => {
    const { store } = renderWithRedux(
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <InsurancePolicies
          {...props}
          id={1}
          personInsurancePolicyValue={[]}
          userInsurancePolicyValue={[1]}
          variant={VARIANTS.CARD}
        />
      </MuiPickersUtilsProvider>,
    );
    dispatchSetValue(store, PERSON_DATA_STORE, 'insurancePolicies', {
      1: {
        id: 1,
        expiryDate: '2020-06-01',
        insuranceNumber: 'ugropp company',
      },
    });
    expect(screen.getByText(/test/i)).toBeInTheDocument();
  });
  it('should render properly ROW', () => {
    const { store } = renderWithRedux(
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <InsurancePolicies
          {...props}
          id={1}
          personInsurancePolicyValue={[]}
          userInsurancePolicyValue={[1]}
          variant={VARIANTS.ROW}
          value={[1]}
        />
      </MuiPickersUtilsProvider>,
    );
    dispatchSetValue(store, PERSON_DATA_STORE, 'insurancePolicies', {
      1: {
        id: 1,
        expiryDate: '2020-06-01',
        insuranceNumber: 'ugropp company',
      },
    });
    // expect(screen.getByText(/ugropp company/i)).toBeInTheDocument();
  });
  it('should render properly ROW and show place holder', () => {
    const { store } = renderWithRedux(
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <InsurancePolicies {...props} id={1} variant={VARIANTS.ROW} />
      </MuiPickersUtilsProvider>,
    );
    dispatchSetValue(store, PERSON_DATA_STORE, 'insurancePolicies', {
      1: {
        id: 1,
        expiryDate: '2020-06-01',
        insuranceNumber: 'ugropp company',
      },
    });
    expect(screen.getByText(/test/i)).toBeInTheDocument();
  });
  it('should render properly COUNT', () => {
    const { store } = renderWithRedux(
      <InsurancePolicies
        {...props}
        id={1}
        variant={VARIANTS.COUNT}
        personInsurancePolicyValue={[]}
        userInsurancePolicyValue={[1]}
        value={[1, 2]}
      />,
    );
    dispatchSetValue(store, PERSON_DATA_STORE, 'insurancePolicies', {
      1: {
        id: 1,
        expiryDate: '2020-06-01',
        insuranceNumber: 'ugropp company',
      },
    });
    expect(screen.getByText(/2/i)).toBeInTheDocument();
  });
  it('should render properly FIELDS_ONLY', () => {
    const { store } = renderWithRedux(
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <InsurancePolicies
          {...props}
          id={1}
          personInsurancePolicyValue={[]}
          userInsurancePolicyValue={[1]}
          variant={VARIANTS.FIELDS_ONLY}
          value={[1]}
        />
      </MuiPickersUtilsProvider>,
    );
    dispatchSetValue(store, PERSON_DATA_STORE, 'insurancePolicies', {
      1: {
        id: 1,
        expiryDate: '2020-06-01',
        insuranceNumber: 'ugropp company',
      },
    });
    expect(
      screen.getByText(
        /Some info may be visible to other people using uGroop/i,
      ),
    ).toBeInTheDocument();
  });
});
