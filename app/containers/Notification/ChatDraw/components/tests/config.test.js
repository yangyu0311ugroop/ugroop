import { CONFIG, CONFIG1 } from '../config';

test('Test Config', () => {
  expect(CONFIG.value).toMatchSnapshot();
});

test('Test Config Setvalue', () => {
  expect(CONFIG.setValue).toMatchSnapshot();
});

test('Test Config1', () => {
  expect(CONFIG1.value).toMatchSnapshot();
});
