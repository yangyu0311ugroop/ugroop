import { CONFIG } from '../config';

test('Test Config', () => {
  expect(CONFIG.value).toMatchSnapshot();
});

test('Test SetConfig', () => {
  expect(CONFIG.setValue).toMatchSnapshot();
});
