import selectShareTokens from '..';

describe('datastore/invitationStore/hoc/selectShareSubNodeIds', () => {
  it('still matches snapshot', () => {
    expect(
      selectShareTokens({
        shareToUserIds: [1],
        nodeIds: [2],
        r: jest.fn(args => args),
      }),
    ).toMatchSnapshot();
  });

  it('still matches snapshot with resaga', () => {
    expect(selectShareTokens()).toMatchSnapshot();
  });
});
