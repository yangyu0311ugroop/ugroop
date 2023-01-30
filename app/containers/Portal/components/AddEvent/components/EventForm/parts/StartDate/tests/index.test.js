import { shallow } from 'enzyme';
import React from 'react';
import { EVENT_VIEW_HELPERS } from 'smartComponents/Node/types/Event/helpers';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { defaultValue, StartDate } from '../index';

describe('defaultValue()', () => {
  it('should return default', () => {
    EVENT_VIEW_HELPERS.tempStartDay = jest.fn(() => 0);

    expect(defaultValue({ dayIds: [1, 2, 3] })).toBe(1);
  });

  it('should return tempStartDay', () => {
    EVENT_VIEW_HELPERS.tempStartDay = jest.fn(() => '11');

    expect(defaultValue({ dayIds: [1, 2, 3] })).toBe(11);
  });
});

describe('<StartDate />', () => {
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
    jest.clearAllMocks();

    rendered = shallow(<StartDate {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(StartDate).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('renderDayDateValue()', () => {
    it('should return null', () => {
      expect(instance.renderDayDateValue([])).toBe('No day');
    });

    it('should renderDayDateValue', () => {
      expect(instance.renderDayDateValue([1, 2])).not.toBe('No day');
    });
  });

  describe('renderDayDate()', () => {
    it('should renderDayDate', () => {
      instance.renderDayDateValue = jest.fn(() => 'renderDayDateValue');

      TEST_HELPERS.expectMatchSnapshot(
        instance.renderDayDate({ selectedValues: [1] }),
      );
    });
  });

  describe('renderButton()', () => {
    it('should renderButton', () => {
      instance.renderDayDate = jest.fn(() => 'renderDayDate');

      TEST_HELPERS.expectMatchSnapshot(instance.renderButton, [
        { selectedValues: [1] },
      ]);
    });
  });

  describe('toggleBatchCreate()', () => {
    it('should return !checked', () => {
      instance.toggleBatchCreate([1])({ target: { checked: false } });

      expect(rendered.state().batchCreate).toBe(false);
    });

    it('should return checked', () => {
      instance.toggleBatchCreate([1])({ target: { checked: true } });

      expect(rendered.state().batchCreate).toBe(true);
    });
  });

  describe('handleClickNoDay()', () => {
    it('should return !checked', () => {
      instance.handleClickNoDay({ batchCreate: true })();

      expect(rendered.state().selectedValues).toEqual([]);
    });

    it('should return checked', () => {
      const closeMenu = jest.fn();
      instance.handleClickNoDay({ batchCreate: false, closeMenu })();

      expect(rendered.state().selectedValues).toEqual([]);
      TEST_HELPERS.expectCalled(closeMenu);
    });
  });

  describe('handleClickDay()', () => {
    it('should handleClickDay() !batchCreate', () => {
      instance.handleClickDay({ batchCreate: false, dayId: 1 })();

      expect(rendered.state().selectedValues).toEqual([1]);
    });

    it('should handleClickDay() batchCreate', () => {
      rendered.setProps({
        dayIds: [1, 2, 3],
      });

      instance.handleClickDay({
        batchCreate: true,
        selectedValues: [3],
        dayId: 1,
      })();

      expect(rendered.state().selectedValues).toEqual([1, 3]);
    });

    it('should handleClickDay() batchCreate unselect', () => {
      instance.handleClickDay({
        batchCreate: true,
        selectedValues: [1, 2, 3],
        dayId: 1,
      })();

      expect(rendered.state().selectedValues).toEqual([2, 3]);
    });
  });

  describe('renderCheckStatus()', () => {
    it('should return null', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderCheckStatus, [
        { batchCreate: true },
      ]);
    });

    it('should renderCheckStatus', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderCheckStatus, [
        { batchCreate: false },
      ]);
    });
  });

  describe('renderDayMenu()', () => {
    it('should renderDayMenu', () => {
      instance.renderCheckStatus = jest.fn(() => 'renderCheckStatus');

      TEST_HELPERS.expectMatchSnapshot(
        instance.renderDayMenu({ selectedValues: [] }),
      );
    });
  });

  describe('renderMenu()', () => {
    it('should renderMenu !batchCreate', () => {
      instance.renderDayMenu = jest.fn(() => () => 'renderDayMenu');

      TEST_HELPERS.expectMatchSnapshot(instance.renderMenu, [
        { batchCreate: false },
      ]);
    });

    it('should renderMenu batchCreate', () => {
      instance.renderDayMenu = jest.fn(() => () => 'renderDayMenu');

      TEST_HELPERS.expectMatchSnapshot(instance.renderMenu, [
        { batchCreate: true, selectedValues: [] },
      ]);
    });
  });

  describe('renderData()', () => {
    it('should return null', () => {
      rendered.setState({ batchCreate: true, selectedValues: [1, 2] });

      TEST_HELPERS.expectMatchSnapshot(instance.renderData);
    });

    it('should renderData', () => {
      rendered.setState({ batchCreate: true, selectedValues: [] });

      TEST_HELPERS.expectMatchSnapshot(instance.renderData);
    });
  });

  describe('render()', () => {
    it('should render', () => {
      instance.renderData = jest.fn(() => 'renderData');

      TEST_HELPERS.expectMatchSnapshot(instance.render);
    });
  });
});
