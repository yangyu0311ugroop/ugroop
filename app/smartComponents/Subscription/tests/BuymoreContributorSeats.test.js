import { screen } from '@testing-library/dom';
import React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { normalize } from 'normalizr';
import { Route } from 'react-router-dom';
import { useImmer } from 'use-immer';
import userEvent from '@testing-library/user-event';
import { waitFor } from '@testing-library/react';
import {
  dispatchSetValue,
  reduxEnhancer,
  renderWithRedux,
  renderWithReduxWithRouter,
} from '../../../utils/testUtility';
import { GlobalProvider } from '../../../containers/App/globalContext';
import { BuymoreContributorSeats } from '../BuymoreContributorSeats';
import {
  COGNITO_ACCOUNTSTORE,
  NODE_STORE,
  ORGANISATION,
  ORGANISATION_DATA_STORE,
  PERSONAL,
  TEMPLATE_MANAGEMENT_VIEWSTORE,
  URL_HELPERS,
} from '../../../appConstants';
import { GET_TEMPLATE_PEOPLE_SUCCESS } from '../../../containers/StreamChat/constants';
import SeatsCalculation from '../../../containers/Templates/TemplateManagement/components/SeatsCalculation';
import BuymoreContributorSeatsWrapper from './BuymoreContributorSeatsWrapper';
import SubscriptionAPI from '../../../apis/components/Subscription';
import TemplateAPI from '../../../apis/components/Template';
import OrganisationAPI from '../../../apis/components/Organisation';
import InitDataStore from '../../../datastore/dataStore';
import { GET_CUSTOMER_SUBSCRIPTION_SUCCESS } from '../../../datastore/customerDataImmerStore/constants';
import {
  customerWithoutSubscription,
  freeOrgSubscription,
  freePersonalSubscriptions,
  orgSubscription,
  personFamilySubscription,
} from '../../../apis/components/Subscription/tests/subscriptionFeedData';
import CUSTOMER_SCHEMA from '../../../datastore/customerDataImmerStore/schema';
import configureStore from '../../../configureStore';
import {
  OneUserOrgMemberData,
  ThreeUserOrgMemberData,
} from '../../../apis/components/Organisation/tests/organisationFeedData';
import {
  TemplatePeopleDATA,
  TemplatePeopleData2,
  TemplatePeopleDataMany,
  TemplatePeopleDataMorePax,
  TemplatePeopleDataMorePaxWithOneContributor,
} from '../../../apis/components/Template/tests/templatePeopleFeeddata';
import InvoiceAPI from '../../../apis/components/Invoice';
import DenyAccess from '../../Plan/parts/DenyAccess';
import BuyMoreTourSeatsPersonalWrapper from './BuymoreTourSeatsPersonalWrapper';
const recalculateSeats = async (
  result,
  findOrgData,
  orgSubscriptionData,
  memberData,
  templatePeopleData,
) => {
  const findOrganisationSuccess = result.current.state.API.findOrganisationId;
  if (findOrganisationSuccess) {
    findOrganisationSuccess(findOrgData);
  }
  await waitFor(() => {
    expect(result.current.state.API.getCustomerSubscription).not.toBeNull();
  });
  const fetchCustomerSubscriptionSuccess =
    result.current.state.API.getCustomerSubscription;
  if (fetchCustomerSubscriptionSuccess) {
    fetchCustomerSubscriptionSuccess({
      raw: orgSubscriptionData,
    });
  }
  await waitFor(() => {
    expect(result.current.state.API.getOrgMembers).not.toBeNull();
  });
  const getOrgMembersSuccess = result.current.state.API.getOrgMembers;
  if (getOrgMembersSuccess) {
    getOrgMembersSuccess(memberData);
  }
  await waitFor(() => {
    expect(result.current.state.API.findPeople).not.toBeNull();
  });
  const findPeopleSuccess = result.current.state.API.findPeople;
  if (findPeopleSuccess) {
    findPeopleSuccess({
      raw: templatePeopleData,
    });
  }
};

