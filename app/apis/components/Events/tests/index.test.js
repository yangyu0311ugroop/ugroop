import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { EventsApi } from '../index';

describe('<Events />', () => {
  let rendered;
  let instance;

  const resaga = {
    setValue: jest.fn(),
    dispatchTo: jest.fn(),
    analyse: jest.fn(),
  };

  const props = {
    classes: {},
    resaga,
  };

  beforeEach(() => {
    rendered = shallow(<EventsApi {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(EventsApi).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('componentWillReceiveProps', () => {
    it('should have call analyse with particular params', () => {
      instance.componentWillReceiveProps({});

      expect(resaga.analyse.mock.calls).toMatchSnapshot();
    });
  });

  describe('shouldComponentUpdate', () => {
    it('should return false', () => {
      expect(instance.shouldComponentUpdate()).toBe(false);
    });
  });

  describe('render()', () => {
    it('should render correctly', () => {
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
});
