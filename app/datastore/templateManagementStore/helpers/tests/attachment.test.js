import attachmentHelper from '../attachment';

describe('attachment helper', () => {
  describe('upsert', () => {
    let data;
    beforeAll(() => {
      data = {
        101: { id: 101, content: 'attachment1' },
      };
    });
    it('shall insert properly', () => {
      const result = attachmentHelper.upsert(
        { id: 101, content: 'attachment101' },
        {},
      )(data);
      expect(result[101].content).toBe('attachment101');
    });
    it('shall insert properly', () => {
      const result = attachmentHelper.upsert(
        { id: 101, content: 'attachment101' },
        {},
      )(undefined);
      expect(result[101].content).toBe('attachment101');
    });
    it('shall update properly', () => {
      const result = attachmentHelper.upsert(
        { id: 102, content: 'attachment102' },
        { node: { other: 'abcd' } },
      )(data);
      expect(result[101].content).toBe('attachment1');
      expect(result[102].content).toBe('attachment102');
      expect(result[102].other).toBe('abcd');
    });
  });

  describe('remove', () => {
    let data;
    beforeAll(() => {
      data = {
        101: { id: 101, content: 'attachment101' },
      };
    });
    it('shall remove properly', () => {
      const result = attachmentHelper.remove(101)(data);
      expect(result[101]).toBe(undefined);
    });
    it('shall do nothing if id is wrong', () => {
      const result = attachmentHelper.remove(102)(data);
      expect(result[101]).not.toBeNull();
    });
  });
});
