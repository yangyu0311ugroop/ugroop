import { FOLDER, GUEST, TEMPLATE, TOUR_ORGANIZER } from 'utils/modelConstants';
import { ABILITY_NORMALISERS } from '../normalisers';

describe('Ability/config.js', () => {
  beforeEach(() => jest.clearAllMocks());

  const mockResponse = {
    myTours: {
      id: 1,
      type: FOLDER,
      children: [
        {
          id: 112,
          type: TEMPLATE,
          children: [],
          content: 'tour',
          updatedAt: '112',
        },
        {
          id: 11,
          type: FOLDER,
          content: 'folder',
          children: [
            {
              id: 113,
              type: TEMPLATE,
              children: [],
              content: 'tour 2',
              updatedAt: '113',
              photos: [{ id: 999, content: 'some photo' }],
            },
          ],
        },
      ],
    },
    orgTours: {
      2233: {
        id: 2222,
        type: FOLDER,
        children: [
          {
            id: 221,
            type: TEMPLATE,
            children: [],
            content: 'tour 3',
            updatedAt: '221',
          },
          {
            id: 22,
            type: FOLDER,
            content: 'folder',
            children: [
              {
                id: 223,
                type: TEMPLATE,
                children: [],
                content: 'tour 4',
                updatedAt: '223',
              },
            ],
          },
        ],
      },
      2234: {
        children: [],
      },
      2235: {},
    },
    sharedTours: [
      {
        id: 334,
        type: TEMPLATE,
        children: [],
        content: 'tour 5',
        updatedAt: '334',
      },
      {
        id: 335,
        type: TEMPLATE,
        children: [],
        content: 'tour 6',
        updatedAt: '335',
      },
    ],
    userNodes: [
      { nodeId: 334, role: TOUR_ORGANIZER },
      { nodeId: 335, role: GUEST },
    ],
    orgId: 2233,
  };

  describe('ABILITY_NORMALISERS()', () => {
    describe('normalisePersonalTours()', () => {
      it('should normalisePersonalTours()', () => {
        expect(
          ABILITY_NORMALISERS.normalisePersonalTours(mockResponse),
        ).toMatchSnapshot();
      });
    });

    describe('normaliseOrganisation()', () => {
      it('should normaliseOrganisation()', () => {
        expect(
          ABILITY_NORMALISERS.normaliseOrganisation(mockResponse),
        ).toMatchSnapshot();
      });
    });

    describe('normaliseTourRole()', () => {
      it('should normaliseTourRole()', () => {
        expect(
          ABILITY_NORMALISERS.normaliseTourRole(
            {},
            { nodeId: 2233, role: 'tour_viewer' },
          ),
        ).toEqual({ 2233: { tourRoles: ['tour_viewer'] } });
      });

      it('should normaliseTourRole() 2', () => {
        expect(
          ABILITY_NORMALISERS.normaliseTourRole(
            { 2233: { tourRoles: ['tour_owner'] } },
            { nodeId: 2233, role: 'tour_viewer' },
          ),
        ).toEqual({ 2233: { tourRoles: ['tour_owner', 'tour_viewer'] } });
      });

      it('should normaliseTourRole() 3', () => {
        expect(
          ABILITY_NORMALISERS.normaliseTourRole(
            { 2233: { tourRoles: ['tour_viewer'] } },
            { nodeId: 2233, role: 'tour_viewer' },
          ),
        ).toEqual({ 2233: { tourRoles: ['tour_viewer'] } });
      });
    });

    describe('normaliseCreatedBy()', () => {
      it('should normaliseCreatedBy()', () => {
        expect(
          ABILITY_NORMALISERS.normaliseCreatedBy({
            4455: { createdBy: 33 },
          })([55], 3344),
        ).toEqual([55]);
      });

      it('should normaliseCreatedBy() 1', () => {
        expect(
          ABILITY_NORMALISERS.normaliseCreatedBy({
            4455: { createdBy: 33 },
          })([], 4455),
        ).toEqual([33]);
      });

      it('should normaliseCreatedBy() 2', () => {
        expect(
          ABILITY_NORMALISERS.normaliseCreatedBy({
            4455: { createdBy: 33 },
          })([33], 4455),
        ).toEqual([33]);
      });
    });

    describe('normaliseOrganisationId()', () => {
      it('should normaliseOrganisationId()', () => {
        expect(
          ABILITY_NORMALISERS.normaliseOrganisationId({
            4455: { customData: { organisationId: 33 } },
          })([55], 3344),
        ).toEqual([55]);
      });

      it('should normaliseOrganisationId() 1', () => {
        expect(
          ABILITY_NORMALISERS.normaliseOrganisationId({
            4455: { customData: { organisationId: 33 } },
          })([], 4455),
        ).toEqual([33]);
      });

      it('should normaliseOrganisationId() 2', () => {
        expect(
          ABILITY_NORMALISERS.normaliseOrganisationId({
            4455: { customData: { organisationId: 33 } },
          })([33], 4455),
        ).toEqual([33]);
      });
    });

    describe('cleanupTemplates()', () => {
      it('should cleanupTemplates()', () => {
        expect(
          ABILITY_NORMALISERS.cleanupTemplates({
            1: { type: TEMPLATE, children: [] },
            2: { type: FOLDER, children: [1] },
            3: { type: TEMPLATE, children: [1, 2] },
          }),
        ).toMatchSnapshot();
      });
    });

    describe('findMyTours()', () => {
      it('should findMyTours()', () => {
        ABILITY_NORMALISERS.normaliseTourRole = jest.fn(() => () => ({}));
        ABILITY_NORMALISERS.normaliseCreatedBy = jest.fn(() => () => ({}));
        ABILITY_NORMALISERS.normaliseOrganisationId = jest.fn(() => () => ({}));
        const result = ABILITY_NORMALISERS.findMyTours(mockResponse);
        expect(result.sortedOrganisationIds.length).toEqual(4);
      });
    });
  });
});
