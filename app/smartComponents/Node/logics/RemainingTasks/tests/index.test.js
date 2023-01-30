import { DO_NOTHING } from 'appConstants';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { RemainingTasks } from '../index';

describe('<RemainingTasks />', () => {
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

  const children = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    rendered = shallow(<RemainingTasks {...props}>{children}</RemainingTasks>);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(RemainingTasks).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('componentDidMount()', () => {
    it('should call updatePercentage', () => {
      rendered.setProps({ percentage: 66 });
      instance.updatePercentage = jest.fn(() => 'updatePercentage');

      instance.componentDidMount();

      expect(instance.updatePercentage).toBeCalledWith(66);
    });
  });

  describe('componentWillReceiveProps()', () => {
    it('should call updatePercentage', () => {
      rendered.setProps({ percentage: 66 });
      instance.updatePercentage = jest.fn(() => 'updatePercentage');

      instance.componentWillReceiveProps({ percentage: 99 });

      expect(instance.updatePercentage).toBeCalledWith(99);
    });
  });

  describe('updatePercentage()', () => {
    it('should return DO_NOTHING', () => {
      rendered.setProps({ id: [1] });

      instance.updatePercentage(99);

      expect(instance.updatePercentage(99)).toBe(DO_NOTHING);
    });

    it('should call resaga.setValue', () => {
      rendered.setProps({ id: 2233 });

      instance.updatePercentage(99);

      expect(resaga.setValue).toBeCalledWith({ percentage: 99 });
    });
  });

  describe('render()', () => {
    it('should render correctly', () => {
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();

      expect(children).toBeCalled();
      expect(children.mock.calls).toMatchSnapshot();
    });
  });
});
