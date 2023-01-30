import { nodeShareSubNode } from '../schema';

describe('INVITATION schema', () => {
  describe('nodeShareSubNode', () => {
    it('processStrategy inserts notificationToken', () => {
      const value = { x: 1 };
      const notificationToken = 'token';
      expect(
        // eslint-disable-next-line no-underscore-dangle
        nodeShareSubNode._processStrategy(value, { notificationToken }),
      ).toEqual(
        expect.objectContaining({
          ...value,
          notificationToken,
        }),
      );
    });
  });
});
