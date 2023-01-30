import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { scroller } from 'react-scroll/modules';
import React from 'react';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { DayNavigator } from '../index';

describe('<DayNavigator />', () => {
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
    rendered = shallow(<DayNavigator {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(DayNavigator).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('handleClick()', () => {
    it('should handleClick()', () => {
      rendered.setProps({});
      instance.scrolling = jest.fn();
      scroller.scrollTo = jest.fn(() => '');

      instance.handleClick(2233)();

      TEST_HELPERS.expectCalledAndMatchSnapshot(instance.scrolling);
      TEST_HELPERS.expectCalledAndMatchSnapshot(resaga.setValue);
    });
  });

  describe('scrolling()', () => {
    it('should scrolling()', () => {
      scroller.scrollTo = jest.fn(() => '');

      instance.scrolling(2233)();

      TEST_HELPERS.expectCalledAndMatchSnapshot(scroller.scrollTo);
    });
  });

  describe('componentWillUnmount()', () => {
    it('should call clearTimeout', () => {
      global.clearTimeout = jest.fn();

      instance.componentWillUnmount();

      expect(global.clearTimeout).toBeCalled();
    });
  });

  describe('renderDefault()', () => {
    it('should renderDefault', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderDefault);
    });
  });

  describe('renderMinimise()', () => {
    it('should return label', () => {
      rendered.setProps({ label: 'Some label' });

      expect(instance.renderMinimise()).toBe('Some label');
    });

    it('should renderMinimise', () => {
      rendered.setProps({ label: '' });

      TEST_HELPERS.expectMatchSnapshot(instance.renderMinimise);
    });
  });

  describe('render()', () => {
    it('should render minimise', () => {
      rendered.setProps({ minimise: true });

      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });

    it('should render default', () => {
      rendered.setProps({ minimise: false });

      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
});
