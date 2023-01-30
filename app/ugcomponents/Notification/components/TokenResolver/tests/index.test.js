import { DO_NOTHING } from 'appConstants';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { TokenResolver } from '../index';

describe('<TokenResolver />', () => {
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
    rendered = shallow(<TokenResolver {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(TokenResolver).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('componentDidMount()', () => {
    it('should componentDidMount correctly', () => {
      instance.resolveToken = jest.fn();

      instance.componentDidMount();

      expect(instance.resolveToken).toBeCalledWith();
    });
  });

  describe('onSuccess()', () => {
    it('should call onSuccess if exist', () => {
      const onSuccess = jest.fn();
      rendered.setProps({ onSuccess });

      instance.onSuccess(1, 2, 3, 4);

      expect(onSuccess).toBeCalledWith(1, 2, 3, 4);
    });

    it('should DO_NOTHING if !exist', () => {
      rendered.setProps({ onSuccess: null });

      expect(instance.onSuccess(1, 2, 3, 4)).toBe(DO_NOTHING);
    });
  });

  describe('onError()', () => {
    it('should call onError if exist', () => {
      const onError = jest.fn();
      rendered.setProps({ onError });

      instance.onError(1, 2, 3, 4);

      expect(onError).toBeCalledWith(1, 2, 3, 4);
    });

    it('should DO_NOTHING if !exist', () => {
      rendered.setProps({ onError: null });

      expect(instance.onError(1, 2, 3, 4)).toBe(DO_NOTHING);
    });
  });

  describe('resolveToken()', () => {
    it('should call resolveToken if exist', () => {
      rendered.setProps({ token: 'abcd' });

      instance.resolveToken();

      expect(resaga.dispatchTo).toBeCalled();
      expect(resaga.dispatchTo.mock.calls).toMatchSnapshot();
    });

    it('should DO_NOTHING if !exist', () => {
      rendered.setProps({ token: null });

      expect(instance.resolveToken(1, 2, 3, 4)).toBe(DO_NOTHING);
    });
  });

  describe('render()', () => {
    it('should render correctly', () => {
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
});
