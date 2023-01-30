import React from 'react';
import { UGNavLinkTest, refreshOrPushLink } from 'components/NavLink';
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
    renderer.render(
      <UGNavLinkTest history={history}>{children}</UGNavLinkTest>,
    );
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
    stopPropogationLink: true,
  })({ preventDefault: jest.fn(), stopPropagation: jest.fn() });
  expect(onClick).toBeCalled();
  expect(history.push).toBeCalled();
});

test('refreshOrPushLink', () => {
  window.swUpdate = true;
  refreshOrPushLink({
    onClick,
    to: 'abcd',
    history,
  })({ preventDefault: jest.fn(), stopPropagation: jest.fn() });
  expect(onClick).not.toBeCalled();
  expect(history.push).not.toBeCalled();
});
