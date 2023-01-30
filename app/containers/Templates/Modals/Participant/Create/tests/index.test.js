import { CREATE_LINK, NODE_API } from 'apis/constants';
import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { NODE_API_HELPERS } from 'apis/components/Node/helpers';

import { CreateParticipant } from '..';

describe('<CreateParticipant />', () => {
  let wrapper;
  let instance;
  const resaga = {
    setValue: jest.fn(),
    dispatchTo: jest.fn(),
  };

  const props = {
    resaga,
    templateId: 1,
    parentNodeId: 2,
    onClose: jest.fn(),
    firstName: 'First',
  };

  beforeEach(() => {
    wrapper = shallow(<CreateParticipant {...props} />);
    instance = wrapper.instance();
    jest.clearAllMocks();
  });

  it('exists', () => {
    expect(CreateParticipant).toBeDefined();
  });

  describe('#componentDidUpdate()', () => {
    const prevProps = { open: false };

    beforeEach(() => {
      instance.handleOpen = jest.fn();
    });

    it('calls handleOpen', () => {
      wrapper.setProps({ open: true });
      instance.componentDidUpdate(prevProps);
      expect(instance.handleOpen).toBeCalled();
    });

    it('not calls handleOpen', () => {
      wrapper.setProps(prevProps);
      instance.componentDidUpdate(prevProps);
      expect(instance.handleOpen).not.toBeCalled();
    });
  });

  describe('componentWillUnmount', () => {
    it('should call setValue to set participantWithRelationship to false', () => {
      instance.componentWillUnmount();

      expect(resaga.setValue).toBeCalled();
      expect(resaga.setValue).toBeCalledWith({
        participantWithRelationship: false,
      });
    });
  });

  describe('#handleOpen()', () => {
    it('unsets dispatching', () => {
      instance.setState = jest.fn();
      instance.handleOpen();
      expect(instance.setState).toBeCalledWith({ dispatching: false });
    });
  });

  describe('handleCreateLinkSuccess', () => {
    it('should call onClose props', () => {
      instance.handleCreateLinkSuccess();

      expect(props.onClose).toBeCalled();
    });
  });

  describe('handleCreateLink', () => {
    it('should call dispatchTo create link', () => {
      instance.handleCreateLink({ participantId: 1, relationship: 'Sample' });

      expect(resaga.dispatchTo).toBeCalled();
      expect(resaga.dispatchTo.mock.calls).toMatchSnapshot();
    });
  });

  describe('#handleCreateSuccess()', () => {
    it('should call setValue', () => {
      instance.handleCreateSuccess()({ 1: {} });
      expect(resaga.setValue).toBeCalled();
    });

    it('calls handleCreateLink', () => {
      wrapper.setProps({
        participantWithRelationship: true,
      });
      instance.handleCreateLink = jest.fn();
      instance.handleCreateSuccess()({ 1: {} });
      expect(instance.handleCreateLink).toBeCalled();
      expect(instance.handleCreateLink.mock.calls).toMatchSnapshot();
    });

    it('calls handleCreateLinkInGroup', () => {
      wrapper.setProps({
        participantInGroup: true,
      });
      instance.handleCreateLinkInGroup = jest.fn();
      instance.handleCreateSuccess()({ 1: {} });
      expect(instance.handleCreateLinkInGroup).toBeCalled();
    });
  });

  describe('#handleInvalidSubmit()', () => {
    it('should call handleInvalidSubmit', () => {
      instance.handleInvalidSubmit({
        node: { status: '' },
      });
      expect(instance.state.isParticipantStatus).toMatchSnapshot();
    });
  });

  describe('#handleCreateError()', () => {
    it('unsets dispatching', () => {
      instance.setState = jest.fn();
      instance.handleCreateError();
      expect(instance.setState).toBeCalledWith({ dispatching: false });
    });
  });

  describe('#handleFormValidSubmit()', () => {
    it('calls NODE_API_HELPERS.getTimes', () => {
      NODE_API_HELPERS.createNode = jest.fn();
      instance.handleFormValidSubmit({ model: { x: 1 } });
      expect(NODE_API_HELPERS.createNode.mock.calls).toMatchSnapshot();
    });

    it('calls make filterParticipantStatus to blank if status is pending', () => {
      NODE_API_HELPERS.createNode = jest.fn();
      instance.handleFormValidSubmit({
        model: { x: 1, node: { status: 'pending' } },
      });
      expect(NODE_API_HELPERS.createNode.mock.calls).toMatchSnapshot();
    });
  });

  describe('#renderSubheading()', () => {
    it('still matches snapshot', () => {
      wrapper.setProps({
        templateId: 1,
        parentNodeId: 2,
      });
      expect(instance.renderSubheading()).toMatchSnapshot();
    });

    it('still matches snapshot if parentNodeId and templateId are just the same', () => {
      wrapper.setProps({ parentNodeId: 1, templateId: 1 });
      expect(instance.renderSubheading()).toMatchSnapshot();
    });

    it('still matches snapshot if no props.firstName', () => {
      wrapper.setProps({ templateId: 1, parentNodeId: 2, firstName: null });
      expect(instance.renderSubheading()).toMatchSnapshot();
    });
  });

  describe('#renderHeader()', () => {
    it('still matches snapshot', () => {
      const renderCloseButton = jest.fn(() => 'closeButton');
      expect(instance.renderHeader({ renderCloseButton })).toMatchSnapshot();
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
        CreateParticipant.defaultProps.onClose();
      }).not.toThrow();
    });
  });

  describe('handleCreateLinkInGroup', () => {
    it('should dispatch to create link to group', () => {
      instance.handleCreateLinkInGroupSuccess =
        'handleCreateLinkInGroupSuccess';
      instance.handleCreateLinkInGroup({ groupId: 2, participantId: 3 });

      expect(resaga.dispatchTo).toBeCalledWith(NODE_API, CREATE_LINK, {
        payload: {
          id: 3,
          data: {
            nextNodeId: 2,
            action: 'group',
            actionContent: {
              type: 'travelgroup',
            },
          },
          prevNodeChildKey: 'groups',
          nextNodeChildKey: 'participants',
          upsertLinkId: true,
        },
        onSuccess: 'handleCreateLinkInGroupSuccess',
      });
    });
  });

  describe('handleCreateLinkInGroupSuccess', () => {
    it('should reset of participantInGroup and groupId redux value and call onClose', () => {
      instance.handleCreateLinkInGroupSuccess();

      expect(resaga.setValue).toBeCalledWith({
        groupId: null,
        participantInGroup: false,
      });
      expect(props.onClose).toBeCalled();
    });
  });
});
