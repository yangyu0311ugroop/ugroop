import dotProp from 'dot-prop-immutable';
import tabHelper from '../tab';

describe('tab - template management', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('updateChildren', () => {
    const tabs = {
      1: { content: 'abcd', children: [] },
      2: { content: 'efgh', children: [] },
    };
    it('should update', () => {
      expect(tabHelper.updateChildren(1, [1, 2, 3])(tabs)).toEqual({
        1: { content: 'abcd', children: [1, 2, 3] },
        2: { content: 'efgh', children: [] },
      });
    });
  });

  describe('updateTabChildrenIDs', () => {
    let tabData;
    beforeEach(() => {
      tabData = {
        content: 'abcd',
        children: [],
      };
    });
    it('should update', () => {
      const ids = [1, 2, 3];
      const newTab = tabHelper.updateTabChildrenIDs([1, 2, 3])(tabData);
      expect(newTab.children).toEqual(ids);
    });
  });

  describe('insertDayId', () => {
    let testingData;
    beforeAll(() => {
      testingData = {
        1: { id: 1, content: 'tab1', children: [100] },
      };
      jest.clearAllMocks();
    });
    it('should insert data correctly', () => {
      const result = tabHelper.insertChildren(1, 2)(testingData);
      expect(result['1'].children).toEqual([100, 2]);
    });
    it('should insert data correctly with same children Id', () => {
      const result = tabHelper.insertChildren(1, 100)(testingData);
      expect(result['1'].children).toEqual([100]);
    });
    it('should do nothing if parent id is not found', () => {
      const result = tabHelper.insertChildren(-1, 1)(testingData);
      expect(result['1'].children).toEqual([100]);
    });
  });

  describe('removeDayId', () => {
    let testingData;
    beforeAll(() => {
      testingData = {
        1: { id: 1, content: 'tab1', children: [100] },
      };
    });
    it('should delete data correctly', () => {
      const result = tabHelper.removeChildrenById(1, 100)(testingData);
      expect(result['1'].children).toEqual([]);
    });
    it('should do nothing if value is not found', () => {
      const result = tabHelper.removeChildrenById(1, 10)(testingData);
      expect(result['1'].children).toEqual([100]);
    });
  });

  describe('insert children before', () => {
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
    it('shall insert correctly', () => {
      const result = tabHelper.insertChildBefore(1, 100, 101)(testingData);
      expect(result['1'].children).toEqual([101, 100]);
    });
    it('shall insert correctly', () => {
      const result = tabHelper.insertChildBefore(1, 104, 105)(testingData2);
      expect(result['1'].children).toEqual([100, 103, 105, 104]);
    });
    it('shall insert nothing if id cannot be found', () => {
      const result = tabHelper.insertChildBefore(1, 999, 105)(testingData2);
      expect(result['1'].children).toEqual([100, 103, 104]);
    });
  });

  describe('insert children after', () => {
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
    it('shall insert correctly', () => {
      const result = tabHelper.insertChildAfter(1, 100, 101)(testingData);
      expect(result['1'].children).toEqual([100, 101]);
    });
    it('shall insert correctly', () => {
      const result = tabHelper.insertChildAfter(1, 103, 105)(testingData2);
      expect(result['1'].children).toEqual([100, 103, 105, 104]);
    });
    it('shall insert nothing if id cannot be found', () => {
      const result = tabHelper.insertChildAfter(1, 99, 105)(testingData2);
      expect(result['1'].children).toEqual([100, 103, 104]);
    });
  });

  // TODO: Jay, please update these two testing case with proper data.
  describe('upsert', () => {
    it('should call merge', () => {
      dotProp.merge = jest.fn(() => 133);
      expect(tabHelper.upsert(12, { node: 1 })()).toEqual(133);
      expect(dotProp.merge).toBeCalled();
      dotProp.merge.mockRestore();
    });
  });

  // TODO: Jay, please update these two testing case with proper data.
  describe('remove', () => {
    it('should call delete', () => {
      dotProp.delete = jest.fn(() => 133);
      expect(tabHelper.remove()()).toEqual(133);
      expect(dotProp.delete).toBeCalled();
      dotProp.delete.mockRestore();
    });
  });

  describe('insertChild', () => {
    it('should call merge', () => {
      dotProp.merge = jest.fn(() => 133);

      expect(tabHelper.insertChild()()).toEqual(133);

      expect(dotProp.merge).toBeCalled();
      dotProp.merge.mockRestore();
    });

    it('should NOT call merge', () => {
      dotProp.merge = jest.fn(() => 133);

      expect(
        tabHelper.insertChild(1, 11)({ 1: { children: [11] } }),
      ).not.toEqual(133);

      expect(dotProp.merge).not.toBeCalled();
      dotProp.merge.mockRestore();
    });
  });
});
