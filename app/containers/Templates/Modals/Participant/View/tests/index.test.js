import React from 'react';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { PERSON_DETAIL_HELPER } from 'apis/components/PersonDetail/helpers';
import { TEMPLATE_API_HELPERS } from 'apis/components/Template/helpers';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { ability } from 'apis/components/Ability/ability';
import { NODE_API_HELPERS } from 'apis/components/Node/helpers';

import { ViewParticipant } from '..';

describe('<ViewParticipant />', () => {
  let wrapper;
  let instance;

  const makeProps = () => ({
    id: 1,
    onClose: jest.fn(),
    classes: {},
  });

  const resaga = { setValue: jest.fn() };

  beforeEach(() => {
    ability.can = jest.fn(() => true);
    wrapper = shallow(<ViewParticipant resaga={resaga} {...makeProps()} />);
    instance = wrapper.instance();
    jest.clearAllMocks();
  });

  it('exists', () => {
    expect(ViewParticipant).toBeDefined();
  });

  describe('#handleDeleteError()', () => {
    it('unsets confirmingDelete', () => {
      instance.setState = jest.fn();
      instance.handleDeleteError();
      expect(instance.setState).toBeCalledWith({ confirmingDelete: false });
    });
  });

  describe('#handleDeleteConfirm()', () => {
    it('calls NODE_API_HELPERS.getTimes', () => {
      NODE_API_HELPERS.deleteNode = jest.fn();
      instance.handleDeleteConfirm({ model: { x: 1 } });
      expect(NODE_API_HELPERS.deleteNode.mock.calls).toMatchSnapshot();
    });
  });
  describe('#renderNonLinkUser()', () => {
    it('should match snapshots', () => {
      instance.showLinkedUser = jest.fn(() => false);
      expect(toJSON(instance.renderNonLinkUser())).toMatchSnapshot();
    });
    it('should match snapshots and return null', () => {
      instance.showLinkedUser = jest.fn(() => true);
      expect(toJSON(instance.renderNonLinkUser())).toMatchSnapshot();
    });
  });

  describe('#handleDeleteCancel()', () => {
    it('unsets confirmingDelete', () => {
      instance.setState = jest.fn();
      instance.handleDeleteCancel();
      expect(instance.setState).toBeCalledWith({ confirmingDelete: false });
    });
  });

  describe('#handleDeleteClick()', () => {
    it('sets confirmingDelete', () => {
      const e = { preventDefault: jest.fn() };
      instance.setState = jest.fn();
      instance.handleDeleteClick(e);
      expect(instance.setState).toBeCalledWith({ confirmingDelete: true });
    });
  });

  describe('#render()', () => {
    it('not explodes', () => {
      expect(wrapper).toHaveLength(1);
    });

    it('still matches snapshot', () => {
      expect(toJSON(wrapper)).toMatchSnapshot();
    });
  });

  describe('#defaultProps', () => {
    it('#onClose()', () => {
      expect(() => {
        ViewParticipant.defaultProps.onClose();
      }).not.toThrow();
    });
  });

  describe('renderHeading()', () => {
    it('should renderHeading', () => {
      wrapper.setState({ accessLevelState: true });
      instance.isContributor = jest.fn(() => false);
      instance.renderPart = jest.fn(() => '');
      instance.renderLinkedUser = jest.fn(() => '');
      TEST_HELPERS.expectMatchSnapshot(instance.renderHeading);
    });
    it('should renderHeading if smDown', () => {
      wrapper.setProps({ smDown: true });
      wrapper.setState({ accessLevelState: true });
      instance.isContributor = jest.fn(() => false);
      instance.renderPart = jest.fn(() => '');
      instance.renderLinkedUser = jest.fn(() => '');
      TEST_HELPERS.expectMatchSnapshot(instance.renderHeading);
    });
  });

  describe('renderPart()', () => {
    it('should renderPart', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderPart);
    });
  });

  describe('renderLinkedUser()', () => {
    it('should renderLinkedUser', () => {
      instance.showLinkedUser = jest.fn(() => true);
      TEST_HELPERS.expectMatchSnapshot(instance.renderLinkedUser);
    });
  });

  describe('renderContentWithAccessLevel()', () => {
    it('should renderContentWithAccessLevel', () => {
      instance.renderPart = jest.fn(() => '');
      TEST_HELPERS.expectMatchSnapshot(instance.renderContentWithAccessLevel);
    });
  });

  describe('componentDidUpdate', () => {
    it('should call handleOpen', () => {
      instance.handleOpen = jest.fn();
      const prevProps = {
        open: false,
      };
      wrapper.setProps({
        open: true,
      });
      instance.componentDidUpdate(prevProps);
      expect(instance.handleOpen).toHaveBeenCalled();
    });
    it('should call nothing', () => {
      instance.handleOpen = jest.fn();
      const prevProps = {
        open: false,
      };
      wrapper.setProps({
        open: false,
      });
      instance.componentDidUpdate(prevProps);
      expect(instance.handleOpen).not.toHaveBeenCalled();
    });
    it('should call handleOpen', () => {
      instance.handleOpen = jest.fn();
      const prevProps = {
        open: true,
        isFetching: true,
      };
      wrapper.setProps({
        open: true,
        isFetching: false,
      });
      instance.componentDidUpdate(prevProps);
      expect(instance.handleOpen).toHaveBeenCalled();
    });
  });

  describe('componentWillUnmount', () => {
    it('should call setValue', () => {
      instance.componentWillUnmount();
      expect(resaga.setValue).toHaveBeenCalled();
    });
  });

  describe('showLinkedUser', () => {
    it('should return this.isContributor', () => {
      instance.isContributor = jest.fn(() => true);
      TEST_HELPERS.expectMatchSnapshot(instance.showLinkedUser);
    });
    it('should return invitationPending', () => {
      instance.isContributor = jest.fn(() => false);
      TEST_HELPERS.expectMatchSnapshot(instance.showLinkedUser);
    });
  });

  describe('handleOpen', () => {
    it('should call setupPerson', () => {
      instance.setupPerson = jest.fn();
      instance.handleOpen();
      expect(instance.setupPerson).toHaveBeenCalled();
    });
  });

  describe('setupPerson', () => {
    it('should call createPerson', () => {
      PERSON_DETAIL_HELPER.createPerson = jest.fn();
      wrapper.setProps({
        personId: false,
      });
      instance.setupPerson();
      expect(PERSON_DETAIL_HELPER.createPerson).toHaveBeenCalled();
    });
    it('should not call createPerson', () => {
      PERSON_DETAIL_HELPER.createPerson = jest.fn();
      wrapper.setProps({
        personId: 1,
      });
      instance.setupPerson();
      expect(PERSON_DETAIL_HELPER.createPerson).not.toHaveBeenCalled();
    });
  });

  describe('handleSetupPersonSuccess', () => {
    it('should call setValue', () => {
      instance.handleSetupPersonSuccess({ peopleById: jest.fn() });
      expect(resaga.setValue).toHaveBeenCalled();
    });
  });

  describe('handleDeleteSuccess', () => {
    it('should setState, call setValue, and handleClose', () => {
      instance.handleClose = jest.fn();
      instance.handleDeleteSuccess('', { nodeId: 1 });
      expect(wrapper.state().confirmingDelete).toBe(false);
      expect(resaga.setValue).toHaveBeenCalled();
      expect(instance.handleClose).toHaveBeenCalled();
    });
  });

  describe('handleClose', () => {
    it('should call setValue and onClose', () => {
      const onClose = jest.fn();
      wrapper.setProps({
        onClose,
      });
      instance.handleClose();
      expect(resaga.setValue).toHaveBeenCalled();
      expect(onClose).toHaveBeenCalled();
    });
  });

  describe('handleUserLink', () => {
    it('should call getParticipants', () => {
      TEMPLATE_API_HELPERS.getParticipants = jest.fn();
      instance.handleUserLink();
      expect(TEMPLATE_API_HELPERS.getParticipants).toHaveBeenCalled();
    });
  });
});
