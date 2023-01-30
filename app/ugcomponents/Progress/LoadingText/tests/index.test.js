import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { LoadingText } from '../index';

describe('<LoadingText />', () => {
  let rendered;
  let instance;

  const resaga = {
    setValue: jest.fn(),
    dispatchTo: jest.fn(),
  };

  const props = {
    classes: {},
    resaga,
  };

  beforeEach(() => {
    rendered = shallow(<LoadingText {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(LoadingText).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('componentDidMount()', () => {
    it('should setInterval', () => {
      global.setInterval = jest.fn(() => 999);

      instance.componentDidMount();

      expect(instance.updateDots).toBe(999);
    });
  });

  describe('componentWillUnmount()', () => {
    it('should setInterval', () => {
      global.clearInterval = jest.fn();

      instance.componentWillUnmount();

      expect(global.clearInterval).toBeCalledWith(instance.updateDots);
    });
  });

  describe('addDots()', () => {
    it('should add dots', () => {
      rendered.setState({ dots: '.' });

      instance.addDots();

      expect(rendered.state().dots).toBe('..');
    });

    it('should reset dots', () => {
      rendered.setState({ dots: '...' });

      instance.addDots();

      expect(rendered.state().dots).toBe('');
    });
  });

  describe('renderIcon()', () => {
    it('should renderIcon', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderIcon);
    });
  });

  describe('renderSplash()', () => {
    it('should renderSplash', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderSplash);
    });
  });

  describe('render()', () => {
    it('should return null', () => {
      rendered.setProps({ show: false });

      expect(instance.render()).toBe(null);
    });

    it('should renderIcon', () => {
      instance.renderIcon = jest.fn(() => 'renderIcon');
      rendered.setProps({ icon: true });

      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });

    it('should renderSplash', () => {
      instance.renderSplash = jest.fn(() => 'renderSplash');
      rendered.setProps({ splash: true });

      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });

    it('should render correctly', () => {
      rendered.setProps({ text: 'Loading' });
      rendered.setState({ dots: '...' });

      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
});
