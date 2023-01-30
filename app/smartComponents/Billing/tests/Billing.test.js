import SubscriptionScheduleAPI from 'apis/components/SubscriptionSchedule';
import { renderHook } from '@testing-library/react-hooks';
import { screen } from '@testing-library/dom';
import { useImmer } from 'use-immer';
import { Route } from 'react-router-dom';
import React from 'react';
import userEvent from '@testing-library/user-event';
import configureStore from '../../../configureStore';
import {
  dispatchRequestSuccessAction,
  dispatchSetValue,
  reduxEnhancer,
  renderWithReduxWithRouter,
} from '../../../utils/testUtility';
import { GlobalProvider } from '../../../containers/App/globalContext';
import InitDataStore from '../../../datastore/dataStore';
import SubscriptionAPI from '../../../apis/components/Subscription';
import InvoiceAPI from '../../../apis/components/Invoice';
import OrganisationAPI from '../../../apis/components/Organisation';
import ProductAPI from '../../../apis/components/Products';
import PlansAPI from '../../../apis/components/Plans';
import PaymentMethodAPI from '../../../apis/components/PaymentMethod';

import {
  COGNITO_ACCOUNTSTORE,
  ORGANISATION_DATA_STORE,
  URL_HELPERS,
} from '../../../appConstants';
import { productData } from '../../../apis/components/Products/tests/productData';
import { planData } from '../../../apis/components/Plans/tests/planData';
import { sleep } from '../../../utils/timeUtility';
import {
  CARDS_API,
  CHARGES_API,
  GET_CUSTOMER_CARDS,
  GET_CUSTOMER_CHARGES,
  GET_CUSTOMER_SUBSCRIPTION,
  GET_INVOICE,
  GET_PLAN_LIST,
  GET_PRODUCT_LIST,
  INVOICE_API,
  ME,
  PLAN_API,
  PRODUCT_API,
  SUBSCRIPTION_API,
  USER_API,
} from '../../../apis/constants';
import Billing from '../../../containers/Profile/components/Organisation/components/Content/components/Billing';
import {
  freeOrgSubscription,
  orgSubscription,
  travellerYearSubscription,
} from '../../../apis/components/Subscription/tests/subscriptionFeedData';
import helpers from '../../../datastore/userStore/helpers';
import { CustomerData, CustomerData2, CustomerDataFree } from './customerData';
import { PlanProvider } from '../../Plan/context/planProvider';
import CardsAPI from '../../../apis/components/Cards';
import ChargesAPI from '../../../apis/components/Charges';
import { PlanProviderGlobal } from '../../Plan/context/planProviderGlobal';
import {
  InvoiceFreeData,
  InvoiceStarterData,
  InvoiceTravellerData,
} from '../../../apis/components/Invoice/tests/invoiceData';
import { visaCard } from '../../../apis/components/Cards/tests/cardFeedData';
import { chargeFeedData } from '../../../apis/components/Charges/tests/chargeData';
jest.mock('@stripe/react-stripe-js', () => ({
  CardElement: () => <input data-testid="cardElement" value="" />,
  Elements: p => <div>{p.children}</div>,
  useStripe: () => ({
    createToken: jest.fn().mockReturnValueOnce({
      token: {
        id: 'abcdToken',
      },
    }),
  }),
  useElements: () => ({
    getElement: jest.fn().mockReturnValueOnce({
      name: 'cardElementNameVisa',
    }),
  }),
}));
const billingComponentSetup = feedingDATA => async props => {
  const { result } = renderHook(() => {
    const [state, dispatch] = useImmer({
      API: {},
    });
    return { state, dispatch };
  });
  const id = props.orgId;
  const s = configureStore({}, {}, [reduxEnhancer(result.current)]);
  const {
    store,
    history,
    rerenderWithReduxWithRouter,
  } = renderWithReduxWithRouter(
    <GlobalProvider>
      <PlanProviderGlobal>
        <InitDataStore />
        <SubscriptionAPI />
        <InvoiceAPI />
        <CardsAPI />
        <ChargesAPI />
        <PaymentMethodAPI />
        <OrganisationAPI />
        <SubscriptionScheduleAPI />
        <PlansAPI />
        <ProductAPI />
        <Route
          path={`${URL_HELPERS.orgSettings(id)}/billings`}
          render={() => (
            <PlanProvider>
              <Billing id={2} userId={1} />
            </PlanProvider>
          )}
        />
      </PlanProviderGlobal>
    </GlobalProvider>,
    { store: s },
  );
  dispatchSetValue(store, COGNITO_ACCOUNTSTORE, 'account', {
    id: 1,
  });
  const getPlanListProcessResult =
    result.current.state.API.getPlanListProcessResult;
  const getProductListProcessResult =
    result.current.state.API.getProductListProcessResult;

  let planNData;
  let productNData;
  if (getPlanListProcessResult) {
    planNData = getPlanListProcessResult.getPlanList(planData);
  }
  if (getProductListProcessResult) {
    productNData = getProductListProcessResult.getProductList(productData);
  }
  dispatchRequestSuccessAction(store, PLAN_API, GET_PLAN_LIST, planNData);
  dispatchRequestSuccessAction(
    store,
    PRODUCT_API,
    GET_PRODUCT_LIST,
    productNData,
  );

  dispatchSetValue(
    store,
    ORGANISATION_DATA_STORE,
    'organisations',
    feedingDATA.organisationdata,
  );
  dispatchSetValue(
    store,
    ORGANISATION_DATA_STORE,
    'orgUsers',
    feedingDATA.orgUsers,
  );
  dispatchSetValue(store, ORGANISATION_DATA_STORE, 'roles', feedingDATA.roles);
  history.push('/orgs/2/settings/billings');
  await sleep(500);
  let subscription;
  const getCustomerSubscriptionProcessResult =
    result.current.state.API.getCustomerSubscriptionProcessResult;
  const payload = result.current.state.API.getCustomerSubscriptionPayload;
  if (getCustomerSubscriptionProcessResult) {
    subscription = getCustomerSubscriptionProcessResult.getCustomerSubscription(
      feedingDATA.orgSubscription,
      payload,
    );
  }
  dispatchRequestSuccessAction(
    store,
    SUBSCRIPTION_API,
    GET_CUSTOMER_SUBSCRIPTION,
    subscription,
  );

  const nsubscription = helpers.normaliseGetMe(feedingDATA.CustomerData);
  dispatchRequestSuccessAction(store, USER_API, ME, nsubscription);
  const fetchCustomerSubscriptionSuccess =
    result.current.state.API.getCustomerSubscription;
  if (fetchCustomerSubscriptionSuccess) {
    fetchCustomerSubscriptionSuccess({
      raw: feedingDATA.orgSubscription,
    });
  }
  await sleep(500);
  let invoiceData;
  const getInvoiceProcessResult =
    result.current.state.API.getInvoiceProcessResult;
  if (getInvoiceProcessResult) {
    invoiceData = getInvoiceProcessResult.getInvoice(feedingDATA.InvoiceData);
  }
  dispatchRequestSuccessAction(store, INVOICE_API, GET_INVOICE, invoiceData);
  return { store, history, result, rerenderWithReduxWithRouter };
};
test('Billing Total', async () => {
  const { history } = await billingComponentSetup({
    orgSubscription,
    InvoiceData: InvoiceStarterData,
    CustomerData,
    roles: {
      1: {
        id: 1,
        pending: [],
        confirmed: [1],
        activated: [1],
      },
      2: {
        id: 2,
        pending: [],
        confirmed: [1],
        activated: [1],
      },
    },
    organisationdata: {
      1: {
        id: 1,
        userId: 1,
        createdBy: 1,
      },
      2: {
        id: 1,
        userId: 1,
        createdBy: 1,
      },
    },
    orgUsers: {
      1: {
        userId: 1,
        role: 'owner',
      },
      2: {
        userId: 1,
        role: 'owner',
      },
    },
  })({
    orgId: 2,
  });

  await sleep(100);
  expect(screen.getByTestId('currentTotalPrice')).toHaveTextContent(
    'AUD $99.00 / month',
  );
  expect(screen.getByTestId('nextDueDate')).toHaveTextContent('July 09, 2021');
  const changeBillingCycleButton = screen.queryByRole('button', {
    name: /^Change/,
  });
  expect(changeBillingCycleButton).toHaveTextContent(
    'Change to yearly billing and save upto 20%',
  );
  const pastPayment = screen.queryByRole('button', {
    name: /^Past/,
  });
  expect(pastPayment).toHaveTextContent('Past payments and receipts');
  expect(screen.getByTestId('orgPlanName')).toHaveTextContent('Starter');
  expect(screen.getByTestId('orgSeatPrice')).toHaveTextContent(
    'AUD $99.00 / month',
  );
  expect(screen.getByTestId('availableSeats')).toHaveTextContent(
    '1 of 2 team seats taken',
  );
  expect(screen.getByTestId('addSeatSingleButton')).toHaveTextContent(
    'Add team seats',
  );
  expect(screen.getByTestId('tourDescription')).toHaveTextContent(
    'You can have up to 20 pax on any tour in your organisation, all of whom have free usage.' +
      'Team seats travelling are not included in this total.' +
      'An upgrade is available if you need more.',
  );
  expect(screen.getByTestId('tourPrice')).toHaveTextContent(
    'AUD $0.00 / month',
  );
  expect(screen.queryByTestId('removeOrgSeat')).not.toBeInTheDocument();

  userEvent.click(changeBillingCycleButton);
  expect(history.location.pathname).toBe(
    '/orgs/2/subscription/changeDuration/upgrade',
  );
}, 100000);

