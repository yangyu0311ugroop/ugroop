import { shallow } from 'enzyme';
import React from 'react';
import { User } from '../index';

describe('<User />', () => {
  let rendered;
  let instance;

  const resaga = {
    analyse: jest.fn(),
    setValue: jest.fn(),
    dispatch: jest.fn(),
  };

  const props = {
    resaga,
    renderSeatsLeft: jest.fn(),
  };

  beforeEach(() => {
    rendered = shallow(<User {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(User).toBeDefined();
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
    it('should call resaga.analyse', () => {
      rendered.setProps({ id: 1 });
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

  describe('getMeSuccess()', () => {
    it('should call setValue', () => {
      instance.getMeSuccess({
        user: { id: 1 },
        orgLists: { x: 2 },
        person: { id: 3 },
        userRelatedOrgs: { y: 4 },
        customerRelations: { cr: 1 },
        customerOrgs: { cr: 2 },
        subscriptions: { s: 1 },
        subscriptionItems: { si: 2 },
        customers: { c: 1 },
        paymentSources: { ps: 1 },
      });

      expect(resaga.setValue).toBeCalled();
      expect(resaga.setValue.mock.calls).toMatchSnapshot();
    });
  });

  describe('getUserNodeSuccess', () => {
    it('should call setValue', () => {
      instance.getUserNodeSuccess({ userNode: {} });

      expect(resaga.setValue).toBeCalledWith({ userNode: {} });
    });
  });

  describe('personSyncSuccess()', () => {
    it('should call setValue', () => {
      instance.personSyncSuccess({
        userViewModel: { x: 1 },
      });
      expect(resaga.setValue).toBeCalledWith({
        loginAcctUser: { x: 1 },
      });
    });
  });

  describe('registerDeviceSuccess', () => {
    it('should call setValue', () => {
      instance.registerDeviceSuccess(true, {
        data: { token: 'myToken' },
      });
      expect(resaga.setValue).toBeCalled();
    });
  });
  describe('componentDidMount', () => {
    it('should call setValue', () => {
      rendered.setProps({ id: 1 });
      instance.componentDidMount();
      expect(resaga.dispatch).toBeCalled();
    });
  });
  describe('render()', () => {
    it('should NOT render', () => {
      expect(instance.render()).toBe(false);
    });
  });
});
