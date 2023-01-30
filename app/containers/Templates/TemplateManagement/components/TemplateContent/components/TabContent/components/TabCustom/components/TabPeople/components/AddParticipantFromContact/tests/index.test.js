import React from 'react';
import { act } from '@testing-library/react-hooks';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { dispatchSetValue, renderWithReduxWithRouter } from 'utils/testUtility';
import { GlobalProvider } from 'containers/App/globalContext';
import { PORTAL_HELPERS } from 'containers/Portal/helpers';
import { sleep } from 'utils/timeUtility';
import { AddParticipantFromContact } from '../index';

import { CLONE_PARTICIPANT } from '../../../../../../../../../../../../../../apis/constants';
jest.mock('lib/awsLib', () => ({
  Auth: {
    currentSession: jest
      .fn()
      .mockReturnValue(Promise.resolve({ idToken: { jwtToken: 'avcs' } })),
  },
  getTokenIfNotExpired: jest.fn(() => null),
}));
jest.mock('graphql-request', () => ({
  // eslint-disable-next-line no-unused-vars
  GraphQLClient: class GraphQLClient {
    // eslint-disable-next-line no-useless-constructor
    request(query, parameter) {
      const {
        participantData,
        participantData2,
        peopleData,
        searchData,
        sortEmailDescData,
        errors,
        chuckData1,
        chuckData2,
        chuckData3,
        // eslint-disable-next-line global-require
      } = require('containers/Organisations/components/Contacts/tests/testingDatafeed.js');
      if (parameter.filter.and) {
        return searchData;
      }
      if (query === 'fetchPeople') {
        return peopleData;
      }
      if (parameter.filter.orgid.equalTo === 100) {
        if (query === 'fetchParticipants') {
          if (parameter.sort !== 'EMAIL_ASC__LASTUPDATE_DESC__LASTNAME_ASC') {
            if (parameter.after) {
              return participantData2;
            }
            return sortEmailDescData;
          }

          if (parameter.after) {
            // eslint-disable-next-line global-require
            return participantData2;
          }
          return participantData;
        }
        if (query === 'fetchNode') {
          return participantData;
        }
      }
      if (parameter.filter.orgid.equalTo === 101) {
        const error = new Error('An error occurred while fetching the data.');
        error.info = errors;
        error.status = 200;
        throw error;
      }
      if (parameter.filter.orgid.equalTo === 102) {
        if (query === 'fetchParticipants') {
          if (parameter.after) {
            if (
              parameter.after === chuckData2.participants.pageInfo.endCursor
            ) {
              return chuckData3;
            }
            // eslint-disable-next-line global-require
            return chuckData2;
          }
          return chuckData1;
        }
        if (query === 'fetchNode') {
          return participantData;
        }
      }
      return null;
    }
  },
  gql: jest.fn().mockImplementation(fn => {
    const functionQuery = fn[0];
    if (functionQuery.indexOf('fetchParticipants') > 0) {
      return 'fetchParticipants';
    }
    if (functionQuery.indexOf('fetchNode') > 0) {
      return 'fetchNode';
    }
    if (functionQuery.indexOf('fetchPeople') > 0) {
      return 'fetchPeople';
    }
    return '';
  }),
}));
test('<AddParticipantFromContact /> withData', async () => {
  const mockedResaga = {
    setValue: jest.fn(),
    dispatchTo: jest.fn(),
  };
  window.open = jest.fn();
  PORTAL_HELPERS.openParticipantList = jest.fn();
  let render;
  act(() => {
    render = renderWithReduxWithRouter(
      <GlobalProvider>
        <AddParticipantFromContact
          templateId={1}
          resaga={mockedResaga}
          itemPerPage={50}
          paxLabel="contacts"
        />
      </GlobalProvider>,
      {},
    );
  });
  const { store } = render;
  dispatchSetValue(store, 'nodeStore', 'nodes', {
    '1': {
      content: 'abc',
      customData: {
        organisationId: 100,
      },
    },
  });
  expect(screen.queryByTestId('AddPax')).toHaveTextContent('Add contacts');
  act(() => {
    userEvent.click(screen.queryByTestId('AddPax'));
  });
  await sleep(1000);
  await waitFor(() => {
    // Virtual Lists so it will not render all the content
    expect(screen.queryAllByTestId('paxRow').length > 1).toBe(true);
  });
  expect(screen.queryByText('danilo lazo')).toBeInTheDocument();
  expect(screen.queryByText('danlazojr@yahoo.com')).toBeInTheDocument();

  // search
  expect(screen.queryByTestId('findPaxSearch')).toBeInTheDocument();
  const inputText = screen.queryByTestId('findPaxSearch').childNodes[1]
    .childNodes[0];
  act(() => {
    fireEvent.change(inputText, { target: { value: 'yuy0311@gmail.com' } });
  });
  await waitFor(() => {
    expect(screen.queryAllByTestId('paxRow').length).toEqual(1);
  });
  expect(screen.queryByText('danilo lazo')).not.toBeInTheDocument();
  expect(screen.queryByText('yuy0311@gmail.com')).toBeInTheDocument();
  act(() => {
    fireEvent.change(inputText, { target: { value: '' } });
  });
  await waitFor(() => {
    expect(screen.queryAllByTestId('paxRow').length).toEqual(7);
  });
  // sort data
  act(() => {
    userEvent.click(screen.queryByTestId('sortButton'));
  });
  expect(screen.queryAllByTestId('sortMenuItem').length).toEqual(6);
  const menuItem = screen.queryAllByTestId('sortMenuItem')[0].childNodes[0];
  expect(menuItem.getAttribute('class').indexOf('MenuItem-selected') > -1);
  // switch to different sort
  const menuItem2 = screen.queryAllByTestId('sortMenuItem')[1].childNodes[0];
  act(() => {
    userEvent.click(menuItem2);
  });
  await sleep(1000);
  await waitFor(() => {
    expect(screen.queryAllByTestId('paxRow').length).toEqual(7);
  });
  expect(screen.queryAllByTestId('nameDisplay')[0]).toBeInTheDocument();
  const span = screen.queryAllByTestId('nameDisplay')[0].childNodes[0];
  expect(span).toHaveTextContent('Yang Yu');
  // View Details
  expect(screen.queryByTestId('menuItemButton')).not.toBeInTheDocument();
  act(() => {
    userEvent.click(screen.queryAllByTestId('moreOptions')[0]);
  });
  expect(screen.queryByText('View Details')).toBeInTheDocument();
  act(() => {
    userEvent.click(screen.queryByText('View Details'));
  });
  // view details
  expect(PORTAL_HELPERS.openParticipantList).toBeCalledWith(
    {
      orgId: 100,
      email: 'yuy0311@gmail.com',
      tourId: 1,
    },
    { resaga: mockedResaga },
  );
}, 10000);
test('<AddParticipantFromContact /> add Participant', async () => {
  const mockedResaga = {
    setValue: jest.fn(),
    dispatchTo: jest.fn().mockImplementation((api, method, parameter) => {
      if (method === CLONE_PARTICIPANT) {
        expect(parameter.payload).toEqual({
          id: 13867,
          data: {
            templateId: 1,
          },
        });
        parameter.onSuccess({
          participantNodeClone: {
            parentNodeId: 1,
          },
        });
        parameter.onError();
      }
    }),
  };
  PORTAL_HELPERS.openParticipantList = jest.fn();
  let render;
  act(() => {
    render = renderWithReduxWithRouter(
      <GlobalProvider>
        <AddParticipantFromContact
          templateId={1}
          resaga={mockedResaga}
          itemPerPage={50}
          paxLabel="contacts"
        />
      </GlobalProvider>,
      {},
    );
  });
  const { store } = render;
  dispatchSetValue(store, 'nodeStore', 'nodes', {
    '1': {
      content: 'abc',
      customData: {
        organisationId: 100,
      },
    },
  });
  expect(screen.queryByTestId('AddPax')).toHaveTextContent('Add contacts');
  act(() => {
    userEvent.click(screen.queryByTestId('AddPax'));
  });
  await sleep(1000);
  await waitFor(() => {
    // Virtual Lists so it will not render all the content
    expect(screen.queryAllByTestId('paxRow').length > 1).toBe(true);
  });
}, 10000);
test('<AddParticipantFromContact /> add Participant menuItem', async () => {
  const mockedResaga = {
    setValue: jest.fn(),
    dispatchTo: jest.fn().mockImplementation((api, method, parameter) => {
      if (method === CLONE_PARTICIPANT) {
        expect(parameter.payload).toEqual({
          id: 13867,
          data: {
            templateId: 1,
          },
        });
        parameter.onSuccess({
          participantNodeClone: {
            parentNodeId: 1,
          },
        });
        parameter.onError();
      }
    }),
  };
  let render;
  act(() => {
    render = renderWithReduxWithRouter(
      <GlobalProvider>
        <AddParticipantFromContact
          templateId={1}
          resaga={mockedResaga}
          itemPerPage={50}
          paxLabel="contacts"
        />
      </GlobalProvider>,
      {},
    );
  });
  const { store } = render;
  dispatchSetValue(store, 'nodeStore', 'nodes', {
    '1': {
      content: 'abc',
      customData: {
        organisationId: 100,
      },
    },
  });
  expect(screen.queryByTestId('AddPax')).toHaveTextContent('Add contacts');
  act(() => {
    userEvent.click(screen.queryByTestId('AddPax'));
  });
  await sleep(1000);
  await waitFor(() => {
    // Virtual Lists so it will not render all the content
    expect(screen.queryAllByTestId('paxRow').length > 1).toBe(true);
  });
  // add participant
  expect(screen.queryByTestId('menuItemButton')).not.toBeInTheDocument();
  act(() => {
    userEvent.click(screen.queryAllByTestId('moreOptions')[0]);
  });
  expect(screen.queryByText('Add')).toBeInTheDocument();
  act(() => {
    userEvent.click(screen.queryByText('Add'));
  });
  expect(mockedResaga.dispatchTo).toHaveBeenCalled();
}, 10000);
test('<AddParticipantFromContact /> without Data', async () => {
  const mockedResaga = {
    setValue: jest.fn(),
  };
  let render;
  act(() => {
    render = renderWithReduxWithRouter(
      <GlobalProvider>
        <AddParticipantFromContact
          templateId={1}
          resaga={mockedResaga}
          itemPerPage={50}
        />
      </GlobalProvider>,
      {},
    );
  });
  const { store } = render;
  dispatchSetValue(store, 'nodeStore', 'nodes', {
    '1': {
      content: 'abc',
      customData: {
        organisationId: 101,
      },
    },
  });
  expect(screen.queryByTestId('AddPax')).toHaveTextContent('Add Pax');
  act(() => {
    userEvent.click(screen.queryByTestId('AddPax'));
  });
  await sleep(1000);
  await waitFor(() => {
    expect(
      screen.getByText('Oops, something went wrong, please try it again.'),
    ).toBeInTheDocument();
  });
});
test('<AddParticipantFromContact /> add manually', async () => {
  const mockedResaga = {
    setValue: jest.fn(),
  };
  let render;
  const add = jest.fn();
  act(() => {
    render = renderWithReduxWithRouter(
      <GlobalProvider>
        <AddParticipantFromContact
          templateId={1}
          resaga={mockedResaga}
          itemPerPage={5}
          addParticipant={add}
        />
      </GlobalProvider>,
      {},
    );
  });
  const { store } = render;
  dispatchSetValue(store, 'nodeStore', 'nodes', {
    '1': {
      content: 'abc',
      customData: {
        organisationId: 102,
      },
    },
  });
  expect(screen.queryByTestId('AddPax')).toHaveTextContent('Add Pax');
  act(() => {
    userEvent.click(screen.queryByTestId('AddPax'));
  });
  await sleep(1000);
  expect(
    screen.queryByTestId('addParticipantManuallyButton'),
  ).toBeInTheDocument();
  act(() => {
    userEvent.click(screen.queryByTestId('addParticipantManuallyButton'));
  });
  expect(add).toHaveBeenCalled();
});
test('<AddParticipantFromContact /> with data but shall load more', async () => {
  const mockedResaga = {
    setValue: jest.fn(),
  };
  let render;
  act(() => {
    render = renderWithReduxWithRouter(
      <GlobalProvider>
        <AddParticipantFromContact
          templateId={1}
          resaga={mockedResaga}
          itemPerPage={5}
        />
      </GlobalProvider>,
      {},
    );
  });
  const { store } = render;
  dispatchSetValue(store, 'nodeStore', 'nodes', {
    '1': {
      content: 'abc',
      customData: {
        organisationId: 102,
      },
    },
  });
  act(() => {
    userEvent.click(screen.queryByTestId('AddPax'));
  });
  await sleep(1000);
  await waitFor(() => {
    expect(screen.queryAllByTestId('paxRow').length).toEqual(5);
  });
  expect(screen.queryByTestId('loadMoreButton')).toBeInTheDocument();
  expect(screen.queryByTestId('loadMoreButton')).toHaveTextContent('Load More');
  userEvent.click(screen.queryByTestId('loadMoreButton'));
  await sleep(1000);
  await waitFor(() => {
    expect(screen.queryAllByTestId('paxRow').length).toEqual(7);
  });
}, 10000);