test('Add Seat and Upgrade subscription go to correct url', async () => {
  const { history } = await billingComponentSetup({
    orgSubscription,
    InvoiceData: InvoiceStarterData,
    CustomerData,
    roles: {
      1: {
        id: 1,
        pending: [],
        confirmed: [1],
        activated: [1],
      },
      2: {
        id: 2,
        pending: [],
        confirmed: [1],
        activated: [1],
      },
    },
    organisationdata: {
      1: {
        id: 1,
        userId: 1,
        createdBy: 1,
      },
      2: {
        id: 1,
        userId: 1,
        createdBy: 1,
      },
    },
    orgUsers: {
      1: {
        userId: 1,
        role: 'owner',
      },
      2: {
        userId: 1,
        role: 'owner',
      },
    },
  })({
    orgId: 2,
  });
  userEvent.click(screen.getByTestId('addSeatSingleButton').children[0]);
  expect(history.location.pathname).toBe('/orgs/2/subscription/addSeat');
  const { history: history2 } = await billingComponentSetup({
    orgSubscription,
    InvoiceData: InvoiceStarterData,
    CustomerData,
    roles: {
      1: {
        id: 1,
        pending: [],
        confirmed: [1],
        activated: [1],
      },
      2: {
        id: 2,
        pending: [],
        confirmed: [1],
        activated: [1],
      },
    },
    organisationdata: {
      1: {
        id: 1,
        userId: 1,
        createdBy: 1,
      },
      2: {
        id: 1,
        userId: 1,
        createdBy: 1,
      },
    },
    orgUsers: {
      1: {
        userId: 1,
        role: 'owner',
      },
      2: {
        userId: 1,
        role: 'owner',
      },
    },
  })({
    orgId: 2,
  });
  userEvent.click(
    screen.getByTestId('changeSubscription').children[0].children[0]
      .children[0],
  );
  expect(history2.location.pathname).toBe('/orgs/2/subscription/upgrade');
}, 100000);

