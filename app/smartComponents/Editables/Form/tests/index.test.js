import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { EditableForm, renderDefaultValue, ANONYMOUS_FUNC } from '../index';

describe('<EditableForm />', () => {
  let rendered;
  let instance;

  beforeEach(() => {
    rendered = shallow(<EditableForm classes={{}} />);
    instance = rendered.instance();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Smoke tests', () => {
    it('should exist', () => {
      expect(EditableForm).toBeDefined();
    });
    it('should render without exploding', () => {
      expect(rendered.length).toBe(1);
    });
    it('should render properly', () => {
      expect(toJSON(rendered)).toMatchSnapshot();
    });
  });

  describe('setStates', () => {
    it('handleSubmitSuccess', () => {
      instance.handleSubmitSuccess();
      expect(rendered.state()).toMatchSnapshot();
    });
    it('handleSubmitError', () => {
      instance.handleSubmitError();
      expect(rendered.state()).toMatchSnapshot();
    });
    it('handleValidSubmit', () => {
      const onSubmit = jest.fn();
      rendered.setProps({ onSubmit });

      instance.handleValidSubmit('test');
      expect(onSubmit).toBeCalled();
      expect(rendered.state()).toMatchSnapshot();
    });
    it('handlePopoverClose', () => {
      instance.handlePopoverClose();
      expect(rendered.state()).toMatchSnapshot();
    });
    it('handleEditableClick', () => {
      instance.handleEditableClick();
      expect(rendered.state()).toMatchSnapshot();
    });
    it('handleCancel', () => {
      const onClose = jest.fn();
      rendered.setProps({ onClose });
      instance.handleCancel();
      expect(rendered.state()).toMatchSnapshot();
      expect(onClose).toBeCalled();
    });
    it('handleEditableButtonRef', () => {
      instance.handleEditableButtonRef('test');
      expect(rendered.state()).toMatchSnapshot();
    });
  });

  describe('defaultProps', () => {
    it('return default renderValue', () => {
      expect(renderDefaultValue('test')).toBe('test');
    });
    describe('ANONYMOUS_FUNC', () => {
      it('call ANONYMOUS_FUNC', ANONYMOUS_FUNC);
    });
  });

  describe('instance', () => {
    describe('renderPlaceholder', () => {
      it('renders props.readOnlyPlaceholder if props.readOnly', () => {
        rendered.setProps({ readOnly: true });
        expect(instance.renderPlaceholder()).toMatchSnapshot();
      });
    });

    describe('renderLabel', () => {
      it('should render editable label', () => {
        const snapshot = shallow(<div>{instance.renderLabel()}</div>);
        expect(toJSON(snapshot)).toMatchSnapshot();
      });
    });

    describe('renderContent', () => {
      it('has value', () => {
        instance.renderValue = jest.fn();
        rendered.setProps({ value: 'test' });
        instance.renderContent();
        expect(instance.renderValue).toBeCalled();
      });
      it('has no value', () => {
        const renderPlaceholder = jest.fn();
        instance.renderPlaceholder = renderPlaceholder;
        instance.renderContent();
        expect(renderPlaceholder).toBeCalled();
      });
    });

    describe('renderValue', () => {
      it('has value & action and isRow', () => {
        const renderValue = jest.fn(() => 'renderValue');
        const renderActions = jest.fn(() => <div />);
        rendered.setProps({
          value: 'test',
          renderValue,
          renderActions,
          isRow: true,
        });
        const snapshot = shallow(<div>{instance.renderValue()}</div>);
        expect(toJSON(snapshot)).toMatchSnapshot();
      });
      it('has value & action and is not row', () => {
        const renderValue = jest.fn(() => 'renderValue');
        const renderActions = jest.fn(() => <div />);
        rendered.setProps({
          value: 'test',
          renderValue,
          renderActions,
          isRow: false,
        });
        const snapshot = shallow(<div>{instance.renderValue()}</div>);
        expect(toJSON(snapshot)).toMatchSnapshot();
      });
      it('has value with no action', () => {
        const renderValue = jest.fn(() => 'renderValue');
        rendered.setProps({ value: 'test', renderValue, renderActions: null });
        const snapshot = shallow(<div>{instance.renderValue()}</div>);
        expect(toJSON(snapshot)).toMatchSnapshot();
      });
    });

    describe('renderFormActions()', () => {
      it('should renderFormActions', () => {
        const renderSecondaryFormActionsWithProps = jest.fn();
        rendered.setProps({ renderSecondaryFormActionsWithProps });

        instance.renderFormActions();

        TEST_HELPERS.expectCalledAndMatchSnapshot(
          renderSecondaryFormActionsWithProps,
        );
      });
    });
  });
});
