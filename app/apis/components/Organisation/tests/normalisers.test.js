import { DATASTORE_UTILS } from 'datastore';
import { ORGANISATION_NORMALISERS } from '../normalisers';

describe('ORGANISATION_NORMALISERS', () => {
  beforeEach(() => {
    DATASTORE_UTILS.upsertObject = jest.fn(() => () => {});
  });
  describe('addOrganisation', () => {
    it('should return particular object shape', () => {
      const result = ORGANISATION_NORMALISERS.addOrganisation(
        {
          photo: 'photo',
          metaInfo: {},
        },
        { userId: 1 },
      );
      expect(result).toMatchSnapshot();
    });
  });
  describe('updateOrganisation', () => {
    it('should return particular object shape', () => {
      const result = ORGANISATION_NORMALISERS.updateOrganisation(
        {
          photo: 'photo',
          metaInfo: {},
        },
        { userId: 1 },
      );
      expect(result).toMatchSnapshot();
    });
  });
  describe('addRoles', () => {
    it('should return particular object shape', () => {
      const result = ORGANISATION_NORMALISERS.addRoles(
        {
          pending: [{ userId: 1, orgId: 1, role: 'guest' }],
          confirmed: [{ userId: 1, orgId: 1 }],
        },
        { id: 1 },
      );
      expect(result).toMatchSnapshot();
    });
  });
  describe('updateRoles', () => {
    it('should return particular object shape', () => {
      const result = ORGANISATION_NORMALISERS.updateRoles({
        role: 'guest',
      });
      expect(result).toMatchSnapshot();
    });
  });
  describe('updateMembers', () => {
    it('should return particular object shape', () => {
      const result = ORGANISATION_NORMALISERS.updateMembers({
        id: 1,
        activated: false,
      });
      expect(result).toMatchSnapshot();
    });
  });
  describe('removeMember', () => {
    it('should return particular object shape', () => {
      const result = ORGANISATION_NORMALISERS.removeMember(
        {
          count: 1,
        },
        {
          id: 1,
          userId: 9,
        },
      );
      expect(result).toMatchSnapshot();
    });
  });
  describe('normaliseGetPerson', () => {
    it('should return particular object shape', () => {
      const result = ORGANISATION_NORMALISERS.normaliseGetPerson(
        {
          id: 1,
          userId: 9,
        },
        1,
      );
      expect(result).toMatchSnapshot();
    });
    it('should return particular object shape user invitaion is from other organisation', () => {
      const result = ORGANISATION_NORMALISERS.normaliseGetPerson(
        {
          id: 1,
          userId: 9,
          invitations: { status: 'pending', orgId: 2 },
        },
        1,
      );
      expect(result).toMatchSnapshot();
    });
  });
  describe('updateShares', () => {
    it('should return particular object shape', () => {
      let result = ORGANISATION_NORMALISERS.updateShares({}, { id: 1 });
      expect(result).toMatchSnapshot();
      result = ORGANISATION_NORMALISERS.updateShares({ orgId: 1 }, { id: 1 });
      expect(result).toMatchSnapshot();
    });
  });

  describe('setupTour', () => {
    it('should return particular object shape', () => {
      expect(
        ORGANISATION_NORMALISERS.setupTour({
          id: 1,
          name: 'organisation name',
        }),
      ).toMatchSnapshot();
    });
  });

  describe('normaliseInvitationAction', () => {
    it('should return particular object shape', () => {
      const result = ORGANISATION_NORMALISERS.normaliseInvitationAction({
        invitationToken: '123456',
        status: 'cancelled',
      });
      expect(result).toMatchSnapshot();
    });
  });

  describe('normaliseCreateOrganisation', () => {
    it('should return particular object shape', () => {
      const result = ORGANISATION_NORMALISERS.normaliseCreateOrganisation({
        organisation: { id: 2233, createdBy: 123 },
        orgUser: { some: 'thing' },
      });
      expect(result).toMatchSnapshot();
    });
  });

  describe('replaceArray', () => {
    it('should return particular object shape', () => {
      const result = ORGANISATION_NORMALISERS.replaceArray('223', '223')({
        organisation: { id: 2233, createdBy: 123 },
        orgUser: { some: 'thing' },
      });
      expect(result).toMatchSnapshot();
    });
  });

  describe('batchAddRoles', () => {
    it('should return a particular object', () => {
      const result = ORGANISATION_NORMALISERS.batchAddRoles(
        [
          {
            pending: [],
            confirmed: [{ id: 1 }, { id: 2 }, { id: 3 }],
          },
          {
            pending: [],
            confirmed: [{ id: 1 }],
          },
        ],
        { ids: [1, 2, 3] },
      );
      expect(result).toMatchSnapshot();
    });
  });
});
