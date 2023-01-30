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
import Form from 'ugcomponents/Form';
import { TourCustomRole } from '../index';

describe('TourCustomRole', () => {
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
    .setIn([NODE_STORE, 'nodeSettings'], {
      1: {
        owner_custom_role: {
          id: 1,
          value: 'owner custom role 1',
        },
      },
    })
    .setIn([INVITATION_STORE, 'userNodeIds'], [1, 2, 3])
    .setIn([INVITATION_STORE, 'userNodes'], {
      1: {
        id: 1,
        role: TOUR_CONTRIBUTOR_ROLE.TOUR_ORGANIZER,
        userId: 1,
        userRole: 'organiser custom role 1',
      },
      2: {
        id: 2,
        role: TOUR_CONTRIBUTOR_ROLE.TOUR_ORGANIZER,
        userId: 2,
        userRole: 'organiser custom role 2',
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

  describe('VARIANTS.TEXT_ONLY', () => {
    it('should show custom role for organiser non-owner from user nodes', () => {
      const render = renderWithRedux(
        <TourCustomRole resaga={resaga} id={1} variant={VARIANTS.TEXT_ONLY} />,
        { initialState: store },
      );

      expect(render.getByText(/organiser custom role 1/i)).toBeInTheDocument();
    });

    it('should show custom role for owner from settings', () => {
      const render = renderWithRedux(
        <TourCustomRole
          resaga={resaga}
          id={1}
          nodeId={1}
          isOwner
          variant={VARIANTS.TEXT_ONLY}
        />,
        { initialState: store },
      );

      expect(render.getByText(/owner custom role 1/i)).toBeInTheDocument();
    });
  });

  describe('VARIANTS.TEXT_FIELD', () => {
    it('should show custom role for organiser non-owner from user nodes', () => {
      const render = renderWithRedux(
        <Form>
          <TourCustomRole
            resaga={resaga}
            id={1}
            variant={VARIANTS.TEXT_FIELD}
          />
        </Form>,
        { initialState: store },
      );
      expect(
        render.getByDisplayValue('organiser custom role 1'),
      ).toBeInTheDocument();
    });
    it('should show custom role for owner from user nodes', () => {
      const render = renderWithRedux(
        <Form>
          <TourCustomRole
            resaga={resaga}
            id={1}
            nodeId={1}
            variant={VARIANTS.TEXT_FIELD}
            isOwner
          />
        </Form>,
        { initialState: store },
      );
      expect(
        render.getByDisplayValue('owner custom role 1'),
      ).toBeInTheDocument();
    });
  });

  describe('VARIANTS.TEXT_FIELD', () => {
    it('should show custom role for organiser non-owner from user nodes', () => {
      const render = renderWithRedux(
        <Form>
          <TourCustomRole resaga={resaga} id={1} variant={VARIANTS.POPPER} />
        </Form>,
        { initialState: store },
      );
      expect(render.getByText(/organiser custom role 1/i)).toBeInTheDocument();
    });
    it('should show custom role for owner from user nodes', () => {
      const render = renderWithRedux(
        <Form>
          <TourCustomRole
            resaga={resaga}
            id={1}
            nodeId={1}
            variant={VARIANTS.POPPER}
            isOwner
          />
        </Form>,
        { initialState: store },
      );
      expect(render.getByText(/owner custom role 1/i)).toBeInTheDocument();
    });
    it('should show custom role for owner from user nodes & show the value of the role', () => {
      const render = renderWithRedux(
        <Form>
          <TourCustomRole
            resaga={resaga}
            id={1}
            nodeId={1}
            variant={VARIANTS.POPPER}
            isOwner
            showAsValue
          />
        </Form>,
        { initialState: store },
      );
      expect(render.getByText(/owner custom role 1/i)).toBeInTheDocument();
    });
    it('should show custom role for owner from user nodes & show the value of render role', () => {
      const render = renderWithRedux(
        <Form>
          <TourCustomRole
            resaga={resaga}
            id={100}
            nodeId={100}
            variant={VARIANTS.POPPER}
            showAsValue
            renderRole="some role"
            isOwner
          />
        </Form>,
        { initialState: store },
      );
      expect(render.getByText(/some role/i)).toBeInTheDocument();
    });
    it('should show custom role for owner when read only', () => {
      const render = renderWithRedux(
        <Form>
          <TourCustomRole
            resaga={resaga}
            id={100}
            nodeId={100}
            variant={VARIANTS.POPPER}
            showAsValue
            renderRole="some role"
            isOwner
            readOnly
          />
        </Form>,
        { initialState: store },
      );
      expect(render.getByText(/some role/i)).toBeInTheDocument();
    });
    it('should show custom role for owner when custom role is empty', () => {
      const render = renderWithRedux(
        <Form>
          <TourCustomRole
            resaga={resaga}
            id={100}
            nodeId={100}
            variant={VARIANTS.POPPER}
            isOwner
            readOnly
          />
        </Form>,
        { initialState: store },
      );
      expect(render.getByTitle(/Add Custom User Role/i)).toBeInTheDocument();
    });
  });
});