const componentSetup = props => {
  const { result } = renderHook(() => {
    const [state, dispatch] = useImmer({
      API: {},
    });
    return { state, dispatch };
  });

  const s = configureStore({}, {}, [reduxEnhancer(result.current)]);
  const { store, history } = renderWithReduxWithRouter(
    <GlobalProvider>
      <InitDataStore />
      <SubscriptionAPI />
      <InvoiceAPI />
      <TemplateAPI />
      <OrganisationAPI />
      <Route
        path={URL_HELPERS.tours(':id?')}
        render={routeProps => (
          <BuymoreContributorSeatsWrapper
            templateId={1}
            {...routeProps}
            {...props}
          />
        )}
      />
      <Route
        path={URL_HELPERS.orgDenyAccess(1)}
        render={() => <DenyAccess variant={ORGANISATION} />}
      />
      <Route path={URL_HELPERS.org} />
      <SeatsCalculation templateId={1} />
    </GlobalProvider>,
    { store: s },
  );
  history.push('/tours/1');
  dispatchSetValue(store, COGNITO_ACCOUNTSTORE, 'account', {
    id: 1,
  });
  dispatchSetValue(store, NODE_STORE, 'nodes', {
    1: {
      id: 1,
      customData: {
        organisationId: 1,
      },
      createdBy: 1,
    },
    2: {
      id: 2,
      customData: {
        organisationId: 2,
      },
      createdBy: 1,
    },
  });
  dispatchSetValue(store, ORGANISATION_DATA_STORE, 'organisations', {
    1: {
      id: 1,
      userId: 2,
      createdBy: 2,
    },
    2: {
      id: 1,
      userId: 2,
      createdBy: 2,
    },
  });
  dispatchSetValue(store, ORGANISATION_DATA_STORE, 'orgUsers', {
    1: {
      userId: 2,
      role: 'owner',
    },
    2: {
      userId: 2,
      role: 'owner',
    },
  });
  // login user is part of the tour
  store.dispatch({
    type: GET_TEMPLATE_PEOPLE_SUCCESS,
    result: {
      templateId: 1,
      userNodeUserIdsPerTour: [2, 3, 4, 1],
    },
  });
  return { store, history, result };
};
test('BuymoreContributorSeats shall not be shown', async () => {
  renderWithRedux(
    <GlobalProvider>
      <BuymoreContributorSeats templateId={1} />
    </GlobalProvider>,
    {},
  );
  expect(screen.getByTestId('no-access-buy-more')).toBeInTheDocument();
});
test('BuymoreContributorSeats shall not be accessed if not part of the tour', async () => {
  const { store } = renderWithRedux(
    <GlobalProvider>
      <BuymoreContributorSeats templateId={1} />
    </GlobalProvider>,
    {},
  );
  dispatchSetValue(store, COGNITO_ACCOUNTSTORE, 'account', {
    id: 1,
  });
  store.dispatch({
    type: GET_TEMPLATE_PEOPLE_SUCCESS,
    result: {
      templateId: 1,
      userNodeUserIdsPerTour: [2, 3, 4],
    },
  });
  waitFor(() => {
    expect(screen.getByTestId('no-access-buy-more')).toBeInTheDocument();
  });
});
test('Buymore Contributor Seats shall not be accessed if it is personal tour and not the owner of the tour', async () => {
  const { store } = renderWithRedux(
    <GlobalProvider>
      <BuymoreContributorSeats templateId={1} />
    </GlobalProvider>,
    {},
  );
  dispatchSetValue(store, COGNITO_ACCOUNTSTORE, 'account', {
    id: 1,
  });
  dispatchSetValue(store, NODE_STORE, 'nodes', {
    // templateId is from personal tour
    1: {
      id: 1,
      customData: {
        organisationId: null,
      },
    },
  });
  // login user is part of the tour
  store.dispatch({
    type: GET_TEMPLATE_PEOPLE_SUCCESS,
    result: {
      templateId: 1,
      userNodeIdsPerTour: [2, 3, 4, 1],
    },
  });
  await waitFor(() => {
    expect(screen.getByTestId('no-access-buy-more')).toBeInTheDocument();
  });
});

