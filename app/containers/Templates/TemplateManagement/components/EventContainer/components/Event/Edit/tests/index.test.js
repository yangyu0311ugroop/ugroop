/**
 * Created by stephenkarpinskyj on 24/10/18.
 */

import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';

import { NODE_API_HELPERS } from 'apis/components/Node/helpers';
import { TEMPLATE_API_HELPERS } from 'apis/components/Template/helpers';
import { EVENT_CONSTANTS } from 'utils/constants/events';
import { Edit } from '..';

describe('<EventEdit />', () => {
  let wrapper;
  let instance;
  let doResagaSnapshot;

  const makeProps = () => ({
    classes: {
      paperRoot: 'paperRoot',
    },
    resaga: {
      setValue: jest.fn(
        obj => doResagaSnapshot && expect({ setValue: obj }).toMatchSnapshot(),
      ),
    },
    open: false,
    id: 1,
    onClose: jest.fn(),
    templateId: 2,
  });

  beforeEach(() => {
    wrapper = shallow(<Edit {...makeProps()} />);
    instance = wrapper.instance();
    doResagaSnapshot = false;
    jest.clearAllMocks();
  });

  it('exists', () => {
    expect(Edit).toBeDefined();
  });

  describe('#componentDidUpdate()', () => {
    it('calls handleOpen', () => {
      wrapper.setProps({ open: true });
      const prevProps = { open: false };
      instance.handleOpen = jest.fn();
      instance.componentDidUpdate(prevProps);
      expect(instance.handleOpen).toBeCalled();
    });

    it('not calls handleOpen', () => {
      wrapper.setProps({ open: false });
      const prevProps = { open: false };
      instance.handleOpen = jest.fn();
      instance.componentDidUpdate(prevProps);
      expect(instance.handleOpen).not.toBeCalled();
    });
  });

  describe('#getValue()', () => {
    it('returns formValue if present', () => {
      const formValue = 'formValue';
      expect(instance.getValue(formValue)).toEqual(formValue);
    });
  });

  describe('#updateTimes()', () => {
    it('calls NODE_API_HELPERS.getTimes', () => {
      NODE_API_HELPERS.getTimes = jest.fn();
      instance.updateTimes();
      expect(NODE_API_HELPERS.getTimes.mock.calls).toMatchSnapshot();
    });
  });

  describe('#handlePatchEventSuccess()', () => {
    it('unsets dispatching', () => {
      instance.setState = jest.fn();
      instance.handlePatchEventSuccess();
      expect(instance.setState).toBeCalledWith({ dispatching: false });
    });

    it('calls props.onClose', () => {
      instance.handlePatchEventSuccess();
      expect(instance.props.onClose).toBeCalled();
    });
  });

  describe('#handlePatchEventError()', () => {
    it('unsets dispatching', () => {
      instance.setState = jest.fn();
      instance.handlePatchEventError();
      expect(instance.setState).toBeCalledWith({ dispatching: false });
    });
  });

  describe('#handleFormValidSubmit()', () => {
    it('calls TEMPLATE_API_HELPERS.patchEvent if changed', () => {
      TEMPLATE_API_HELPERS.patchEvent = jest.fn();
      instance.handleFormValidSubmit({ model: 'model', isChanged: true });
      expect(TEMPLATE_API_HELPERS.patchEvent.mock.calls).toMatchSnapshot();
    });

    it('sets dispatching if changed', () => {
      instance.setState = jest.fn();
      instance.handleFormValidSubmit({ isChanged: true });
      expect(instance.setState).toBeCalledWith({ dispatching: true });
    });

    it('calls props.onClose if not changed', () => {
      instance.handleFormValidSubmit({ isChanged: false });
      expect(instance.props.onClose).toBeCalled();
    });
  });

  describe('#handleOpen()', () => {
    it('resaga.setValue still matches snapshot', () => {
      doResagaSnapshot = true;
      instance.handleOpen();
    });

    it('unsets dispatching', () => {
      instance.setState = jest.fn();
      instance.handleOpen();
      expect(instance.setState).toBeCalledWith({ dispatching: false });
    });
  });

  describe('#handleClose()', () => {
    it('calls props.onClose', () => {
      instance.handleClose();
      expect(instance.props.onClose).toBeCalled();
    });
  });

  describe('filterOptions', () => {
    it('should return true if type is not flight', () => {
      expect(
        instance.filterOptions({
          value: EVENT_CONSTANTS.TRANSPORTATIONS.COACH.type,
        }),
      ).toBe(true);
    });
  });

  describe('#renderNoPart()', () => {
    it('still matches snapshot', () => {
      expect(instance.renderNoPart()).toMatchSnapshot();
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

  describe('#render()', () => {
    it('not explodes', () => {
      expect(wrapper).toHaveLength(1);
    });

    it('still matches snapshot', () => {
      expect(toJSON(wrapper)).toMatchSnapshot();
    });
  });
});
