import selectShareSubNodeIds from '..';

describe('datastore/invitationStore/hoc/selectShareSubNodeIds', () => {
  it('still matches snapshot', () => {
    expect(
      selectShareSubNodeIds({
        nodeIds: [1],
        roles: ['role'],
        selectShareTokens: ['token'],
        shareStatuses: ['status'],
        r: jest.fn(args => args),
      }),
    ).toMatchSnapshot();
  });

  it('still matches snapshot with default properties', () => {
    expect(
      selectShareSubNodeIds({ r: jest.fn(args => args) }),
    ).toMatchSnapshot();
  });

  it('still matches snapshot with resaga', () => {
    expect(selectShareSubNodeIds()).toMatchSnapshot();
  });
});
