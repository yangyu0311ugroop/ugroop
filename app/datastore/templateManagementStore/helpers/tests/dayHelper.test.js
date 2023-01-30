import dayHelper from '../dayHelper';

describe('dayHelperTest', () => {
  let testingData;
  let testingData2;
  beforeAll(() => {
    testingData = {
      1: { id: 1, content: 'tab1', children: [100] },
    };
    testingData2 = {
      1: { id: 1, content: 'tab1', children: [100, 103, 104] },
    };
  });
  describe('insertSectionId', () => {
    it('should insert data correctly', () => {
      const result = dayHelper.insertChildren(1, 2)(testingData);
      expect(result['1'].children).toEqual([100, 2]);
    });
    it('should insert data correctly with same children Id', () => {
      const result = dayHelper.insertChildren(1, 100)(testingData);
      expect(result['1'].children).toEqual([100]);
    });
    it('should do nothing if parent id is not found', () => {
      const result = dayHelper.insertChildren(-1, 1)(testingData);
      expect(result['1'].children).toEqual([100]);
    });
  });

  describe('removeSectionId', () => {
    it('should delete data correctly', () => {
      const result = dayHelper.removeChildrenById(1, 100)(testingData);
      expect(result['1'].children).toEqual([]);
    });
    it('should do nothing if value is not found', () => {
      const result = dayHelper.removeChildrenById(1, 10)(testingData);
      expect(result['1'].children).toEqual([100]);
    });
  });

  describe('upsert', () => {
    let data;
    beforeAll(() => {
      data = {
        101: { id: 101, content: 'day1' },
      };
    });
    it('shall initialise child properly', () => {
      const result = dayHelper.initChild({ id: 101, content: 'day101' }, {})();
      expect(result[101].content).toBe('day101');
    });
    it('shall insert properly', () => {
      const result = dayHelper.upsert({ id: 101, content: 'day101' }, {})(data);
      expect(result[101].content).toBe('day101');
    });
    it('shall insert properly', () => {
      const result = dayHelper.upsert({ id: 101, content: 'day101' }, {})(
        undefined,
      );
      expect(result[101].content).toBe('day101');
    });
    it('shall update properly', () => {
      const result = dayHelper.upsert(
        { id: 102, content: 'day102' },
        { node: { other: 'abcd' } },
      )(data);
      expect(result[101].content).toBe('day1');
      expect(result[102].content).toBe('day102');
      expect(result[102].other).toBe('abcd');
    });
  });

  describe('remove', () => {
    let data;
    beforeAll(() => {
      data = {
        101: { id: 101, content: 'day1' },
      };
    });
    it('shall remove properly', () => {
      const result = dayHelper.remove(101)(data);
      expect(result[101]).toBe(undefined);
    });
    it('shall do nothing if id is wrong', () => {
      const result = dayHelper.remove(102)(data);
      expect(result[101]).not.toBeNull();
    });
  });

  describe('insert children before', () => {
    it('shall insert correctly', () => {
      const result = dayHelper.insertChildBefore(1, 100, 101)(testingData);
      expect(result['1'].children).toEqual([101, 100]);
    });
    it('shall insert correctly', () => {
      const result = dayHelper.insertChildBefore(1, 104, 105)(testingData2);
      expect(result['1'].children).toEqual([100, 103, 105, 104]);
    });
    it('shall insert nothing if id is not found', () => {
      const result = dayHelper.insertChildBefore(1, 999, 105)(testingData2);
      expect(result['1'].children).toEqual([100, 103, 104]);
    });
  });

  describe('insert children after', () => {
    it('shall insert correctly', () => {
      const result = dayHelper.insertChildAfter(1, 100, 101)(testingData);
      expect(result['1'].children).toEqual([100, 101]);
    });
    it('shall insert correctly', () => {
      const result = dayHelper.insertChildAfter(1, 103, 105)(testingData2);
      expect(result['1'].children).toEqual([100, 103, 105, 104]);
    });
    it('shall insert correctly', () => {
      const result = dayHelper.insertChildAfter(1, 999, 105)(testingData2);
      expect(result['1'].children).toEqual([100, 103, 104]);
    });
  });

  describe('insert insertPhoto', () => {
    let testingPhotoData;
    beforeAll(() => {
      testingPhotoData = {
        1: { id: 1, content: 'tab1', photos: [100] },
      };
    });
    it('should insert photo correctly', () => {
      const result = dayHelper.insertPhoto(1, 2)(testingPhotoData);
      expect(result['1'].photos).toEqual([100, 2]);
    });
    it('should insert photo correctly with same children Id', () => {
      const result = dayHelper.insertPhoto(1, 100)(testingPhotoData);
      expect(result['1'].photos).toEqual([100]);
    });
    it('should do nothing if parent id is not found', () => {
      const result = dayHelper.insertPhoto(-1, 1)(testingPhotoData);
      expect(result['1'].photos).toEqual([100]);
    });
  });

  describe('setPhoto', () => {
    let testingPhotoData;
    beforeAll(() => {
      testingPhotoData = {
        1: { id: 1, content: 'tab1', photos: [100] },
      };
    });
    it('should insert photo correctly', () => {
      const result = dayHelper.setPhoto(1, [2])(testingPhotoData);
      expect(result['1'].photos).toEqual([2]);
    });
    it('should insert photo correctly with same children Id', () => {
      const result = dayHelper.setPhoto(1, [100, 101])(testingPhotoData);
      expect(result['1'].photos).toEqual([100, 101]);
    });
    it('should do nothing if parent id is not found', () => {
      const result = dayHelper.setPhoto(-1, 1)(testingPhotoData);
      expect(result['1'].photos).toEqual([100]);
    });
  });

  describe('removePhotoById', () => {
    let testingPhotoData;
    beforeAll(() => {
      testingPhotoData = {
        1: { id: 1, content: 'tab1', photos: [100] },
      };
    });
    it('should insert photo correctly', () => {
      const result = dayHelper.removePhotoById(1, 100)(testingPhotoData);
      expect(result['1'].photos).toEqual([]);
    });
    it('should do nothing if parent id is not found', () => {
      const result = dayHelper.removePhotoById(-1, 1)(testingPhotoData);
      expect(result['1'].photos).toEqual([100]);
    });
    it('should do nothing if parent id is not found', () => {
      const result = dayHelper.removePhotoById(1, 1)(testingPhotoData);
      expect(result['1'].photos).toEqual([100]);
    });
  });
});