test('BuymoreContributorSeats shall display remaining seats and change number accordingly by add and cancel', async () => {
  const { result } = renderHook(() => {
    const [state, dispatch] = useImmer({
      API: {},
    });
    return { state, dispatch };
  });

  const s = configureStore({}, {}, [reduxEnhancer(result.current)]);
  const { store, history } = renderWithReduxWithRouter(
    <GlobalProvider>
      <InitDataStore />
      <SubscriptionAPI />
      <InvoiceAPI />
      <TemplateAPI />
      <OrganisationAPI />
      <Route
        path={URL_HELPERS.tours(':id?')}
        render={routeProps => (
          <BuymoreContributorSeatsWrapper templateId={1} {...routeProps} />
        )}
      />
      <Route
        path={URL_HELPERS.orgDenyAccess(1)}
        render={() => <DenyAccess variant={ORGANISATION} />}
      />
      <Route path={URL_HELPERS.org} />
      <SeatsCalculation templateId={1} />
    </GlobalProvider>,
    { store: s },
  );
  history.push('/tours/1');
  dispatchSetValue(store, COGNITO_ACCOUNTSTORE, 'account', {
    id: 1,
  });
  dispatchSetValue(store, NODE_STORE, 'nodes', {
    1: {
      id: 1,
      customData: {
        organisationId: 1,
      },
      createdBy: 1,
    },
    2: {
      id: 2,
      customData: {
        organisationId: 2,
      },
      createdBy: 1,
    },
  });
  dispatchSetValue(store, ORGANISATION_DATA_STORE, 'organisations', {
    1: {
      id: 1,
      userId: 2,
      createdBy: 2,
    },
    2: {
      id: 1,
      userId: 2,
      createdBy: 2,
    },
  });
  dispatchSetValue(store, ORGANISATION_DATA_STORE, 'orgUsers', {
    1: {
      userId: 2,
      role: 'owner',
    },
    2: {
      userId: 2,
      role: 'owner',
    },
  });
  // login user is part of the tour
  store.dispatch({
    type: GET_TEMPLATE_PEOPLE_SUCCESS,
    result: {
      templateId: 1,
      userNodeUserIdsPerTour: [2, 3, 4, 1],
    },
  });
  const data = normalize(orgSubscription, CUSTOMER_SCHEMA.customer);
  store.dispatch({
    type: GET_CUSTOMER_SUBSCRIPTION_SUCCESS,
    result: {
      raw: orgSubscription,
      normalised: data.entities,
      payload: {
        type: 'org',
      },
    },
  });

  // callback findOrg
  renderHook(async () => {
    await recalculateSeats(
      result,
      {
        id: 1,
        node: {
          calculated: {
            organisationId: 1,
          },
          createdBy: 1,
        },
      },
      orgSubscription,
      OneUserOrgMemberData,
      TemplatePeopleDATA,
    );
  });
  await waitFor(
    () => {
      expect(screen.queryByTestId('remainingSeats')).toBeInTheDocument();
      expect(
        screen.queryByTestId('remainingSeats').children[0],
      ).toHaveTextContent('1 team seat left');
      expect(
        screen.queryByRole('link', { name: /Buy more/i }),
      ).not.toBeInTheDocument();
      expect(
        screen.queryByTestId('no-access-buy-more'),
      ).not.toBeInTheDocument();
      // Pass the initial state from the payload, now invite some user and see the seats number will calculate.
    },
    {
      timeout: 2000,
    },
  );

  dispatchSetValue(
    store,
    TEMPLATE_MANAGEMENT_VIEWSTORE,
    'nodeShareSuccessData',
    {
      email: 'yang.yu@ugroop.com',
      userId: 44,
      shareFrom: 469,
      role: 'tour_organizer',
      status: 'pending',
    },
  );
  await waitFor(() => {
    expect(
      screen.queryByTestId('remainingSeats').children[0],
    ).toHaveTextContent('0 team seats left');
    expect(
      screen.queryByRole('link', { name: /Buy more/i }),
    ).toBeInTheDocument();
  });

  dispatchSetValue(
    store,
    TEMPLATE_MANAGEMENT_VIEWSTORE,
    'cancelInvitation',
    JSON.stringify({
      notificationToken: 'xOqX5lHADBrMVzI37drac0ICeRChJGxh',
      status: 'cancelled',
      updatedAt: '2021-06-09T23:54:28.010Z',
      nodeId: 34414,
    }),
  );
  renderHook(async () => {
    await recalculateSeats(
      result,
      {
        id: 1,
        node: {
          calculated: {
            organisationId: 1,
          },
          createdBy: 1,
        },
      },
      orgSubscription,
      OneUserOrgMemberData,
      TemplatePeopleDATA,
    );
  });
  await waitFor(() => {
    expect(
      screen.queryByRole('link', { name: /Buy more/i }),
    ).not.toBeInTheDocument();
    expect(screen.queryByTestId('remainingSeats')).toBeInTheDocument();
    expect(
      screen.queryByTestId('remainingSeats').children[0],
    ).toHaveTextContent('1 team seat left');
  });

  // Pass the initial state from the payload, now invite some user and see the seats number will calculate.
  dispatchSetValue(store, TEMPLATE_MANAGEMENT_VIEWSTORE, 'addRoleSuccessData', {
    shareTo: 'yang.yu@ugroop.com',
    shareToUserId: 44,
    shareFrom: 469,
    role: 'tour_organizer',
    status: 'pending',
  });
  await waitFor(() => {
    expect(
      screen.queryByTestId('remainingSeats').children[0],
    ).toHaveTextContent('0 team seats left');
    expect(
      screen.queryByRole('link', { name: /Buy more/i }),
    ).toBeInTheDocument();
    const helperButton = screen.queryByRole('button');
    expect(helperButton).toBeInTheDocument();
    userEvent.click(helperButton);
    expect(screen.queryByText('Contributor Seats Guide')).toBeInTheDocument();
    const helperCloseButton = screen.queryByTestId('helpCloseButton');
    expect(helperCloseButton).toBeInTheDocument();
    userEvent.click(helperCloseButton);
  });
  // Now let's switch to different tour with a free org account
  history.push('/tours/2');
  const freeData = normalize(freeOrgSubscription, CUSTOMER_SCHEMA.customer);
  store.dispatch({
    type: GET_CUSTOMER_SUBSCRIPTION_SUCCESS,
    result: {
      raw: freeOrgSubscription,
      normalised: freeData.entities,
      payload: {
        type: 'org',
      },
    },
  });
  renderHook(async () => {
    await recalculateSeats(
      result,
      {
        id: 2,
        node: {
          calculated: {
            organisationId: 2,
          },
          createdBy: 1,
        },
      },
      freeOrgSubscription,
      OneUserOrgMemberData,
      TemplatePeopleData2,
    );
  });
  await waitFor(() => {
    expect(
      screen.queryByTestId('remainingSeats').children[0],
    ).toHaveTextContent('1 team seat left');
  });

  // invite a view role.
  dispatchSetValue(
    store,
    TEMPLATE_MANAGEMENT_VIEWSTORE,
    'nodeShareSuccessData',
    {
      email: 'yang.yu@ugroop.com',
      userId: 44,
      shareFrom: 469,
      role: 'tour_viewer',
      status: 'pending',
    },
  );
  await waitFor(() => {
    expect(
      screen.queryByTestId('remainingSeats').children[0],
    ).toHaveTextContent('0 team seats left');
  });

  dispatchSetValue(store, TEMPLATE_MANAGEMENT_VIEWSTORE, 'cancelInvitation', {
    notificationToken: 'xOqX5lHADBrMVzI37drac0ICeRChJGxh',
    status: 'cancelled',
    updatedAt: '2021-06-09T23:54:28.010Z',
    nodeId: 34415,
  });
  renderHook(async () => {
    await recalculateSeats(
      result,
      {
        id: 2,
        node: {
          calculated: {
            organisationId: 2,
          },
          createdBy: 1,
        },
      },
      freeOrgSubscription,
      OneUserOrgMemberData,
      TemplatePeopleData2,
    );
  });
  await waitFor(() => {
    expect(
      screen.queryByTestId('remainingSeats').children[0],
    ).toHaveTextContent('1 team seat left');
  });

  // invite a organiser role, will break the logic, to trigger redirect
  dispatchSetValue(
    store,
    TEMPLATE_MANAGEMENT_VIEWSTORE,
    'nodeShareSuccessData',
    {
      email: '999@ugroop2.com',
      userId: 45,
      shareFrom: 462,
      role: 'tour_organizer',
      status: 'pending',
    },
  );
  await waitFor(() => {
    expect(history.location.pathname).toBe('/orgs/2/denyaccess');
  });
}, 100000);

