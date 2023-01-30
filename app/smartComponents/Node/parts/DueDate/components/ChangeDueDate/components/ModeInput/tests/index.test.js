import { NODE_API_HELPERS } from 'apis/components/Node/helpers';
import { DO_NOTHING } from 'appConstants';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import {
  DUE_DATE_HELPERS,
  RELATIVE,
} from 'smartComponents/Node/parts/DueDate/components/ChangeDueDate/helpers';
import { CHECKLIST, TEMPLATE } from 'utils/modelConstants';
import { ModeInput } from '../index';

describe('<ModeInput />', () => {
  let rendered;
  let instance;

  const resaga = {
    setValue: jest.fn(),
    dispatchTo: jest.fn(),
  };

  const props = {
    classes: {},
    resaga,
  };

  beforeEach(() => {
    rendered = shallow(<ModeInput {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(ModeInput).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('stopPropagation()', () => {
    it('should return falsy #1', () => {
      expect(instance.stopPropagation()).toBe(undefined);
    });

    it('should return falsy #2', () => {
      expect(instance.stopPropagation({})).toBe(undefined);
    });

    it('should return stopPropagation', () => {
      const stopPropagation = jest.fn(() => 'stopPropagation');
      expect(instance.stopPropagation({ stopPropagation })).toBe(
        'stopPropagation',
      );
    });
  });

  describe('selectedRelative()', () => {
    it('should return makeSelectedRelativeDateOption', () => {
      rendered.setProps({ parentType: TEMPLATE, dueDate: { value: 'P1D' } });
      DUE_DATE_HELPERS.makeSelectedRelativeDateOption = jest.fn(
        () => 'makeSelectedRelativeDateOption',
      );

      expect(instance.selectedRelative()).toBe(
        'makeSelectedRelativeDateOption',
      );
    });

    it('should return null #1', () => {
      rendered.setProps({ parentType: '' });

      expect(instance.selectedRelative()).toBe(null);
    });

    it('should return null #2', () => {
      rendered.setProps({ parentType: TEMPLATE, dueDate: { value: '-P1D' } });

      expect(instance.selectedRelative()).toBe(null);
    });
  });

  describe('inputDuration()', () => {
    it('should return makeCustomDurationOption', () => {
      rendered.setProps({ parentType: TEMPLATE, dueDate: { value: 'P1D' } });
      DUE_DATE_HELPERS.makeCustomDurationOption = jest.fn(
        () => 'makeCustomDurationOption',
      );

      expect(instance.inputDuration()).toBe('makeCustomDurationOption');
    });

    it('should return null #1', () => {
      rendered.setProps({ parentType: '' });

      expect(instance.inputDuration()).toBe(null);
    });

    it('should return null #2', () => {
      rendered.setProps({ parentType: TEMPLATE, dueDate: { value: '-P1D' } });
      rendered.setState({ customDuration: '-P1D' });

      expect(instance.inputDuration()).toBe(null);
    });
  });

  describe('modeOptions()', () => {
    it('should match snapshot', () => {
      rendered.setProps({ parentType: TEMPLATE, dueDate: { value: 'P1D' } });

      expect(instance.modeOptions()).toMatchSnapshot();
    });
  });

  // TODO: update when Modal is implemented
  describe('handleShowHelp()', () => {
    it('should show help', () => {
      instance.handleShowHelp();
    });
  });

  describe('handleClickItem()', () => {
    it('should return null #1', () => {
      DUE_DATE_HELPERS.isFixed = jest.fn(() => true);

      expect(instance.handleClickItem({})()).toBe(null);
    });

    it('should return null #2', () => {
      DUE_DATE_HELPERS.isCustom = jest.fn(() => true);

      expect(instance.handleClickItem({})()).toBe(null);
    });

    it('should not call changeDueDate', () => {
      DUE_DATE_HELPERS.isFixed = jest.fn(() => false);
      DUE_DATE_HELPERS.isCustom = jest.fn(() => false);
      instance.changeDueDate = jest.fn();

      instance.handleClickItem({ key: RELATIVE }, true)();

      expect(instance.changeDueDate).not.toBeCalled();
    });

    it('should call changeDueDate', () => {
      DUE_DATE_HELPERS.isFixed = jest.fn(() => false);
      DUE_DATE_HELPERS.isCustom = jest.fn(() => false);
      rendered.setProps({ onClose: jest.fn() });
      instance.changeDueDate = jest.fn();

      instance.handleClickItem({ key: RELATIVE }, false)();

      expect(instance.changeDueDate).toBeCalled();
    });
  });

  describe('changeDueDate()', () => {
    it('should render correctly', () => {
      rendered.setProps({ type: CHECKLIST });
      instance.changeDueDate({ mode: RELATIVE, value: 'P2D' });

      expect(resaga.dispatchTo).toBeCalled();
      expect(resaga.dispatchTo.mock.calls).toMatchSnapshot();
    });
  });

  describe('updateSuccess()', () => {
    it('should updateSuccess()', () => {
      NODE_API_HELPERS.getTreeAndTimes = jest.fn();

      instance.updateSuccess();

      expect(NODE_API_HELPERS.getTreeAndTimes).toBeCalled();
    });
  });

  describe('handleChangeCustom()', () => {
    it('should return null', () => {
      expect(instance.handleChangeCustom()).toBe(null);
    });

    it('should return duration', () => {
      instance.handleChangeCustom('2d');

      expect(rendered.state().customDuration).toBe('PT48H');
    });

    it('should do nothing', () => {
      rendered.setState({ customDuration: 'PT24H' });

      instance.handleChangeCustom('invalid duration');

      expect(rendered.state().customDuration).toBe('PT24H');
    });
  });

  describe('handleChangeFixed()', () => {
    it('should do nothing', () => {
      rendered.setState({ fixedDate: 'fixedDate' });

      instance.handleChangeFixed();

      expect(rendered.state().fixedDate).toBe('fixedDate');
    });

    it('should set fixedDate', () => {
      rendered.setState({ fixedDate: 'fixedDate' });

      instance.handleChangeFixed('new fixedDate');

      expect(rendered.state().fixedDate).toBe('new fixedDate');
    });
  });

  describe('handleChangeFixedTime()', () => {
    it('should set fixedTime', () => {
      rendered.setState({ fixedTime: 'fixedTime' });

      instance.handleChangeFixedTime('new fixedTime');

      expect(rendered.state().fixedTime).toBe('new fixedTime');
    });
  });

  describe('handlePickerOpen()', () => {
    it('should call closeOnClickAway', () => {
      const closeOnClickAway = jest.fn();

      rendered.setProps({ closeOnClickAway });

      instance.handlePickerOpen('new fixedTime');

      expect(closeOnClickAway).toBeCalledWith(false);
    });

    it('should DO_NOTHING', () => {
      rendered.setProps({ closeOnClickAway: undefined });

      expect(instance.handlePickerOpen()).toBe(DO_NOTHING);
    });
  });

  describe('handlePickerClose()', () => {
    it('should call closeOnClickAway', () => {
      const closeOnClickAway = jest.fn();

      rendered.setProps({ closeOnClickAway });

      instance.handlePickerClose('new fixedTime');

      expect(closeOnClickAway).toBeCalledWith(true);
    });

    it('should DO_NOTHING', () => {
      rendered.setProps({ closeOnClickAway: undefined });

      expect(instance.handlePickerClose()).toBe(DO_NOTHING);
    });
  });

  // TODO: to be implemented
  describe('handleSubmitCustom()', () => {
    it('should handleSubmitCustom', () => {
      instance.handleSubmitCustom();
    });
  });

  describe('handleSubmitFixed()', () => {
    it('should handleSubmitFixed', () => {
      instance.handleSubmitFixed();
    });
  });

  describe('renderCustom()', () => {
    it('should renderCustom', () => {
      const snapshot = shallow(
        <div>{instance.renderCustom({ key: 'some key' })}</div>,
      );

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderFixed()', () => {
    it('should renderFixed', () => {
      const snapshot = shallow(
        <div>{instance.renderFixed({ key: 'some key' })}</div>,
      );

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderListItem()', () => {
    it('should renderListItem', () => {
      const snapshot = shallow(
        <div>{instance.renderListItem({ key: 'some key' })}</div>,
      );

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('render()', () => {
    it('should render correctly', () => {
      instance.modeOptions = jest.fn(() => ['modeOptions']);
      instance.renderListItem = jest.fn(() => 'renderListItem');

      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
});
