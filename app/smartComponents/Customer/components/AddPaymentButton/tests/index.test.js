import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { cleanup, fireEvent } from '@testing-library/react';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { Elements } from '@stripe/react-stripe-js';
import { AddPaymentButton } from '../index';

jest.mock('@stripe/react-stripe-js', () => {
  const mockImpl = jest.requireActual('@stripe/react-stripe-js');
  mockImpl.injectStripe = Component => Component;
  mockImpl.CardElement = () => <div>Stripe Card Input</div>;
  return mockImpl;
});

describe.skip('<AddPaymentButton />', () => {
  let rendered;

  const stripe = {
    createPaymentMethod: jest.fn(async () => ({ data: {} })),
  };

  const resaga = {
    setValue: jest.fn(),
    dispatchTo: jest.fn(),
  };

  const props = {
    classes: {},
    resaga,
    stripe,
  };

  beforeEach(() => {
    rendered = TEST_HELPERS.renderWithRedux(
      <Elements stripe={stripe}>
        <AddPaymentButton {...props} />
      </Elements>,
    );
  });

  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  it('should exists', () => {
    expect(AddPaymentButton).toBeDefined();
  });

  it('should properly close the modal that contains the form for adding payment method', async () => {
    const { getByTestId } = rendered;
    fireEvent.click(getByTestId(/add-payment-method-btn/i));
    fireEvent.click(getByTestId(/dialog-form-close-btn/i));

    expect(getByTestId(/dialog-form-paper/i)).not.toBeVisible();
  });
  /**
   * The warning being shown was a known issue.
   * Hopefully in the next update of react dom, this thing would be fixed
   * https://github.com/testing-library/react-testing-library/issues/281
   */
});
