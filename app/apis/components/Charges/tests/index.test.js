import { shallow } from 'enzyme';
import React from 'react';
import { ChargesAPI } from '../index';

describe('<ChargesAPI />', () => {
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
    rendered = shallow(<ChargesAPI {...props} />);
    instance = rendered.instance();
    jest.clearAllMocks();
  });

  it('should exists', () => {
    expect(ChargesAPI).toBeDefined();
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
