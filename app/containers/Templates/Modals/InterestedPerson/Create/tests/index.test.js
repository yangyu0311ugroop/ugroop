import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { NODE_API_HELPERS } from 'apis/components/Node/helpers';

import { CreateInterestedPerson } from '..';

describe('<CreateInterestedPerson />', () => {
  let wrapper;
  let instance;

  const makeProps = () => ({
    templateId: 1,
    onClose: jest.fn(),
  });
  const resaga = {
    setValue: jest.fn(),
    dispatchTo: jest.fn(),
  };

  beforeEach(() => {
    wrapper = shallow(
      <CreateInterestedPerson {...makeProps()} resaga={resaga} />,
    );
    instance = wrapper.instance();
    jest.clearAllMocks();
  });

  it('exists', () => {
    expect(CreateInterestedPerson).toBeDefined();
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

  describe('#handleOpen()', () => {
    it('unsets dispatching', () => {
      instance.setState = jest.fn();
      instance.handleOpen();
      expect(instance.setState).toBeCalledWith({ dispatching: false });
    });
  });

  describe('handleCreateLinkSuccess', () => {
    it('unsets dispatching', () => {
      instance.setState = jest.fn();
      instance.handleCreateLinkSuccess();
      expect(instance.setState).toBeCalledWith({ dispatching: false });
    });

    it('calls props.onClose', () => {
      instance.handleCreateLinkSuccess();
      expect(instance.props.onClose).toBeCalled();
    });
  });

  describe('handleCreateLink', () => {
    it('should call dispatchTo', () => {
      const args = { followerId: 1, relationship: 'asdasd' };
      const props = { interestedPersonCreateParticipantId: 1 };

      wrapper.setProps(props);
      instance.handleCreateLink(args);

      expect(resaga.dispatchTo).toBeCalled();
      expect(resaga.dispatchTo.mock.calls).toMatchSnapshot();
    });
  });

  describe('handleCloseModal', () => {
    it('should call setValue and onClose props', () => {
      instance.handleCloseModal();

      expect(instance.props.onClose).toBeCalled();
      expect(resaga.setValue).toBeCalledWith({
        interestedPersonCreateParticipantId: 0,
      });
    });
  });

  describe('handleCreateSuccess', () => {
    it('should call handleCreateLink when interestedPersonCreateParticipantId > 0', () => {
      wrapper.setProps({
        interestedPersonCreateParticipantId: 1,
      });
      const model = { relationship: 1, otherRelationship: 2 };
      const result = { 1022: {} };
      instance.handleCreateLink = jest.fn();

      instance.handleCreateSuccess(model)(result);

      expect(instance.handleCreateLink).toBeCalled();
    });
    it('should setState dispatching to false and call onClose immediately', () => {
      const model = { relationship: 1, otherRelationship: 2 };
      const result = { 1022: {} };

      instance.handleCreateSuccess(model)(result);

      expect(wrapper.state().dispatching).toBe(false);
      expect(instance.props.onClose).toBeCalled();
    });
  });

  describe('#handleCreateSuccess()', () => {
    it('', () => {
      instance.setState = jest.fn();
      instance.handleCreateSuccess({})();
      expect(instance.setState).toBeCalledWith({ dispatching: false });
    });

    it('calls props.onClose', () => {
      instance.handleCreateSuccess({})();
      expect(instance.props.onClose).toBeCalled();
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
        CreateInterestedPerson.defaultProps.onClose();
      }).not.toThrow();
    });
  });
});