test('Yearly Traveller Plan', async () => {
  const { history, result, store } = await billingComponentSetup({
    orgSubscription: travellerYearSubscription,
    InvoiceData: InvoiceTravellerData,
    CustomerData: CustomerData2,
    roles: {
      1: {
        id: 1,
        pending: [],
        confirmed: [1, 2, 3, 4],
        activated: [1, 2, 3, 4],
      },
      2: {
        id: 2,
        pending: [],
        confirmed: [1, 2, 3, 4],
        activated: [1, 2, 3, 4],
      },
    },
    organisationdata: {
      1: {
        id: 1,
        userId: 1,
        createdBy: 1,
      },
      2: {
        id: 1,
        userId: 1,
        createdBy: 1,
      },
    },
    orgUsers: {
      1: {
        userId: 1,
        role: 'owner',
      },
      2: {
        userId: 1,
        role: 'owner',
      },
    },
  })({
    orgId: 2,
  });
  const API = result.current.state.API;
  let cardData;
  let chargeData;
  if (API.getCustomerCardsProcessResult) {
    cardData = API.getCustomerCardsProcessResult.getCustomerCards(visaCard, {
      id: 'cus_JjEOpmgLOcKwnO',
    });
  }
  if (API.getCustomerChargesProcessResult) {
    chargeData = API.getCustomerChargesProcessResult.getCustomerCharges(
      chargeFeedData,
      {
        data: {
          customer: 'cus_JjEOpmgLOcKwnO',
        },
      },
    );
  }
  if (API.getCustomerCharges) {
    API.getCustomerCharges();
  }
  dispatchRequestSuccessAction(store, CARDS_API, GET_CUSTOMER_CARDS, cardData);
  dispatchRequestSuccessAction(
    store,
    CHARGES_API,
    GET_CUSTOMER_CHARGES,
    chargeData,
  );
  expect(screen.getByTestId('currentTotalPrice')).toHaveTextContent(
    'AUD $1760.00 / year',
  );
  expect(screen.getByTestId('nextDueDate')).toHaveTextContent('June 24, 2022');
  const changeBillingCycleButton = screen.queryByRole('button', {
    name: /^Change/,
  });
  expect(changeBillingCycleButton).toHaveTextContent(
    'Change to monthly billing',
  );
  const pastPayment = screen.queryByRole('button', {
    name: /^Past/,
  });
  expect(pastPayment).toHaveTextContent('Past payments and receipts');
  expect(screen.getByTestId('orgPlanName')).toHaveTextContent(
    'Traveller-Yearly',
  );
  expect(screen.getByTestId('orgSeatPrice')).toHaveTextContent(
    'AUD $2354.00 / year',
  );
  expect(screen.getByTestId('availableSeats')).toHaveTextContent(
    '4 of 5 team seats taken',
  );
  expect(screen.getByTestId('chargeStatus')).toHaveTextContent('successful');
  expect(screen.getByTestId('chargeAmount')).toHaveTextContent('AUD $1760.00');
  expect(screen.getByTestId('cardBrand')).toHaveTextContent('Visa');
  expect(screen.getByTestId('cardNum')).toHaveTextContent('4242');
  expect(screen.getByTestId('cardExpiry')).toHaveTextContent('4/2024');

  userEvent.click(screen.getByTestId('editCardButton').children[0]);
  userEvent.click(screen.getByTestId('showmore').children[0]);
  userEvent.type(
    screen.getByTestId('city').children[0].children[0].children[1].children[0],
    'City Road',
  );
  userEvent.click(
    screen.queryByRole('button', {
      name: /^Submit/,
    }),
  );
  const updatePaymentMethodSuccess =
    result.current.state.API.updatePaymentMethod;
  if (updatePaymentMethodSuccess) {
    updatePaymentMethodSuccess({});
  }
  const updatePaymentMethodPayload =
    result.current.state.API.updatePaymentMethodPayload;
  expect(updatePaymentMethodPayload.data.billing_details.address.city).toBe(
    'City Road',
  );
  userEvent.click(screen.getByTestId('removeCardButton').children[0]);
  const cancelButton = screen.queryByRole('button', {
    name: /^Cancel/,
  });
  userEvent.click(cancelButton);
  userEvent.click(pastPayment);
  expect(history.location.pathname).toBe('/orgs/2/subscription/paymentHistory');
}, 100000);

