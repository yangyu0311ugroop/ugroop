import React from 'react';
import { act } from '@testing-library/react-hooks';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MomentUtils from '@date-io/moment';
import { MuiPickersUtilsProvider } from 'material-ui-pickers';
import { Contacts } from '../index';
import {
  dispatchRequestSuccessAction,
  renderWithReduxWithRouter,
} from '../../../../../utils/testUtility';
import { GlobalProvider } from '../../../../App/globalContext';
import { PORTAL_HELPERS } from '../../../../Portal/helpers';
import { sleep } from '../../../../../utils/timeUtility';
import {
  GET_PARTICIPANTS,
  GET_PEOPLE,
  TEMPLATE_API,
} from '../../../../../apis/constants';
import { participantDataSample, peopleDataSample } from './requestData';
import Template from '../../../../../apis/components/Template';
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
        withEmptyEmailValue,
        participantRoomTravelInfo,
        // eslint-disable-next-line global-require
      } = require('./testingDatafeed');
      if (query === 'fetchParticipantRoom' && parameter.filter1) {
        return participantRoomTravelInfo;
      }
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
      if (parameter.filter.orgid.equalTo === 103) {
        if (query === 'fetchParticipants') {
          return withEmptyEmailValue;
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
    if (functionQuery.indexOf('fetchParticipantRoom') > 0) {
      return 'fetchParticipantRoom';
    }
    return '';
  }),
}));
test('<Contacts /> press tour link without person data', async () => {
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
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <Contacts orgId={100} resaga={mockedResaga} itemPerPage={50} />
        </MuiPickersUtilsProvider>
      </GlobalProvider>,
      {},
    );
  });
  await sleep(500);
  await waitFor(() => {
    expect(screen.queryAllByTestId('paxRow').length).toEqual(8);
  });
  const buttons = screen.queryAllByTestId('nameButton');
  act(() => {
    userEvent.click(buttons[0]);
  });
  await sleep(1000);
  screen.queryByText('No person detail found in Yang Tour and Stephen and Dan');
  const redirectButton = screen.queryByRole('button', {
    name: /Redirect to the tour to create a record/i,
  });
  if (redirectButton) {
    act(() => {
      userEvent.click(redirectButton);
    });
    expect(render.history.location.pathname).toBe('/tours/5719');
    expect(render.history.location.search).toBe('?participant=13867');
  }
}, 10000);

test('<Contacts /> withData', async () => {
  const mockedResaga = {
    setValue: jest.fn(),
  };
  window.open = jest.fn();
  PORTAL_HELPERS.openParticipantList = jest.fn();
  act(() => {
    renderWithReduxWithRouter(
      <GlobalProvider>
        <Contacts orgId={100} resaga={mockedResaga} itemPerPage={50} />
      </GlobalProvider>,
      {},
    );
  });
  await sleep(1000);
  await waitFor(() => {
    expect(screen.queryAllByTestId('paxRow').length).toEqual(8);
  });
  expect(screen.queryByText('danilo lazo')).toBeInTheDocument();
  expect(screen.queryByText('danlazojr@yahoo.com')).toBeInTheDocument();
  expect(screen.queryByText('yuy0311+02@gmail.com')).toBeInTheDocument();
  expect(screen.queryByText('0423699498')).toBeInTheDocument();
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
      email: 'danlazojr@yahoo.com',
      viewOnly: true,
    },
    { resaga: mockedResaga },
  );
  // make phone call button
  act(() => {
    userEvent.click(screen.queryByTestId('phoneButton'));
  });
  expect(window.open).toBeCalled();
  // search data
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
    expect(screen.queryAllByTestId('paxRow').length).toEqual(8);
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
    expect(screen.queryAllByTestId('paxRow').length).toEqual(8);
  });
  expect(screen.queryAllByTestId('nameDisplay')[0]).toBeInTheDocument();
  const span = screen.queryAllByTestId('nameDisplay')[0].childNodes[0];
  expect(span).toHaveTextContent('Yang Yu');
  expect(screen.queryAllByTestId('tourLinkButton').length).toEqual(8);
  act(() => {
    userEvent.click(screen.queryAllByTestId('tourLinkButton')[0]);
  });
}, 10000);
test('<Contacts /> wihtout Data', async () => {
  const mockedResaga = {
    setValue: jest.fn(),
  };
  window.open = jest.fn();
  PORTAL_HELPERS.openParticipantList = jest.fn();
  act(() => {
    renderWithReduxWithRouter(
      <GlobalProvider>
        <Contacts orgId={101} resaga={mockedResaga} itemPerPage={50} />
      </GlobalProvider>,
      {},
    );
  });
  await waitFor(() => {
    expect(
      screen.getByText('Oops, something went wrong, please try it again.'),
    ).toBeInTheDocument();
  });
});
test('<Contacts /> with data but shall load more', async () => {
  const mockedResaga = {
    setValue: jest.fn(),
  };
  window.open = jest.fn();
  PORTAL_HELPERS.openParticipantList = jest.fn();
  act(() => {
    renderWithReduxWithRouter(
      <GlobalProvider>
        <Contacts orgId={102} resaga={mockedResaga} itemPerPage={5} />
      </GlobalProvider>,
      {},
    );
  });
  await waitFor(() => {
    expect(screen.queryAllByTestId('paxRow').length).toEqual(5);
  });
  expect(screen.queryByTestId('loadMoreButton')).toBeInTheDocument();
  expect(screen.queryByTestId('loadMoreButton')).toHaveTextContent('Load More');
  act(() => {
    userEvent.click(screen.queryByTestId('loadMoreButton'));
  });
  await sleep(1000);
  await waitFor(() => {
    expect(screen.queryAllByTestId('paxRow').length).toEqual(8);
  });
}, 10000);

