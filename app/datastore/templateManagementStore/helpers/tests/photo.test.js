import photoHelper from '../photo';

describe('photo helper', () => {
  describe('upsert', () => {
    let data;
    beforeAll(() => {
      data = {
        101: { id: 101, content: 'photo1' },
      };
    });
    it('shall insert properly', () => {
      const result = photoHelper.upsert({ id: 101, content: 'photo101' }, {})(
        data,
      );
      expect(result[101].content).toBe('photo101');
    });
    it('shall insert properly', () => {
      const result = photoHelper.upsert({ id: 101, content: 'photo101' }, {})(
        undefined,
      );
      expect(result[101].content).toBe('photo101');
    });
    it('shall update properly', () => {
      const result = photoHelper.upsert(
        { id: 102, content: 'photo102' },
        { node: { other: 'abcd' } },
      )(data);
      expect(result[101].content).toBe('photo1');
      expect(result[102].content).toBe('photo102');
      expect(result[102].other).toBe('abcd');
    });
  });

  describe('remove', () => {
    let data;
    beforeAll(() => {
      data = {
        101: { id: 101, content: 'photo101' },
      };
    });
    it('shall remove properly', () => {
      const result = photoHelper.remove(101)(data);
      expect(result[101]).toBe(undefined);
    });
    it('shall do nothing if id is wrong', () => {
      const result = photoHelper.remove(102)(data);
      expect(result[101]).not.toBeNull();
    });
  });

  describe('mergeContent', () => {
    it('shall mergeContent properly', () => {
      expect(
        photoHelper.mergeContent(123, {
          customData: { photo: '123', metaInfo: '456' },
        })({}),
      ).toEqual({ 123: { content: '123', metaInfo: '456' } });
    });
  });
});
