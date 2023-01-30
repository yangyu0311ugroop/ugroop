import React, { Component } from 'react';
import { shallow } from 'enzyme';
import makeContainerExplorer from '../index';

describe('makeContainerExplorer HOC', () => {
  const FETCH_CHILDREN = 'fetchChildren';
  class SampleComponent extends Component {
    componentDidMount = () => {};

    render = () => <h1>God is good!</h1>;
  }
  const sampleConfig = {
    pageName: 'Jesus is the King of kings and the Lord of lords',
    action: FETCH_CHILDREN,
  };
  it('should return component', () => {
    const RComponent = makeContainerExplorer(SampleComponent, sampleConfig);
    const result = shallow(<RComponent />);

    expect(result).toBeDefined();
  });
  describe('componentWillReceiveProps', () => {
    it('should call resaga.analyse', () => {
      const mockResaga = {
        analyse: jest.fn(),
      };
      const RComponent = makeContainerExplorer(SampleComponent, sampleConfig);
      const wrapper = shallow(<RComponent resaga={mockResaga} />);

      wrapper.setProps({ something: 111 });
      expect(mockResaga.analyse).toBeCalled();
    });
  });
  describe('fetchChildrenOnError', () => {
    it('should set error true and isLoading false', () => {
      const RComponent = makeContainerExplorer(SampleComponent, sampleConfig);
      const wrapper = shallow(<RComponent />);

      wrapper.instance().fetchChildrenOnError();
      expect(wrapper.state('isLoading')).toBe(false);
      expect(wrapper.state('error')).toBe(true);
    });
  });
  describe('fetchChildrenOnSuccess', () => {
    it('should set error false and isLoading false', () => {
      const RComponent = makeContainerExplorer(SampleComponent, sampleConfig);
      const wrapper = shallow(<RComponent />);

      const sampleData = { sample: 123 };

      wrapper.instance().fetchChildrenOnSuccess(sampleData);
      expect(wrapper.state('isLoading')).toBe(false);
      expect(wrapper.state('error')).toBe(false);
      expect(wrapper.state('data')).toEqual(sampleData);
    });
  });
  describe('fetchChildren', () => {
    it('should call resaga.dispatch', () => {
      const mockResaga = {
        dispatch: jest.fn(),
      };
      const RComponent = makeContainerExplorer(SampleComponent, sampleConfig);
      const wrapper = shallow(<RComponent resaga={mockResaga} />);

      wrapper.instance().fetchChildren('sampleUrl');
      expect(mockResaga.dispatch).toBeCalledWith('sampleUrl', FETCH_CHILDREN);
    });
  });

  describe('resetState', () => {
    it('should reset the state of the component to the original form', () => {
      const mockResaga = {
        dispatch: jest.fn(),
      };
      const RComponent = makeContainerExplorer(SampleComponent, sampleConfig);
      const wrapper = shallow(<RComponent resaga={mockResaga} />);
      const originalState = wrapper.state();
      wrapper.setState({
        isLoading: true,
        data: ['1', '2', '3'],
        error: true,
      });

      expect(wrapper.state()).not.toEqual(originalState);
      wrapper.instance().resetState();
      expect(wrapper.state()).toEqual(originalState);
    });
  });
});
