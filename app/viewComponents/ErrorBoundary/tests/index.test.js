import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { ErrorBoundary } from '../index';

describe('<ErrorBoundary />', () => {
  let rendered;
  let instance;

  const props = {
    classes: {},
    children: '',
  };

  beforeEach(() => {
    rendered = shallow(<ErrorBoundary {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(ErrorBoundary).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  it('should render something', () => {
    expect(toJSON(rendered)).toMatchSnapshot();
  });

  it('should render error fallback if hasError state is true', () => {
    rendered.setState({
      hasError: true,
    });
    expect(toJSON(rendered)).toMatchSnapshot();
  });

  it('should render error fallback function if hasError state is true', () => {
    rendered.setProps({
      renderFallback: () => <div>My custom error</div>,
    });
    rendered.setState({
      hasError: true,
    });
    expect(toJSON(rendered)).toMatchSnapshot();
  });

  describe('componentDidCatch', () => {
    it('should set hasError state to true', () => {
      instance.componentDidCatch();
      expect(rendered.state().hasError).toBe(true);
    });
  });
});
