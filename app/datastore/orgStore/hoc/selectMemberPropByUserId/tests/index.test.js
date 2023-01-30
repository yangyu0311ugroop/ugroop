import selectMemberPropByUserId from '..';

describe('app/datastore/orgStore/hoc/selectMemberPropByUserId', () => {
  it('still matches snapshot', () => {
    expect(
      selectMemberPropByUserId({
        orgId: 'orgId',
        userId: 'userId',
        keyProp: 'role',
        outputProp: 'role',
      }),
    ).toMatchSnapshot();
  });

  it('still matches snapshot with resaga', () => {
    expect(selectMemberPropByUserId()).toMatchSnapshot();
  });
});