test('Yearly traveller remove Seat shall go to correct url and downgrade shall go to correct logic ', async () => {
  const { history } = await billingComponentSetup({
    orgSubscription: travellerYearSubscription,
    InvoiceData: InvoiceTravellerData,
    CustomerData: CustomerData2,
    roles: {
      1: {
        id: 1,
        pending: [],
        confirmed: [1, 2, 3, 4],
        activated: [1, 2, 3, 4],
      },
      2: {
        id: 2,
        pending: [],
        confirmed: [1, 2, 3, 4],
        activated: [1, 2, 3, 4],
      },
    },
    organisationdata: {
      1: {
        id: 1,
        userId: 1,
        createdBy: 1,
      },
      2: {
        id: 1,
        userId: 1,
        createdBy: 1,
      },
    },
    orgUsers: {
      1: {
        userId: 1,
        role: 'owner',
      },
      2: {
        userId: 1,
        role: 'owner',
      },
    },
  })({
    orgId: 2,
  });
  userEvent.click(screen.getByTestId('removeOrgSeat').children[0]);
  expect(history.location.pathname).toBe('/orgs/2/subscription/removeSeat');
  const { history: history2 } = await billingComponentSetup({
    orgSubscription: travellerYearSubscription,
    InvoiceData: InvoiceTravellerData,
    CustomerData: CustomerData2,
    roles: {
      1: {
        id: 1,
        pending: [],
        confirmed: [1],
        activated: [1],
      },
      2: {
        id: 2,
        pending: [],
        confirmed: [1],
        activated: [1],
      },
    },
    organisationdata: {
      1: {
        id: 1,
        userId: 1,
        createdBy: 1,
      },
      2: {
        id: 1,
        userId: 1,
        createdBy: 1,
      },
    },
    orgUsers: {
      1: {
        userId: 1,
        role: 'owner',
      },
      2: {
        userId: 1,
        role: 'owner',
      },
    },
  })({
    orgId: 2,
  });
  userEvent.click(
    screen.getByTestId('downgradeSubscription').children[0].children[0]
      .children[0],
  );
  expect(history2.location.pathname).toBe('/orgs/2/subscription/downgrade');
}, 100000);

