import { DO_NOTHING } from 'appConstants';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { InlineRadioGroup } from '../index';
import momentHelpers from '../../../../utils/helpers/moment';

describe('<InlineRadioGroup />', () => {
  let rendered;
  let instance;

  const props = {
    name: 'some radio',
    isFormDisabled: () => false,
    options: {},
    classes: { blue: 'blue', green: 'green', fade: 'fade' },
    getValue: jest.fn(),
    setValue: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();

    rendered = shallow(<InlineRadioGroup {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(InlineRadioGroup).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('componentWillReceiveProps()', () => {
    it('should setState', () => {
      rendered.setProps({ loading: true });
      rendered.setState({ saved: false });

      instance.componentWillReceiveProps({ showSaved: true, loading: false });

      expect(rendered.state().saved).toBe(true);
    });

    it('should DO_NOTHING', () => {
      rendered.setProps({ loading: false });
      rendered.setState({ saved: false });

      expect(
        instance.componentWillReceiveProps({ showSaved: true, loading: false }),
      ).toBe(DO_NOTHING);
      expect(
        instance.componentWillReceiveProps({ showSaved: true, loading: true }),
      ).toBe(DO_NOTHING);
    });
  });

  describe('componentWillUnmount()', () => {
    it('should call resetCancelEdit', () => {
      instance.resetCancelEdit = jest.fn();

      instance.componentWillUnmount();

      expect(instance.resetCancelEdit).toBeCalledWith();
    });
  });

  describe('getColor()', () => {
    it('should return default', () => {
      rendered.setProps({ loading: true });

      expect(instance.getColor()).toBe('default');
    });

    it('should return given color', () => {
      rendered.setProps({ loading: false, color: 'primary' });

      expect(instance.getColor()).toBe('primary');
    });

    it('should return primary', () => {
      rendered.setProps({ loading: false, color: '', disabled: true });

      expect(instance.getColor()).toBe('primary');
    });

    it('should return success', () => {
      rendered.setProps({ loading: false, color: '', disabled: false });

      expect(instance.getColor()).toBe('success');
    });
  });

  describe('getValueLabel()', () => {
    it('should return value', () => {
      rendered.setProps({ valueLabel: 'Value Label' });

      expect(instance.getValueLabel()).toBe('Value Label');
    });

    it('should call function to get value', () => {
      rendered.setProps({ valueLabel: s => s.toUpperCase() });

      expect(instance.getValueLabel('green')).toBe('GREEN');
    });
  });

  describe('getPostValueLabel()', () => {
    it('should return value', () => {
      rendered.setProps({ postValueLabel: 'Value Label' });

      expect(instance.getPostValueLabel()).toBe('Value Label');
    });

    it('should call function to get value', () => {
      rendered.setProps({ postValueLabel: s => s.toUpperCase() });

      expect(instance.getPostValueLabel('green')).toBe('GREEN');
    });
  });

  describe('clearSaved()', () => {
    it('should setState', () => {
      rendered.setState({ saved: true });

      instance.clearSaved();

      expect(rendered.state().saved).toBe(false);
    });
  });
  describe('isDisabled()', () => {
    it('returns true correctly', () => {
      rendered.setProps({ isFormDisabled: () => true, disabled: false });
      expect(instance.isDisabled()).toBe(true);
      rendered.setProps({ isFormDisabled: () => false, disabled: true });
      expect(instance.isDisabled()).toBe(true);
    });
  });

  describe('handleRef()', () => {
    it('should return value', () => {
      instance.handleRef('abc');

      expect(instance.anchorEl).toBe('abc');
    });
  });

  describe('handleClick()', () => {
    it('should handleClick call setValue with key undefined', () => {
      instance.handleClick()();

      expect(props.setValue).toBeCalledWith(undefined);
    });

    it('should handle autoClose', () => {
      global.setTimeout = jest.fn();
      rendered.setProps({ autoClose: true });

      instance.handleClick()();

      expect(global.setTimeout).toBeCalled();
    });

    it('should handleClick call setValue with key set', () => {
      const onChange = jest.fn();
      rendered.setProps({ onChange });
      instance.handleClick('some key')();

      expect(props.setValue).toBeCalledWith('some key');
      expect(onChange).toBeCalledWith('some key');
    });
  });

  describe('cancelEdit()', () => {
    it('should call handleClick with previousValue', () => {
      instance.handleClick = jest.fn(() => jest.fn());
      instance.previousValue = 9123;

      instance.cancelEdit();

      expect(instance.handleClick).toBeCalledWith(9123);
    });
  });

  describe('optionClassName()', () => {
    it('should render fade', () => {
      rendered.setProps({ highlightSelected: true });

      expect(instance.optionClassName()).toMatchSnapshot();
    });

    it('should render custom className', () => {
      rendered.setProps({
        highlightSelected: true,
        optionClassName: 'optionClassName',
        selectedOptionClassName: 'selectedOptionClassName',
      });

      expect(instance.optionClassName(true)).toMatchSnapshot();
    });
  });

  describe('renderSeparator()', () => {
    it('should renderSeparator when index is NOT the last one', () => {
      const snapshot = shallow(
        <div>{instance.renderSeparator(0, [1, 2])}</div>,
      );

      expect(toJSON(snapshot)).toMatchSnapshot();
    });

    it('should NOT renderSeparator when index is the last one', () => {
      const snapshot = shallow(
        <div>{instance.renderSeparator(1, [1, 2])}</div>,
      );

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderEditButton()', () => {
    it('should return empty if disabled', () => {
      rendered.setProps({ disabled: true });

      expect(instance.renderEditButton()).toBe('');
    });

    it('should return loading if loading', () => {
      rendered.setProps({ disabled: false, loading: true });

      const snapshot = shallow(<div>{instance.renderEditButton()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });

    it('should return saved if saved', () => {
      rendered.setProps({ disabled: false, loading: false });
      rendered.setState({ saved: true });

      const snapshot = shallow(<div>{instance.renderEditButton()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });

    it('should renderEditButton if NOT disabled', () => {
      rendered.setProps({ disabled: false });

      const snapshot = shallow(<div>{instance.renderEditButton()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderContent()', () => {
    it('should renderContent', () => {
      rendered.setProps({
        getValue: () => 'abc',
        options: { abc: 'Some Value' },
      });

      const snapshot = shallow(<div>{instance.renderContent()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderValue()', () => {
    beforeEach(() => {
      instance.renderContent = () => 'renderContent';
    });

    it('should NOT render tooltip if disabled', () => {
      rendered.setProps({ disabled: true });

      const snapshot = shallow(<div>{instance.renderValue()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });

    it('should render tooltip if NOT disabled', () => {
      rendered.setProps({ disabled: false });

      const snapshot = shallow(<div>{instance.renderValue()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderOptionTitle()', () => {
    it('should return empty if not selected', () => {
      expect(instance.renderOptionTitle()).toBe('');
    });

    it('should return value if selected', () => {
      rendered.setProps({ selectedTitle: 'this is selected ' });

      expect(instance.renderOptionTitle(true)).toBe('this is selected ');
    });
  });

  describe('formatDate()', () => {
    it('should render correctly', () => {
      const today = momentHelpers.getDateToday(); // moment().toDate();
      expect(instance.formatDate('D MMMM YYYY')).toBe(
        momentHelpers.getDateWithFormat(today, 'D MMMM YYYY'),
      );
    });
  });

  describe('renderModePopperButton()', () => {
    it('render renderModePopperButton if optionDropDown is true', () => {
      const today = momentHelpers.getDateToday();
      momentHelpers.getDateToday = jest.fn(() => '16 October 2020');
      TEST_HELPERS.expectDefined(
        instance.renderModePopperButton(
          momentHelpers.getDateWithFormat(today, 'dddd, D MMMM YYYY'),
        ),
        [{ openMenu: jest.fn() }],
      );
    });
  });

  describe('renderModePopperOptions()', () => {
    it('render renderModePopperOptions if optionDropDown is true', () => {
      rendered.setProps({
        options: {
          abc: 'Some Value',
          def: 'Other value',
        },
        excludeOptions: ['nothing here'],
      });

      TEST_HELPERS.expectMatchSnapshot(instance.renderModePopperOptions(), [
        {},
      ]);
    });
  });

  describe('renderModePopper()', () => {
    it('should render correctly', () => {
      const snapshot = shallow(
        <div>{instance.renderModePopper('D MMMM YYYY')}</div>,
      );

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderOptions()', () => {
    it('should still render correctly if optionDropDown is true', () => {
      rendered.setProps({ optionDropDown: true });
      instance.renderModePopper = () => 'renderModePopper';

      expect(instance.renderOptions(true)).toBe('renderModePopper');
    });
    it('should render correctly', () => {
      instance.renderSeparator = () => 'renderSeparator';
      instance.getButtonClass = () => 'getButtonClass';

      rendered.setProps({ options: { abc: 'Some Value', def: 'Other value' } });

      const snapshot = shallow(<div>{instance.renderOptions()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('should still render correctly if excludeOptions has value ', () => {
      instance.renderSeparator = () => 'renderSeparator';
      instance.getButtonClass = () => 'getButtonClass';

      rendered.setProps({
        options: {
          abc: 'Some Value',
          def: 'Other value',
        },
        excludeOptions: ['nothing here'],
      });

      const snapshot = shallow(<div>{instance.renderOptions()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('render()', () => {
    it('should renderOptions if !getValue()', () => {
      instance.renderOptions = () => 'renderOptions';

      rendered.setProps({ getValue: () => false });

      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });

    it('should renderValue if getValue()', () => {
      instance.renderValue = () => 'renderValue';

      rendered.setProps({ getValue: () => 'Some Value' });

      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });

    it('renders nothing when hidden', () => {
      rendered.setProps({ type: 'hidden' });

      expect(instance.render()).toBeNull();
    });
  });
});
