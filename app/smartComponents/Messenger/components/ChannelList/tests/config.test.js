import { CONFIG2 } from '../config';

test('CONFIG2', () => {
  expect(CONFIG2.value.newChannelId({ templateId: 1 })).toMatchSnapshot();
  expect(
    CONFIG2.value.channelDrawActiveChannelId({ templateId: 1 }),
  ).toMatchSnapshot();
  expect(CONFIG2.value.archivedChannels({ templateId: 1 })).toMatchSnapshot();
  expect(
    CONFIG2.value.resetActiveChannelId({ templateId: 1 }),
  ).toMatchSnapshot();
});
