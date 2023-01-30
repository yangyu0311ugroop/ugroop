import { CONFIRMED, DO_NOTHING, PENDING } from 'appConstants';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { NotificationPage } from '../index';

describe('<NotificationPage />', () => {
  let rendered;
  let instance;

  const resaga = {
    setValue: jest.fn(),
    dispatchTo: jest.fn(),
  };

  const history = {
    push: jest.fn(),
  };

  const props = {
    classes: {},
    match: {},
    resaga,
    history,
  };

  beforeEach(() => {
    rendered = shallow(<NotificationPage {...props} />);
    instance = rendered.instance();

    jest.clearAllMocks();
  });

  it('should exists', () => {
    expect(NotificationPage).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('componentWillReceiveProps()', () => {
    it('should push if me changed', () => {
      rendered.setProps({ me: 'meee' });
      rendered.setState({ redirectTo: '/somewhere' });

      instance.componentWillReceiveProps({ me: null });

      expect(history.push).toBeCalledWith('/somewhere');
    });

    it('should DO_NOTHING', () => {
      expect(instance.componentWillReceiveProps()).toBe(DO_NOTHING);
    });
  });

  describe('redirectTo()', () => {
    it('should redirect to decline invitation page', () => {
      rendered.setProps({ decline: true });
      expect(instance.redirectTo({}, 123)).toBe(`/invitation/${123}/decline`);
    });

    it('should redirect to login if registered', () => {
      expect(instance.redirectTo({ registered: true }, 123)).toBe(
        `/login/${123}?redirect=/`,
      );
    });

    it('should redirect to registration if registered', () => {
      expect(instance.redirectTo({ registered: false }, 123)).toBe(
        `/registration/${123}`,
      );
    });
  });

  describe('fetchSuccess()', () => {
    it('should setState.accepted', () => {
      instance.fetchSuccess({ status: CONFIRMED }, { tokenId: '123' });

      expect(rendered.state().accepted).toBe(true);
    });

    it('should setState.error', () => {
      instance.fetchSuccess({ status: 'error' }, { tokenId: '123' });

      expect(rendered.state().error).toBe(true);
    });

    it('should set error if wrong user', () => {
      rendered.setProps({ me: 'mee' });
      instance.redirectTo = jest.fn(() => 'redirectTo');

      instance.fetchSuccess(
        { status: PENDING, shareTo: 'yuuuu' },
        { tokenId: '123' },
      );
      expect(history.push).toBeCalledWith('/admin?shareTo=yuuuu&token=123');
    });

    it('should redirect', () => {
      rendered.setProps({ me: 'mee' });
      instance.redirectTo = jest.fn(() => 'redirectTo');

      instance.fetchSuccess(
        { status: PENDING, shareTo: 'mee' },
        { tokenId: '123' },
      );

      expect(history.push).toBeCalledWith('redirectTo');
    });
  });

  describe('render()', () => {
    it('should render correctly', () => {
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('should render invalid error page', () => {
      rendered.setState({ error: true });
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
});
