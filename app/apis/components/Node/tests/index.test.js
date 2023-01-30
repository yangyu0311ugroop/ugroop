import { DO_NOTHING } from 'appConstants';
import { shallow } from 'enzyme';
import React from 'react';
import { DATASTORE_UTILS } from 'datastore';
import tabs from 'datastore/templateManagementStore/helpers/tabs';
import upsertHelpers from 'utils/helpers/upsertStore';
import { ACTIVITY, TEMPLATE } from 'utils/modelConstants';
import { Node } from '..';

describe('<Node />', () => {
  let wrapper;
  let instance;

  const resaga = {
    analyse: jest.fn(),
    setValue: jest.fn(),
  };

  const makeProps = () => ({
    resaga,
  });

  beforeEach(() => {
    wrapper = shallow(<Node {...makeProps()} />);
    instance = wrapper.instance();
    jest.clearAllMocks();
  });

  it('exists', () => {
    expect(Node).toBeDefined();
  });

  describe('#componentWillReceiveProps()', () => {
    it('calls resaga.analyse()', () => {
      const nextProps = { x: 1 };
      instance.componentWillReceiveProps(nextProps);

      expect(resaga.analyse).toBeCalled();
      expect(resaga.analyse.mock.calls).toMatchSnapshot();
    });
  });

  describe('shouldComponentUpdate()', () => {
    it('returns false', () => {
      expect(instance.shouldComponentUpdate()).toBe(false);
    });
  });

  describe('createNodeSuccess', () => {
    it('should call setValue of resaga and addAbility function', () => {
      instance.addAbility = jest.fn();
      instance.createNodeSuccess({ node: { id: 1, type: TEMPLATE } });

      expect(resaga.setValue).toBeCalled();
      expect(resaga.setValue.mock.calls).toMatchSnapshot();

      expect(instance.addAbility).toBeCalled();
      expect(instance.addAbility.mock.calls).toMatchSnapshot();
    });

    it('should NOT call addAbility function', () => {
      instance.addAbility = jest.fn();
      instance.createNodeSuccess({
        nodes: [],
        node: { id: 1, type: ACTIVITY },
      });

      expect(instance.addAbility).not.toBeCalled();
    });
  });

  describe('copySuccess', () => {
    it('should call setValue of resaga and addAbility function', () => {
      instance.addAbility = jest.fn();
      instance.copySuccess({ nodes: [], node: { cloneId: 1 } });

      expect(resaga.setValue).toBeCalled();
      expect(resaga.setValue.mock.calls).toMatchSnapshot();

      expect(instance.addAbility).toBeCalled();
      expect(instance.addAbility.mock.calls).toMatchSnapshot();
    });
  });

  describe('updateNodeSuccess()', () => {
    it('should return DO_NOTHING', () => {
      expect(instance.updateNodeSuccess(1, { manuallySetValue: true })).toBe(
        DO_NOTHING,
      );
    });

    it('should call setValue is manuallySetValue is true', () => {
      instance.updateNodeSuccess(123, { manuallySetValue: false });

      expect(resaga.setValue).toBeCalledWith(123);
    });
  });

  describe('shareNodeSuccess()', () => {
    it('should call setValue', () => {
      DATASTORE_UTILS.upsertObject = jest.fn(() => 'upsertObject');
      upsertHelpers.array = jest.fn(() => 'array');

      instance.shareNodeSuccess(
        {
          nodeShare: [{ notificationToken: 'some token' }],
          nodeShareSubNode: [{ id: 'some id' }],
        },
        { shareToUserId: 5 },
      );

      expect(resaga.setValue).toBeCalled();
      expect(resaga.setValue.mock.calls).toMatchSnapshot();

      expect(DATASTORE_UTILS.upsertObject).toBeCalled();
      expect(DATASTORE_UTILS.upsertObject.mock.calls).toMatchSnapshot();

      expect(upsertHelpers.array).toBeCalled();
      expect(upsertHelpers.array.mock.calls).toMatchSnapshot();
    });
  });
  describe('cloneTemplateSuccess', () => {
    it('should return false if !tourOwnerAbilities', () => {
      wrapper.setProps({ tourOwnerAbilities: [], resaga });
      expect(instance.cloneTemplateSuccess({ id: 1, content: 'qqq' })).toBe(
        null,
      );
      expect(resaga.setValue).not.toBeCalled();
    });

    it('should call setValue', () => {
      wrapper.setProps({ tourOwnerAbilities: [1, 2], resaga });
      expect(instance.cloneTemplateSuccess({ cloneId: 1 })).not.toBe(null);
      expect(resaga.setValue).toBeCalled();
      expect(resaga.setValue.mock.calls).toMatchSnapshot();
    });
  });
  describe('#render()', () => {
    it('not explodes', () => {
      expect(wrapper).toHaveLength(1);
    });

    it('renders nothing', () => {
      expect(instance.render()).toBeNull();
    });
  });

  describe('revertMove()  ', () => {
    it('should call setValue', () => {
      tabs.updateChildren = jest.fn(() => 'tabs.updateChildren');

      instance.revertMove('some error', { tabId: 1, children: [1, 3, 2] });

      expect(resaga.setValue).toBeCalled();
      expect(resaga.setValue.mock.calls).toMatchSnapshot();

      expect(tabs.updateChildren).toBeCalled();
      expect(tabs.updateChildren.mock.calls).toMatchSnapshot();
    });
  });
});
