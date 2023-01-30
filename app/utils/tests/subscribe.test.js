import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import configureStore from 'redux-mock-store';
import { createResagaSubscriber, ResagaSubscriber } from '../subscribe';

const middlewares = [];
const mockStore = configureStore(middlewares);

describe('utils/subscribe', () => {
  describe('createResagaSubscriber', () => {
    it('should return resaga component', () => {
      const Subscriber = createResagaSubscriber({ value: {}, setValue: {} });
      const rendered = shallow(<Subscriber store={mockStore({})} />);
      expect(toJSON(rendered)).toMatchSnapshot();
    });
  });

  describe('ResagaSubscriber', () => {
    let rendered;
    let instance;

    const props = {
      children: jest.fn(),
      subscribe: jest.fn(),
    };

    beforeEach(() => {
      rendered = shallow(<ResagaSubscriber {...props} />);
      instance = rendered.instance();
      jest.clearAllMocks();
    });
    describe('componentDidMount', () => {
      it('should call executeSubscribeFunction', () => {
        rendered.setProps({
          sampleProp: 1,
        });
        instance.executeSubscribeFunction = jest.fn();
        instance.componentDidMount();
        expect(instance.executeSubscribeFunction).toBeCalledWith({
          sampleProp: 1,
        });
      });
    });
    describe('getSubscribedValues', () => {
      it('should return props with omitted attributes like resaga, children and subscribe', () => {
        rendered.setProps({
          sampleProp: 1,
        });
        const value = instance.getSubscribedValues();
        expect(value).toEqual({ sampleProp: 1 });
      });
    });

    describe('executeSubscribeFunction', () => {
      it('should run subscribe props if subscribe prop is function', () => {
        instance.executeSubscribeFunction({ sampleProp: 1 });
        expect(props.subscribe).toBeCalledWith({
          sampleProp: 1,
        });
      });
      it('should not run subscribe props if subscribe prop is not a function', () => {
        rendered.setProps({
          subscribe: null,
        });
        instance.executeSubscribeFunction({ sampleProp: 1 });
        expect(props.subscribe).not.toBeCalled();
      });
    });
    describe('render', () => {
      it('should execute function prop and pass on the prop', () => {
        rendered.setProps({
          sampleProp: 1,
        });
        rendered.setProps({
          sampleProp2: 2,
        });
        expect(props.children).toBeCalledWith({
          sampleProp: 1,
          sampleProp2: 2,
        });
      });
      it('should return null if props children is not function', () => {
        rendered.setProps({
          children: null,
        });
        expect(toJSON(rendered)).toMatchSnapshot();
      });
    });
  });
});
