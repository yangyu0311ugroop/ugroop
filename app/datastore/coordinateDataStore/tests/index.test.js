import normaliseHelper from '../index';
const data = {
  recentActivities: [
    {
      targetType: 'template',
      targetId: 19,
      action: 'view',
      createdat: '2018-08-06 14:33:11.880',
      updatedat: '2018-08-06 14:33:11.880',
    },
    {
      // deleted template
      targetType: 'template',
      targetId: 20,
      action: 'view',
      createdat: '2018-08-06 14:33:11.880',
      updatedat: '2018-08-06 14:33:11.880',
    },
  ],
  nodes: [
    {
      content: 'ad',
      type: 'template',
      id: 19,
    },
  ],
};
describe('recentActivity', () => {
  it('should match with snapshot', () => {
    expect(normaliseHelper.normaliseRecentActivity(data)).toMatchSnapshot();
  });
  it('should match with snapshot', () => {
    expect(
      normaliseHelper.hideRecentActivity(null, { nodeId: 1 }),
    ).toMatchSnapshot();
  });
});
