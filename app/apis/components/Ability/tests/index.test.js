import { FIND_MY_ABILITIES } from 'apis/constants';
import { shallow } from 'enzyme';
import React from 'react';
import { Ability } from '../index';

describe('<Ability />', () => {
  let rendered;
  let instance;

  const resaga = {
    dispatch: jest.fn(),
    analyse: jest.fn(),
    setValue: jest.fn(),
  };

  const props = {
    resaga,
  };

  beforeEach(() => {
    jest.clearAllMocks();

    rendered = shallow(<Ability {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(Ability).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('componentDidMount()', () => {
    it('should call resaga.dispatch', () => {
      instance.componentDidMount();

      expect(resaga.dispatch).toBeCalledWith({}, FIND_MY_ABILITIES);
    });
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

  describe('findAbilitiesSuccess()', () => {
    it('should setValue', () => {
      instance.findAbilitiesSuccess(1, 2, 3);

      expect(resaga.setValue).toBeCalledWith(1, 2, 3);
    });

    it('should call onSuccess', () => {
      const onSuccess = jest.fn();
      rendered.setProps({ onSuccess, resaga });

      instance.findAbilitiesSuccess(1, 2, 3);

      expect(resaga.setValue).toBeCalledWith(1, 2, 3);
      expect(onSuccess).toBeCalledWith(1, 2, 3);
    });
  });

  describe('render()', () => {
    it('should NOT render', () => {
      expect(instance.render()).toBe(false);
    });
  });
});
