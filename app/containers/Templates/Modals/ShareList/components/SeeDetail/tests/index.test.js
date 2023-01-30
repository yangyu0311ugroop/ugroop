import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { ability } from 'apis/components/Ability/ability';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import SnackbarHelpers from 'ugcomponents/SnackBar/helpers';
import { SeeDetail } from '../index';

jest.useFakeTimers();

describe('<SeeDetail />', () => {
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
    jest.clearAllMocks();

    rendered = shallow(<SeeDetail {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(SeeDetail).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('handleClose()', () => {
    it('should handleClose correctly', () => {
      instance.handleClose();
      rendered.setProps({ templateId: 1 });
      expect(instance.handleClose()).toMatchSnapshot();
      expect(resaga.setValue).toBeCalledWith({
        seeDetail: null,
        fromOrg: false,
      });
    });
  });

  describe('onClose()', () => {
    it('should handleClose correctly', () => {
      instance.handleClose = jest.fn();
      instance.onClose();
      jest.runAllTimers();

      expect(instance.state.closing).toBe(true);
    });
  });

  describe('resendInvitationSuccess()', () => {
    it('should setState', () => {
      instance.resendInvitationSuccess();

      expect(instance.state.resend).toBe(true);
    });
  });

  describe('resendInvitationError()', () => {
    it('should call error snackbar', () => {
      SnackbarHelpers.openErrorSnackbar = jest.fn();
      instance.resendInvitationError();

      expect(SnackbarHelpers.openErrorSnackbar).toBeCalled();
    });
  });

  describe('renderStatus()', () => {
    it('should return properly', () => {
      rendered.setState({ resend: true });
      instance.renderStatusButton = () => jest.fn(() => 'renderStatusButton');

      expect(instance.renderStatus()).toBe('renderStatusButton');
    });
  });

  describe('resend()', () => {
    it('should resend correctly', () => {
      rendered.setProps({ seeDetail: 'someToken' });
      instance.resend();

      expect(resaga.dispatchTo).toBeCalled();
      expect(resaga.dispatchTo.mock.calls).toMatchSnapshot();
    });
    it('should resend correctly when shared from organisation', () => {
      rendered.setProps({ seeDetail: 'someToken', fromOrg: true });
      instance.resend();

      expect(resaga.dispatchTo).toBeCalled();
      expect(resaga.dispatchTo.mock.calls).toMatchSnapshot();
    });
  });

  describe('cancelInvitation()', () => {
    it('should cancelInvitation correctly', () => {
      rendered.setProps({ seeDetail: 'someToken' });
      rendered.setProps({ fromOrg: false });

      instance.cancelInvitation();

      expect(resaga.dispatchTo).toBeCalled();
      expect(resaga.dispatchTo.mock.calls).toMatchSnapshot();
    });
  });

  describe('renderInvitationDetail()', () => {
    it('should match snapshot', () => {
      rendered.setProps({
        inviteToOrganisation: true,
      });
      const snapshot = shallow(<div>{instance.renderInvitationDetail(1)}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderDialogButtons()', () => {
    it('should match snapshot if button equals 0', () => {
      LOGIC_HELPERS.ifElse = jest.fn(() => 0);
      expect(instance.renderDialogButtons()).toMatchSnapshot();
    });
    it('should match snapshot if button equals 1', () => {
      LOGIC_HELPERS.ifElse = jest.fn(() => 1);
      expect(instance.renderDialogButtons()).toMatchSnapshot();
    });
    it('should match snapshot if button equals 2', () => {
      LOGIC_HELPERS.ifElse = jest.fn(() => 2);
      expect(instance.renderDialogButtons()).toMatchSnapshot();
    });
    it('should match snapshot if resend true', () => {
      rendered.setState({ resend: true });
      expect(instance.renderDialogButtons()).toMatchSnapshot();
    });
    it('should match snapshot if canDelete true', () => {
      ability.can = jest.fn(() => true);
      expect(instance.renderDialogButtons()).toMatchSnapshot();
    });
  });

  describe('analyseTime()', () => {
    it('should analyseTime correctly', () => {
      const result = instance.analyseTime(new Date());

      expect(result).toBeDefined();
      expect(result.format).toBeDefined();
      expect(result.fromNow).toBeDefined();
    });
  });

  describe('renderInvitee()', () => {
    it('should not render if !shareFrom', () => {
      rendered.setProps({ shareFrom: 0 });

      expect(instance.renderInvitee()).toBe(null);
    });

    it('should renderInvitee correctly', () => {
      rendered.setProps({
        shareToUserId: 1,
        shareFrom: 123,
        classes: { content: 'content' },
      });
      instance.renderDialogButtons = jest.fn(() => ({ button: 1 }));
      const snapshot = shallow(<div>{instance.renderInvitee()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });

    it('should renderInvitee correctly', () => {
      rendered.setProps({ shareFrom: 123 });
      instance.renderDialogButtons = jest.fn(() => ({ button: 0 }));
      const snapshot = shallow(<div>{instance.renderInvitee()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('render()', () => {
    it('should renderInvitee', () => {
      instance.renderInvitee = jest.fn();
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });

    it('should render correctly', () => {
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('should cancelInvitation correctly when shared from organisation', () => {
      rendered.setProps({ fromOrg: true });
      instance.cancelInvitation();
      expect(resaga.dispatchTo).toBeCalled();
      expect(resaga.dispatchTo.mock.calls).toMatchSnapshot();
    });
  });
});
