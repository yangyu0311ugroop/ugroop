import { CONFIG } from '../config';
test('Config', () => {
  expect(CONFIG.value.archivedChannels({ templateId: 1 })).toMatchSnapshot();
});
