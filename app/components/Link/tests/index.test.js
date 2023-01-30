import React from 'react';
import { UGLinkTest, refreshOrPushLink } from 'components/Link';
import ShallowRenderer from 'react-test-renderer/shallow';

const renderer = new ShallowRenderer();
const children = <h1>Test</h1>;

let history;
let onClick;

let renderComponent;

beforeEach(() => {
  onClick = jest.fn();
  history = {
    push: jest.fn(),
  };
  renderComponent = () =>
    renderer.render(<UGLinkTest history={history}>{children}</UGLinkTest>);
});

afterEach(() => {
  onClick.mockReset();
  history.push.mockReset();
});

test('should have children', () => {
  const renderedComponent = renderComponent();
  expect(renderedComponent.props.children).toEqual(children);
  renderedComponent.props.onClick({ preventDefault: jest.fn() });
});

test('onclick special key', () => {
  const renderedComponent = renderComponent();
  renderedComponent.props.onClick({
    metaKey: true,
  });
  renderedComponent.props.onClick({
    ctrlKey: true,
  });
});

test('refreshOrPushLink', () => {
  refreshOrPushLink({
    onClick,
    to: 'abcd',
    history,
  })({ preventDefault: jest.fn() });
  expect(onClick).toBeCalled();
  expect(history.push).toBeCalled();
});

test('refreshOrPushLink', () => {
  window.swUpdate = true;
  refreshOrPushLink({
    onClick,
    to: 'abcd',
    history,
  })({ preventDefault: jest.fn() });
  expect(onClick).not.toBeCalled();
  expect(history.push).not.toBeCalled();
});