test('<Contacts /> with empty email address', async () => {
  const mockedResaga = {
    setValue: jest.fn(),
  };
  window.open = jest.fn();
  PORTAL_HELPERS.openParticipantList = jest.fn();
  let render;
  act(() => {
    render = renderWithReduxWithRouter(
      <GlobalProvider>
        <Contacts orgId={103} resaga={mockedResaga} itemPerPage={50} />
      </GlobalProvider>,
      {},
    );
  });
  await sleep(1000);
  await waitFor(() => {
    expect(screen.queryAllByTestId('paxRow').length).toEqual(10);
  });
  const buttons = screen.queryAllByTestId('tourLinkButton');
  act(() => {
    userEvent.click(buttons[0]);
  });
  expect(render.history.location.pathname).toBe('/tours/5719');
  expect(render.history.location.search).toBe('?participant=13867');
}, 10000);

test('<Contacts /> press tour link with person data', async () => {
  const mockedResaga = {
    setValue: jest.fn(),
    dispatchTo: jest.fn().mockImplementation((api, action, parameter) => {
      if (action === 'getParticipants') {
        if (parameter.onSuccess) {
          parameter.onSuccess();
        }
      }
    }),
  };
  window.open = jest.fn();
  PORTAL_HELPERS.openParticipantList = jest.fn();
  let render;
  act(() => {
    render = renderWithReduxWithRouter(
      <GlobalProvider>
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <Template />
          <Contacts orgId={100} resaga={mockedResaga} itemPerPage={50} />
        </MuiPickersUtilsProvider>
      </GlobalProvider>,
      {},
    );
  });
  await sleep(500);
  await waitFor(() => {
    expect(screen.queryAllByTestId('paxRow').length).toEqual(8);
  });

  dispatchRequestSuccessAction(
    render.store,
    TEMPLATE_API,
    GET_PEOPLE,
    peopleDataSample,
  );
  dispatchRequestSuccessAction(
    render.store,
    TEMPLATE_API,
    GET_PARTICIPANTS,
    participantDataSample,
  );
  await sleep(1500);
  const buttons = screen.queryAllByTestId('nameButton');
  act(() => {
    userEvent.click(buttons[0]);
  });
  screen.queryByText('Person Details in in Yang Tour and Stephen and Dan');
  const button = screen.queryByTestId('jdialog-submit');
  act(() => {
    userEvent.click(button);
  });
  await sleep(1500);
  expect(render.history.location.pathname).toBe('/tours/5719');
  expect(render.history.location.search).toBe('?participant=13867');
}, 10000);

test('<Contacts /> press name link with person data', async () => {
  const mockedResaga = {
    setValue: jest.fn(),
    dispatchTo: jest.fn().mockImplementation((api, action, parameter) => {
      if (action === 'getParticipants') {
        if (parameter.onSuccess) {
          parameter.onSuccess();
        }
      }
    }),
  };
  let render;
  act(() => {
    render = renderWithReduxWithRouter(
      <GlobalProvider>
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <Template />
          <Contacts orgId={100} resaga={mockedResaga} itemPerPage={50} />
        </MuiPickersUtilsProvider>
      </GlobalProvider>,
      {},
    );
  });
  await sleep(500);
  await waitFor(() => {
    expect(screen.queryAllByTestId('paxRow').length).toEqual(8);
  });

  dispatchRequestSuccessAction(
    render.store,
    TEMPLATE_API,
    GET_PEOPLE,
    peopleDataSample,
  );
  dispatchRequestSuccessAction(
    render.store,
    TEMPLATE_API,
    GET_PARTICIPANTS,
    participantDataSample,
  );
  await sleep(500);
  const buttons = screen.queryAllByTestId('nameButton');
  act(() => {
    userEvent.click(buttons[0]);
  });
  await sleep(1000);
  await waitFor(() => {
    expect(screen.queryByText('PAX details')).toBeInTheDocument();
  });
}, 10000);
