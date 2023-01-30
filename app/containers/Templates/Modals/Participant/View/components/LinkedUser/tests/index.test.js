import React from 'react';
import { shallow } from 'enzyme';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import InviteUser from '../components/InviteUser';
import FindUser from '../components/FindUser';
import { ParticipantViewLinkedUser } from '../index';

describe('<ParticipantViewLinkedUser />', () => {
  let rendered;
  let instance;

  const resaga = {
    setValue: jest.fn(),
    dispatchTo: jest.fn(),
  };

  beforeEach(() => {
    rendered = shallow(
      <ParticipantViewLinkedUser classes={{}} resaga={resaga} />,
    );
    instance = rendered.instance();
  });

  describe('componentWillUnmount', () => {
    it('should call clearTimeout', () => {
      global.clearTimeout = jest.fn();
      instance.componentWillUnmount();
      expect(global.clearTimeout).toHaveBeenCalled();
    });
  });

  describe('getPopperContentComponent', () => {
    it('should match snapshot if linkedUserPage is not invite', () => {
      rendered.setProps({
        linkedUserPage: true,
      });
      TEST_HELPERS.expectMatchSnapshot(instance.getPopperContentComponent);
    });
    it('should match snapshot', () => {
      rendered.setProps({
        linkedUserPage: 'invite',
      });
      TEST_HELPERS.expectMatchSnapshot(instance.getPopperContentComponent);
    });
  });

  describe('closePopper', () => {
    it('should match snapshot', () => {
      global.setTimeout = jest.fn(cb => cb());
      rendered.setState({ anchorEl: null });
      instance.closePopper();
      TEST_HELPERS.expectMatchSnapshot(instance.closePopper);
    });
  });

  describe('openInvitationDetailDialog', () => {
    it('should call setValue', () => {
      instance.openInvitationDetailDialog();
      expect(resaga.setValue).toHaveBeenCalled();
    });
  });

  describe('openTourConnectionDialog', () => {
    it('should call setValue', () => {
      instance.openTourConnectionDialog();
      expect(resaga.setValue).toHaveBeenCalled();
    });
    it('should call setValue if not owner', () => {
      rendered.setProps({
        userNodeUserId: 1,
        ownerId: 2,
      });
      instance.openTourConnectionDialog();
      expect(resaga.setValue).toHaveBeenCalled();
    });
  });

  describe('handlePopperClickAway', () => {
    it('should call closePopper', () => {
      instance.closePopper = jest.fn();
      rendered.setState({
        clickAway: true,
      });
      instance.handlePopperClickAway();
      expect(instance.closePopper).toHaveBeenCalled();
    });
    it('should do nothing', () => {
      instance.closePopper = jest.fn();
      rendered.setState({
        clickAway: false,
      });
      instance.handlePopperClickAway();
      expect(instance.closePopper).not.toHaveBeenCalled();
    });
  });

  describe('handleChipClick', () => {
    it('should call openInvitationDetailDialog', () => {
      rendered.setProps({
        invitationPending: true,
      });
      instance.openInvitationDetailDialog = jest.fn();
      instance.handleChipClick();
      expect(instance.openInvitationDetailDialog).toHaveBeenCalled();
    });
    it('should call openTourConnectionDialog', () => {
      rendered.setProps({
        userConnected: true,
      });
      instance.openTourConnectionDialog = jest.fn();
      instance.handleChipClick();
      expect(instance.openTourConnectionDialog).toHaveBeenCalled();
    });
    it('should call setState', () => {
      rendered.setProps({
        userConnected: false,
        invitationPending: false,
      });
      const event = { currentTarget: 1 };
      rendered.setState({
        anchorEl: false,
      });
      instance.handleChipClick(event);
      expect(rendered.state().anchorEl).toEqual(1);
    });
    it('should call setState and set anchorEl to null', () => {
      rendered.setProps({
        userConnected: false,
        invitationPending: false,
      });
      const event = { currentTarget: 1 };
      rendered.setState({
        anchorEl: true,
      });
      instance.handleChipClick(event);
      expect(rendered.state().anchorEl).toEqual(null);
    });
  });

  describe('handleBack', () => {
    it('should call setValue', () => {
      instance.handleBack(InviteUser)();
      expect(resaga.setValue).toHaveBeenCalled();
    });
    it('should return null', () => {
      expect(instance.handleBack(null)()).toEqual(null);
    });
  });

  describe('handleNext', () => {
    it('should call setValue if Component is FindUser', () => {
      instance.handleNext(FindUser)();
      expect(resaga.setValue).toHaveBeenCalled();
    });
    it('should call setValue and closePopper if Component is InviteUser', () => {
      instance.closePopper = jest.fn();
      instance.handleNext(InviteUser)();
      expect(instance.closePopper).toHaveBeenCalled();
      expect(resaga.setValue).toHaveBeenCalled();
    });
    it('should return null', () => {
      expect(instance.handleNext(null)()).toEqual(null);
    });
  });

  describe('handleSetClickAway', () => {
    it('should setState', () => {
      instance.handleSetClickAway(true);
      expect(rendered.state().clickAway).toBe(true);
    });
  });

  describe('renderChipLabelContent', () => {
    it('should match snapshot', () => {
      instance.renderPersonName = jest.fn(() => false);
      TEST_HELPERS.expectMatchSnapshot(instance.renderChipLabelContent);
    });
  });
});
