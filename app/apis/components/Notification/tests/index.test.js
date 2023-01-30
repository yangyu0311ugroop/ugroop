import { shallow } from 'enzyme';
import React from 'react';
import { Notification } from '../index';

describe('<Notification />', () => {
  let rendered;
  let instance;

  const resaga = {
    analyse: jest.fn(),
    setValue: jest.fn(),
    dispatchTo: jest.fn(),
  };

  const props = {
    resaga,
  };

  beforeEach(() => {
    rendered = shallow(<Notification {...props} />);
    instance = rendered.instance();
    jest.clearAllMocks();
  });

  it('should exists', () => {
    expect(Notification).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('componentWillReceiveProps()', () => {
    it('should call resaga.analyse', () => {
      instance.componentWillReceiveProps({ hi: 'hooo' });
      expect(resaga.analyse).toBeCalled();
      expect(resaga.analyse.mock.calls).toMatchSnapshot();
    });
  });

  describe('componentDidMount()', () => {
    it('should call resaga.analyse', () => {
      instance.componentDidMount();
      expect(resaga.dispatchTo).toBeCalled();
      expect(resaga.dispatchTo.mock.calls).toMatchSnapshot();
    });
  });

  describe('shouldComponentUpdate()', () => {
    it('should NOT shouldComponentUpdate', () => {
      expect(instance.shouldComponentUpdate()).toBe(false);
    });
  });

  describe('notificationReceivedSuccess', () => {
    it('shall call right function', () => {
      instance.notificationReceivedSuccess('aa');
      expect(resaga.setValue).toBeCalledWith('aa');
    });
  });

  describe('render()', () => {
    it('should NOT render', () => {
      expect(instance.render()).toBe(false);
    });
  });
});
