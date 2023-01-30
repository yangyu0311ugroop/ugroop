import selectUserNodeIds from '..';

describe('datastore/invitationStore/hoc/selectUserNodeIds', () => {
  it('still matches snapshot', () => {
    expect(
      selectUserNodeIds({
        userIds: [1],
        nodeIds: [2],
        r: jest.fn(args => args),
      }),
    ).toMatchSnapshot();
  });

  it('still matches snapshot with resaga', () => {
    expect(selectUserNodeIds()).toMatchSnapshot();
  });
});