test('Yearly traveller shall redirect to past payment history', async () => {
  const { history: history2, result, store } = await billingComponentSetup({
    orgSubscription: travellerYearSubscription,
    InvoiceData: InvoiceTravellerData,
    CustomerData: CustomerData2,
    roles: {
      1: {
        id: 1,
        pending: [],
        confirmed: [1],
        activated: [1],
      },
      2: {
        id: 2,
        pending: [],
        confirmed: [1],
        activated: [1],
      },
    },
    organisationdata: {
      1: {
        id: 1,
        userId: 1,
        createdBy: 1,
      },
      2: {
        id: 1,
        userId: 1,
        createdBy: 1,
      },
    },
    orgUsers: {
      1: {
        userId: 1,
        role: 'owner',
      },
      2: {
        userId: 1,
        role: 'owner',
      },
    },
  })({
    orgId: 2,
  });
  const API = result.current.state.API;
  let cardData;
  let chargeData;
  if (API.getCustomerCardsProcessResult) {
    cardData = API.getCustomerCardsProcessResult.getCustomerCards(visaCard, {
      id: 'cus_JjEOpmgLOcKwnO',
    });
  }
  if (API.getCustomerChargesProcessResult) {
    chargeData = API.getCustomerChargesProcessResult.getCustomerCharges(
      chargeFeedData,
      {
        data: {
          customer: 'cus_JjEOpmgLOcKwnO',
        },
      },
    );
  }
  if (API.getCustomerCharges) {
    API.getCustomerCharges();
  }
  dispatchRequestSuccessAction(store, CARDS_API, GET_CUSTOMER_CARDS, cardData);
  dispatchRequestSuccessAction(
    store,
    CHARGES_API,
    GET_CUSTOMER_CHARGES,
    chargeData,
  );
  userEvent.click(screen.getByTestId('viewAllPayment').children[0]);
  expect(history2.location.pathname).toBe(
    '/orgs/2/subscription/paymentHistory',
  );
}, 100000);

test('Free subscription plan', async () => {
  const { result } = await billingComponentSetup({
    orgSubscription: freeOrgSubscription,
    InvoiceData: InvoiceFreeData,
    CustomerData: CustomerDataFree,
    roles: {
      1: {
        id: 1,
        pending: [],
        confirmed: [1],
        activated: [1],
      },
      2: {
        id: 2,
        pending: [],
        confirmed: [1],
        activated: [1],
      },
    },
    organisationdata: {
      1: {
        id: 1,
        userId: 1,
        createdBy: 1,
      },
      2: {
        id: 1,
        userId: 1,
        createdBy: 1,
      },
    },
    orgUsers: {
      1: {
        userId: 1,
        role: 'owner',
      },
      2: {
        userId: 1,
        role: 'owner',
      },
    },
  })({
    orgId: 2,
  });
  expect(screen.getByTestId('currentTotalPrice')).toHaveTextContent(
    '$0.00 / month',
  );
  const pastPayment = screen.queryByRole('button', {
    name: /^Past/,
  });
  expect(pastPayment).toHaveTextContent('Past payments and receipts');
  expect(screen.getByTestId('orgPlanName')).toHaveTextContent('Monthly Free');
  expect(screen.getByTestId('orgSeatPrice')).toHaveTextContent('$0.00 / month');
  expect(screen.getByTestId('nextDueDate')).toHaveTextContent('July 10, 2021');
  const addPayment = screen.queryByRole('button', {
    name: /^Add payment method/,
  });
  userEvent.click(addPayment);
  userEvent.type(screen.getByTestId('cardName'), 'JOHN SMITH');
  const submitPayment = screen.queryByRole('button', {
    name: /^Submit/,
  });
  userEvent.click(submitPayment);
  await sleep(50);
  const API = result.current.state.API;
  if (API.createCustomerCard) {
    API.createCustomerCard();
  }
  const payload = API.createCustomerCardPayload;
  expect(payload.data.source).toBe('abcdToken');
}, 40000);
