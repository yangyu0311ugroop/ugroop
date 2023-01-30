import { act } from '@testing-library/react-hooks';
import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ParticipantLists } from '../participantLists';
import { renderWithReduxWithRouter } from '../../../../../utils/testUtility';
import { GlobalProvider } from '../../../../App/globalContext';
import { sleep } from '../../../../../utils/timeUtility';
import { CLONE_PARTICIPANT } from '../../../../../apis/constants';
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
        nodeData,
        personData,
        errors,
        // eslint-disable-next-line global-require
      } = require('./participantFeedData');
      if (query === 'fetchPeople') {
        return personData;
      }
      if (query === 'fetchNode') {
        return nodeData;
      }
      if (parameter.filter.and[0].orgid.equalTo === 100) {
        if (query === 'fetchParticipants') {
          return participantData;
        }
      }
      if (parameter.filter.and[0].orgid.equalTo === 101) {
        const error = new Error('An error occurred while fetching the data.');
        error.info = errors;
        error.status = 200;
        throw error;
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
test('<ParticipantLists /> can edit', async () => {
  const mockedResaga = {
    setValue: jest.fn(),
    dispatchTo: jest.fn().mockImplementation((api, method, parameter) => {
      if (method === CLONE_PARTICIPANT) {
        expect(parameter.payload).toEqual({
          id: 21474,
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
  window.open = jest.fn();
  act(() => {
    renderWithReduxWithRouter(
      <GlobalProvider>
        <ParticipantLists
          tourId={1}
          email="yuy0311@gmail.com"
          orgId={100}
          resaga={mockedResaga}
        />
      </GlobalProvider>,
      {},
    );
  });
  await sleep(1000);
  await waitFor(() => {
    // Virtual Lists so it will not render all the content
    expect(screen.queryAllByTestId('paxRow').length === 2).toBe(true);
  });
  expect(screen.queryAllByTestId('nameDisplay')[0]).toHaveTextContent(
    'Yang Yu',
  );
  expect(screen.queryAllByTestId('tourStartDate')[0]).toHaveTextContent(
    '24 October 2019',
  );
  act(() => {
    userEvent.click(screen.queryAllByTestId('paxRow')[0].childNodes[0]);
  });
  expect(screen.queryAllByText('Add')[0]).toBeInTheDocument();
  expect(screen.queryByText('View in itinerary')).toBeInTheDocument();
  expect(screen.queryAllByText('Add')[0]).toBeInTheDocument();
  act(() => {
    userEvent.click(screen.queryAllByTestId('paxRow')[0].childNodes[0]);
    userEvent.click(screen.queryAllByText('Add')[0]);
  });
  act(() => {
    userEvent.click(screen.queryAllByTestId('paxRow')[1].childNodes[0]);
  });
  userEvent.click(screen.queryByText('Call'));
  expect(window.open).toBeCalledWith('tel:0423699393');
  act(() => {
    userEvent.click(screen.queryAllByTestId('paxRow')[0].childNodes[0]);
  });
  expect(screen.queryByText('View in itinerary')).toBeInTheDocument();
  userEvent.click(screen.queryByText('View in itinerary'));
});
test('<ParticipantLists /> can edit with the same tour view details', async () => {
  const mockedResaga = {
    setValue: jest.fn(),
    dispatchTo: jest.fn().mockImplementation((api, method, parameter) => {
      if (method === CLONE_PARTICIPANT) {
        expect(parameter.payload).toEqual({
          id: 21474,
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
  window.open = jest.fn();
  act(() => {
    renderWithReduxWithRouter(
      <GlobalProvider>
        <ParticipantLists
          tourId={13016}
          email="yuy0311@gmail.com"
          orgId={100}
          resaga={mockedResaga}
        />
      </GlobalProvider>,
      {},
    );
  });
  await sleep(1000);
  await waitFor(() => {
    // Virtual Lists so it will not render all the content
    expect(screen.queryAllByTestId('paxRow').length === 2).toBe(true);
  });
  act(() => {
    userEvent.click(screen.queryAllByTestId('paxRow')[0].childNodes[0]);
  });
  expect(screen.queryByText('View in itinerary')).toBeInTheDocument();
  act(() => {
    userEvent.click(screen.queryAllByTestId('paxRow')[0].childNodes[0]);
  });
  expect(screen.queryByText('View in itinerary')).toBeInTheDocument();
  userEvent.click(screen.queryByText('View in itinerary'));
  expect(mockedResaga.setValue).toBeCalled();
});
test('<ParticipantLists /> with error', async () => {
  const mockedResaga = {
    setValue: jest.fn(),
    dispatchTo: jest.fn(),
  };
  window.open = jest.fn();
  act(() => {
    renderWithReduxWithRouter(
      <GlobalProvider>
        <ParticipantLists
          tourId={1}
          email="yuy0311@gmail.com"
          orgId={101}
          resaga={mockedResaga}
        />
      </GlobalProvider>,
      {},
    );
  });
  await sleep(1000);
  expect(
    screen.queryByText('Oops, something went wrong, please try it again.'),
  ).toBeInTheDocument();
});
