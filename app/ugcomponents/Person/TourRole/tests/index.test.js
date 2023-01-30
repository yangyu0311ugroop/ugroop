import { DO_NOTHING } from 'appConstants';
import { CANCELED, PENDING } from 'datastore/invitationStore/constants';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { TourRole } from '../index';

describe('TourRole/tests/index.test.js', () => {
  let rendered;
  let instance;

  const resaga = {
    setValue: jest.fn(),
    dispatchTo: jest.fn(),
  };

  const props = {
    userId: 123,
    token: 'someToken',
    email: 'q@qq.com',
    resaga,
    classes: { root: 'defaultRoot', img: 'defaultImg' },
  };

  beforeEach(() => {
    rendered = shallow(<TourRole {...props} />);
    instance = rendered.instance();
  });
  afterEach(() => jest.clearAllMocks());

  describe('<TourRole />', () => {
    it('should exists', () => {
      expect(TourRole).toBeDefined();
    });
    it('should render without exploding', () => {
      expect(rendered.length).toBe(1);
    });
  });

  describe('resendInvitation()', () => {
    it('should call dispatchTo', () => {
      instance.resendInvitation('that token')();

      expect(resaga.dispatchTo).toBeCalled();
      expect(resaga.dispatchTo.mock.calls).toMatchSnapshot();
    });
  });

  describe('resendInvitationSuccess()', () => {
    it('should call dispatchTo', () => {
      instance.resendInvitationSuccess();

      expect(rendered.state().resend).toBe(true);
    });
  });
  describe('resendInvitationError()', () => {
    it('should call dispatchTo', () => {
      instance.resendInvitationError();

      expect(rendered.state().resendSuccess).toBe(false);
    });
  });

  describe('shouldRenderStatus()', () => {
    it('should return true', () => {
      rendered.setProps({ status: PENDING, role: 'not_owner' });

      expect(instance.shouldRenderStatus()).toBe(true);
    });

    it('should return false role = owner', () => {
      rendered.setProps({ status: PENDING, role: 'owner' });

      expect(instance.shouldRenderStatus()).toBe(false);
    });

    it('should return false status !== pending', () => {
      rendered.setProps({ status: 'not pending', role: 'owner' });

      expect(instance.shouldRenderStatus()).toBe(false);
    });
  });

  describe('changeRole()', () => {
    it('should do nothing if no role', () => {
      expect(instance.changeRole('')).toBe(DO_NOTHING);
    });

    it('should do nothing if role not changed', () => {
      rendered.setProps({ role: 'tour_viewer' });

      expect(instance.changeRole('tour_viewer')).toBe(DO_NOTHING);
    });

    it('should call dispatchTo', () => {
      rendered.setProps({ role: 'tour_collaborator' });

      instance.changeRole('tour_viewer');

      expect(rendered.state().changingRole).toBe(true);
      expect(resaga.dispatchTo).toBeCalled();
      expect(resaga.dispatchTo.mock.calls).toMatchSnapshot();
    });
  });

  describe('changeRoleSuccess()', () => {
    it('should set state', () => {
      instance.changeRoleSuccess();

      expect(rendered.state().changingRole).toBe(false);
      expect(rendered.state().changeRoleFailed).toBe(false);
    });
  });

  describe('changeRoleError()', () => {
    it('should set state', () => {
      instance.changeRoleError('something wrong');

      expect(rendered.state().changingRole).toBe(false);
      expect(rendered.state().changeRoleFailed).toBe('something wrong');
    });
  });

  describe('renderInvitationStatus()', () => {
    it('should return null', () => {
      rendered.setState({ status: 'not pending' });

      expect(instance.renderInvitationStatus()).toBe(null);
    });

    it('should render resend invitation', () => {
      rendered.setProps({ status: PENDING });
      rendered.setState({ resend: false });

      const snapshot = shallow(<div>{instance.renderInvitationStatus()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });

    it('should render invitation sent', () => {
      rendered.setProps({ status: PENDING });
      rendered.setState({ resend: true, resendSuccess: true });

      const snapshot = shallow(<div>{instance.renderInvitationStatus()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('should render invitation send failed', () => {
      rendered.setProps({ status: PENDING });
      rendered.setState({ resend: true, resendSuccess: false });

      const snapshot = shallow(<div>{instance.renderInvitationStatus()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderCanceled()', () => {
    it('should return null', () => {
      rendered.setProps({ status: 'not canceled' });

      expect(instance.renderCanceled()).toBe(null);
    });

    it('should render button', () => {
      rendered.setProps({ status: CANCELED });

      const snapshot = shallow(<div>{instance.renderCanceled()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderEditing()', () => {
    it('should render radio group', () => {
      const snapshot = shallow(<div>{instance.renderEditing()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderReadonly()', () => {
    it('should render shouldRenderStatus = false', () => {
      rendered.setProps({ role: 'owner', showStatus: false, token: '' });
      instance.shouldRenderStatus = jest.fn(() => false);

      const snapshot = shallow(<div>{instance.renderReadonly()}</div>);

      expect(instance.shouldRenderStatus).toBeCalledWith();
      expect(toJSON(snapshot)).toMatchSnapshot();
    });

    it('should render shouldRenderStatus = true', () => {
      instance.shouldRenderStatus = jest.fn(() => true);

      const snapshot = shallow(<div>{instance.renderReadonly()}</div>);

      expect(instance.shouldRenderStatus).toBeCalledWith();
      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderEditable()', () => {
    it('should render shouldRenderStatus = false', () => {
      rendered.setProps({ role: 'tour_viewer' });
      rendered.setState({ changingRole: true });

      const snapshot = shallow(<div>{instance.renderEditable()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('render()', () => {
    it('should renderReadonly', () => {
      rendered.setProps({ role: 'tour_viewer' });
      instance.renderReadonly = () => 'renderReadonly';

      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });

    it('should renderEditable', () => {
      rendered.setProps({ editable: true });
      instance.renderEditable = () => 'renderEditable';

      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });

    it('should renderEditing', () => {
      rendered.setProps({ role: '' });
      instance.renderEditing = () => 'renderEditing';

      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
});