test('Buymore Contributor Shall not be accessed because org people greater than org seats', async () => {
  const { store, result, history } = componentSetup();
  const data = normalize(freeOrgSubscription, CUSTOMER_SCHEMA.customer);
  store.dispatch({
    type: GET_CUSTOMER_SUBSCRIPTION_SUCCESS,
    result: {
      raw: freeOrgSubscription,
      normalised: data.entities,
      payload: {
        type: 'org',
      },
    },
  });
  // callback findOrg
  renderHook(async () => {
    await recalculateSeats(
      result,
      {
        id: 1,
        node: {
          calculated: {
            organisationId: 1,
          },
          createdBy: 1,
        },
      },
      orgSubscription,
      ThreeUserOrgMemberData,
      TemplatePeopleDATA,
    );
  });
  await waitFor(
    () => {
      expect(history.location.pathname).toBe('/orgs/1/denyaccess');
      expect(history.location.state.reason).toBe('insufficientContributorSeat');
      expect(history.location.state.lackSeats).toBe(1);
    },
    {
      timeout: 2000,
    },
  );
});

test('Buymore Contributor Shall not be accessed because tour connected people greater than org seats', async () => {
  const { store, result, history } = componentSetup();
  const data = normalize(orgSubscription, CUSTOMER_SCHEMA.customer);
  store.dispatch({
    type: GET_CUSTOMER_SUBSCRIPTION_SUCCESS,
    result: {
      raw: orgSubscription,
      normalised: data.entities,
      payload: {
        type: 'org',
      },
    },
  });
  // callback findOrg
  renderHook(async () => {
    await recalculateSeats(
      result,
      {
        id: 1,
        node: {
          calculated: {
            organisationId: 1,
          },
          createdBy: 1,
        },
      },
      orgSubscription,
      OneUserOrgMemberData,
      TemplatePeopleDataMany,
    );
  });
  await waitFor(() => {
    expect(history.location.pathname).toBe('/orgs/1/denyaccess');
    expect(history.location.state.reason).toBe('insufficientContributorSeat');
    expect(history.location.state.lackSeats).toBe(9);
  });
});

