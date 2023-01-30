import { shallow } from 'enzyme';
import React from 'react';
import { Geocodes } from '..';

describe('<Geocodes />', () => {
  let wrapper;
  let instance;

  const resaga = {
    analyse: jest.fn(),
    setValue: jest.fn(),
  };

  beforeEach(() => {
    wrapper = shallow(<Geocodes resaga={resaga} />);
    instance = wrapper.instance();
    jest.clearAllMocks();
  });

  it('exists', () => {
    expect(Node).toBeDefined();
  });

  describe('componentWillReceiveProps', () => {
    it('should call resaga analyse', () => {
      instance.componentWillReceiveProps({});
      expect(resaga.analyse).toBeCalled();
      expect(resaga.analyse.mock.calls).toMatchSnapshot();
    });
  });

  describe('shouldComponentUpdate()', () => {
    it('returns false', () => {
      expect(instance.shouldComponentUpdate()).toBe(false);
    });
  });

  describe('#render()', () => {
    it('not explodes', () => {
      expect(wrapper).toHaveLength(1);
    });

    it('renders nothing', () => {
      expect(instance.render()).toBeNull();
    });
  });
});
