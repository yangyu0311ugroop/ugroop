import { renderHook } from '@testing-library/react-hooks';
import { useImmer } from 'use-immer';
import { Route } from 'react-router-dom';
import React from 'react';
import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import configureStore from '../../../configureStore';
import {
  dispatchRequestSuccessAction,
  dispatchSetValue,
  reduxEnhancer,
  renderWithReduxWithRouter,
} from '../../../utils/testUtility';
import { GlobalProvider } from '../../../containers/App/globalContext';
import { PlanProviderGlobal } from '../../Plan/context/planProviderGlobal';
import InitDataStore from '../../../datastore/dataStore';
import SubscriptionAPI from '../../../apis/components/Subscription';
import InvoiceAPI from '../../../apis/components/Invoice';
import CardsAPI from '../../../apis/components/Cards';
import ChargesAPI from '../../../apis/components/Charges';
import PaymentMethodAPI from '../../../apis/components/PaymentMethod';
import OrganisationAPI from '../../../apis/components/Organisation';
import SubscriptionScheduleAPI from '../../../apis/components/SubscriptionSchedule';
import PlansAPI from '../../../apis/components/Plans';
import ProductAPI from '../../../apis/components/Products';
import CustomerAPI from '../../../apis/components/Customer';
import {
  COGNITO_ACCOUNTSTORE,
  ORGANISATION_DATA_STORE,
  SUBSCRIPTION_PLAN_TYPE,
  URL_HELPERS,
} from '../../../appConstants';
import { planData } from '../../../apis/components/Plans/tests/planData';
import { productData } from '../../../apis/components/Products/tests/productData';
import {
  GET_CUSTOMER_SUBSCRIPTION,
  GET_PLAN_LIST,
  GET_PRODUCT_LIST,
  ME,
  PLAN_API,
  PRODUCT_API,
  SUBSCRIPTION_API,
  USER_API,
  INVOICE_API,
  GET_UPCOMING_INVOICE,
} from '../../../apis/constants';
import { sleep } from '../../../utils/timeUtility';
import helpers from '../../../datastore/userStore/helpers';
import SubscriptionWrapper from './SubscriptionWrapper';
import { orgSubscription } from '../../../apis/components/Subscription/tests/subscriptionFeedData';
import {
  InvoiceStarterData,
  UpcomingGranderInvoice,
  UpcomingTourerInvoice,
  UpcomingTravellerInvoice,
} from '../../../apis/components/Invoice/tests/invoiceData';
import { CustomerData } from './customerData';
import { CUSTOMER_NORMALISERS } from '../../../apis/components/Subscription/normalisers';

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
        <CustomerAPI />
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
          path={URL_HELPERS.orgSubscriptionUpgrade(id)}
          render={() => (
            <SubscriptionWrapper
              id={Number(id)}
              planType={SUBSCRIPTION_PLAN_TYPE.ORG_SEAT}
            />
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
  const subscription = CUSTOMER_NORMALISERS.upsertCustomer(
    feedingDATA.orgSubscription,
    {
      type: 'org',
    },
  );
  dispatchRequestSuccessAction(
    store,
    SUBSCRIPTION_API,
    GET_CUSTOMER_SUBSCRIPTION,
    subscription,
  );

  const nsubscription = helpers.normaliseGetMe(feedingDATA.CustomerData);
  dispatchRequestSuccessAction(store, USER_API, ME, nsubscription);
  await sleep(500);
  return { store, history, result, rerenderWithReduxWithRouter };
};

test('Billing Update click different plan', async () => {
  const { history, result, store } = await billingComponentSetup({
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
  history.push({
    pathname: '/orgs/2/subscription/upgrade',
    state: {
      userActions: true,
    },
  });
  await sleep(1000);
  const listSubscriptionSchedule =
    result.current.state.API.listSubscriptionSchedule;
  if (listSubscriptionSchedule) {
    listSubscriptionSchedule();
  }
  let invoiceData;
  const getInvoiceProcessResult =
    result.current.state.API.getInvoiceProcessResult;
  if (getInvoiceProcessResult) {
    invoiceData = getInvoiceProcessResult.getUpcomingInvoice(
      UpcomingGranderInvoice,
    );
  }
  dispatchRequestSuccessAction(
    store,
    INVOICE_API,
    GET_UPCOMING_INVOICE,
    invoiceData,
  );

  if (result.current.state.API.getUpcomingInvoice) {
    // callback
    result.current.state.API.getUpcomingInvoice();
  }
  const radioButtons = screen.queryAllByTestId('planRadio');
  expect(radioButtons.length).toBe(3); // shall not include the starter because of the current plan is starter
  await sleep(500);

  userEvent.click(radioButtons[2]);
  await sleep(500);
  let invoiceData2;
  const getInvoiceProcessResult2 =
    result.current.state.API.getInvoiceProcessResult;
  if (getInvoiceProcessResult2) {
    invoiceData2 = getInvoiceProcessResult2.getUpcomingInvoice(
      UpcomingTravellerInvoice,
    );
  }
  dispatchRequestSuccessAction(
    store,
    INVOICE_API,
    GET_UPCOMING_INVOICE,
    invoiceData2,
  );
  if (result.current.state.API.getUpcomingInvoice) {
    // callback
    result.current.state.API.getUpcomingInvoice();
  }
  screen.debug(null, 1000000000);
  expect(screen.getByTestId('previewDue')).toBeInTheDocument();
  expect(
    screen.getByTestId('previewDue').children[0].children[0].children[0],
  ).toHaveTextContent('AUD $176.00');
  expect(
    screen.getByTestId('previewDue').children[0].children[1].children[0],
  ).toHaveTextContent('(GST included @ 10%)');
  expect(
    screen.getByTestId('couponInput').children[0].children[0].children[0],
  ).toHaveTextContent('Discount Code');
  expect(screen.getByTestId('nextDueDate')).toHaveTextContent(
    'Starting 9 July 2021',
  );
  expect(screen.getByTestId('nextDueAmount')).toHaveTextContent(
    'AUD $176.00 See Details',
  );
  const seeDetails = screen.queryByRole('button', { name: /^See Details/ });
  expect(seeDetails).toBeInTheDocument();
  userEvent.click(seeDetails);
  const submit = screen.queryByRole('button', { name: /^Submit to Upgrade/ });
  expect(submit).toBeInTheDocument();
  userEvent.click(submit);
  await sleep(100);
  if (result.current.state.API.updateCustomer) {
    result.current.state.API.updateCustomer();
  }
  if (result.current.state.API.updateSubscription) {
    result.current.state.API.updateSubscription();
  }
  expect(
    result.current.state.API.updateSubscriptionPayload.data
      .cancel_at_period_end,
  ).toBe(false);
  const planId =
    result.current.state.API.updateSubscriptionPayload.data.items[0].plan;
  await sleep(10);
  const name = store.getState().get('planDataStoreImmer').plans[planId]
    .nickname;
  expect(name).toBe('Traveller');
  expect(history.location.pathname).toBe('/orgs/2/settings/billings');
}, 100000);

test('Billing Update', async () => {
  const { history, result, store } = await billingComponentSetup({
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
  history.push({
    pathname: '/orgs/2/subscription/upgrade',
    state: {
      userActions: true,
    },
  });
  await sleep(1000);
  const listSubscriptionSchedule =
    result.current.state.API.listSubscriptionSchedule;
  if (listSubscriptionSchedule) {
    listSubscriptionSchedule();
  }
  let invoiceData;
  const getInvoiceProcessResult =
    result.current.state.API.getInvoiceProcessResult;
  if (getInvoiceProcessResult) {
    invoiceData = getInvoiceProcessResult.getUpcomingInvoice(
      UpcomingTourerInvoice,
    );
  }
  dispatchRequestSuccessAction(
    store,
    INVOICE_API,
    GET_UPCOMING_INVOICE,
    invoiceData,
  );

  if (result.current.state.API.getUpcomingInvoice) {
    // callback
    result.current.state.API.getUpcomingInvoice();
  }
  const radioButtons = screen.queryAllByTestId('planRadio');
  expect(radioButtons.length).toBe(3); // shall not include the starter because of the current plan is starter
  await sleep(500);
  expect(screen.queryByText('Traveller')).toBeInTheDocument();
  expect(screen.queryByText('Tourer')).toBeInTheDocument();
  expect(screen.queryByText('Grand Tourer')).toBeInTheDocument();
  expect(screen.getByTestId('previewDue')).toBeInTheDocument();
  expect(
    screen.getByTestId('previewDue').children[0].children[0].children[0],
  ).toHaveTextContent('AUD $308.00');
  expect(
    screen.getByTestId('previewDue').children[0].children[1].children[0],
  ).toHaveTextContent('(GST included @ 10%)');
  expect(
    screen.getByTestId('couponInput').children[0].children[0].children[0],
  ).toHaveTextContent('Discount Code');
  expect(screen.getByTestId('nextDueDate')).toHaveTextContent(
    'Starting 9 July 2021',
  );
  expect(screen.getByTestId('nextDueAmount')).toHaveTextContent(
    'AUD $660.00 See Details',
  );
  const seeDetails = screen.queryByRole('button', { name: /^See Details/ });
  expect(seeDetails).toBeInTheDocument();
  userEvent.click(seeDetails);
  const submit = screen.queryByRole('button', { name: /^Submit to Upgrade/ });
  expect(submit).toBeInTheDocument();
  userEvent.click(submit);
  await sleep(100);
  if (result.current.state.API.updateCustomer) {
    result.current.state.API.updateCustomer();
  }
  if (result.current.state.API.updateSubscription) {
    result.current.state.API.updateSubscription();
  }
  expect(
    result.current.state.API.updateSubscriptionPayload.data
      .cancel_at_period_end,
  ).toBe(false);
  const planId =
    result.current.state.API.updateSubscriptionPayload.data.items[0].plan;
  await sleep(10);
  const name = store.getState().get('planDataStoreImmer').plans[planId]
    .nickname;
  expect(name).toBe('Grand Tourer');
  expect(history.location.pathname).toBe('/orgs/2/settings/billings');
}, 100000);
