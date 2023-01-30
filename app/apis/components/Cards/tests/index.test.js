import { shallow } from 'enzyme';
import React from 'react';
import { CardsAPI } from '../index';

describe('<CardsAPI />', () => {
  let rendered;
  let instance;

  const resaga = {
    analyse: jest.fn(),
    setValue: jest.fn(),
  };

  const props = {
    resaga,
  };

  beforeEach(() => {
    rendered = shallow(<CardsAPI {...props} />);
    instance = rendered.instance();
    jest.clearAllMocks();
  });

  it('should exists', () => {
    expect(CardsAPI).toBeDefined();
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

  describe('shouldComponentUpdate()', () => {
    it('should NOT shouldComponentUpdate', () => {
      expect(instance.shouldComponentUpdate()).toBe(false);
    });
  });
});