test('Buymore Contributor shall not be accessed because PAX greater than tour seats', async () => {
  const { store, result, history } = componentSetup();
  const data = normalize(freeOrgSubscription, CUSTOMER_SCHEMA.customer);
  store.dispatch({
    type: GET_CUSTOMER_SUBSCRIPTION_SUCCESS,
    result: {
      raw: freeOrgSubscription,
      normalised: data.entities,
      payload: {
        type: 'org',
      },
    },
  });
  // callback findOrg
  renderHook(async () => {
    await recalculateSeats(
      result,
      {
        id: 1,
        node: {
          calculated: {
            organisationId: 1,
          },
          createdBy: 1,
        },
      },
      freeOrgSubscription,
      OneUserOrgMemberData,
      TemplatePeopleDataMorePax,
    );
  });
  await waitFor(() => {
    expect(history.location.pathname).toBe('/orgs/1/denyaccess');
    expect(history.location.state.reason).toBe('insufficientTourSeat');
    expect(history.location.state.lackSeats).toBe(1);
  });
});

test('Buymore Contributor shall not be accessed because PAX greater than tour seats with one contributor', async () => {
  const { store, result, history } = componentSetup();
  const data = normalize(freeOrgSubscription, CUSTOMER_SCHEMA.customer);
  store.dispatch({
    type: GET_CUSTOMER_SUBSCRIPTION_SUCCESS,
    result: {
      raw: freeOrgSubscription,
      normalised: data.entities,
      payload: {
        type: 'org',
      },
    },
  });
  // callback findOrg
  renderHook(async () => {
    await recalculateSeats(
      result,
      {
        id: 1,
        node: {
          calculated: {
            organisationId: 1,
          },
          createdBy: 1,
        },
      },
      freeOrgSubscription,
      OneUserOrgMemberData,
      TemplatePeopleDataMorePaxWithOneContributor,
    );
  });
  await waitFor(() => {
    expect(history.location.pathname).toBe('/orgs/1/denyaccess');
    expect(history.location.state.reason).toBe('insufficientTourSeat');
    expect(history.location.state.lackSeats).toBe(1);
  });
});

test('Buymore Contributor not be accessed because 401 error to fetch orgMembers', async () => {
  const { store, result, history } = componentSetup({ userId: 2 });
  const data = normalize(freeOrgSubscription, CUSTOMER_SCHEMA.customer);
  store.dispatch({
    type: GET_CUSTOMER_SUBSCRIPTION_SUCCESS,
    result: {
      raw: freeOrgSubscription,
      normalised: data.entities,
      payload: {
        type: 'org',
      },
    },
  });
  const findOrganisationSuccess = result.current.state.API.findOrganisationId;
  if (findOrganisationSuccess) {
    findOrganisationSuccess({
      id: 1,
      node: {
        calculated: {
          organisationId: 1,
        },
        createdBy: 1,
      },
    });
  }
  await waitFor(() => {
    expect(result.current.state.API.getCustomerSubscription).not.toBeNull();
  });
  const fetchCustomerSubscriptionSuccess =
    result.current.state.API.getCustomerSubscription;
  if (fetchCustomerSubscriptionSuccess) {
    fetchCustomerSubscriptionSuccess({
      raw: freeOrgSubscription,
    });
  }
  await waitFor(() => {
    expect(result.current.state.API.getOrgMembersOnError).not.toBeNull();
  });
  const getOrgMembersOnError = result.current.state.API.getOrgMembersOnError;
  if (getOrgMembersOnError) {
    getOrgMembersOnError({
      status: 401,
    });
  }
  await waitFor(() => {
    expect(history.location.pathname).toBe('/');
  });
});

test('Buymore Contributor not be accessed but redirect to denyaccess', async () => {
  const { store, result, history } = componentSetup();
  const data = normalize(customerWithoutSubscription, CUSTOMER_SCHEMA.customer);
  store.dispatch({
    type: GET_CUSTOMER_SUBSCRIPTION_SUCCESS,
    result: {
      raw: customerWithoutSubscription,
      normalised: data.entities,
      payload: {
        type: 'org',
      },
    },
  });
  // callback findOrg
  renderHook(async () => {
    await recalculateSeats(
      result,
      {
        id: 1,
        node: {
          calculated: {
            organisationId: 1,
          },
          createdBy: 1,
        },
      },
      customerWithoutSubscription,
      OneUserOrgMemberData,
      TemplatePeopleDataMorePaxWithOneContributor,
    );
  });
  await waitFor(() => {
    expect(history.location.pathname).toBe('/orgs/1/denyaccess');
  });
});

