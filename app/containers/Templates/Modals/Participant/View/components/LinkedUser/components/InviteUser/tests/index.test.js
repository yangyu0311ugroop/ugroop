import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { NODE_API_HELPERS } from 'apis/components/Node/helpers';
import { TEMPLATE_API_HELPERS } from 'apis/components/Template/helpers';
import toJSON from 'enzyme-to-json';
import { shallow } from 'enzyme';
import React from 'react';

import { LinkedUserInviteUser } from '../index';

describe('<LinkedUserInviteUser />', () => {
  let rendered;
  let instance;

  const resaga = {
    setValue: jest.fn(),
    dispatchTo: jest.fn(),
  };

  const props = {
    onNext: jest.fn(),
    onBack: jest.fn(),
  };

  beforeEach(() => {
    rendered = shallow(
      <LinkedUserInviteUser classes={{}} resaga={resaga} {...props} />,
    );
    instance = rendered.instance();
  });

  describe('componentDidUpdate', () => {
    it('should call disableClickAway', () => {
      const prevProps = {
        invitationDetailOpen: false,
      };
      rendered.setProps({
        invitationDetailOpen: true,
      });
      instance.disableClickAway = jest.fn();
      instance.componentDidUpdate(prevProps);
      expect(instance.disableClickAway).toHaveBeenCalled();
    });
    it('should call enableClickAway', () => {
      const prevProps = {
        invitationDetailOpen: true,
      };
      rendered.setProps({
        invitationDetailOpen: false,
      });
      instance.enableClickAway = jest.fn();
      instance.componentDidUpdate(prevProps);
      expect(instance.enableClickAway).toHaveBeenCalled();
    });
  });

  describe('getUserExists', () => {
    it('should return linkedUserId', () => {
      rendered.setProps({
        linkedUserId: true,
      });
      expect(instance.getUserExists()).toBe(true);
    });
  });

  describe('fetchParticipants', () => {
    it('should return fetchParticipants', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.fetchParticipants);
    });
  });

  describe('setLinkedUserMessage', () => {
    it('should call setValue', () => {
      const linkedUserMessage = 1;
      instance.setLinkedUserMessage(linkedUserMessage);
      expect(resaga.setValue).toHaveBeenCalledWith({ linkedUserMessage });
    });
  });

  describe('finish', () => {
    it('should call onNext', () => {
      const onNext = jest.fn();
      rendered.setProps({
        onNext,
      });
      instance.finish();
      expect(onNext).toHaveBeenCalled();
    });
  });

  describe('handleNamePopoverEnter', () => {
    it('should call disableClickAway', () => {
      instance.disableClickAway = jest.fn();
      instance.handleNamePopoverEnter();
      expect(instance.disableClickAway).toHaveBeenCalled();
    });
  });

  describe('handleNamePopoverExit', () => {
    it('should call enableClickAway', () => {
      instance.enableClickAway = jest.fn();
      instance.handleNamePopoverExit();
      expect(instance.enableClickAway).toHaveBeenCalled();
    });
  });

  describe('renderAddRoleButton()', () => {
    it('should renderAddRoleButton', () => {
      instance.getUserNeedsRole = jest.fn(() => true);
      TEST_HELPERS.expectMatchSnapshot(instance.renderAddRoleButton);
    });
    it('should renderAddRoleButton while not loading', () => {
      instance.getUserNeedsRole = jest.fn(() => true);
      rendered.setState({ loading: false });
      TEST_HELPERS.expectMatchSnapshot(instance.renderAddRoleButton);
    });
  });

  describe('renderUninvited', () => {
    it('should match snapshot if user exists', () => {
      rendered.setProps({
        firstName: 'Elijah',
      });
      instance.getUserExists = jest.fn(() => true);
      TEST_HELPERS.expectMatchSnapshot(instance.renderUninvited);
    });
    it('should match snapshot if does not exist', () => {
      rendered.setProps({
        firstName: 'Elijah',
      });
      instance.getUserExists = jest.fn(() => false);
      TEST_HELPERS.expectMatchSnapshot(instance.renderUninvited);
    });
    it('should match snapshot if does not exist and there is no firstName', () => {
      rendered.setProps({
        firstName: null,
      });
      instance.getUserExists = jest.fn(() => false);
      TEST_HELPERS.expectMatchSnapshot(instance.renderUninvited);
    });
  });

  describe('renderPendingInvitationButton', () => {
    it('should match snapshot', () => {
      instance.handleInvitationDetailsClick = jest.fn();
      TEST_HELPERS.expectMatchSnapshot(instance.renderPendingInvitationButton);
    });
  });

  describe('renderPending', () => {
    it('should match snapshot if there is user', () => {
      instance.getUserExists = jest.fn(() => true);
      instance.renderPendingInvitationButton = jest.fn(
        () => 'renderPendingInvitationButton',
      );
      TEST_HELPERS.expectMatchSnapshot(instance.renderPending);
    });
    it('should match snapshot if there is no user', () => {
      rendered.setProps({
        firstName: 'Elijah',
      });
      instance.getUserExists = jest.fn(() => false);
      instance.renderPendingInvitationButton = jest.fn(
        () => 'renderPendingInvitationButton',
      );
      TEST_HELPERS.expectMatchSnapshot(instance.renderPending);
    });
    it('should match snapshot if there is no user and no firstName', () => {
      rendered.setProps({
        firstName: null,
      });
      instance.getUserExists = jest.fn(() => false);
      instance.renderPendingInvitationButton = jest.fn(
        () => 'renderPendingInvitationButton',
      );
      TEST_HELPERS.expectMatchSnapshot(instance.renderPending);
    });
  });

  describe('renderHasRole', () => {
    it('should match snapshot', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderHasRole);
    });
  });

  describe('renderSearchResult', () => {
    it('should return renderPending', () => {
      instance.getUserHasRole = jest.fn(() => false);
      instance.getUserConnected = jest.fn(() => false);
      instance.getUserPending = jest.fn(() => true);
      instance.renderPending = jest.fn(() => 'renderPending');
      expect(instance.renderSearchResult()).toEqual('renderPending');
    });
    it('should return renderConnected', () => {
      instance.getUserHasRole = jest.fn(() => false);
      instance.getUserConnected = jest.fn(() => true);
      instance.renderConnected = jest.fn(() => 'renderConnected');
      TEST_HELPERS.expectMatchSnapshot(instance.renderSearchResult);
    });
    it('should return null', () => {
      rendered.setState({ error: 'error' });
      expect(instance.renderSearchResult()).toEqual(null);
    });
  });

  describe('renderSearchResult', () => {
    it('should match snapshot if there is role', () => {
      instance.getUserHasRole = jest.fn(() => true);
      instance.renderHasRole = jest.fn();
      instance.renderSearchResult();
      expect(instance.renderHasRole).toHaveBeenCalled();
    });
  });

  describe('handleShareNodeSuccess', () => {
    it('should setState and call finish', () => {
      instance.finish = jest.fn();
      instance.handleShareNodeSuccess();
      expect(rendered.state().loading).toBe(false);
      expect(instance.finish).toMatchSnapshot();
    });
  });

  describe('handleAddRoleSuccess', () => {
    it('should setState and call finish', () => {
      instance.finish = jest.fn();
      instance.handleAddRoleSuccess();
      expect(rendered.state().loading).toBe(false);
      expect(instance.finish).toMatchSnapshot();
    });
  });

  describe('handleShareNodeError', () => {
    it('should call setState', () => {
      instance.handleShareNodeError();
      expect(rendered.state().loading).toBe(false);
    });
  });

  describe('handleAddRoleError', () => {
    it('should call setState', () => {
      instance.handleAddRoleError();
      expect(rendered.state().loading).toBe(false);
    });
  });

  describe('handleInvitationDetailsClick', () => {
    it('should call preventDefault and setValue', () => {
      const e = {
        preventDefault: jest.fn(),
      };
      instance.handleInvitationDetailsClick(e);
      expect(e.preventDefault).toHaveBeenCalled();
      expect(resaga.setValue).toHaveBeenCalled();
    });
  });

  describe('renderConnected()', () => {
    it('should renderConnected', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderConnected);
    });
  });

  describe('handleValidSubmit', () => {
    it('should call shareNode and setState', () => {
      rendered.setProps({
        linkeeRole: 'participant',
        id: 1,
      });
      instance.getUserNeedsInvitation = jest.fn(() => true);
      NODE_API_HELPERS.shareNode = jest.fn();
      instance.handleValidSubmit({});
      expect(NODE_API_HELPERS.shareNode).toHaveBeenCalled();
    });
    it('should call addRole', () => {
      instance.getUserNeedsRole = jest.fn(() => true);
      TEMPLATE_API_HELPERS.addRole = jest.fn();
      instance.handleValidSubmit({});
      expect(TEMPLATE_API_HELPERS.addRole).toHaveBeenCalled();
    });
    it('should do nothing', () => {
      instance.getUserNeedsInvitation = jest.fn(() => false);
      instance.getUserNeedsRole = jest.fn(() => false);
      const snap = shallow(<div>{instance.handleValidSubmit({})}</div>);
      expect(toJSON(snap)).toMatchSnapshot();
    });
  });

  describe('getUserNeedsRole', () => {
    it('should return !getUserHasRole', () => {
      instance.getUserConnected = jest.fn(() => true);
      instance.getUserHasRole = jest.fn(() => false);
      expect(instance.getUserNeedsRole()).toBe(true);
    });
  });

  describe('handleMessageChange', () => {
    it('should match snapshot if !setLinkedUserMessageDebounce', () => {
      // instance.setLinkedUserMessageDebounce = jest.fn(() => false);
      const snap = shallow(<div>{instance.handleMessageChange('val')}</div>);
      expect(toJSON(snap)).toMatchSnapshot();
    });
    it('should match snapshot if !setLinkedUserMessageDebounce', () => {
      instance.setLinkedUserMessageDebounce = jest.fn(() => false);
      const snap = shallow(<div>{instance.handleMessageChange('val')}</div>);
      expect(toJSON(snap)).toMatchSnapshot();
    });
  });
});
