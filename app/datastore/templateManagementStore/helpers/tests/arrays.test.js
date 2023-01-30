import { List } from 'immutable';
import { merge } from 'lodash';
import arrays from '../arrays';
import utils from '../utils';

describe('containers/Templates/TemplateManagement/helpers/arrays', () => {
  const array = [
    { id: 1, content: 'hi' },
    {
      id: 2,
      content: 'ho',
      children: [
        { id: 11, content: 'hoho1' },
        { id: 12, content: 'hoho2' },
        { id: 13, content: 'hoho3' },
      ],
    },
  ];

  afterEach(() => jest.clearAllMocks());

  it('should exists', () => {
    expect(arrays).toBeDefined();
    expect(typeof arrays.insert).toBe('function');
    expect(typeof arrays.update).toBe('function');
  });

  describe('convert()', () => {
    it('should return empty array if no children', () => {
      expect(arrays.convert()).toEqual([]);
      expect(arrays.convert([])).toEqual([]);
    });

    it('should convert top level', () => {
      const data = [
        {
          id: 1,
          nextNodes: [{ id: 2, nextNodes: [{ id: 3, nextNodes: [] }] }],
        },
      ];

      expect(arrays.convert(data)).toEqual([
        { id: 1, nextNodes: [] },
        { id: 2, nextNodes: [] },
        { id: 3, nextNodes: [] },
      ]);
    });

    it('should recursively convert all level', () => {
      const data = [
        {
          id: 1,
          children: [{ id: 11, nextNodes: [{ id: 12, nextNodes: [] }] }],
          nextNodes: [
            {
              id: 2,
              children: [{ id: 21, nextNodes: [{ id: 22, nextNodes: [] }] }],
              nextNodes: [
                {
                  id: 3,
                  children: [
                    { id: 31, nextNodes: [{ id: 32, nextNodes: [] }] },
                  ],
                  nextNodes: [],
                },
              ],
            },
          ],
        },
      ];

      expect(arrays.convert(data)).toEqual([
        {
          id: 1,
          nextNodes: [],
          children: [{ id: 11, nextNodes: [] }, { id: 12, nextNodes: [] }],
        },
        {
          id: 2,
          nextNodes: [],
          children: [{ id: 21, nextNodes: [] }, { id: 22, nextNodes: [] }],
        },
        {
          id: 3,
          nextNodes: [],
          children: [{ id: 31, nextNodes: [] }, { id: 32, nextNodes: [] }],
        },
      ]);
    });

    it('still matches snapshot with specified onShouldConvertAll', () => {
      const makeEvent = (id, event) => ({
        id,
        type: 'event',
        nextNodes: [event],
      });
      const makeSection = (id, section) => ({
        id,
        type: 'activity',
        nextNodes: [section],
      });
      const makeDay = (id, day) => ({
        id,
        type: 'day',
        children: [
          makeEvent(id + 1, makeEvent(id + 2)),
          makeSection(id + 3, makeSection(id + 4)),
        ],
        nextNodes: [day],
      });
      const day2 = makeDay(11);
      delete day2.children;

      const children = [
        makeDay(1, day2),
        { id: 100, type: 'someothersecondchild' },
      ];
      const onShouldConvertAll = c => c && c.length && c[0].type !== 'day';
      expect(arrays.convert(children, onShouldConvertAll)).toMatchSnapshot();
    });
  });

  describe('convertNextNodesToArray()', () => {
    it('should return empty array if no children', () => {
      expect(arrays.convertNextNodesToArray()).toEqual([]);
      expect(arrays.convertNextNodesToArray([])).toEqual([]);
    });

    it('should convertNextNodesToArray single item', () => {
      const data = {
        id: 999,
        children: [
          {
            id: 1,
            nextNodes: [{ id: 2, nextNodes: [{ id: 3, nextNodes: [] }] }],
          },
        ],
      };

      expect(arrays.convertNextNodesToArray(data)).toEqual({
        id: 999,
        children: [
          { id: 1, children: [], nextNodes: [] },
          { id: 2, children: [], nextNodes: [] },
          { id: 3, children: [], nextNodes: [] },
        ],
        nextNodes: [],
      });
    });

    it('should convertNextNodesToArray top level', () => {
      const data = [
        {
          id: 1,
          nextNodes: [{ id: 2, nextNodes: [{ id: 3, nextNodes: [] }] }],
        },
      ];

      expect(arrays.convertNextNodesToArray(data)).toEqual([
        { id: 1, children: [], nextNodes: [] },
        { id: 2, children: [], nextNodes: [] },
        { id: 3, children: [], nextNodes: [] },
      ]);
    });

    it('should recursively convertNextNodesToArray all level', () => {
      const data = [
        {
          id: 1,
          children: [{ id: 11, nextNodes: [{ id: 12, nextNodes: [] }] }],
          nextNodes: [
            {
              id: 2,
              children: [{ id: 21, nextNodes: [{ id: 22, nextNodes: [] }] }],
              nextNodes: [
                {
                  id: 3,
                  children: [
                    { id: 31, nextNodes: [{ id: 32, nextNodes: [] }] },
                  ],
                  nextNodes: [],
                },
              ],
            },
          ],
        },
      ];

      expect(arrays.convertNextNodesToArray(data)).toEqual([
        {
          id: 1,
          nextNodes: [],
          children: [
            { id: 11, children: [], nextNodes: [] },
            { id: 12, children: [], nextNodes: [] },
          ],
        },
        {
          id: 2,
          nextNodes: [],
          children: [
            { id: 21, children: [], nextNodes: [] },
            { id: 22, children: [], nextNodes: [] },
          ],
        },
        {
          id: 3,
          nextNodes: [],
          children: [
            { id: 31, children: [], nextNodes: [] },
            { id: 32, children: [], nextNodes: [] },
          ],
        },
      ]);
    });
  });

  describe('convertChecklistsToArray()', () => {
    it('should return empty array if no children', () => {
      expect(arrays.convertChecklistsToArray()).toEqual([]);
      expect(arrays.convertChecklistsToArray([])).toEqual([]);
    });

    it('should convertChecklistsToArray top level', () => {
      const data = [
        {
          id: 1,
          nextNodes: [{ id: 2, nextNodes: [{ id: 3, nextNodes: [] }] }],
        },
      ];

      expect(arrays.convertChecklistsToArray(data)).toEqual([
        { id: 1, checklists: [], nextNodes: [] },
        { id: 2, checklists: [], nextNodes: [] },
        { id: 3, checklists: [], nextNodes: [] },
      ]);
    });

    it('should recursively convertChecklistsToArray all level', () => {
      const data = [
        {
          id: 1,
          checklists: [{ id: 11, nextNodes: [{ id: 12, nextNodes: [] }] }],
          nextNodes: [
            {
              id: 2,
              checklists: [{ id: 21, nextNodes: [{ id: 22, nextNodes: [] }] }],
              nextNodes: [
                {
                  id: 3,
                  checklists: [
                    { id: 31, nextNodes: [{ id: 32, nextNodes: [] }] },
                  ],
                  nextNodes: [],
                },
              ],
            },
          ],
        },
      ];

      expect(arrays.convertChecklistsToArray(data)).toEqual([
        {
          id: 1,
          nextNodes: [],
          checklists: [{ id: 11, nextNodes: [] }, { id: 12, nextNodes: [] }],
        },
        {
          id: 2,
          nextNodes: [],
          checklists: [{ id: 21, nextNodes: [] }, { id: 22, nextNodes: [] }],
        },
        {
          id: 3,
          nextNodes: [],
          checklists: [{ id: 31, nextNodes: [] }, { id: 32, nextNodes: [] }],
        },
      ]);
    });
  });

  describe('update()', () => {
    it('should use default value', () => {
      const result = { id: 1, content: 'hiii', updatedAt: 123 };

      expect(arrays.update(result)(array)).toEqual([result, array[1]]);
    });

    it('should update first level', () => {
      const result = { id: 1, content: 'hiii', updatedAt: 123 };
      const payload = { node: { content: 'hiii', customData: 'halu' } };
      const expected = merge(payload.node, result);

      expect(arrays.update(result, payload)(array)).toEqual([
        expected,
        array[1],
      ]);
    });

    it('should update second level', () => {
      const result = { id: 11, content: 'hohoho', updatedAt: 123 };
      const payload = {
        parentId: 2,
        node: { content: 'hohoho', customData: 'hiheho' },
      };
      const expected = [
        merge(payload.node, result),
        array[1].children[1],
        array[1].children[2],
      ];

      expect(arrays.update(result, payload)(array)).toEqual([
        array[0],
        { id: 2, content: 'ho', children: expected },
      ]);
    });
  });

  describe('insert()', () => {
    it('should insert default value', () => {
      const result = { id: 3, content: 'heee', updatedAt: 234 };

      expect(arrays.insert(result)()).toEqual([result]);
    });

    it('should insert first level', () => {
      const result = { id: 3, content: 'heee', updatedAt: 234 };
      const payload = { node: { content: 'heee', customData: 'heehuu' } };
      const expected = merge(payload.node, result);

      expect(arrays.insert(result, payload)(array)).toEqual([
        ...array,
        expected,
      ]);
    });

    it('should insert second level', () => {
      const result = { id: 12, content: 'haaahaa', updatedAt: 123 };
      const payload = {
        parentId: 2,
        node: { content: 'haaahaa', customData: 'hiheho' },
      };
      const expected = merge(payload.node, result);
      const children = [...array[1].children, expected];

      expect(arrays.insert(result, payload)(array)).toEqual([
        array[0],
        { id: 2, content: 'ho', children },
      ]);
    });
  });

  describe('insertAfter()', () => {
    it('handles missing payload', () => {
      const data = [{ id: 1 }, { id: 2 }];

      expect(arrays.insertAfter({})(data)).toEqual([{ id: 1 }, { id: 2 }]);
    });

    it('should insert after first level', () => {
      const data = [{ id: 1 }, { id: 2 }];
      const payload = { id: 1, node: { id: 11 } };

      expect(arrays.insertAfter({}, payload)(data)).toEqual([
        { id: 1 },
        { id: 11 },
        { id: 2 },
      ]);
    });

    it('should insertAfter second level', () => {
      const data = [{ id: 1, children: [{ id: 11 }, { id: 12 }] }];
      const payload = { id: 11, parentId: 1, node: { id: 111 } };

      expect(arrays.insertAfter({}, payload)(data)).toEqual([
        { id: 1, children: [{ id: 11 }, { id: 111 }, { id: 12 }] },
      ]);
    });
  });

  describe('insertBefore()', () => {
    it('handles missing payload', () => {
      const data = [{ id: 1 }, { id: 2 }];

      expect(arrays.insertBefore({})(data)).toEqual([{ id: 1 }, { id: 2 }]);
    });

    it('should insertBefore first level', () => {
      const data = [{ id: 1 }, { id: 2 }];
      const payload = { id: 2, node: { id: 11 } };

      expect(arrays.insertBefore({}, payload)(data)).toEqual([
        { id: 1 },
        { id: 11 },
        { id: 2 },
      ]);
    });

    it('should insertBefore second level', () => {
      const data = [{ id: 1, children: [{ id: 11 }, { id: 12 }] }];
      const payload = { id: 12, parentId: 1, node: { id: 111 } };

      expect(arrays.insertBefore({}, payload)(data)).toEqual([
        { id: 1, children: [{ id: 11 }, { id: 111 }, { id: 12 }] },
      ]);
    });
  });

  describe('remove()', () => {
    it('should remove first level', () => {
      const data = [{ id: 1 }, { id: 2 }];
      const payload = { id: 1 };

      expect(arrays.remove(payload)(data)).toEqual([{ id: 2 }]);
    });

    it('should remove second level', () => {
      const data = [{ id: 1, children: [{ id: 11 }, { id: 12 }] }];
      const payload = { id: 11, parentId: 1 };

      expect(arrays.remove(payload)(data)).toEqual([
        { id: 1, children: [{ id: 12 }] },
      ]);
    });
  });

  describe('moveBefore()', () => {
    it('should moveBefore first level', () => {
      const data = [{ id: 1 }, { id: 2 }];
      const payload = { id: 1, toBeMovedId: 2 };

      expect(arrays.moveBefore(payload)(data)).toEqual([{ id: 2 }, { id: 1 }]);
    });

    it('should moveBefore second level', () => {
      const data = [{ id: 1, children: [{ id: 11 }, { id: 12 }] }];
      const payload = { id: 11, toBeMovedId: 12, parentId: 1 };

      expect(arrays.moveBefore(payload)(data)).toEqual([
        { id: 1, children: [{ id: 12 }, { id: 11 }] },
      ]);
    });
  });

  describe('patch()', () => {
    it('should patch first level', () => {
      const data = [{ id: 1 }, { id: 2 }];
      const payload = { content: 'aa' };

      expect(arrays.patch(1, payload)(data)).toEqual([
        { id: 1, ...payload },
        { id: 2 },
      ]);
    });
    it('should not patch if not found', () => {
      const data = [{ id: 1 }, { id: 2 }];
      const payload = { content: 'aa' };

      expect(arrays.patch(111, payload)(data)).toEqual(data);
    });
  });

  describe('removeChild()', () => {
    it('should removeChild first level, toBeMovedParentId not given', () => {
      const data = [{ id: 1, children: [{ id: 11 }, { id: 12 }] }];
      const payload = { parentId: 1, toBeMovedId: 11 };

      expect(arrays.removeChild(payload)(data)).toEqual({
        updatedArray: [{ id: 1, children: [{ id: 12 }] }],
        removedChild: { id: 11 },
      });
    });

    it('should removeChild first level, parentId not given', () => {
      const data = [{ id: 1, children: [{ id: 11 }, { id: 12 }] }];
      const payload = { toBeMovedId: 11, toBeMovedParentId: 1 };

      expect(arrays.removeChild(payload)(data)).toEqual({
        updatedArray: [{ id: 1, children: [{ id: 12 }] }],
        removedChild: { id: 11 },
      });
    });
  });

  describe('insertChild()', () => {
    it('should return original array if parentId not given', () => {
      const data = [{ id: 1, children: [{ id: 11 }] }];

      expect(arrays.insertChild()(data)).toEqual(data);
    });

    it('should insertChild', () => {
      const data = [{ id: 1, children: [{ id: 11 }] }];
      const doInsert = jest.fn(() => [{ id: 11 }, { id: 12 }]);
      const payload = { parentId: 1, doInsert };

      expect(arrays.insertChild(payload)(data)).toEqual([
        { id: 1, children: [{ id: 11 }, { id: 12 }] },
      ]);
    });
  });

  describe('moveAcross()', () => {
    it('should moveAcross', () => {
      const data = [
        { id: 1, children: [{ id: 11 }, { id: 12 }] },
        { id: 2, children: [{ id: 21 }, { id: 22 }] },
      ];
      const payload = {
        id: 11,
        parentId: 1,
        toBeMovedId: 21,
        toBeMovedParentId: 2,
      };

      expect(arrays.moveAcross(payload)(data)).toEqual([
        { id: 1, children: [{ id: 11 }, { id: 21 }, { id: 12 }] },
        { id: 2, children: [{ id: 22 }] },
      ]);
    });
  });

  describe('moveInside()', () => {
    it('should return original array if parentId not given', () => {
      const data = [
        { id: 1, children: [] },
        { id: 2, children: [{ id: 21 }, { id: 22 }] },
      ];
      const payload = { id: 11, toBeMovedId: 21, toBeMovedParentId: 2 };

      expect(arrays.moveInside(payload)(data)).toEqual(data);
    });

    it('should moveAcross if there are children', () => {
      const data = [
        { id: 1, children: [{ id: 11 }, { id: 12 }] },
        { id: 2, children: [{ id: 21 }, { id: 22 }] },
      ];
      const payload = {
        id: 11,
        parentId: 1,
        toBeMovedId: 21,
        toBeMovedParentId: 2,
      };

      expect(arrays.moveInside(payload)(data)).toEqual([
        { id: 1, children: [{ id: 11 }, { id: 21 }, { id: 12 }] },
        { id: 2, children: [{ id: 22 }] },
      ]);
    });

    it('should moveInside if children undefined', () => {
      const data = [{ id: 1 }, { id: 2, children: [{ id: 21 }, { id: 22 }] }];
      const payload = { parentId: 1, toBeMovedId: 21, toBeMovedParentId: 2 };

      expect(arrays.moveInside(payload)(data)).toEqual([
        { id: 1, children: [{ id: 21 }] },
        { id: 2, children: [{ id: 22 }] },
      ]);
    });

    it('should moveInside if children is empty array', () => {
      const data = [
        { id: 1, children: [] },
        { id: 2, children: [{ id: 21 }, { id: 22 }] },
      ];
      const payload = { parentId: 1, toBeMovedId: 21, toBeMovedParentId: 2 };

      expect(arrays.moveInside(payload)(data)).toEqual([
        { id: 1, children: [{ id: 21 }] },
        { id: 2, children: [{ id: 22 }] },
      ]);
    });
  });

  describe('moveLocally()', () => {
    it('should moveLocally after', () => {
      const data = [{ id: 1, children: [{ id: 11 }, { id: 12 }, { id: 13 }] }];
      const payload = {
        id: 11,
        parentId: 1,
        toBeMovedId: 13,
        toBeMovedParentId: 1,
      };

      expect(arrays.moveLocally(payload)(data)).toEqual([
        { id: 1, children: [{ id: 11 }, { id: 13 }, { id: 12 }] },
      ]);
    });
  });

  describe('moveAfter()', () => {
    it('should call itself multiple times if List is given', () => {
      const data = [{ id: 1 }];
      const operations = List([1, 2, 3]);
      utils.isNotMoving = jest.fn(() => true);

      expect(arrays.moveAfter(operations)(data)).toEqual(data);
      expect(utils.isNotMoving.mock.calls).toEqual([[1], [2], [3]]);

      utils.isNotMoving = jest.fn(() => false);
    });

    it('should moveInside', () => {
      const data = [
        { id: 1, children: [] },
        { id: 2, children: [{ id: 21 }, { id: 22 }] },
      ];
      const operation = {
        parentId: 1,
        toBeMovedId: 21,
        toBeMovedParentId: 2,
        action: 'MOVE_INSIDE',
      };

      expect(arrays.moveAfter(operation)(data)).toEqual([
        { id: 1, children: [{ id: 21 }] },
        { id: 2, children: [{ id: 22 }] },
      ]);
    });

    it('should moveAcross', () => {
      const data = [
        { id: 1, children: [{ id: 11 }] },
        { id: 2, children: [{ id: 21 }, { id: 22 }] },
      ];
      const operation = {
        id: 11,
        parentId: 1,
        toBeMovedId: 21,
        toBeMovedParentId: 2,
      };

      expect(arrays.moveAfter(operation)(data)).toEqual([
        { id: 1, children: [{ id: 11 }, { id: 21 }] },
        { id: 2, children: [{ id: 22 }] },
      ]);
    });

    it('should moveLocally', () => {
      const data = [{ id: 1, children: [{ id: 11 }, { id: 12 }, { id: 13 }] }];
      const operation = {
        id: 11,
        parentId: 1,
        toBeMovedId: 13,
        toBeMovedParentId: 1,
      };

      expect(arrays.moveAfter(operation)(data)).toEqual([
        { id: 1, children: [{ id: 11 }, { id: 13 }, { id: 12 }] },
      ]);
    });
  });

  describe('isEqual()', () => {
    it('should return false if lengths are different', () => {
      expect(arrays.isEqual([1], [2, 3])).toBe(false);
      expect(arrays.isEqual([1, 2], [3])).toBe(false);
    });

    it('should return true if array not given', () => {
      expect(arrays.isEqual()).toBe(true);
    });

    it('should return utils.equaliser if parentId not given', () => {
      utils.equaliser = jest.fn(() => () => true);
      expect(arrays.isEqual([1, 2], [3, 4])).toBe(false);

      expect(utils.equaliser.mock.calls.length).toBe(1);
    });

    it('should return utils.equaliser if parentId given', () => {
      const operation = { parentId: 1 };
      utils.equaliser = jest.fn(() => () => false);
      expect(
        arrays.isEqual(
          [{ id: 1, children: [11] }],
          [{ id: 1, children: [11] }],
          operation,
        ),
      ).toBe(true);

      expect(utils.equaliser.mock.calls.length).toBe(1);
    });
  });

  describe('isAllEqual()', () => {
    it('should return true if no origin', () => {
      expect(arrays.isAllEqual([{ id: 1 }, { id: 2 }])).toBe(true);
    });

    it('should return false if at least 1 origin index !== parentIndex', () => {
      expect(
        arrays.isAllEqual([
          { id: 2, origin: { index: 1 } },
          { id: 1, origin: { index: 0 } },
        ]),
      ).toBe(false);
    });

    it('should return true if no children or children is empty', () => {
      expect(
        arrays.isAllEqual([
          { id: 1, origin: { index: 0 } },
          { id: 2, origin: { index: 1 }, children: [] },
        ]),
      ).toBe(true);
    });

    it('should return true if children has no origin', () => {
      expect(
        arrays.isAllEqual([
          { id: 1, origin: { index: 0 }, children: [{ id: 11 }, { id: 12 }] },
        ]),
      ).toBe(true);
    });

    it('should return false if children are moved 1', () => {
      expect(
        arrays.isAllEqual([
          {
            id: 2,
            origin: { index: 0 },
            children: [
              { origin: { parentId: 3, parentIndex: 0, sectionIndex: 0 } },
            ],
          },
        ]),
      ).toBe(false);
    });

    it('should return false if children are moved 2', () => {
      expect(
        arrays.isAllEqual([
          {
            id: 3,
            origin: { index: 0 },
            children: [
              { origin: { parentId: 3, parentIndex: 1, sectionIndex: 0 } },
            ],
          },
        ]),
      ).toBe(false);
    });

    it('should return false if children are moved 3', () => {
      expect(
        arrays.isAllEqual([
          {
            id: 4,
            origin: { index: 0 },
            children: [
              { origin: { parentId: 4, parentIndex: 0, sectionIndex: 1 } },
            ],
          },
        ]),
      ).toBe(false);
    });
  });

  describe('setIndex()', () => {
    it('should set index if no children', () => {
      const data = [{ id: 1 }];

      expect(arrays.setIndex(data)).toEqual([
        {
          id: 1,
          origin: { index: 0 },
        },
      ]);
    });

    it('should set index', () => {
      const data = [
        {
          id: 1,
          children: [
            { id: 11 },
            {
              id: 22,
              origin: { parentId: 2, parentIndex: 1, sectionIndex: 1 },
            },
          ],
        },
        {
          id: 2,
          children: [
            {
              id: 21,
              origin: { parentId: 2, parentIndex: 1, sectionIndex: 0 },
            },
          ],
        },
      ];

      expect(arrays.setIndex(data)).toEqual([
        {
          id: 1,
          origin: { index: 0 },
          children: [
            {
              id: 11,
              origin: { parentId: 1, parentIndex: 0, sectionIndex: 0 },
            },
            {
              id: 22,
              origin: { parentId: 1, parentIndex: 0, sectionIndex: 1 },
            },
          ],
        },
        {
          id: 2,
          origin: { index: 1 },
          children: [
            {
              id: 21,
              origin: { parentId: 2, parentIndex: 1, sectionIndex: 0 },
            },
          ],
        },
      ]);
    });
  });
});
