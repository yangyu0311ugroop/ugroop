import { TEMPLATE_API_HELPERS } from 'apis/components/Template/helpers';
import { PORTAL_HELPERS } from 'containers/Portal/helpers';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
// import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { InviteSelf } from '../index';
import { ability } from '../../../../../../../apis/components/Ability/ability';

describe('<InviteSelf />', () => {
  let rendered;
  let instance;

  const resaga = {
    setValue: jest.fn(),
    dispatchTo: jest.fn(),
  };

  const props = {
    id: 999,
    classes: {},
    resaga,
  };

  beforeEach(() => {
    jest.clearAllMocks();

    rendered = shallow(<InviteSelf {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(InviteSelf).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('getUserConnected()', () => {
    it('should getUserConnected', () => {
      rendered.setProps({
        userId: 2,
        userNodeUserIds: [1, 3],
      });
      expect(instance.getUserConnected()).toEqual(false);
    });
    it('should getUserConnected', () => {
      rendered.setProps({
        userId: 1,
        userNodeUserIds: [1, 3],
      });
      expect(instance.getUserConnected()).toEqual(true);
    });
  });

  describe('canJoin()', () => {
    it('should canJoin', () => {
      ability.can = jest.fn(() => true);
      rendered.setProps({
        userId: 2,
        ownerId: 1,
        isMember: false,
      });
      expect(instance.canJoin()).toEqual(false);
    });
    it('should canJoin', () => {
      instance.getUserConnected = jest.fn(() => false);
      rendered.setProps({
        userId: 1,
        ownerId: 2,
        isMember: true,
      });
      instance.hasAccess = jest.fn(() => true);
      expect(instance.canJoin()).toEqual(true);
    });
  });

  describe('handleSendInvitation()', () => {
    it('should handleSendInvitation', () => {
      TEMPLATE_API_HELPERS.addMyOwnRole = jest.fn();
      instance.handleSendInvitation();
      expect(TEMPLATE_API_HELPERS.addMyOwnRole).toHaveBeenCalled();
    });
    it('should handleSendInvitation', () => {
      instance.getUserConnected = jest.fn(() => true);
      TEMPLATE_API_HELPERS.addMyOwnRole = jest.fn();
      instance.handleSendInvitation();
      expect(TEMPLATE_API_HELPERS.addMyOwnRole).not.toBeCalled();
    });
  });
  describe('addMyRoleSuccess()', () => {
    it('should addMyRoleSuccess', () => {
      instance.addMyRoleSuccess();
      expect(rendered.state().sending).toBe(false);
    });
  });

  describe('addMyRoleFailure()', () => {
    it('should addMyRoleFailure', () => {
      instance.addMyRoleFailure();
      expect(rendered.state().sending).toBe(false);
    });
  });

  describe('confirmJoin()', () => {
    it('should confirmJoin', () => {
      PORTAL_HELPERS.prompt = jest.fn();
      instance.confirmJoin();
      expect(PORTAL_HELPERS.prompt).toBeCalled();
    });
  });
  describe('joinTour()', () => {
    it('should render correctly', () => {
      rendered.setState({ error: true });
      const snapshot = shallow(<div>{instance.joinTour()}</div>);
      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('render()', () => {
    it('should render correctly', () => {
      rendered.joinTour = jest.fn();
      instance.hasAccess = jest.fn(() => true);
      const snapshot = shallow(<div>{instance.render()}</div>);
      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
});
