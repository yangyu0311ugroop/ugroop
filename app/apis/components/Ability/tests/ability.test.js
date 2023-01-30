import { subjectName } from '../ability';

describe('Ability/ability.js', () => {
  beforeEach(() => jest.clearAllMocks());

  describe('subjectName()', () => {
    it('should handle string', () => {
      expect(subjectName('event')).toBe('event');
    });

    it('should handle object', () => {
      expect(subjectName({ type: 'event' })).toBe('event');
    });
  });
});
