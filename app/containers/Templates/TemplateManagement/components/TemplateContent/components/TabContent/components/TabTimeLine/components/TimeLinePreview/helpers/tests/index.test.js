import helper from '../index';
const data = [
  {
    content: 'Day1',
    id: 3,
    children: [],
    nextNodes: [
      {
        content: 'Day2',
        type: 'day',
        id: 4,
        nextNodes: [
          {
            content: 'sdfsdf',
            type: 'day',
            id: 7,
            nextNodes: [],
          },
        ],
        customData: {},
      },
    ],
    customData: {},
  },
];
const data1 = [
  {
    content: 'Day1',
    id: 3,
    children: [],
    nextNodes: [],
  },
];
const data2 = [
  {
    content: 'Day1',
    id: 3,
    children: [],
    nextNodes: [
      {
        content: 'Day2',
        type: 'day',
        id: 4,
        nextNodes: [],
        customData: {},
      },
    ],
    customData: {},
  },
];

describe('traverseToLastNode', () => {
  it('shall return last node id 7', () => {
    const node = helper.traverseToLastNode(data);
    expect(node.id).toBe(data[0].nextNodes[0].nextNodes[0].id);
  });
  it('shall return last node id 3', () => {
    const node = helper.traverseToLastNode(data1);
    expect(node.id).toBe(data1[0].id);
  });
  it('shall return last node id 4', () => {
    const node = helper.traverseToLastNode(data2);
    expect(node.id).toBe(data[0].nextNodes[0].id);
  });
});

describe('convertToArrayLists', () => {
  it('shall return correct array lists', () => {
    const lists = helper.convertToArrayLists(data);
    expect(lists.length).toBe(3);
    expect(lists[0].id).toBe(data[0].id);
    expect(lists[1].id).toBe(data[0].nextNodes[0].id);
    expect(lists[2].id).toBe(data[0].nextNodes[0].nextNodes[0].id);
  });
  it('shall return empty lists', () => {
    const lists = helper.convertToArrayLists([]);
    expect(lists.length).toBe(0);
  });
  it('shall return empty lists', () => {
    const lists = helper.convertToArrayLists(null);
    expect(lists.length).toBe(0);
  });
});
