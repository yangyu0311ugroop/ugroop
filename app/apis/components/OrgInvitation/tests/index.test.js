import { shallow } from 'enzyme';
import React from 'react';
import { OrgInvitation } from '../index';

describe('<OrgInvitation />', () => {
  let rendered;
  let instance;

  const resaga = {
    analyse: jest.fn(),
    setValue: jest.fn(),
  };

  const props = {
    resaga,
    tourAbilities: { someRole: 'someRole' },
  };

  beforeEach(() => {
    jest.clearAllMocks();
    rendered = shallow(<OrgInvitation {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(OrgInvitation).toBeDefined();
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

  describe('confirmInvitationSuccess()', () => {
    it('should call resaga.setValue', () => {
      instance.addAbility = jest.fn();

      instance.confirmInvitationSuccess({
        orgUser: { orgId: 2233 },
        orgInvitations: [1, 2],
        notifications: [3, 4],
      });

      expect(instance.addAbility).toBeCalledWith({ orgId: 2233 });
      expect(resaga.setValue).toBeCalled();
      expect(resaga.setValue.mock.calls).toMatchSnapshot();
    });
  });

  describe('addAbility()', () => {
    it('should return null #1', () => {
      rendered.setProps({ organisationAbilities: null });

      expect(instance.addAbility({})).toBe(null);
    });

    it('should return null #2', () => {
      rendered.setProps({ organisationAbilities: { admin: [] } });

      expect(instance.addAbility({ role: 'admin' })).toBe(null);
    });

    it('should call resaga.setValue', () => {
      rendered.setProps({ resaga, organisationAbilities: { admin: [1, 2] } });

      instance.addAbility({ role: 'admin' });

      expect(resaga.setValue).toBeCalled();
      expect(resaga.setValue.mock.calls).toMatchSnapshot();
    });
  });

  describe('render()', () => {
    it('should NOT render', () => {
      expect(instance.render()).toBe(false);
    });
  });
});
