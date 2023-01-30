/**
 * Created by stephenkarpinskyj on 24/10/18.
 */

import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';

import { TEMPLATE_API_HELPERS } from 'apis/components/Template/helpers';
import { Create } from '..';

describe('<EventCreate />', () => {
  let wrapper;
  let instance;
  let doResagaSnapshot;

  const makeProps = () => ({
    classes: {
      root: 'root',
      paperRoot: 'paperRoot',
    },
    resaga: {
      setValue: jest.fn(
        obj => doResagaSnapshot && expect({ setValue: obj }).toMatchSnapshot(),
      ),
    },
    open: false,
    onClose: jest.fn(),
  });

  beforeEach(() => {
    wrapper = shallow(<Create {...makeProps()} />);
    instance = wrapper.instance();
    doResagaSnapshot = false;
    jest.clearAllMocks();
  });

  it('exists', () => {
    expect(Create).toBeDefined();
  });

  describe('#componentDidUpdate()', () => {
    it('calls handleOpen', () => {
      wrapper.setProps({ open: true });
      const prevProps = { open: false };
      instance.handleOpen = jest.fn();
      instance.componentDidUpdate(prevProps);
      expect(instance.handleOpen).toBeCalled();
    });
  });

  describe('#handleCreateEventSuccess()', () => {
    it('unsets dispatching', () => {
      instance.setState = jest.fn();
      instance.handleCreateEventSuccess();
      expect(instance.setState).toBeCalledWith({ dispatching: false });
    });

    it('calls props.onClose', () => {
      instance.handleCreateEventSuccess();
      expect(instance.props.onClose).toBeCalled();
    });
  });

  describe('#handleCreateEventError()', () => {
    it('unsets dispatching', () => {
      instance.setState = jest.fn();
      instance.handleCreateEventError();
      expect(instance.setState).toBeCalledWith({ dispatching: false });
    });
  });

  describe('#handleFormValidSubmit()', () => {
    it('calls TEMPLATE_API_HELPERS.createEvent', () => {
      TEMPLATE_API_HELPERS.createEvent = jest.fn();
      instance.handleFormValidSubmit({ model: 'model' });
      expect(TEMPLATE_API_HELPERS.createEvent.mock.calls).toMatchSnapshot();
    });

    it('sets dispatching', () => {
      instance.setState = jest.fn();
      instance.handleFormValidSubmit({});
      expect(instance.setState).toBeCalledWith({ dispatching: true });
    });
  });

  describe('#handleOpen()', () => {
    it('resaga.setValue still matches snapshot', () => {
      doResagaSnapshot = true;
      instance.handleOpen();
    });

    it('unsets dispatching and sets typeOpen and unsets subtypeOpen', () => {
      instance.setState = jest.fn();
      instance.handleOpen();
      expect(instance.setState).toBeCalledWith({
        dispatching: false,
        typeOpen: true,
        subtypeOpen: false,
      });
    });
  });

  describe('#handleClose()', () => {
    it('resaga.setValue still matches snapshot', () => {
      doResagaSnapshot = true;
      instance.handleClose();
    });

    it('calls props.onClose', () => {
      instance.handleClose();
      expect(instance.props.onClose).toBeCalled();
    });
  });

  describe('#handleTypeClose()', () => {
    it('unsets typeOpen and sets subtypeOpen', () => {
      instance.setState = jest.fn();
      instance.handleTypeClose();
      expect(instance.setState).toBeCalledWith({
        typeOpen: false,
        subtypeOpen: true,
      });
    });
  });

  describe('#handleSubtypeClose()', () => {
    it('unsets typeOpen and subtypeOpen', () => {
      instance.setState = jest.fn();
      instance.handleSubtypeClose();
      expect(instance.setState).toBeCalledWith({
        typeOpen: false,
        subtypeOpen: false,
      });
    });
  });

  describe('#renderNoPart()', () => {
    it('still matches snapshot', () => {
      expect(instance.renderNoPart()).toMatchSnapshot();
    });
  });

  describe('#renderFooter()', () => {
    it('still matches snapshot', () => {
      const args = {
        renderActions: (...args2) => args2,
        renderSubmitButton: () => 'submitButton',
        renderCancelButton: () => 'cancelButton',
      };
      expect(
        toJSON(shallow(<div>{instance.renderFooter(args)}</div>)),
      ).toMatchSnapshot();
    });
  });

  describe('#renderHeader()', () => {
    it('still matches snapshot', () => {
      const args = {
        renderCloseButton: () => 'closeButton',
      };
      expect(
        toJSON(shallow(<div>{instance.renderHeader(args)}</div>)),
      ).toMatchSnapshot();
    });
  });

  describe('#renderSubmitButtonContent()', () => {
    it('still matches snapshot if formBatchCreate', () => {
      wrapper.setProps({ formBatchCreate: true });
      expect(instance.renderSubmitButtonContent()).toMatchSnapshot();
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
});
