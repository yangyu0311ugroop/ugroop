import selectUserNodeUserIds from '..';

describe('datastore/invitationStore/hoc/selectUserNodeUserIds', () => {
  it('still matches snapshot', () => {
    expect(
      selectUserNodeUserIds({
        nodeIds: [2],
        r: jest.fn(args => args),
      }),
    ).toMatchSnapshot();
  });

  it('still matches snapshot with resaga', () => {
    expect(selectUserNodeUserIds()).toMatchSnapshot();
  });
});
