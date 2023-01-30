/**
 * Created by stephenkarpinskyj on 27/3/18.
 */

import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';

import { ComplexDialogForm } from '..';

describe('<DialogForm />', () => {
  let wrapper;
  let instance;

  const makeProps = () => ({
    children: 'Children',
    open: true,
    onClose: jest.fn(),
    classes: {
      paper: 'paper',
      titleRoot: 'titleRoot',
      actionsRoot: 'actionsRoot',
    },
    isFormChanged: false,
    isFormDisabled: false,
    canSubmitForm: true,
    submitForm: () => 'Submit Form',
    cancelForm: () => 'Cancel Form',
    resetForm: () => 'Reset Form',
    renderForm: jest
      .fn()
      .mockImplementation(children => <form>{children}</form>),
    renderSubmitButton: () => 'Submit Button',
    renderCancelButton: () => 'Cancel Button',
    PaperProps: { y: 2 },
  });

  beforeEach(() => {
    wrapper = shallow(<ComplexDialogForm {...makeProps()} />);
    instance = wrapper.instance();
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('exists', () => {
    expect(ComplexDialogForm).toBeDefined();
  });

  describe('#getDialogProps()', () => {
    it('still matches snapshot', () => {
      expect(instance.getDialogProps()).toMatchSnapshot();
    });
    it('returns existing if exists', () => {
      const dialogProps = { x: 1 };
      instance.dialogProps = dialogProps;
      expect(instance.getDialogProps()).toEqual(dialogProps);
    });
  });

  describe('#getPaperProps()', () => {
    it('returns existing if exists', () => {
      const paperProps = { x: 1 };
      instance.paperProps = paperProps;
      expect(instance.getPaperProps()).toEqual(paperProps);
    });
  });

  describe('#renderForm()', () => {
    it('calls props.renderForm with props arg', () => {
      const props = 'props';
      instance.renderForm(props);
      expect(instance.props.renderForm).toBeCalledWith(props);
    });
  });

  describe('#renderHeader()', () => {
    let args;

    beforeEach(() => {
      args = {
        onClose: jest.fn(),
      };
    });

    it('still matches snapshot when form changed', () => {
      wrapper.setProps({ isFormChanged: true });
      expect(toJSON(shallow(instance.renderHeader(args)))).toMatchSnapshot();
    });

    it('still matches snapshot when form not changed', () => {
      wrapper.setProps({ isFormChanged: false });
      expect(toJSON(shallow(instance.renderHeader(args)))).toMatchSnapshot();
    });
    it('still matches snapshot when form not changed and not disabled', () => {
      wrapper.setProps({ isFormChanged: false });
      expect(toJSON(shallow(instance.renderHeader(args)))).toMatchSnapshot();
    });
    it('still matches snapshot when form changed and disabled', () => {
      wrapper.setProps({ isFormChanged: true, isFormDisabled: true });
      expect(toJSON(shallow(instance.renderHeader(args)))).toMatchSnapshot();
    });

    it('calls props.renderHeader() if given', () => {
      wrapper.setProps({ renderHeader: jest.fn() });
      instance.renderHeader(args);
      expect(instance.props.renderHeader).toHaveBeenCalledWith(
        expect.objectContaining(args),
      );
    });
  });

  describe('#renderFooter()', () => {
    let args;

    beforeEach(() => {
      args = {
        renderActions: instance.renderActions,
        renderSubmitButton: instance.props.renderSubmitButton,
        renderCancelButton: instance.props.renderCancelButton,
      };
    });

    it('still matches snapshot when form changed', () => {
      expect(toJSON(shallow(instance.renderFooter(args)))).toMatchSnapshot();
    });

    it('calls props.renderFooter() if given', () => {
      wrapper.setProps({ renderFooter: jest.fn() });
      instance.renderFooter(args);
      expect(instance.props.renderFooter).toHaveBeenCalledWith(
        expect.objectContaining(args),
      );
    });
  });

  describe('#render()', () => {
    it('not explodes', () => {
      expect(wrapper).toHaveLength(1);
    });

    it('still matches snapshot', () => {
      instance.getDialogProps = () => ({ x: 1 });
      instance.renderChildren = () => 'Children';
      expect(toJSON(shallow(instance.render()))).toMatchSnapshot();
    });
  });
});
