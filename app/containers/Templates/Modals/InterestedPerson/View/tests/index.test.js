import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { ability } from 'apis/components/Ability/ability';

import { ViewInterestedPerson } from '..';

describe('<ViewInterestedPerson />', () => {
  let wrapper;
  let instance;

  const makeProps = () => ({
    templateId: 1,
    participants: [2],
    onClose: jest.fn(),
    resaga: {
      setValue: jest.fn(),
      dispatchTo: jest.fn(),
    },
  });

  beforeEach(() => {
    ability.can = jest.fn(() => true);
    wrapper = shallow(<ViewInterestedPerson {...makeProps()} />);
    instance = wrapper.instance();
    jest.clearAllMocks();
  });

  it('exists', () => {
    expect(ViewInterestedPerson).toBeDefined();
  });

  describe('#upsertNodes()', () => {
    it('should call setValue', () => {
      const props = makeProps();
      instance.componentWillUnmount();
      expect(props.resaga.setValue.mock.calls).toMatchSnapshot();
    });
  });
  describe('#showLinkedUser()', () => {
    it('to return true', () => {
      expect(instance.showLinkedUser()).toEqual(true);
    });
    it('to return false', () => {
      instance.isContributor = jest.fn(() => false);
      expect(instance.showLinkedUser()).toEqual(false);
    });
  });
  describe('#isFromRyi()', () => {
    it('to return true', () => {
      wrapper.setProps({ createdBy: 999 });
      expect(instance.isFromRyi()).toEqual(false);
    });
    it('to return false', () => {
      wrapper.setProps({ createdBy: null });
      expect(instance.isFromRyi()).toEqual(true);
    });
  });
  describe('#renderHeading()', () => {
    it('should call setValue', () => {
      expect(instance.renderHeading('')).toMatchSnapshot();
    });
  });
  describe('#upsertNodes()', () => {
    it('returns existing if exists', () => {
      const toUpsert = { toUpsert: 1 };
      const nodes = { nodes: 2 };
      expect(instance.upsertNodes(toUpsert)(nodes)).toEqual({
        nodes: 2,
        toUpsert: 1,
      });
    });
  });

  describe('#handleDeleteSuccess()', () => {
    it('unsets confirmingDelete', () => {
      instance.setState = jest.fn();
      instance.handleDeleteSuccess();
      expect(instance.setState).toBeCalledWith({ confirmingDelete: false });
    });

    it('calls props.onClose', () => {
      instance.handleDeleteSuccess();
      expect(instance.props.onClose).toBeCalled();
    });
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
      instance.handleDeleteConfirm({ model: { x: 1 } });
      expect(instance.props.resaga.dispatchTo.mock.calls).toMatchSnapshot();
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

  describe('#handleClose()', () => {
    it('calls props.onClose', () => {
      instance.handleClose();
      expect(instance.props.onClose).toBeCalled();
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
        ViewInterestedPerson.defaultProps.onClose();
      }).not.toThrow();
    });
  });
});
