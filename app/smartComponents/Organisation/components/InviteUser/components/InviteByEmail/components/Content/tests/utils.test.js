import utils from '../utils';

describe('Content/utils.js', () => {
  describe('Smoke Test', () => {
    it('should exists', () => {
      expect(typeof utils).toBe('object');
    });
  });

  describe('inviteYourself()', () => {
    it('should exists', () => {
      expect(typeof utils.inviteYourself).toBe('function');
    });

    it('should return true', () => {
      expect(utils.inviteYourself('not you')(null, 'you')).toBe(true);
    });

    it('should return error message', () => {
      expect(utils.inviteYourself('you')(null, 'you')).toMatchSnapshot();
    });
  });

  describe('inviteOwner()', () => {
    it('should exists', () => {
      expect(typeof utils.inviteOwner).toBe('function');
    });

    it('should return error message if IS owner', () => {
      expect(
        utils.inviteOwner('that owner')(null, 'that owner'),
      ).toMatchSnapshot();
    });

    it('should return error message if IS in people', () => {
      expect(
        utils.inviteOwner('that owner', ['jon'])(null, 'jon'),
      ).toMatchSnapshot();
    });

    it('should return true', () => {
      expect(utils.inviteOwner('that owner', ['jon'])(null, 'foo')).toBe(true);
    });
  });
  describe('invitePending()', () => {
    it('should exists', () => {
      expect(typeof utils.invitePending).toBe('function');
    });

    it('should return error message if IS owner', () => {
      expect(
        utils.invitePending('that owner', [])(
          null,
          'This person has a pending invitation',
        ),
      ).toMatchSnapshot();
    });

    it('should return error message if IS in people', () => {
      expect(
        utils.invitePending('that owner', ['jon'])(null, 'jon'),
      ).toMatchSnapshot();
    });

    it('should return true', () => {
      expect(utils.invitePending('that owner', ['jon'])(null, 'foo')).toBe(
        true,
      );
    });
  });
});
