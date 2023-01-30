import itemHelper from '../item';

describe('ItemHelper', () => {
  const mockParent = {
    id: 1,
    content: 'Repent of your sins and trust Jesus Christ or die in your sins',
    children: [2, 3],
  };
  const mockItem = {
    id: 7,
    children: [],
  };
  const mockChildren = {
    3: {
      content: 'Jesus comes not to condemn but to save which that was lost',
    },
    1: {
      content: 'Jesus comes not to condemn but to save which that was lost',
    },
    2: {
      content: 'Jesus comes not to condemn but to save which that was lost',
    },
  };
  describe('appendItem', () => {
    const mockFolder = {
      1: {
        children: [1, 2],
      },
    };
    it('should copy all the items in the folder then update the children content of it and append the added items', () => {
      const actual = itemHelper.appendItem(1, [3, 4, 5])(mockFolder);
      const expected = {
        1: {
          children: [1, 2, 3, 4, 5],
        },
      };
      expect(actual).toEqual(expected);
    });
  });
  describe('appendChildren', () => {
    it('should append the added items in the object', () => {
      const expected = {
        ...mockChildren,
        4: {
          content:
            'There is no other name that a person can be saved except through Jesus Christ',
        },
      };
      const actual = itemHelper.appendChildren({
        4: {
          content:
            'There is no other name that a person can be saved except through Jesus Christ',
        },
      })(mockChildren);
      expect(actual).toEqual(expected);
    });
  });
  describe('addItem()', () => {
    it("should insert the item to parent's children object and child object given the id of the folder", () => {
      const expectedFolder = {
        1: { ...mockParent, children: [mockItem.id, ...mockParent.children] },
      };
      const expectedChildren = { [mockItem.id]: mockItem, ...mockChildren };

      const result = itemHelper.addItem(
        mockParent,
        1,
        expectedChildren,
        mockItem,
      );

      expect(result.folder).toEqual(expectedFolder);
      expect(result.children).toEqual(expectedChildren);
    });
  });
  describe('deleteItem()', () => {
    it('should delete an item given the id of the passed item', () => {
      const expected = {
        folder: { 1: { ...mockParent, children: [3] } },
        children: {
          1: {
            content:
              'Jesus comes not to condemn but to save which that was lost',
          },
          3: {
            content:
              'Jesus comes not to condemn but to save which that was lost',
          },
        },
      };
      const result = itemHelper.deleteItem(mockParent, 1, mockChildren, {
        id: 2,
      });
      expect(result.folder).toEqual(expected.folder);
      expect(result.children).toEqual(expected.children);
    });
  });
  describe('batchDelete()', () => {
    it('should delete items based on the ids of array passed', () => {
      const expected = {
        folder: { 1: { ...mockParent, children: [] } },
        children: {},
      };
      const result = itemHelper.batchDelete(mockParent, 1, mockChildren, [
        { id: 2 },
        { id: 3 },
      ]);
      expect(result.folder).toEqual(expected.folder);
    });
  });
  describe('updateSingleChildren', () => {
    it('should change an attribute of the object given the id, attribute and value', () => {
      const expected = {
        1: { content: 'Jesus reign over all' },
        2: { content: 'You can everything yet forfeit your soul' },
        3: { content: 'Be reconciled to God today before it is too late' },
      };
      const result = itemHelper.updateSingleChildren(
        1,
        'content',
        'Jesus reign over all',
      )({
        1: { content: '...' },
        2: { content: 'You can everything yet forfeit your soul' },
        3: { content: 'Be reconciled to God today before it is too late' },
      });
      expect(result).toEqual(expected);
    });
  });

  describe('appendPeople', () => {
    it('should append the new whole item with another new item', () => {
      const expected = {
        1: { content: 'Jesus reign over all' },
        2: { content: 'You can everything yet forfeit your soul' },
        3: { content: 'Be reconciled to God today before it is too late' },
      };
      const param = {
        2: { content: 'You can everything yet forfeit your soul' },
        3: { content: 'Be reconciled to God today before it is too late' },
      };
      const initialPeople = {
        1: { content: 'Jesus reign over all' },
      };
      expect(itemHelper.appendPeople(param)(initialPeople)).toEqual(expected);
    });
  });
});
