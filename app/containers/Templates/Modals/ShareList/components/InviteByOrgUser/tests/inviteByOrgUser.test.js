import React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { useImmer } from 'use-immer';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import InviteByOrgUser from '../index';
import configureStore from '../../../../../../../configureStore';
import {
  dispatchSetValue,
  reduxEnhancer,
  renderWithReduxWithRouter,
} from '../../../../../../../utils/testUtility';
import { GlobalProvider } from '../../../../../../App/globalContext';
import TemplateAPI from '../../../../../../../apis/components/Template';
import NodeAPI from '../../../../../../../apis/components/Node';
import {
  COGNITO_ACCOUNTSTORE,
  NODE_STORE,
  ORGANISATION_DATA_STORE,
} from '../../../../../../../appConstants';

const componentSetupWithoutData = initialData => {
  const { result } = renderHook(() => {
    const [state, dispatch] = useImmer(initialData);
    return { state, dispatch };
  });
  const s = configureStore({}, {}, [reduxEnhancer(result.current)]);
  const { store, history } = renderWithReduxWithRouter(
    <GlobalProvider store={result.current}>
      <TemplateAPI />
      <NodeAPI />
      <InviteByOrgUser showAsRow userId={1} orgId={1} id={1} />
    </GlobalProvider>,
    { store: s },
  );
  return { store, history, result };
};

const componentSetupWithData = (initialData, props) => {
  const { result } = renderHook(() => {
    const [state, dispatch] = useImmer(initialData);
    return { state, dispatch };
  });
  const s = configureStore({}, {}, [reduxEnhancer(result.current)]);
  const { store, history } = renderWithReduxWithRouter(
    <GlobalProvider store={result.current}>
      <TemplateAPI />
      <NodeAPI />
      <InviteByOrgUser
        showAsRow
        userId={props.userId}
        orgId={props.orgId}
        id={props.templateId}
      />
    </GlobalProvider>,
    { store: s },
  );
  dispatchSetValue(store, ORGANISATION_DATA_STORE, 'roles', {
    1: {
      activated: [1, 2, 3],
    },
    2: {
      activated: [4, 5, 6],
    },
  });
  dispatchSetValue(store, ORGANISATION_DATA_STORE, 'members', {
    1: {
      role: 'admin',
    },
  });
  dispatchSetValue(store, COGNITO_ACCOUNTSTORE, 'account', {
    id: 1,
  });
  dispatchSetValue(store, NODE_STORE, 'nodes', {
    1: {
      content: 'sample tour',
      customData: {
        organisationId: 1,
      },
    },
    2: {
      content: 'sample tour2',
      customData: {
        organisationId: 2,
      },
    },
  });
  return { store, history, result };
};
jest.mock('../../../../../../../ugcomponents/Inputs/SimpleRTE', () => ({
  __esModule: true, // this property makes it work
  default: props => <div data-testid="SimpleRTE" {...props} />,
}));

test('Test Invite By Org User without Data', async () => {
  const { result } = componentSetupWithoutData({
    API: {},
    BillingContext: {
      person: {
        tourSeats: 3,
        connectedPeople: 1,
      },
      tourConnectedPeople: [],
    },
    IntercomContext: {
      hideIntercomButton: false,
    },
  });
  const inviteButton = screen.queryByRole('button', { name: /^Invite/ });
  expect(inviteButton).toBeInTheDocument();
  userEvent.click(inviteButton);
  expect(screen.queryByTestId('SimpleRTE')).toBeInTheDocument();
  const inviteButton2 = screen.queryByRole('button', { name: /^Confirm/ });
  userEvent.click(inviteButton2);
  const cancelButton = screen.queryByRole('button', { name: /^Cancel/ });
  userEvent.click(cancelButton);
  expect(screen.queryByTestId('SimpleRTE')).not.toBeInTheDocument();
  if (result.current.state.API.shareNodeOnError) {
    result.current.state.API.shareNodeOnError();
  }
  if (result.current.state.API.shareNode) {
    result.current.state.API.shareNode(
      {
        nodeShare: {},
        raw: [
          {
            notificationToken: '111',
          },
        ],
      },
      {
        shareToUserId: 333,
        payload: {
          shareTo: 'sss@ss.com',
          role: 'tour_organsier',
        },
      },
    );
  }
});

test('Test Invite By Org User without enough seat', async () => {
  const { history } = componentSetupWithoutData({
    API: {},
    BillingContext: {
      person: {
        tourSeats: 1,
        connectedPeople: 1,
      },
      tourConnectedPeople: [],
    },
    IntercomContext: {
      hideIntercomButton: false,
    },
  });
  const inviteButton = screen.queryByRole('button', { name: /^Invite/ });
  expect(inviteButton).toBeInTheDocument();
  userEvent.click(inviteButton);
  const upgradeButton = screen.queryByRole('button', { name: /^Upgrade Plan/ });
  expect(upgradeButton).toBeInTheDocument();
  userEvent.click(upgradeButton);
  expect(history.location.pathname).toBe('/settings/billings');
});

test('Test Invite By Org with Org data', async () => {
  const { result } = componentSetupWithData(
    {
      API: {},
      BillingContext: {
        person: {
          tourSeats: 3,
          connectedPeople: 1,
        },
        org: {
          orgSeats: 4,
          connectedOrgPeople: 1,
          connectedContributor: 1,
        },
        tourConnectedPeople: [],
      },
      IntercomContext: {
        hideIntercomButton: false,
      },
    },
    {
      userId: 1,
      orgId: 1,
      templateId: 1,
    },
  );
  await waitFor(() => {
    expect(screen.queryByRole('button', { name: /^Join/ })).toBeInTheDocument();
  });
  const joinButton = screen.queryByRole('button', { name: /^Join/ });
  userEvent.click(joinButton);
  expect(screen.queryByTestId('SimpleRTE')).toBeInTheDocument();
  userEvent.click(joinButton);
  if (result.current.state.API.addRole) {
    result.current.state.API.addRole(
      {},
      {
        role: 'tour_organizer',
      },
    );
  }
});

test('Test Invite By Org with Org data with add role join', async () => {
  const { result } = componentSetupWithData(
    {
      API: {},
      BillingContext: {
        person: {
          tourSeats: 3,
          connectedPeople: 1,
        },
        org: {
          orgSeats: 4,
          connectedOrgPeople: 1,
          connectedContributor: 1,
        },
        tourConnectedPeople: [{ userId: 1, role: 'participant' }],
      },
      IntercomContext: {
        hideIntercomButton: false,
      },
    },
    {
      userId: 1,
      orgId: 2,
      templateId: 2,
    },
  );
  await waitFor(() => {
    expect(
      screen.queryByRole('button', { name: /^Add role/ }),
    ).toBeInTheDocument();
  });
  const addButton = screen.queryByRole('button', { name: /^Add role/ });
  userEvent.click(addButton);
  expect(screen.queryByTestId('SimpleRTE')).toBeInTheDocument();
  userEvent.click(addButton);
  if (result.current.state.API.addRoleOnError) {
    result.current.state.API.addRoleOnError(
      {},
      {
        role: 'tour_organizer',
      },
    );
  }
});
