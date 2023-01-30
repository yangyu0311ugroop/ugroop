import { screen } from '@testing-library/dom';
import { act } from '@testing-library/react';
import { TOUR_CONTRIBUTOR_ROLE } from 'apis/components/Ability/roles';
import {
  FILE_DATA_STORE,
  INVITATION_STORE,
  NODE_STORE,
  ORGANISATION_DATA_STORE,
  USER_DATA_STORE,
} from 'appConstants';
import { fromJS } from 'immutable';
import React from 'react';
import { renderWithRedux } from 'utils/testUtility';
import { VARIANTS } from 'variantsConstants';
import user from '@testing-library/user-event';
import Apis from 'apis';

import { AssignedOrganiser } from '../index';
import { GlobalProvider } from '../../../../../containers/App/globalContext';

describe('AssignedOrganiser', () => {
  const resaga = {
    dispatchTo: jest.fn(),
  };
  const store = fromJS({
    [USER_DATA_STORE]: {
      people: {},
    },
    [NODE_STORE]: {
      nodes: {},
    },
    [ORGANISATION_DATA_STORE]: {
      organisations: {},
    },
    [INVITATION_STORE]: {
      userNodeIds: [],
      userNodes: {},
    },
  })
    .setIn([INVITATION_STORE, 'userNodeIds'], [1, 2, 3])
    .setIn([INVITATION_STORE, 'userNodes'], {
      1: {
        id: 1,
        role: TOUR_CONTRIBUTOR_ROLE.TOUR_ORGANIZER,
        userId: 1,
      },
      2: {
        id: 2,
        role: TOUR_CONTRIBUTOR_ROLE.TOUR_ORGANIZER,
        userId: 2,
      },
      3: {
        id: 3,
        role: TOUR_CONTRIBUTOR_ROLE.TOUR_VIEWER,
        userId: 3,
      },
    })
    .setIn([NODE_STORE, 'nodes'], {
      1: {
        id: 1,
        content: 'Tour 1',
        customData: { assignedOrganiserId: 1, organisationId: 1 },
        createdBy: 2,
      },
      2: { id: 2, content: 'Tour 1', customData: {}, createdBy: 2 },
    })
    .setIn([USER_DATA_STORE, 'people'], {
      1: {
        id: 1,
        userId: 1,
        knownAs: 'User 1',
        photo: 'sample-photo-1',
        email: 'user1@gmail.com',
      },
      2: {
        id: 2,
        userId: 2,
        knownAs: 'User 2',
        photo: 'sample-photo-2',
        email: 'user2@gmail.com',
      },
      3: {
        id: 3,
        userId: 3,
        knownAs: 'User 3',
        photo: 'sample-photo-3',
        email: 'user3@gmail.com',
      },
    })
    .setIn([ORGANISATION_DATA_STORE, 'organisations'], {
      1: {
        id: 1,
        name: 'org1',
        photo: 'org-sample-photo-1',
      },
    })
    .setIn([FILE_DATA_STORE, 'files'], {
      'sample-photo-1': {
        id: 1,
        url: 'sample-photo-1',
        metaInfo: {},
      },
      'sample-photo-2': {
        id: 2,
        url: 'sample-photo-2',
        metaInfo: {},
      },
      'sample-photo-3': {
        id: 3,
        url: 'sample-photo-3',
        metaInfo: {},
      },
      'org-sample-photo-1': {
        id: 4,
        url: 'org-sample-photo-1',
        metaInfo: {},
      },
    });

  describe('VARIANTS.READ_ONLY', () => {
    it('should show info of assigned organiser info if there is an assigned organiser info', () => {
      const render = renderWithRedux(
        <AssignedOrganiser
          resaga={resaga}
          id={1}
          variant={VARIANTS.READ_ONLY}
        />,
        { initialState: store },
      );

      expect(render.getByText(/User 1/i)).toBeInTheDocument();
      expect(render.getByText(/user1@gmail.com/i)).toBeInTheDocument();
    });

    it('should show info of the one created the tour by default if no assigned organiser', () => {
      const render = renderWithRedux(
        <AssignedOrganiser
          resaga={resaga}
          id={2}
          variant={VARIANTS.READ_ONLY}
        />,
        { initialState: store },
      );

      expect(render.getByText(/User 2/i)).toBeInTheDocument();
      expect(render.getByText(/user2@gmail.com/i)).toBeInTheDocument();
    });
  });

  describe('DEFAULT', () => {
    it('should show all organiser info that you can assign', () => {
      renderWithRedux(
        <GlobalProvider>
          <Apis />
          <AssignedOrganiser resaga={resaga} id={1} />
        </GlobalProvider>,
        {
          initialState: store,
        },
      );

      expect(screen.getByText(/User 1/i)).toBeInTheDocument();
      user.click(screen.getByRole('button', { name: /User 1/i }));
      expect(screen.getAllByText(/User 1/i)[0]).toBeInTheDocument();
      act(() => {
        user.click(screen.getByTestId('inviteeTestId'));
      });
      // TODO: Way to check if the request already been made
    });
  });
});