test('Buymore Contributor not be accessed but redirect to resubscribe', async () => {
  const { store, result, history } = componentSetup({ userId: 2 });
  const data = normalize(customerWithoutSubscription, CUSTOMER_SCHEMA.customer);
  store.dispatch({
    type: GET_CUSTOMER_SUBSCRIPTION_SUCCESS,
    result: {
      raw: customerWithoutSubscription,
      normalised: data.entities,
      payload: {
        type: 'org',
      },
    },
  });
  // callback findOrg
  renderHook(async () => {
    await recalculateSeats(
      result,
      {
        id: 1,
        node: {
          calculated: {
            organisationId: 1,
          },
          createdBy: 1,
        },
      },
      customerWithoutSubscription,
      OneUserOrgMemberData,
      TemplatePeopleDataMorePaxWithOneContributor,
    );
  });
  await waitFor(() => {
    expect(history.location.pathname).toBe('/orgs/1/subscription/subscribe');
  });
});

test('Buymore Contributor not be accessed without customer id', async () => {
  const { store, result, history } = componentSetup({ userId: 2 });
  const data = normalize(customerWithoutSubscription, CUSTOMER_SCHEMA.customer);
  store.dispatch({
    type: GET_CUSTOMER_SUBSCRIPTION_SUCCESS,
    result: {
      raw: {},
      normalised: data.entities,
      payload: {
        type: 'org',
      },
    },
  });
  // callback findOrg
  renderHook(async () => {
    await recalculateSeats(
      result,
      {
        id: 1,
        node: {
          calculated: {
            organisationId: 1,
          },
          createdBy: 1,
        },
      },
      {},
      OneUserOrgMemberData,
      TemplatePeopleDataMorePaxWithOneContributor,
    );
  });
  await waitFor(() => {
    expect(history.location.pathname).toBe('/orgs/1/subscription/new');
  });
});

const componentPersonSetup = props => {
  const { result } = renderHook(() => {
    const [state, dispatch] = useImmer({
      API: {},
    });
    return { state, dispatch };
  });

  const s = configureStore({}, {}, [reduxEnhancer(result.current)]);
  const { store, history } = renderWithReduxWithRouter(
    <GlobalProvider>
      <InitDataStore />
      <SubscriptionAPI />
      <InvoiceAPI />
      <TemplateAPI />
      <OrganisationAPI />
      <Route
        path={URL_HELPERS.tours(':id?')}
        render={routeProps => (
          <BuyMoreTourSeatsPersonalWrapper
            templateId={1}
            {...routeProps}
            {...props}
          />
        )}
      />
      <Route
        path={URL_HELPERS.personalDenyAccess()}
        render={() => <DenyAccess variant={PERSONAL} homeButton={false} />}
      />
      <SeatsCalculation templateId={1} />
    </GlobalProvider>,
    { store: s },
  );
  history.push('/tours/1');
  dispatchSetValue(store, COGNITO_ACCOUNTSTORE, 'account', {
    id: 1,
  });
  dispatchSetValue(store, NODE_STORE, 'nodes', {
    1: {
      id: 1,
      customData: {
        organisationId: null,
      },
      createdBy: 1,
    },
  });
  // login user is part of the tour
  store.dispatch({
    type: GET_TEMPLATE_PEOPLE_SUCCESS,
    result: {
      templateId: 1,
      userNodeUserIdsPerTour: [2, 3, 4, 1],
    },
  });
  return { store, history, result };
};

const recalculatePersonSeats = async (
  result,
  findOrgData,
  userSubscriptionData,
  templatePeopleData,
) => {
  await waitFor(() => {
    expect(result.current.state.API.findOrganisationId).not.toBeNull();
  });
  const findOrganisationSuccess = result.current.state.API.findOrganisationId;
  if (findOrganisationSuccess) {
    findOrganisationSuccess(findOrgData);
  }
  await waitFor(() => {
    expect(result.current.state.API.getCustomerSubscription).not.toBeNull();
  });
  const fetchCustomerSubscriptionSuccess =
    result.current.state.API.getCustomerSubscription;
  if (fetchCustomerSubscriptionSuccess) {
    fetchCustomerSubscriptionSuccess({
      raw: userSubscriptionData,
    });
  }
  await waitFor(() => {
    expect(result.current.state.API.findPeople).not.toBeNull();
  });
  const findPeopleSuccess = result.current.state.API.findPeople;
  if (findPeopleSuccess) {
    findPeopleSuccess({
      raw: templatePeopleData,
    });
  }
};

