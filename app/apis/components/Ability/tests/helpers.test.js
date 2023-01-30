import { ABILITY_HELPERS } from '../helpers';

describe('helpers', () => {
  beforeEach(() => jest.clearAllMocks());

  describe('logicalUserRole', () => {
    it('should match snapshot if true is returned', () => {
      const result = ABILITY_HELPERS.logicalUserRole(
        ['admin', 'owner'],
        'tour_organizer',
        null,
      );
      expect(result).toEqual('tour_organizer');
    });
    it('should return role if false', () => {
      const result = ABILITY_HELPERS.logicalUserRole(
        ['admin', 'owner'],
        '',
        'admin',
      );
      expect(result).toEqual('admin');
    });
  });

  describe('enableCheckbox', () => {
    it('should return true', () => {
      const result = ABILITY_HELPERS.enableCheckbox(1, true, true, true);
      expect(result).toBe(true);
    });
  });

  describe('showNote', () => {
    it('should return true', () => {
      const result = ABILITY_HELPERS.showNote(1, false, false, false);
      expect(result).toBe(true);
    });
  });

  describe('showCheckbox', () => {
    it('should return true if canCreate is true', () => {
      const result = ABILITY_HELPERS.showCheckbox(true, false, false);
      expect(result).toBe(true);
    });
    it('should return true if hasOrgAccess is true', () => {
      const result = ABILITY_HELPERS.showCheckbox(false, true, false);
      expect(result).toBe(true);
    });
    it('should return true if isTabCreator is true', () => {
      const result = ABILITY_HELPERS.showCheckbox(false, false, true);
      expect(result).toBe(true);
    });
    it('should return false if everything is false', () => {
      const result = ABILITY_HELPERS.showCheckbox(false, false, false);
      expect(result).toBe(false);
    });
  });

  describe('getRoleUsingRelatedIds', () => {
    it('should return role if the tour is not shared', () => {
      const relatedIds = [[1, 'string', 3]];
      const id = 2;
      expect(ABILITY_HELPERS.getRoleUsingRelatedIds(relatedIds, id)).toEqual(
        '',
      );
    });
    it('should return role if the user has no organizer role', () => {
      const relatedIds = [[1, 'string', 3]];
      const id = 3;
      expect(ABILITY_HELPERS.getRoleUsingRelatedIds(relatedIds, id)).toEqual(
        '',
      );
    });
    it('should return role if the user has organizer role', () => {
      const relatedIds = [[1, 'tour_organizer', 3]];
      const id = 3;
      expect(ABILITY_HELPERS.getRoleUsingRelatedIds(relatedIds, id)).toEqual(
        'tour_organizer',
      );
    });
  });
});
