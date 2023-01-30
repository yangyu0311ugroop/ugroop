import React from 'react';
import { shallow } from 'enzyme';
import { NODE_API_HELPERS } from 'apis/components/Node/helpers';
import { TEMPLATE_API_HELPERS } from 'apis/components/Template/helpers';
import { TOUR_CONTRIBUTOR } from 'utils/modelConstants';
import { AddRole } from '..';

describe('<AddRole />', () => {
  let wrapper;
  let instance;

  const makeProps = () => ({
    parentNodeId: 1,
    onClose: jest.fn(),
    resaga: {
      dispatchTo: jest.fn(),
      setValue: jest.fn(),
    },
    classes: {},
  });

  beforeEach(() => {
    wrapper = shallow(<AddRole {...makeProps()} />);
    instance = wrapper.instance();
    jest.clearAllMocks();
  });

  it('exists', () => {
    expect(AddRole).toBeDefined();
  });

  describe('#addContributorRole()', () => {
    // const prevProps = { open: false };
    TEMPLATE_API_HELPERS.addRole = jest.fn();
    it('calls addContributorRole', () => {
      instance.handleCreateNodeSuccess({ 1: 1 });
      expect(TEMPLATE_API_HELPERS.addRole).toBeCalled();
    });

    it('upserts nodes if isParticipant()', () => {
      instance.isParticipant = jest.fn(() => true);
      wrapper.setProps({ templateId: 1 });
      instance.handleCreateNodeSuccess({ 2: {} });
      expect(instance.props.resaga.setValue.mock.calls[0][0].nodes()).toEqual({
        1: { calculated: { participants: [2] } },
      });
    });
  });

  describe('#addContributorRole()', () => {
    it('calls addContributorRole', () => {
      wrapper.setProps({ customData: { email: 'test' } });
      instance.addContributorRole();
      expect(wrapper.state().dispatching).toBe(true);
    });
    it('calls addContributorRole state return false', () => {
      wrapper.setProps({ customData: {} });
      instance.addContributorRole();
      expect(wrapper.state().dispatching).toBe(false);
    });
  });
  describe('#addNonContributorRole()', () => {
    it('calls updateNode', () => {
      instance.handleCreateNodeSuccess = jest.fn();
      wrapper.setProps({ pendingNodeId: 1 });
      NODE_API_HELPERS.updateNode = jest.fn();
      instance.addNonContributorRole();
      expect(NODE_API_HELPERS.updateNode).toBeCalled();
    });
    it('calls handleCreateNodeSuccess', () => {
      instance.handleCreateNodeSuccess = jest.fn();
      wrapper.setProps({ pendingNodeId: 1, status: '' });
      instance.addNonContributorRole();
      expect(instance.handleCreateNodeSuccess).toBeCalled();
    });
    it('calls NODE_API_HELPERS.createNode state return false', () => {
      wrapper.setProps({ customData: {} });
      NODE_API_HELPERS.createNode = jest.fn();
      instance.addNonContributorRole();
      expect(NODE_API_HELPERS.createNode).toBeCalled();
    });
  });

  describe('#handleAddRoleSuccess()', () => {
    it('Set state to false ', () => {
      instance.handleAddRoleSuccess();
      expect(wrapper.state().dispatching).toBe(false);
    });
  });
  describe('#handleUpdateNodeSuccess()', () => {
    it('calls handleCreateNodeSuccess', () => {
      instance.handleCreateNodeSuccess = jest.fn();
      instance.handleUpdateNodeSuccess('', { nodeId: 1 });
      expect(instance.handleCreateNodeSuccess).toBeCalled();
    });
  });
  describe('#handleCreateError()', () => {
    it('Set state to false ', () => {
      instance.handleCreateError();
      expect(wrapper.state().dispatching).toBe(false);
    });
  });
  describe('#handleCreateError()', () => {
    it('Set state to false ', () => {
      instance.handleCreateError();
      expect(wrapper.state().dispatching).toBe(false);
    });
  });
  describe('#getPersonSuccess()', () => {
    it('Set state to false ', () => {
      instance.getPersonSuccess({}, { email: 'test' });
      expect(wrapper.state().dispatching).toBe(false);
    });
  });
  describe('#renderAddRoleButton()', () => {
    it('addNonContributorRole to be called ', () => {
      wrapper.setProps({ inviteeId: 1, type: TOUR_CONTRIBUTOR });
      instance.addRoleOption = jest.fn();
      expect(instance.renderAddRoleButton()).toMatchSnapshot();
    });
  });
});