test('Buymore Tour seat shall display correctly with invite and cancel', async () => {
  const { store, result, history } = componentPersonSetup();
  const data = normalize(personFamilySubscription, CUSTOMER_SCHEMA.customer);
  store.dispatch({
    type: GET_CUSTOMER_SUBSCRIPTION_SUCCESS,
    result: {
      raw: personFamilySubscription,
      normalised: data.entities,
      payload: {
        type: 'user',
      },
    },
  });
  await recalculatePersonSeats(
    result,
    {
      id: 1,
      node: {
        calculated: {
          organisationId: null,
        },
        createdBy: 1,
      },
    },
    personFamilySubscription,
    TemplatePeopleDATA,
  );
  await waitFor(() => {
    expect(screen.queryByTestId('tourRemainingSeats')).toBeInTheDocument();
    expect(
      screen.queryByTestId('tourRemainingSeats').children[0],
    ).toHaveTextContent('4 tour seats left');
  });

  dispatchSetValue(
    store,
    TEMPLATE_MANAGEMENT_VIEWSTORE,
    'nodeShareSuccessData',
    {
      email: 'yang.yu@ugroop.com',
      userId: 44,
      role: 'tour_organizer',
      status: 'pending',
    },
  );
  await waitFor(() => {
    expect(
      screen.queryByTestId('tourRemainingSeats').children[0],
    ).toHaveTextContent('3 tour seats left');
  });

  dispatchSetValue(
    store,
    TEMPLATE_MANAGEMENT_VIEWSTORE,
    'nodeShareSuccessData',
    {
      email: 'yang.yu2r3@ugroop.com',
      userId: 4563,
      role: 'tour_organizer',
    },
  );
  await waitFor(() => {
    expect(
      screen.queryByTestId('tourRemainingSeats').children[0],
    ).toHaveTextContent('2 tour seats left');
  });

  dispatchSetValue(
    store,
    TEMPLATE_MANAGEMENT_VIEWSTORE,
    'nodeShareSuccessData',
    {
      email: 'yang.yu2aaa@ugroop.com',
      userId: 4444,
      role: 'tour_viewer',
      status: 'pending',
    },
  );
  await waitFor(() => {
    expect(
      screen.queryByTestId('tourRemainingSeats').children[0],
    ).toHaveTextContent('1 tour seat left');
    expect(
      screen.queryByRole('link', { name: /Buy more/i }),
    ).not.toBeInTheDocument();
  });

  dispatchSetValue(
    store,
    TEMPLATE_MANAGEMENT_VIEWSTORE,
    'nodeShareSuccessData',
    {
      email: 'yang.yu2xxx@ugroop.com',
      userId: 44555,
      shareFrom: 469,
      role: 'tour_participant',
      status: 'pending',
    },
  );
  await waitFor(() => {
    expect(
      screen.queryByTestId('tourRemainingSeats').children[0],
    ).toHaveTextContent('0 tour seats left');
    expect(
      screen.queryByRole('link', { name: /Buy more/i }),
    ).toBeInTheDocument();
  });
  dispatchSetValue(
    store,
    TEMPLATE_MANAGEMENT_VIEWSTORE,
    'nodeShareSuccessData',
    {
      email: 'yang.yu2xxsx@ugroop.com',
      userId: 445552,
      shareFrom: 469,
      role: 'tour_participant',
      status: 'pending',
    },
  );
  await waitFor(() => {
    expect(history.location.pathname).toBe('/my-tours/personal/denyaccess');
    expect(history.location.state.lackSeats).toBe(1);
    expect(history.location.state.reason).toBe('insufficientTourSeat');
  });
});
test('Buymore Tour seat shall not display', async () => {
  const { store, result, history } = componentPersonSetup();
  const data = normalize(personFamilySubscription, CUSTOMER_SCHEMA.customer);
  store.dispatch({
    type: GET_CUSTOMER_SUBSCRIPTION_SUCCESS,
    result: {
      raw: personFamilySubscription,
      normalised: data.entities,
      payload: {
        type: 'user',
      },
    },
  });
  await recalculatePersonSeats(
    result,
    {
      id: 1,
      node: {
        calculated: {
          organisationId: null,
        },
        createdBy: 1,
      },
    },
    personFamilySubscription,
    TemplatePeopleDataMany,
  );
  await waitFor(() => {
    expect(history.location.pathname).toBe('/my-tours/personal/denyaccess');
    expect(history.location.state.lackSeats).toBe(7);
    expect(history.location.state.reason).toBe('insufficientTourSeat');
  });
});
test('Buymore Tour seat shall display with free subscription', async () => {
  const { store, result, history } = componentPersonSetup();
  const data = normalize(freePersonalSubscriptions, CUSTOMER_SCHEMA.customer);
  store.dispatch({
    type: GET_CUSTOMER_SUBSCRIPTION_SUCCESS,
    result: {
      raw: freePersonalSubscriptions,
      normalised: data.entities,
      payload: {
        type: 'user',
      },
    },
  });
  await recalculatePersonSeats(
    result,
    {
      id: 1,
      node: {
        calculated: {
          organisationId: null,
        },
        createdBy: 1,
      },
    },
    freePersonalSubscriptions,
    TemplatePeopleDATA,
  );
  await waitFor(() => {
    expect(screen.queryByTestId('tourRemainingSeats')).toBeInTheDocument();
    expect(
      screen.queryByTestId('tourRemainingSeats').children[0],
    ).toHaveTextContent('1 tour seat left');
  });

  dispatchSetValue(
    store,
    TEMPLATE_MANAGEMENT_VIEWSTORE,
    'nodeShareSuccessData',
    {
      email: 'yang.yu2xxsx@ugroop.com',
      userId: 445552,
      shareFrom: 469,
      role: 'tour_viewer',
      status: 'pending',
    },
  );
  await waitFor(() => {
    expect(
      screen.queryByTestId('tourRemainingSeats').children[0],
    ).toHaveTextContent('0 tour seats left');
  });

  dispatchSetValue(
    store,
    TEMPLATE_MANAGEMENT_VIEWSTORE,
    'nodeShareSuccessData',
    {
      email: 'yang.yu2aaa@ugroop.com',
      userId: 4444,
      shareFrom: 469,
      role: 'tour_viewer',
      status: 'pending',
    },
  );
  await waitFor(() => {
    expect(history.location.pathname).toBe('/my-tours/personal/denyaccess');
    expect(history.location.state.lackSeats).toBe(1.5);
    expect(history.location.state.reason).toBe('insufficientTourSeat');
  });
});
test('Buymore Tour seat shall be accessed', async () => {
  const { store, result } = componentPersonSetup();
  const data = normalize(freePersonalSubscriptions, CUSTOMER_SCHEMA.customer);
  store.dispatch({
    type: GET_CUSTOMER_SUBSCRIPTION_SUCCESS,
    result: {
      raw: freePersonalSubscriptions,
      normalised: data.entities,
      payload: {
        type: 'user',
      },
    },
  });
  await recalculatePersonSeats(
    result,
    {
      id: 1,
      node: {
        calculated: {
          organisationId: null,
        },
        createdBy: 2,
      },
    },
    freePersonalSubscriptions,
    {
      userNodes: [
        {
          email: 'as@asa.com',
          role: 'tour_viewer',
          userId: 1,
        },
      ],
      users: [
        {
          id: 1,
          email: 'as@asa.com',
        },
      ],
    },
  );
  await waitFor(() => {
    expect(
      screen.queryByTestId('tourRemainingSeats').children[0],
    ).toHaveTextContent('0 tour seats left');
  });
});
test('Buymore Tour seat shall not be accessed but redirect to deny access', async () => {
  const { store, result, history } = componentPersonSetup();
  const data = normalize(customerWithoutSubscription, CUSTOMER_SCHEMA.customer);
  store.dispatch({
    type: GET_CUSTOMER_SUBSCRIPTION_SUCCESS,
    result: {
      raw: customerWithoutSubscription,
      normalised: data.entities,
      payload: {
        type: 'user',
      },
    },
  });
  await recalculatePersonSeats(
    result,
    {
      id: 1,
      node: {
        calculated: {
          organisationId: null,
        },
        createdBy: 2,
      },
    },
    customerWithoutSubscription,
    TemplatePeopleDATA,
  );
  await waitFor(() => {
    expect(history.location.pathname).toBe('/my-tours/personal/denyaccess');
  });
});
test('Buymore Tour seat shall not be accessed but redirect to subscription', async () => {
  const { store, result, history } = componentPersonSetup({
    userId: 1,
  });
  const data = normalize(customerWithoutSubscription, CUSTOMER_SCHEMA.customer);
  store.dispatch({
    type: GET_CUSTOMER_SUBSCRIPTION_SUCCESS,
    result: {
      raw: customerWithoutSubscription,
      normalised: data.entities,
      payload: {
        type: 'user',
      },
    },
  });
  await recalculatePersonSeats(
    result,
    {
      id: 1,
      node: {
        calculated: {
          organisationId: null,
        },
        createdBy: 1,
      },
    },
    customerWithoutSubscription,
    TemplatePeopleDATA,
  );
  await waitFor(() => {
    expect(history.location.pathname).toBe('/subscription/subscribe');
  });
});
test('Buymore Tour seat shall not be accessed but redirect to subscription new because of has no customer data', async () => {
  const { store, result, history } = componentPersonSetup({
    userId: 1,
  });
  const data = normalize({}, CUSTOMER_SCHEMA.customer);
  store.dispatch({
    type: GET_CUSTOMER_SUBSCRIPTION_SUCCESS,
    result: {
      raw: {},
      normalised: data.entities,
      payload: {
        type: 'user',
      },
    },
  });
  await recalculatePersonSeats(
    result,
    {
      id: 1,
      node: {
        calculated: {
          organisationId: null,
        },
        createdBy: 1,
      },
    },
    {},
    TemplatePeopleDATA,
  );
  await waitFor(() => {
    expect(history.location.pathname).toBe('/subscription/new');
  });
});
