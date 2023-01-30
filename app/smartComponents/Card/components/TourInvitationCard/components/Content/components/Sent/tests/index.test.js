import { CANCEL_INVITATION, INVITATION_API } from 'apis/constants';
import {
  CANCELED,
  CONFIRMED,
  DECLINED,
  PENDING,
} from 'datastore/invitationStore/constants';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { Sent } from '../index';

describe('<Sent />', () => {
  let rendered;
  let instance;

  const resaga = {
    setValue: jest.fn(),
    dispatchTo: jest.fn(),
  };

  const props = {
    token: 'thisToken',
    classes: {},
    resaga,
  };

  beforeEach(() => {
    rendered = shallow(<Sent {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(Sent).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('cancelInvitation()', () => {
    it('should call dispatchTo', () => {
      instance.cancelInvitation('that token')();

      expect(resaga.dispatchTo).toBeCalledWith(
        INVITATION_API,
        CANCEL_INVITATION,
        { payload: { token: 'that token' } },
      );
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

  describe('renderConfirmedButtons()', () => {
    it('should renderConfirmedButtons', () => {
      const snapshot = shallow(<div>{instance.renderConfirmedButtons()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderDeclinedButtons()', () => {
    it('should renderDeclinedButtons', () => {
      const snapshot = shallow(<div>{instance.renderDeclinedButtons()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderCanceledButtons()', () => {
    it('should renderCanceledButtons', () => {
      const snapshot = shallow(<div>{instance.renderCanceledButtons()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderPendingButtons()', () => {
    it('should renderPendingButtons', () => {
      instance.setState({ resend: true });

      const snapshot = shallow(<div>{instance.renderPendingButtons()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderButtons()', () => {
    it('should renderConfirmedButtons', () => {
      rendered.setProps({ status: CONFIRMED });
      instance.renderConfirmedButtons = jest.fn(() => 'renderConfirmedButtons');

      expect(instance.renderButtons()).toBe('renderConfirmedButtons');
    });

    it('should renderDeclinedButtons', () => {
      rendered.setProps({ status: DECLINED });
      instance.renderDeclinedButtons = jest.fn(() => 'renderDeclinedButtons');

      expect(instance.renderButtons()).toBe('renderDeclinedButtons');
    });

    it('should renderCanceledButtons', () => {
      rendered.setProps({ status: CANCELED });
      instance.renderCanceledButtons = jest.fn(() => 'renderCanceledButtons');

      expect(instance.renderButtons()).toBe('renderCanceledButtons');
    });

    it('should renderPendingButtons', () => {
      rendered.setProps({ status: PENDING });
      instance.renderPendingButtons = jest.fn(() => 'renderPendingButtons');

      expect(instance.renderButtons(true)).toBe('renderPendingButtons');
    });

    it('should return null', () => {
      rendered.setProps({ status: 'some other status' });

      expect(instance.renderButtons()).toBe(null);
    });
  });

  describe('renderAvatar()', () => {
    it('should return null', () => {
      rendered.setProps({ shareToUserId: 0 });

      expect(instance.renderAvatar()).toBe(null);
    });

    it('should renderAvatar', () => {
      rendered.setProps({ shareToUserId: 123 });

      const snapshot = shallow(<div>{instance.renderAvatar()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderTourOrg()', () => {
    it('should return null', () => {
      expect(instance.renderTourOrg()).toBe(null);
    });

    it('should renderTourOrg', () => {
      rendered.setProps({ organisationName: 'My Org' });

      const snapshot = shallow(<div>{instance.renderTourOrg()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderPersonalMessage()', () => {
    it('should render when no message', () => {
      rendered.setProps({ personalMessage: '' });

      const snapshot = shallow(<div>{instance.renderPersonalMessage()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });

    it('should render when has message', () => {
      rendered.setProps({ personalMessage: 'please join us' });

      const snapshot = shallow(<div>{instance.renderPersonalMessage()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('render()', () => {
    it('should render correctly', () => {
      instance.renderAvatar = jest.fn(() => 'renderAvatar');

      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
});
